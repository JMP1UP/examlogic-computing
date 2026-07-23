// tests/security.test.js
// Automated security integration tests verifying session security, role controls, and RLS.

const auth = require('../lib/auth-helper');

// Mock db module
jest.mock('../lib/db', () => {
  const mockDb = {
    select: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  };
  return mockDb;
});

const db = require('../lib/db');
const validateSessionHandler = require('../api/validate-session');
const resetPasswordHandler = require('../api/reset-password');
const sendInviteHandler = require('../api/send-invite');
const syncHandler = require('../api/sync');
const loginHandler = require('../api/login');

describe('🛡️ Security & Authentication Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = 'test';
    process.env.JWT_SECRET = 'test-suite-secure-key-string-long';
    process.env.ALLOWED_DOMAINS = 'http://localhost:3000,https://www.school-bridge.org';
  });

  describe('Password Hashing & Scrypt Verification', () => {
    it('should generate secure scrypt hashes and verify correct credentials', async () => {
      const plain = 'password123';
      const hash = await auth.hashPassword(plain);
      
      expect(hash).toContain(':');
      const isMatch = await auth.verifyPassword(plain, hash);
      expect(isMatch).toBe(true);

      const isBadMatch = await auth.verifyPassword('wrongpassword', hash);
      expect(isBadMatch).toBe(false);
    });

    it('should fail plaintext password validations in production environment', async () => {
      process.env.NODE_ENV = 'production';
      const plain = 'password123';
      
      // Plain text check should fail
      const result = await auth.verifyPassword(plain, 'password123');
      expect(result).toBe(false);
    });
  });

  describe('JWT Session Signing & Verification', () => {
    it('should sign and verify valid JWT tokens', () => {
      const payload = { id: 'stud_1', role: 'student' };
      const token = auth.signJwt(payload, 5000);
      
      const decoded = auth.verifyJwt(token);
      expect(decoded).toBeDefined();
      expect(decoded.id).toBe('stud_1');
      expect(decoded.role).toBe('student');
    });

    it('should reject expired or modified tokens', () => {
      const payload = { id: 'stud_1', role: 'student' };
      const token = auth.signJwt(payload, -1000); // Expired 1 second ago
      
      const decoded = auth.verifyJwt(token);
      expect(decoded).toBeNull();
    });
  });

  describe('Session Restoration & Verification (api/validate-session.js)', () => {
    let mockRes;
    beforeEach(() => {
      mockRes = {
        setHeader: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });

    it('should approve session for approved coordinators', async () => {
      const token = auth.signJwt({ id: 'coord_1', role: 'coordinator' });
      db.select.mockResolvedValue([{ id: 'coord_1', name: 'Mrs. Smith', email: 'smith@leicesterhigh.edu', role: 'Coordinator', school_id: 'school_1', approved: true }]);

      const req = {
        method: 'POST',
        headers: { authorization: `Bearer ${token}` }
      };

      await validateSessionHandler(req, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        user: expect.objectContaining({ id: 'coord_1', role: 'coordinator' })
      }));
    });

    it('should block unapproved coordinators', async () => {
      const token = auth.signJwt({ id: 'coord_2', role: 'coordinator' });
      db.select.mockResolvedValue([{ id: 'coord_2', name: 'Herr Wagner', email: 'wagner@goethe.edu', role: 'Coordinator', school_id: 'school_2', approved: false }]);

      const req = {
        method: 'POST',
        headers: { authorization: `Bearer ${token}` }
      };

      await validateSessionHandler(req, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(401);
    });

    it('should block inactive students', async () => {
      const token = auth.signJwt({ id: 'stud_5', role: 'student' });
      db.select.mockResolvedValue([{ id: 'stud_5', name: 'Tabitha Brown', email: 'tabitha@leicesterhigh.edu', role: 'student', school_id: 'school_1', active: false }]);

      const req = {
        method: 'POST',
        headers: { authorization: `Bearer ${token}` }
      };

      await validateSessionHandler(req, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(401);
    });
  });

  describe('One-Time Password Reset flow (api/reset-password.js)', () => {
    let mockRes;
    beforeEach(() => {
      mockRes = {
        setHeader: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });

    it('should validate reset tokens bound to password hashes', async () => {
      const userHash = 'abc:1234567890abcdef';
      const token = auth.signJwt({ id: 'coord_1', email: 'smith@leicesterhigh.edu', role: 'coordinator', purpose: 'password-reset', hash: userHash.substring(0, 10) });

      db.select.mockResolvedValue([{ id: 'coord_1', name: 'Mrs. Smith', email: 'smith@leicesterhigh.edu', password_hash: userHash }]);

      const req = {
        method: 'POST',
        body: { action: 'validate', token: `reset_${token}` }
      };

      await resetPasswordHandler(req, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it('should deny reuse of reset tokens if password hash changes', async () => {
      const oldHash = 'abc:1234567890abcdef';
      const token = auth.signJwt({ id: 'coord_1', email: 'smith@leicesterhigh.edu', role: 'coordinator', purpose: 'password-reset', hash: oldHash.substring(0, 10) });

      // Simulate password already changed to a new hash in database
      const newHash = 'def:9876543210fedcba';
      db.select.mockResolvedValue([{ id: 'coord_1', name: 'Mrs. Smith', email: 'smith@leicesterhigh.edu', password_hash: newHash }]);

      const req = {
        method: 'POST',
        body: { action: 'validate', token: `reset_${token}` }
      };

      await resetPasswordHandler(req, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(410);
    });
  });

  describe('CORS and Origin Security (Dynamic whitelist enforcement)', () => {
    let mockRes;
    beforeEach(() => {
      mockRes = {
        setHeader: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });

    it('should allow CORS headers for whitelisted origin', async () => {
      const req = {
        method: 'POST',
        headers: { origin: 'https://www.school-bridge.org' },
        body: {}
      };
      await validateSessionHandler(req, mockRes);
      expect(mockRes.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', 'https://www.school-bridge.org');
    });

    it('should set CORS to fallback production domain for non-whitelisted origin', async () => {
      const req = {
        method: 'POST',
        headers: { origin: 'https://malicious-attacker.com' },
        body: {}
      };
      await validateSessionHandler(req, mockRes);
      expect(mockRes.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', 'https://www.school-bridge.org');
    });
  });

  describe('Redirection Host Exact Domain Matching in send-invite.js', () => {
    let mockRes;
    beforeEach(() => {
      mockRes = {
        setHeader: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      // Mock db select response to bypass rate limiter and load coordinator
      db.select.mockImplementation((table, query) => {
        if (table === 'logs') return Promise.resolve([]); // zero previous logs
        if (table === 'coordinators') return Promise.resolve([{ id: 'coord_1', school_id: 'school_1', password_hash: '123', role: 'Coordinator' }]);
        return Promise.resolve([]);
      });
    });

    it('should deny redirect links where host is prefix-spoofed', async () => {
      const token = auth.signJwt({ id: 'coord_1', role: 'coordinator' });
      const req = {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          origin: 'https://www.school-bridge.org.attacker.com' // prefix spoofing attempt
        },
        body: {
          email: 'smith@leicesterhigh.edu',
          type: 'reset-password'
        }
      };

      await sendInviteHandler(req, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
        error: 'Redirection link domain is not approved'
      }));
    });
  });

  describe('Sync Authorization Permissions (api/sync.js Write Boundaries)', () => {
    let mockRes;
    beforeEach(() => {
      mockRes = {
        setHeader: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });

    it('should block coordinators from updating forbidden fields in their profile', async () => {
      const token = auth.signJwt({ id: 'coord_1', role: 'coordinator', schoolId: 'school_1' });
      db.select.mockImplementation(async (table, query) => {
        if (table === 'coordinators') return [{ id: 'coord_1', school_id: 'school_1', approved: true }];
        return [];
      });
      const req = {
        method: 'POST',
        headers: { authorization: `Bearer ${token}` },
        body: {
          updates: [{
            action: 'update',
            table: 'coordinators',
            data: { role: 'Admin', approved: true }, // self-promotion and self-approval
            match: 'id=eq.coord_1'
          }]
        }
      };

      await syncHandler(req, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(403);
    });

    it('should block coordinators from inserting/updating flags belonging to a different school', async () => {
      const token = auth.signJwt({ id: 'coord_1', role: 'coordinator', schoolId: 'school_1' });
      
      // Mock db response: return message belonging to school_2 (Herr Wagner's school)
      db.select.mockImplementation((table, query) => {
        if (table === 'coordinators') {
          return Promise.resolve([{ id: 'coord_1', school_id: 'school_1', approved: true }]);
        }
        if (table === 'messages') {
          return Promise.resolve([{ id: 'msg_8', connection_id: 'match_2' }]);
        }
        if (table === 'connections') {
          return Promise.resolve([{ id: 'match_2', student_a_id: 'stud_7', student_b_id: 'stud_8' }]);
        }
        if (table === 'students') {
          // Both students belong to school_2
          return Promise.resolve([
            { id: 'stud_7', school_id: 'school_2' },
            { id: 'stud_8', school_id: 'school_2' }
          ]);
        }
        return Promise.resolve([]);
      });

      const req = {
        method: 'POST',
        headers: { authorization: `Bearer ${token}` },
        body: {
          updates: [{
            action: 'insert',
            table: 'flags',
            data: { message_id: 'msg_8', reason: 'Forged flag' }
          }]
        }
      };

      await syncHandler(req, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(403);
    });

    it('should block teachers from inserting arbitrary system audit logs', async () => {
      const token = auth.signJwt({ id: 'coord_1', role: 'coordinator', schoolId: 'school_1' });
      db.select.mockImplementation(async (table, query) => {
        if (table === 'coordinators') return [{ id: 'coord_1', school_id: 'school_1', approved: true }];
        return [];
      });
      const req = {
        method: 'POST',
        headers: { authorization: `Bearer ${token}` },
        body: {
          updates: [{
            action: 'insert',
            table: 'logs',
            data: { actor: 'System Admin', action: 'Forged system log' } // Forging administrator actor
          }]
        }
      };

      await syncHandler(req, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(403);
    });
  });

  describe('Production HTML Dev Console checks', () => {
    it('should not contain the developer console HTML or role-switching controls', () => {
      const fs = require('fs');
      const path = require('path');
      const htmlPath = path.join(__dirname, '../index.html');
      const htmlContent = fs.readFileSync(htmlPath, 'utf8');

      expect(htmlContent).not.toContain('dev-console');
      expect(htmlContent).not.toContain('dev-panel');
      expect(htmlContent).not.toContain('dev-role-btn');
      expect(htmlContent).not.toContain('dev-toggle-collapse');
      expect(htmlContent).not.toContain('dev-reset-db-btn');
      expect(htmlContent).not.toContain('🛠️ Dev Control Panel');
    });
  });

  describe('Coordinator Account Registration, Activation & Login Workflow', () => {
    let mockRes;
    beforeEach(() => {
      mockRes = {
        setHeader: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });

    it('should complete coordinator invitation -> activation -> login -> validation cleanly', async () => {
      const email = 'new-admin@leicesterhigh.edu';
      const password = 'secureActivationPassword123';
      let mockDbCoordinator = {
        id: 'coord_999',
        name: 'Jane Doe',
        email,
        role: 'Coordinator',
        school_id: 'school_1',
        approved: false,
        password_hash: null
      };

      // Mock database calls for this flow
      db.select.mockImplementation(async (table, query) => {
        if (table === 'logs') return [];
        if (table === 'coordinators') {
          if (query.includes(email) || query.includes('coord_999')) {
            return [mockDbCoordinator];
          }
        }
        return [];
      });

      db.update.mockImplementation(async (table, data, query) => {
        if (table === 'coordinators' && query.includes('coord_999')) {
          mockDbCoordinator = { ...mockDbCoordinator, ...data };
          return { success: true };
        }
        return { success: false };
      });

      db.insert.mockImplementation(async (table, data) => {
        return { success: true };
      });

      // Step 1: Coordinator invitation / activation link request
      const inviteReq = {
        method: 'POST',
        headers: {},
        body: {
          email,
          type: 'reset-password'
        }
      };

      await sendInviteHandler(inviteReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      const inviteResult = mockRes.json.mock.calls[0][0];
      expect(inviteResult.inviteLink).toBeDefined();

      const urlObj = new URL(inviteResult.inviteLink);
      const token = urlObj.searchParams.get('token');
      expect(token).toBeDefined();

      // Step 2: Account activation (submitting new password)
      const activateReq = {
        method: 'POST',
        body: {
          action: 'execute',
          token,
          password
        }
      };

      const mockResActivate = {
        setHeader: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await resetPasswordHandler(activateReq, mockResActivate);
      expect(mockResActivate.status).toHaveBeenCalledWith(200);
      expect(mockDbCoordinator.approved).toBe(true);
      expect(mockDbCoordinator.password_hash).not.toBeNull();

      // Step 3: Successful login with the new credentials
      const loginReq = {
        method: 'POST',
        body: {
          email,
          password
        }
      };

      const mockResLogin = {
        setHeader: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await loginHandler(loginReq, mockResLogin);
      expect(mockResLogin.status).toHaveBeenCalledWith(200);
      const loginResult = mockResLogin.json.mock.calls[0][0];
      expect(loginResult.token).toBeDefined();

      // Step 4: Successful session validation
      const validateReq = {
        method: 'POST',
        headers: {
          authorization: `Bearer ${loginResult.token}`
        }
      };

      const mockResValidate = {
        setHeader: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await validateSessionHandler(validateReq, mockResValidate);
      expect(mockResValidate.status).toHaveBeenCalledWith(200);
      const validateResult = mockResValidate.json.mock.calls[0][0];
      expect(validateResult.success).toBe(true);
      expect(validateResult.user.id).toBe('coord_999');
    });
  });

  describe('Adversarial Regression Test Suite (Sync & Login Boundaries)', () => {
    let mockRes;
    beforeEach(() => {
      mockRes = {
        setHeader: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });

    it('should deny login for unapproved coordinators', async () => {
      const email = 'pending-coordinator@leicesterhigh.edu';
      const coordinator = {
        id: 'coord_pending',
        email,
        role: 'Coordinator',
        school_id: 'school_1',
        approved: false,
        password_hash: await auth.hashPassword('securePassword123')
      };

      db.select.mockImplementation(async (table, query) => {
        if (table === 'logs') return [];
        if (table === 'coordinators' && query.includes(email)) return [coordinator];
        return [];
      });

      const req = {
        method: 'POST',
        body: { email, password: 'securePassword123' }
      };

      await loginHandler(req, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(401);
    });

    it('should deny sync read/write for unapproved coordinators', async () => {
      const token = auth.signJwt({ id: 'coord_pending', role: 'coordinator' });
      const coordinator = {
        id: 'coord_pending',
        role: 'Coordinator',
        school_id: 'school_1',
        approved: false
      };

      db.select.mockImplementation(async (table, query) => {
        if (table === 'coordinators' && query.includes('coord_pending')) return [coordinator];
        return [];
      });

      // Test GET Sync
      const reqGet = {
        method: 'GET',
        headers: { authorization: `Bearer ${token}` }
      };
      await syncHandler(reqGet, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(401);

      // Test POST Sync
      const reqPost = {
        method: 'POST',
        headers: { authorization: `Bearer ${token}` },
        body: {
          updates: [{
            action: 'update',
            table: 'coordinators',
            data: { name: 'New Name' },
            match: 'id=eq.coord_pending'
          }]
        }
      };
      const mockResPost = { setHeader: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };
      await syncHandler(reqPost, mockResPost);
      expect(mockResPost.status).toHaveBeenCalledWith(401);
    });

    it('should deny students from editing school records', async () => {
      const token = auth.signJwt({ id: 'stud_1', role: 'student' });
      const student = { id: 'stud_1', school_id: 'school_1', active: true };

      db.select.mockImplementation(async (table, query) => {
        if (table === 'students' && query.includes('stud_1')) return [student];
        return [];
      });

      const req = {
        method: 'POST',
        headers: { authorization: `Bearer ${token}` },
        body: {
          updates: [{
            action: 'update',
            table: 'schools',
            data: { name: 'Hacked School Name' },
            match: 'id=eq.school_1'
          }]
        }
      };

      await syncHandler(req, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(403);
    });

    it('should deny students from updating privileged fields on their own profile', async () => {
      const token = auth.signJwt({ id: 'stud_1', role: 'student' });
      const student = { id: 'stud_1', school_id: 'school_1', active: true };

      db.select.mockImplementation(async (table, query) => {
        if (table === 'students' && query.includes('stud_1')) return [student];
        return [];
      });

      const req = {
        method: 'POST',
        headers: { authorization: `Bearer ${token}` },
        body: {
          updates: [{
            action: 'update',
            table: 'students',
            data: { match_status: 'Matched', password_hash: 'hacked' },
            match: 'id=eq.stud_1'
          }]
        }
      };

      await syncHandler(req, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(403);
    });

    it('should deny coordinators from updating their password_hash via generic sync', async () => {
      const token = auth.signJwt({ id: 'coord_1', role: 'coordinator' });
      const coordinator = { id: 'coord_1', school_id: 'school_1', approved: true };

      db.select.mockImplementation(async (table, query) => {
        if (table === 'coordinators' && query.includes('coord_1')) return [coordinator];
        return [];
      });

      const req = {
        method: 'POST',
        headers: { authorization: `Bearer ${token}` },
        body: {
          updates: [{
            action: 'update',
            table: 'coordinators',
            data: { password_hash: 'hacked_hash' },
            match: 'id=eq.coord_1'
          }]
        }
      };

      await syncHandler(req, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(403);
    });

    it('should return 400 Bad Request on null or invalid POST sync payload', async () => {
      const token = auth.signJwt({ id: 'coord_1', role: 'coordinator' });
      const coordinator = { id: 'coord_1', school_id: 'school_1', approved: true };

      db.select.mockImplementation(async (table, query) => {
        if (table === 'coordinators' && query.includes('coord_1')) return [coordinator];
        return [];
      });

      const req = {
        method: 'POST',
        headers: { authorization: `Bearer ${token}` },
        body: null
      };

      await syncHandler(req, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });
});
