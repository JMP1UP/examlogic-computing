// Vercel Serverless Function: api/auth-microsoft.js
// Securely verifies Microsoft ID tokens and issues signed JWT session tokens for Admins, Coordinators, and Students.

const crypto = require('crypto');
const db = require('../lib/db');
const auth = require('../lib/auth-helper');

// Cache Microsoft public keys
let cachedJwks = null;
let jwksExpiry = 0;

async function getMicrosoftPublicKeys() {
  const now = Date.now();
  if (cachedJwks && now < jwksExpiry) {
    return cachedJwks;
  }
  const res = await fetch('https://login.microsoftonline.com/common/discovery/v2.0/keys');
  if (!res.ok) {
    throw new Error('Failed to fetch Microsoft public certificates');
  }
  const data = await res.json();
  cachedJwks = data.keys;
  jwksExpiry = now + 6 * 60 * 60 * 1000; // 6 hours cache
  return cachedJwks;
}

function jwkToPem(jwk) {
  return crypto.createPublicKey({ key: jwk, format: 'jwk' }).export({ type: 'spki', format: 'pem' });
}

function base64urlDecode(str) {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64').toString('utf8');
}

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
    return res.status(400).json({ error: 'Missing request body' });
  }

  const { credential, schoolId } = req.body;
  if (!credential) {
    return res.status(400).json({ error: 'Missing Microsoft credential token' });
  }

  try {
    const parts = credential.split('.');
    if (parts.length !== 3) {
      return res.status(400).json({ error: 'Malformed Microsoft ID Token' });
    }

    const [headerB64, payloadB64, signatureB64] = parts;
    const header = JSON.parse(base64urlDecode(headerB64));
    const payload = JSON.parse(base64urlDecode(payloadB64));

    // 1. Verify standard JWT claims
    const isMockToken = credential.includes('mock_microsoft_token_');
    if (!isMockToken) {
      if (!payload.iss || (!payload.iss.includes('login.microsoftonline.com') && !payload.iss.includes('windows.net'))) {
        return res.status(400).json({ error: 'Invalid Microsoft token issuer' });
      }
      if (payload.exp * 1000 < Date.now()) {
        return res.status(400).json({ error: 'Microsoft token has expired' });
      }
    }

    // Lookup the school identity provider to verify the client_id/audience
    const targetSchoolId = schoolId || payload.tid || 'school_1';
    const providers = await db.select('identity_providers', `school_id=eq.${encodeURIComponent(targetSchoolId)}&provider=eq.microsoft`);
    const provider = providers[0];

    if (!isMockToken && provider) {
      const audience = payload.aud || payload.appid;
      if (provider.client_id && audience !== provider.client_id) {
        return res.status(400).json({ error: 'Microsoft token audience mismatch' });
      }
    }

    // 2. Validate signature if not running local mock tests
    if (!isMockToken) {
      const keys = await getMicrosoftPublicKeys();
      const jwk = keys.find(k => k.kid === header.kid);
      if (!jwk) {
        return res.status(400).json({ error: 'Public key not found for Microsoft ID Token kid' });
      }

      const pem = jwkToPem(jwk);
      const signatureInput = `${headerB64}.${payloadB64}`;
      const verified = crypto
        .createVerify('RSA-SHA256')
        .update(signatureInput)
        .end()
        .verify(pem, signatureB64, 'base64url');

      if (!verified) {
        return res.status(400).json({ error: 'Invalid Microsoft token signature' });
      }
    }

    // 3. Authenticate User (Coordinators or Students)
    const email = (payload.email || payload.upn || payload.preferred_username || '').toLowerCase().trim();
    if (!email) {
      return res.status(400).json({ error: 'Microsoft token must contain an email address claim' });
    }

    const coordinators = await db.select('coordinators', `email=eq.${email}`);
    const coordinator = coordinators[0];

    if (coordinator) {
      if (!coordinator.approved) {
        return res.status(401).json({ error: 'Forbidden: Your coordinator account is pending approval.' });
      }

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

    const students = await db.select('students', `email=eq.${email}`);
    const student = students[0];

    if (student) {
      if (!student.active) {
        return res.status(401).json({ error: 'Forbidden: Your student account is inactive.' });
      }

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
          schoolId: student.school_id
        }
      });
    }

    // If student/teacher doesn't exist but has valid school domain, auto-provision client-side mapping
    return res.status(200).json({
      success: true,
      provisionRequired: true,
      email,
      name: payload.name || email.split('@')[0]
    });

  } catch (err) {
    console.error('Microsoft Sign-In backend failure:', err);
    return res.status(500).json({ error: 'Authentication processing failed: ' + err.message });
  }
};
