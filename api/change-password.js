// Allows an authenticated user to change their own password.

const db = require('./db');
const auth = require('./auth-helper');

module.exports = async function handler(req, res) {
  const allowedDomains = process.env.ALLOWED_DOMAINS
    ? process.env.ALLOWED_DOMAINS.split(',').map(domain => domain.trim().toLowerCase())
    : ['http://localhost:3000', 'https://www.school-bridge.org'];
  const origin = req.headers && req.headers.origin;

  res.setHeader('Access-Control-Allow-Origin', origin && allowedDomains.includes(origin.toLowerCase()) ? origin : 'https://www.school-bridge.org');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const authHeader = req.headers && req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  const decoded = auth.verifyJwt(authHeader.slice(7));
  if (!decoded) return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });

  let user;
  try {
    user = await auth.validateSessionDb(decoded);
  } catch (error) {
    console.error('Password change session validation failed:', error);
    return res.status(500).json({ error: 'Unable to change password at this time' });
  }
  if (!user) return res.status(401).json({ error: 'Unauthorized: Session is invalid or revoked' });

  const { currentPassword, newPassword } = req.body || {};
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new passwords are required' });
  }
  if (newPassword.length < 12) {
    return res.status(400).json({ error: 'New password must be at least 12 characters long' });
  }
  if (newPassword === currentPassword) {
    return res.status(400).json({ error: 'New password must be different from the current password' });
  }

  try {
    if (!await auth.verifyPassword(currentPassword, user.password_hash)) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const table = decoded.role === 'student' ? 'students' : 'coordinators';
    const passwordHash = await auth.hashPassword(newPassword);
    await db.update(table, { password_hash: passwordHash }, `id=eq.${decoded.id}`);
    try {
      await db.insert('logs', {
        id: `log_${Date.now()}`,
        type: 'Security Action',
        action: 'Password changed by account owner',
        actor: decoded.id
      });
    } catch (logError) {
      // The credential update has already succeeded. Do not tell the user it
      // failed solely because an optional audit write was unavailable.
      console.error('Password change audit logging failed:', logError);
    }

    // JWT sessions are bound to the old password hash, so all existing
    // sessions become invalid as soon as this update succeeds.
    return res.status(200).json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error('Authenticated password change failed:', error);
    return res.status(500).json({ error: 'Unable to change password at this time' });
  }
};
