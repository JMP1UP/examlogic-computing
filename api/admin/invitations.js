// Vercel Serverless Function: api/admin/invitations.js
// Securely generates school activation/invitation tokens for administrators.

const db = require('../../lib/db');
const auth = require('../../lib/auth-helper');

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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. Authorize Admin role
  const authHeader = req.headers && req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }
  const token = authHeader.split(' ')[1];
  const decoded = auth.verifyJwt(token);
  if (!decoded || decoded.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }

  // 2. Validate input parameters
  if (!req.body) {
    return res.status(400).json({ error: 'Missing or empty request body' });
  }

  const { schoolId, recipientName, recipientEmail, language = 'en', role = 'school_coordinator' } = req.body;
  if (!schoolId || !recipientName || !recipientEmail) {
    return res.status(400).json({ error: 'Missing required parameters: schoolId, recipientName, recipientEmail' });
  }

  const cleanEmail = recipientEmail.toLowerCase().trim();

  try {
    // 3. Find or Create Coordinator account
    const coords = await db.select('coordinators', `email=eq.${cleanEmail}`);
    let coordinator = coords[0];

    if (!coordinator) {
      // Coordinator does not exist; create coordinator with password: '' and approved: false
      const newCoordId = 'coord_' + Date.now();
      coordinator = await db.insert('coordinators', {
        id: newCoordId,
        school_id: schoolId,
        name: recipientName,
        email: cleanEmail,
        password_hash: '',
        role: role === 'Admin' || role === 'admin' ? 'Admin' : 'Coordinator',
        approved: false,
        created_at: new Date().toISOString()
      });
    }

    // 4. Revoke previous active invitations for this email to enforce single active invitation limit
    const existingInvites = await db.select('invitations', `recipient_email=eq.${cleanEmail}`);
    for (const invite of existingInvites) {
      if (invite.status === 'generated' || invite.status === 'sent') {
        await db.update('invitations', { status: 'revoked' }, `id=eq.${invite.id}`);
      }
    }

    // 5. Generate secure JWT activation token
    const expiryDurationMs = 7 * 24 * 60 * 60 * 1000; // 7 days
    const expiresAt = new Date(Date.now() + expiryDurationMs).toISOString();

    const activationToken = auth.signJwt({
      id: coordinator.id,
      email: coordinator.email,
      role: 'coordinator',
      purpose: 'password-reset',
      hash: '' // Password starts as empty
    }, expiryDurationMs);

    let origin = process.env.ALLOWED_ORIGIN || 'https://www.school-bridge.org';
    if (!process.env.ALLOWED_ORIGIN && req.headers.origin) {
      const parsedOrigin = req.headers.origin.trim().toLowerCase();
      if (allowedDomains.includes(parsedOrigin)) {
        origin = parsedOrigin;
      }
    }
    const activationUrl = `${origin}/signup?token=reset_${activationToken}`;

    // 6. Save Invitation Record
    const invitationId = 'invite_' + Date.now();
    await db.insert('invitations', {
      id: invitationId,
      school_id: schoolId,
      recipient_name: recipientName,
      recipient_email: cleanEmail,
      role: role,
      language: language,
      token_hash: activationToken, // Store JWT token safely
      status: 'generated',
      created_by: decoded.id || 'admin',
      created_at: new Date().toISOString(),
      expires_at: expiresAt,
      sent_at: null,
      accepted_at: null
    });

    // 7. Update school onboarding status to 'invite_generated'
    await db.update('schools', {
      onboarding_status: 'invite_generated'
    }, `id=eq.${schoolId}`);

    // Log the event
    await db.insert('logs', {
      id: 'log_' + Date.now(),
      type: 'System Action',
      action: `Generated invitation token for ${recipientName} (${cleanEmail}) at school ${schoolId}.`,
      actor: decoded.id || 'admin'
    });

    return res.status(200).json({
      success: true,
      invitationId: invitationId,
      activationUrl: activationUrl,
      expiresAt: expiresAt
    });
  } catch (error) {
    console.error('Failed to generate admin invitation:', error);
    return res.status(500).json({ error: 'Internal server error during invitation generation' });
  }
};
