// api/reset-password.js
// Handles server-side validation of invitation/reset tokens and executes password updates securely.

const db = require('./db');
const auth = require('./auth-helper');

module.exports = async function handler(req, res) {
  const allowedDomains = process.env.ALLOWED_DOMAINS
    ? process.env.ALLOWED_DOMAINS.split(',').map(d => d.trim().toLowerCase())
    : ['http://localhost:3000', 'https://www.school-bridge.org'];

  const originHeader = req.headers && req.headers.origin;
  if (originHeader && allowedDomains.includes(originHeader.toLowerCase())) {
    res.setHeader('Access-Control-Allow-Origin', originHeader);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.school-bridge.org');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!req.body) {
    return res.status(400).json({ error: 'Missing or empty request body' });
  }

  const { action, token, password } = req.body;
  if (!action || !token) {
    return res.status(400).json({ error: 'Missing action or token parameters' });
  }

  // Parse token prefix
  let prefix = '';
  let jwtToken = '';
  if (token.startsWith('welcome_')) {
    prefix = 'welcome';
    jwtToken = token.substring(8);
  } else if (token.startsWith('reset_')) {
    prefix = 'reset';
    jwtToken = token.substring(6);
  } else {
    return res.status(400).json({ error: 'Invalid token format' });
  }

  try {
    // 1. Verify token signature and expiry
    const decoded = auth.verifyJwt(jwtToken);
    if (!decoded) {
      return res.status(401).json({ error: 'This token is invalid or has expired' });
    }

    if (prefix === 'welcome' && decoded.purpose !== 'welcome') {
      return res.status(400).json({ error: 'Invalid token purpose' });
    }
    if (prefix === 'reset' && decoded.purpose !== 'password-reset') {
      return res.status(400).json({ error: 'Invalid token purpose' });
    }

    const userId = decoded.id;

    // 2. Validate Token State
    if (action === 'validate') {
      // Validate that user exists
      if (prefix === 'welcome') {
        const students = await db.select('students', `id=eq.${userId}`);
        if (students.length === 0) {
          return res.status(404).json({ error: 'Student profile not found' });
        }
        if (students[0].active) {
          return res.status(400).json({ error: 'Account already activated' });
        }
      } else {
        // password-reset: lookup student or coordinator
        let user;
        const students = await db.select('students', `id=eq.${userId}`);
        if (students.length > 0) {
          user = students[0];
        } else {
          const coords = await db.select('coordinators', `id=eq.${userId}`);
          if (coords.length > 0) user = coords[0];
        }

        if (!user) {
          return res.status(404).json({ error: 'User profile not found' });
        }

        // Validate one-time use constraint by matching the password hash subset
        if (decoded.hash !== (user.password_hash || '').substring(0, 10)) {
          return res.status(410).json({ error: 'This password reset link has already been used' });
        }
      }

      return res.status(200).json({ success: true, userId, role: decoded.role });
    }

    // 3. Execute Password Update / Account Activation
    if (action === 'execute') {
      if (!password || password.length < 12) {
        return res.status(400).json({ error: 'Password must be at least 12 characters long' });
      }

      const passwordHash = await auth.hashPassword(password);

      if (prefix === 'welcome') {
        // Activate student account
        const students = await db.select('students', `id=eq.${userId}`);
        if (students.length === 0) {
          return res.status(404).json({ error: 'Student profile not found' });
        }
        const student = students[0];
        if (student.active) {
          return res.status(400).json({ error: 'Account already activated' });
        }

        await db.update('students', {
          password_hash: passwordHash,
          active: true
        }, `id=eq.${userId}`);

        // Log activation
        await db.insert('logs', {
          id: 'log_' + Date.now(),
          type: 'Safeguarding Action',
          action: `Student account activated: ${student.name}`,
          actor: 'System'
        });

        return res.status(200).json({ success: true, message: 'Account successfully activated', email: student.email });
      } else {
        // Reset password
        let table = '';
        let user = null;

        const students = await db.select('students', `id=eq.${userId}`);
        if (students.length > 0) {
          user = students[0];
          table = 'students';
        } else {
          const coords = await db.select('coordinators', `id=eq.${userId}`);
          if (coords.length > 0) {
            user = coords[0];
            table = 'coordinators';
          }
        }

        if (!user) {
          return res.status(404).json({ error: 'User profile not found' });
        }

        // Verify hash matches (one-time use check)
        if (decoded.hash !== (user.password_hash || '').substring(0, 10)) {
          return res.status(410).json({ error: 'This password reset link has already been used' });
        }

        const updateData = {
          password_hash: passwordHash
        };
        if (table === 'coordinators') {
          updateData.approved = true;
          try {
            const invites = await db.select('invitations', `recipient_email=eq.${user.email.toLowerCase().trim()}`);
            if (invites.length > 0) {
              const activeInvite = invites.find(i => i.status === 'sent' || i.status === 'generated');
              if (activeInvite) {
                await db.update('invitations', {
                  status: 'accepted',
                  accepted_at: new Date().toISOString()
                }, `id=eq.${activeInvite.id}`);
              }
            }
            if (user.school_id) {
              await db.update('schools', {
                onboarding_status: 'activated'
              }, `id=eq.${user.school_id}`);
            }
          } catch (e) {
            console.error('Failed to update invitation status in reset-password:', e);
          }
        }

        await db.update(table, updateData, `id=eq.${userId}`);

        // Log password reset
        await db.insert('logs', {
          id: 'log_' + Date.now(),
          type: 'Safeguarding Action',
          action: `Password reset successfully for ${user.name} (${table})`,
          actor: 'System'
        });

        return res.status(200).json({ success: true, message: 'Password successfully reset', email: user.email });
      }
    }

    return res.status(400).json({ error: 'Invalid action type' });
  } catch (err) {
    console.error('Password reset execution failure:', err);
    return res.status(500).json({ error: 'Internal server error during password operation' });
  }
};
