// api/auth-helper.js
// Secure, zero-dependency password hashing and JWT session signing using Node's built-in crypto module.
// Ideal for serverless Vercel environments to minimize cold starts.

const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('FATAL: JWT_SECRET environment variable is missing in production!');
}

const SECRET_KEY = JWT_SECRET || 'bridge-exchange-safe-jwt-secret-fallback-key';

function base64url(source) {
  let encoded = Buffer.from(source).toString('base64');
  return encoded.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64urlDecode(source) {
  let base64 = source.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64').toString('utf8');
}

function timingSafeStringEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const aHash = crypto.createHash('sha256').update(a).digest();
  const bHash = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(aHash, bHash) && a.length === b.length;
}

const auth = {
  // Hash password using scrypt
  hashPassword(password) {
    return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(16).toString('hex');
      crypto.scrypt(password, salt, 64, { N: 16384, r: 8, p: 1 }, (err, derivedKey) => {
        if (err) return reject(err);
        resolve(`${salt}:${derivedKey.toString('hex')}`);
      });
    });
  },

  // Verify password match against hash
  verifyPassword(password, hash) {
    return new Promise((resolve, reject) => {
      if (!hash || !hash.includes(':')) {
        if (process.env.NODE_ENV === 'production') {
          // Legacy plain text passwords are not allowed in production
          return resolve(false);
        }
        // Fallback for legacy plain text passwords in mock database during local development
        resolve(password === hash);
        return;
      }
      const [salt, key] = hash.split(':');
      crypto.scrypt(password, salt, 64, { N: 16384, r: 8, p: 1 }, (err, derivedKey) => {
        if (err) return reject(err);
        const keyBuffer = Buffer.from(key, 'hex');
        if (keyBuffer.length !== derivedKey.length) {
          resolve(false);
        } else {
          resolve(crypto.timingSafeEqual(keyBuffer, derivedKey));
        }
      });
    });
  },

  signJwt(payload, expiresInMs = 86400000) { // Default 24 hours
    const header = { alg: 'HS256', typ: 'JWT' };
    const expiry = Date.now() + expiresInMs;
    const pwh = payload.pwh || crypto.createHash('sha256').update('').digest('hex');
    const jwtPayload = { pwh, ...payload, exp: expiry };

    const stringHeader = base64url(JSON.stringify(header));
    const stringPayload = base64url(JSON.stringify(jwtPayload));

    const signatureInput = `${stringHeader}.${stringPayload}`;
    const signature = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(signatureInput)
      .digest('base64url');

    return `${signatureInput}.${signature}`;
  },

  // Verify and decode JWT token
  verifyJwt(token) {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signature] = parts;
    const signatureInput = `${headerB64}.${payloadB64}`;
    const expectedSignature = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(signatureInput)
      .digest('base64url');

    if (!timingSafeStringEqual(signature, expectedSignature)) {
      return null; // Signature verification failed
    }

    try {
      const decodedPayload = JSON.parse(base64urlDecode(payloadB64));
      // Check expiry
      if (decodedPayload.exp && Date.now() > decodedPayload.exp) {
        return null; // Token expired
      }
      return decodedPayload;
    } catch (e) {
      return null; // JSON parsing failed
    }
  },

  async validateSessionDb(decoded) {
    if (!decoded || !decoded.id || !decoded.role) return null;
    const { id, role, pwh } = decoded;

    const db = require('./db');
    
    if (role === 'admin') {
      const admins = await db.select('coordinators', `id=eq.${id}&role=eq.Admin`);
      if (!admins || admins.length === 0) return null;
      const admin = admins[0];
      const currentPwh = crypto.createHash('sha256').update(admin.password_hash || '').digest('hex');
      if (pwh !== currentPwh) return null;
      return admin;
    }
    
    if (role === 'coordinator' || role === 'teacher') {
      const coords = await db.select('coordinators', `id=eq.${id}`);
      if (!coords || coords.length === 0) return null;
      const coord = coords[0];
      if (!coord.approved) return null;
      const currentPwh = crypto.createHash('sha256').update(coord.password_hash || '').digest('hex');
      if (pwh !== currentPwh) return null;
      return coord;
    }
    
    if (role === 'student') {
      const students = await db.select('students', `id=eq.${id}`);
      if (!students || students.length === 0) return null;
      const student = students[0];
      if (!student.active) return null;
      const currentPwh = crypto.createHash('sha256').update(student.password_hash || '').digest('hex');
      if (pwh !== currentPwh) return null;
      return student;
    }
    
    return null;
  }
};

module.exports = auth;
