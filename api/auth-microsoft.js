// Vercel Serverless Function: api/auth-microsoft.js
// Securely exchanges Microsoft OAuth authorization codes with PKCE verification
// and issues signed JWT session tokens for GCSE computer science students and teachers.

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

  const { code, verifier, schoolId } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'Missing Microsoft authorization code' });
  }

  const targetSchoolId = schoolId || 'school_1';

  try {
    const isMock = code.startsWith('mock_code_');
    let email = '';
    let name = '';

    if (isMock) {
      // STRICT PRODUCTION CHECK: Reject mock credentials in production environments
      const isProduction = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';
      if (isProduction) {
        return res.status(403).json({ error: 'Mock authentication is disabled in production.' });
      }

      // Decode simulated mock payload from mock code
      const payloadString = code.substring(10);
      try {
        const decodedPayload = JSON.parse(Buffer.from(payloadString, 'base64').toString('utf8'));
        email = decodedPayload.email;
        name = decodedPayload.name || email.split('@')[0];
      } catch (err) {
        return res.status(400).json({ error: 'Malformed mock authorization code' });
      }
    } else {
      // Real Entra ID exchange
      const providers = await db.select('identity_providers', `school_id=eq.${encodeURIComponent(targetSchoolId)}&provider=eq.microsoft`);
      const provider = providers[0];
      if (!provider || !provider.enabled) {
        return res.status(400).json({ error: 'Microsoft identity provider is not enabled for this school' });
      }

      const clientId = provider.client_id;
      const tenant = provider.tenant_identifier || 'common';
      const secretRef = provider.secret_reference;
      const clientSecret = secretRef ? process.env[secretRef] : null;

      // Exchange Auth Code + PKCE Verifier for Tokens
      const origin = req.headers.origin || 'http://localhost:3000';
      const redirectUri = origin + '/';
      
      const tokenParams = new URLSearchParams();
      tokenParams.append('client_id', clientId);
      tokenParams.append('scope', 'openid profile email');
      tokenParams.append('code', code);
      tokenParams.append('redirect_uri', redirectUri);
      tokenParams.append('grant_type', 'authorization_code');
      tokenParams.append('code_verifier', verifier || '');
      if (clientSecret) {
        tokenParams.append('client_secret', clientSecret);
      }

      const tokenRes = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: tokenParams.toString()
      });

      if (!tokenRes.ok) {
        const tokenErr = await tokenRes.text();
        throw new Error(`Microsoft token exchange failed: ${tokenErr}`);
      }

      const tokenData = await tokenRes.json();
      const idToken = tokenData.id_token;
      if (!idToken) {
        throw new Error('Microsoft token response did not contain an id_token');
      }

      // Decode and verify the ID Token JWT
      const parts = idToken.split('.');
      if (parts.length !== 3) {
        throw new Error('Malformed Microsoft ID Token JWT');
      }

      const [headerB64, payloadB64, signatureB64] = parts;
      const header = JSON.parse(base64urlDecode(headerB64));
      const payload = JSON.parse(base64urlDecode(payloadB64));

      // 1. Verify Issuer and Expiration
      if (!payload.iss || (!payload.iss.includes('login.microsoftonline.com') && !payload.iss.includes('windows.net'))) {
        throw new Error('Invalid Microsoft token issuer');
      }
      if (payload.exp * 1000 < Date.now()) {
        throw new Error('Microsoft token has expired');
      }
      if (payload.aud !== clientId) {
        throw new Error('Microsoft token audience mismatch');
      }

      // 2. Validate JWT Signature using JWKS
      const keys = await getMicrosoftPublicKeys();
      const jwk = keys.find(k => k.kid === header.kid);
      if (!jwk) {
        throw new Error('Public key not found for Microsoft ID Token kid');
      }

      const pem = jwkToPem(jwk);
      const signatureInput = `${headerB64}.${payloadB64}`;
      const verified = crypto
        .createVerify('RSA-SHA256')
        .update(signatureInput)
        .end()
        .verify(pem, signatureB64, 'base64url');

      if (!verified) {
        throw new Error('Invalid Microsoft token signature');
      }

      email = (payload.email || payload.upn || payload.preferred_username || '').toLowerCase().trim();
      name = payload.name || email.split('@')[0];
    }

    if (!email) {
      return res.status(400).json({ error: 'Microsoft account must contain an email address' });
    }

    // Authenticate Coordinator/Teacher
    const coordinators = await db.select('coordinators', `email=eq.${email}`);
    const coordinator = coordinators[0];

    if (coordinator) {
      if (coordinator.school_id !== targetSchoolId) {
        return res.status(403).json({ error: 'Access denied: School tenant mismatch' });
      }
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

    // Authenticate Student
    const students = await db.select('students', `email=eq.${email}`);
    const student = students[0];

    if (student) {
      if (student.school_id !== targetSchoolId) {
        return res.status(403).json({ error: 'Access denied: School tenant mismatch' });
      }
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

    // If valid domain but profile not seeded yet, provision in browser
    return res.status(200).json({
      success: true,
      provisionRequired: true,
      email,
      name
    });

  } catch (err) {
    console.error('Microsoft OAuth exchange backend failure:', err);
    return res.status(500).json({ error: 'Authentication exchange failed: ' + err.message });
  }
};
