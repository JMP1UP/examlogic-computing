// Vercel Serverless Function: api/login.js
// Handles secure student and teacher login validations, issuing signed JWT tokens.

const db = require('../lib/db');
const auth = require('../lib/auth-helper');

module.exports = async function handler(req, res) {
  // CORS configuration
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
    return res.status(400).json({ error: 'Missing request body' });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password parameters' });
  }

  let cleanInput = email.toLowerCase().trim();
  if (cleanInput === 'admin') {
    cleanInput = 'john@25Thirty.com';
  }
  let ip = (req.headers && req.headers['x-forwarded-for']) || (req.socket && req.socket.remoteAddress) || 'unknown-ip';
  if (ip && ip.includes(',')) {
    ip = ip.split(',')[0].trim();
  }

  try {
    // Brute-force protection: check for failed attempts in last 15 minutes
    const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    
    // Check failed attempts by IP first (limit: 10)
    const recentIpFailures = await db.select('logs', `type=eq.Auth Failure IP&actor=eq.${ip}&created_at=gte.${fifteenMinsAgo}`);
    if (recentIpFailures && recentIpFailures.length >= 10) {
      return res.status(429).json({ 
        error: 'Too many failed login attempts from this IP. Please try again in 15 minutes.' 
      });
    }

    // Check failed attempts by IP + Account combination (limit: 5)
    const recentComboFailures = await db.select('logs', `type=eq.Auth Failure Account IP&actor=eq.${ip}:${cleanInput}&created_at=gte.${fifteenMinsAgo}`);
    if (recentComboFailures && recentComboFailures.length >= 5) {
      return res.status(429).json({ 
        error: 'Too many failed login attempts for this account from this IP. Please try again in 15 minutes.' 
      });
    }

    const logFailure = async () => {
      try {
        await db.insert('logs', {
          id: 'log_ip_' + Date.now(),
          type: 'Auth Failure IP',
          action: `Failed login attempt from IP ${ip}`,
          actor: ip
        });
        await db.insert('logs', {
          id: 'log_combo_' + Date.now(),
          type: 'Auth Failure Account IP',
          action: `Failed login attempt for ${cleanInput} from IP ${ip}`,
          actor: `${ip}:${cleanInput}`
        });
      } catch (err) {
        console.error('Failed to log auth failure:', err);
      }
    };

    // 2. Check Coordinators table
    const coordinators = await db.select('coordinators', `email=eq.${cleanInput}`);
    const coordinator = coordinators[0];

    if (coordinator) {
      const isPasswordMatch = await auth.verifyPassword(password, coordinator.password_hash);
      if (!isPasswordMatch) {
        await logFailure();
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      if (!coordinator.approved) {
        await logFailure();
        return res.status(401).json({ error: 'Forbidden: Your coordinator account is pending approval.' });
      }

      const crypto = require('crypto');
      const token = auth.signJwt({
        id: coordinator.id,
        role: coordinator.role.toLowerCase(),
        schoolId: coordinator.school_id,
        pwh: crypto.createHash('sha256').update(coordinator.password_hash || '').digest('hex')
      });
      return res.status(200).json({
        success: true,
        token,
        user: {
          id: coordinator.id,
          name: coordinator.name,
          email: coordinator.email,
          role: coordinator.role.toLowerCase(),
          schoolId: coordinator.school_id
        }
      });
    }

    // 3. Check Students table
    const students = await db.select('students', `email=eq.${cleanInput}`);
    const student = students[0];

    if (student) {
      const isPasswordMatch = await auth.verifyPassword(password, student.password_hash);
      if (!isPasswordMatch) {
        await logFailure();
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      if (!student.active) {
        await logFailure();
        return res.status(401).json({ error: 'Forbidden: Your student account is inactive.' });
      }

      const crypto = require('crypto');
      const token = auth.signJwt({
        id: student.id,
        role: 'student',
        schoolId: student.school_id,
        pwh: crypto.createHash('sha256').update(student.password_hash || '').digest('hex')
      });
      return res.status(200).json({
        success: true,
        token,
        user: {
          id: student.id,
          name: student.name,
          email: student.email,
          role: 'student',
          schoolId: student.school_id,
          language: student.language || 'en'
        }
      });
    }

    // No profile found matching email
    await logFailure();
    return res.status(401).json({ error: 'Invalid email or password' });

  } catch (error) {
    console.error('Login authorization failed:', error);
    return res.status(500).json({ error: error.message });
  }
}
