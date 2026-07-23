// api/validate-session.js
// Verifies client-supplied JWT tokens against DB status, preventing role forgery.

const db = require('../lib/db');
const auth = require('../lib/auth-helper');

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

  let token = req.body?.token;
  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'Missing session token' });
  }

  try {
    const decoded = auth.verifyJwt(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid or expired session token' });
    }

    const { role } = decoded;

    const user = await auth.validateSessionDb(decoded);
    if (!user) {
      return res.status(401).json({ error: 'Invalid, expired, or revoked session token' });
    }

    if (role === 'admin') {
      return res.status(200).json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: 'admin',
          schoolId: user.school_id
        }
      });
    } else if (role === 'coordinator' || role === 'teacher') {
      return res.status(200).json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role.toLowerCase(),
          schoolId: user.school_id
        }
      });
    } else if (role === 'student') {
      return res.status(200).json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: 'student',
          schoolId: user.school_id,
          language: user.language || 'en'
        }
      });
    } else {
      return res.status(401).json({ error: 'Unknown role context' });
    }
  } catch (err) {
    console.error('Session validation error:', err);
    return res.status(500).json({ error: 'Internal server error during session validation' });
  }
};
