// Vercel Serverless Function: api/send-invite.js
// Securely handles invitations and password resets, sending emails via Resend.

const db = require('./db');
const auth = require('./auth-helper');

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = async function handler(req, res) {
  const allowedDomains = process.env.ALLOWED_DOMAINS
    ? process.env.ALLOWED_DOMAINS.split(',').map(d => d.trim().toLowerCase())
    : ['http://localhost:3000', 'https://www.school-bridge.org'];

  const originHeader = req.headers && req.headers.origin;
  if (originHeader) {
    if (!allowedDomains.includes(originHeader.toLowerCase())) {
      return res.status(400).json({ error: 'Redirection link domain is not approved' });
    }
    res.setHeader('Access-Control-Allow-Origin', originHeader);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.school-bridge.org');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!req.body) {
    return res.status(400).json({ error: 'Missing or empty request body' });
  }

  const { email, lang = 'en', type } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Missing email parameter' });
  }

  const cleanEmail = email.toLowerCase().trim();
  let ip = (req.headers && req.headers['x-forwarded-for']) || (req.socket && req.socket.remoteAddress) || 'unknown-ip';
  if (ip && ip.includes(',')) {
    ip = ip.split(',')[0].trim();
  }

  try {
    // 1. Rate Limiting: max 5 email triggers per 10 minutes from this IP
    const tenMinsAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const recentLogs = await db.select('logs', `type=eq.Email Sent&actor=eq.${ip}&created_at=gte.${tenMinsAgo}`);
    if (recentLogs && recentLogs.length >= 5) {
      return res.status(429).json({ error: 'Too many requests. Please try again in 10 minutes.' });
    }

    // 2. Authentication & Role Checks
    let actorName = 'System';
    let decoded = null;
    let coordUser = null;
    if (type !== 'reset-password') {
      // Must be authenticated teacher or admin
      const authHeader = req.headers && req.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: Missing token for student invitation' });
      }
      const token = authHeader.split(' ')[1];
      decoded = auth.verifyJwt(token);
      if (!decoded || (decoded.role !== 'teacher' && decoded.role !== 'coordinator' && decoded.role !== 'admin')) {
        return res.status(403).json({ error: 'Forbidden: Only teachers and administrators can invite students' });
      }
      coordUser = await auth.validateSessionDb(decoded);
      if (!coordUser) {
        return res.status(403).json({ error: 'Forbidden: Invalid, pending, or revoked coordinator account' });
      }
      actorName = `User ${decoded.id}`;
    }

    // 3. User Lookup
    let user = null;
    let userRole = 'student';

    const coords = await db.select('coordinators', `email=eq.${cleanEmail}`);
    if (coords.length > 0) {
      user = coords[0];
      userRole = (coords[0].role || 'coordinator').toLowerCase();
    } else {
      const students = await db.select('students', `email=eq.${cleanEmail}`);
      if (students.length > 0) {
        user = students[0];
        userRole = 'student';
      }
    }

    // Prevent User Enumeration on Reset requests
    if (type === 'reset-password' && !user) {
      return res.status(200).json({ success: true, message: 'Password reset link sent if account exists' });
    }

    if (!user) {
      return res.status(404).json({ error: 'No user profile found matching this email address' });
    }

    // School boundary validation for student invitation
    if (type !== 'reset-password') {
      if (decoded.role !== 'admin') {
        if (userRole === 'student') {
          if (coordUser.school_id !== user.school_id) {
            return res.status(403).json({ error: 'Forbidden: You can only invite or reactivate students belonging to your own school' });
          }
        } else {
          return res.status(403).json({ error: 'Forbidden: Only administrators can trigger invites for coordinators' });
        }
      }
    }

    // 4. Generate Token & Invite Link
    let origin = process.env.ALLOWED_ORIGIN || 'https://www.school-bridge.org';
    if (!process.env.ALLOWED_ORIGIN && req.headers.origin) {
      const parsedOrigin = req.headers.origin.trim().toLowerCase();
      if (allowedDomains.includes(parsedOrigin)) {
        origin = parsedOrigin;
      }
    }

    let inviteLink = '';

    if (type === 'reset-password') {
      // Password reset: signed token expires in 15 mins, bound to password hash for single use
      const resetToken = auth.signJwt({
        id: user.id,
        email: user.email,
        role: userRole,
        purpose: 'password-reset',
        hash: (user.password_hash || '').substring(0, 10)
      }, 15 * 60 * 1000);
      inviteLink = `${origin}/signup?token=reset_${resetToken}`;
    } else {
      // Student invitation: welcome token expires in 7 days
      const welcomeToken = auth.signJwt({
        id: user.id,
        email: user.email,
        role: 'student',
        purpose: 'welcome'
      }, 7 * 24 * 60 * 60 * 1000);
      inviteLink = `${origin}/signup?token=welcome_${welcomeToken}`;
    }

    // Restrict URL link host to approved domains (exact origin check)
    const urlObj = new URL(inviteLink);
    const linkHost = `${urlObj.protocol}//${urlObj.host}`.toLowerCase();
    const isAllowedHost = allowedDomains.includes(linkHost);
    if (!isAllowedHost) {
      return res.status(400).json({ error: 'Redirection link domain is not approved' });
    }

    // 5. Select Localized template
    const studentNameEscaped = escapeHtml(user.name);
    const inviteLinkEscaped = escapeHtml(inviteLink);

    const templates = type === 'reset-password' ? {
      en: {
        subject: 'Reset your Bridge account password',
        title: 'Bridge',
        subtitle: 'Global Cultural Exchange',
        greeting: `Hello ${studentNameEscaped},`,
        body1: 'We received a request to reset your password for your <strong>Bridge</strong> account.',
        body2: 'Click the button below to choose a new password. If you did not make this request, you can safely ignore this email.',
        button: 'Reset Password',
        fromName: 'Bridge Security'
      },
      de: {
        subject: 'Setze dein Bridge-Passwort zurück',
        title: 'Bridge',
        subtitle: 'Globaler Kulturaustausch',
        greeting: `Hallo ${studentNameEscaped},`,
        body1: 'Wir haben eine Anfrage erhalten, das Passwort für dein <strong>Bridge</strong>-Konto zurückzusetzen.',
        body2: 'Klicke auf die Schaltfläche unten, um ein neues Passwort zu wählen. Wenn du diese Anfrage nicht gestellt hast, kannst du diese E-Mail einfach ignorieren.',
        button: 'Passwort zurücksetzen',
        fromName: 'Bridge Sicherheit'
      },
      fr: {
        subject: 'Réinitialisez le mot de passe de votre compte Bridge',
        title: 'Bridge',
        subtitle: 'Échange Culturel Mondial',
        greeting: `Bonjour ${studentNameEscaped},`,
        body1: 'Nous avons reçu une demande de réinitialisation du mot de passe de votre compte <strong>Bridge</strong>.',
        body2: 'Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe. Si vous n\'avez pas fait cette demande, vous pouvez ignorer cet e-mail en toute sécurité.',
        button: 'Réinitialiser le mot de passe',
        fromName: 'Sécurité Bridge'
      },
      es: {
        subject: 'Restablecer la contraseña de su cuenta de Bridge',
        title: 'Bridge',
        subtitle: 'Intercambio Cultural Global',
        greeting: `Hola ${studentNameEscaped},`,
        body1: 'Hemos recibido una solicitud para restablecer la contraseña de su cuenta de <strong>Bridge</strong>.',
        body2: 'Haga clic en el botón de abajo para elegir una nueva contraseña. Si no realizó esta solicitud, puede ignorar este correo electrónico de forma segura.',
        button: 'Restablecer contraseña',
        fromName: 'Seguridad Bridge'
      }
    } : {
      en: {
        subject: 'Bridge Invite: Collaborate with international classrooms!',
        title: 'Bridge',
        subtitle: 'Global Cultural Exchange',
        greeting: `Hello ${studentNameEscaped},`,
        body1: 'Your teacher has invited you to join <strong>Bridge</strong>, our international classroom exchange platform!',
        body2: 'Use Bridge to collaborate with classrooms worldwide, build shared project slide decks, chat with partners, and translate messages automatically.',
        button: 'Join Your Classroom',
        fromName: 'Bridge Invitation'
      },
      de: {
        subject: 'Bridge Einladung: Arbeite mit internationalen Klassen zusammen!',
        title: 'Bridge',
        subtitle: 'Globaler Kulturaustausch',
        greeting: `Hallo ${studentNameEscaped},`,
        body1: 'Dein Lehrer hat dich eingeladen, <strong>Bridge</strong> beizutreten, unserer Plattform für den internationalen Klassenaustausch!',
        body2: 'Nutze Bridge, um mit Klassen weltweit zusammenzuarbeiten, gemeinsame Projekt-Präsentationen zu erstellen, mit Partnern zu chatten und Nachrichten automatisch zu übersetzen.',
        button: 'Deiner Klasse beitreten',
        fromName: 'Bridge Einladung'
      },
      fr: {
        subject: 'Invitation Bridge : Collabore avec des classes internationales !',
        title: 'Bridge',
        subtitle: 'Échange Culturel Mondial',
        greeting: `Bonjour ${studentNameEscaped},`,
        body1: "Ton enseignant t'a invité à rejoindre <strong>Bridge</strong>, notre plateforme d'échange scolaire international !",
        body2: 'Utilise Bridge pour collaborer avec des classes du monde entier, créer des diaporamas de projet partagés, discuter avec tes partenaires et traduire automatiquement les messages.',
        button: 'Rejoindre ta classe',
        fromName: 'Invitation Bridge'
      },
      es: {
        subject: 'Invitación de Bridge: ¡Colabora con clases internacionales!',
        title: 'Bridge',
        subtitle: 'Intercambio Cultural Global',
        greeting: `Hola ${studentNameEscaped},`,
        body1: '¡Tu profesor te ha invitado a unirte a <strong>Bridge</strong>, nuestra plataforma de intercambio escolar internacional!',
        body2: 'Utiliza Bridge para colaborar con clases de todo el mundo, crear presentaciones de proyectos compartidos, chatear con compañeros y traducir mensajes automáticamente.',
        button: 'Unirse a tu clase',
        fromName: 'Invitación de Bridge'
      }
    };

    const t = templates[lang.toLowerCase()] || templates.en;

    // Send email using Resend
    if (db.isMockMode) {
      console.log(`[Mock Mode] Email would be sent. Link: ${inviteLink}`);
      return res.status(200).json({ success: true, inviteLink, localMock: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // In local dev without key, log the link and return successfully to unblock testing
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[Local Dev] Email would be sent. Link: ${inviteLink}`);
        return res.status(200).json({ success: true, inviteLink, localMock: true });
      }
      return res.status(500).json({ error: 'Resend API key is not configured' });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: `${escapeHtml(t.fromName)} <noreply@school-bridge.org>`,
        to: [cleanEmail],
        subject: t.subject,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1a202c;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #3b82f6; margin: 0; font-size: 28px;">${escapeHtml(t.title)}</h1>
              <p style="color: #4a5568; margin: 4px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">${escapeHtml(t.subtitle)}</p>
            </div>
            <p style="font-size: 16px; line-height: 1.6; font-weight: bold;">${t.greeting}</p>
            <p style="font-size: 16px; line-height: 1.6;">${t.body1}</p>
            <p style="font-size: 16px; line-height: 1.6;">${t.body2 || ''}</p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${inviteLinkEscaped}" style="background-color: #3b82f6; color: #ffffff; padding: 12px 24px; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 8px; display: inline-block;">${escapeHtml(t.button)}</a>
            </div>
            <p style="font-size: 14px; color: #718096; line-height: 1.5; margin-bottom: 0;">
              If the button above does not work, copy and paste this link into your browser:<br>
              <a href="${inviteLinkEscaped}" style="color: #3b82f6; word-break: break-all;">${inviteLinkEscaped}</a>
            </p>
          </div>
        `
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Resend API error' });
    }

    // Log the successful email dispatch
    await db.insert('logs', {
      id: 'log_' + Date.now(),
      type: 'Email Sent',
      action: `Email of type '${type}' dispatched successfully to ${cleanEmail}`,
      actor: ip
    });

    return res.status(200).json({ success: true, id: data.id, inviteLink });
  } catch (error) {
    console.error('Email dispatcher failure:', error);
    return res.status(500).json({ error: error.message });
  }
};
