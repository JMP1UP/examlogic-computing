const auth = require('../lib/auth-helper');

jest.mock('../lib/db', () => {
  const mockDb = {
    schools: [],
    coordinators: [],
    invitations: [],
    logs: []
  };
  return {
    mockDb,
    select: jest.fn(async (table, query) => {
      if (table === 'schools') {
        if (query && query.includes('id=eq.')) {
          const id = query.split('id=eq.')[1];
          return mockDb.schools.filter(s => s.id === id);
        }
        return mockDb.schools;
      }
      if (table === 'coordinators') {
        if (query && query.includes('email=eq.')) {
          const email = query.split('email=eq.')[1];
          return mockDb.coordinators.filter(c => c.email.toLowerCase() === email.toLowerCase());
        }
        if (query && query.includes('id=eq.')) {
          const id = query.split('id=eq.')[1];
          return mockDb.coordinators.filter(c => c.id === id);
        }
        return mockDb.coordinators;
      }
      if (table === 'invitations') {
        if (query && query.includes('recipient_email=eq.')) {
          const email = query.split('recipient_email=eq.')[1];
          return mockDb.invitations.filter(i => i.recipient_email.toLowerCase() === email.toLowerCase());
        }
        return mockDb.invitations;
      }
      if (table === 'students') {
        return [];
      }
      return [];
    }),
    insert: jest.fn(async (table, data) => {
      const newRow = { ...data };
      if (!newRow.id) newRow.id = 'mock_' + Math.random().toString(36).substring(2, 9);
      if (table === 'schools') mockDb.schools.push(newRow);
      if (table === 'coordinators') mockDb.coordinators.push(newRow);
      if (table === 'invitations') mockDb.invitations.push(newRow);
      return newRow;
    }),
    update: jest.fn(async (table, data, query) => {
      let list = [];
      if (table === 'schools') list = mockDb.schools;
      if (table === 'coordinators') list = mockDb.coordinators;
      if (table === 'invitations') list = mockDb.invitations;

      if (query && query.includes('id=eq.')) {
        const id = query.split('id=eq.')[1];
        const rows = list.filter(r => r.id === id);
        rows.forEach(r => Object.assign(r, data));
        return rows;
      }
      return [];
    }),
    delete: jest.fn()
  };
});

const db = require('../lib/db');
const invitationHandler = require('../api/admin/invitations');
const resetPasswordHandler = require('../api/reset-password');

function responseMock() {
  return {
    setHeader: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    end: jest.fn()
  };
}

describe('👑 Admin Onboarding Console & Invitation System Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = 'test';
    process.env.JWT_SECRET = 'test-suite-secure-key-string-long';
    process.env.ALLOWED_DOMAINS = 'https://www.school-bridge.org';
    
    // Clear mock db arrays
    db.mockDb.schools = [
      { id: 'school_1', name: 'Leicester High School', city: 'Leicester', country: 'UK', language: 'en', code: 'LHS-UK', onboarding_status: 'not_invited' }
    ];
    db.mockDb.coordinators = [
      { id: 'coord_admin', email: 'john@25Thirty.com', name: 'Admin User', role: 'Admin', approved: true }
    ];
    db.mockDb.invitations = [];
  });

  describe('Authorization Enforcement', () => {
    it('should reject requests without a authorization token', async () => {
      const res = responseMock();
      await invitationHandler({ method: 'POST', headers: {}, body: {} }, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.stringContaining('Missing token') }));
    });

    it('should reject non-administrator roles', async () => {
      const res = responseMock();
      const teacherToken = auth.signJwt({ id: 'coord_1', email: 'teacher@school.edu', role: 'teacher' });
      await invitationHandler({
        method: 'POST',
        headers: { authorization: `Bearer ${teacherToken}` },
        body: {}
      }, res);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Forbidden: Admin access required' }));
    });
  });

  describe('Invitation Link Generation API', () => {
    it('should generate activation token, insert invitation record, and update school status to invite_generated', async () => {
      const res = responseMock();
      const adminToken = auth.signJwt({ id: 'coord_admin', email: 'john@25Thirty.com', role: 'admin' });
      
      const payload = {
        schoolId: 'school_1',
        recipientName: 'Herr Wagner',
        recipientEmail: 'wagner@goethe.de',
        language: 'de',
        role: 'school_coordinator'
      };

      await invitationHandler({
        method: 'POST',
        headers: { authorization: `Bearer ${adminToken}` },
        body: payload
      }, res);

      expect(res.status).not.toHaveBeenCalledWith(400);
      expect(res.status).not.toHaveBeenCalledWith(401);
      expect(res.status).not.toHaveBeenCalledWith(403);
      expect(res.status).toHaveBeenCalledWith(200);

      // Verify coordinator was auto-created
      const createdCoords = db.mockDb.coordinators.filter(c => c.email === 'wagner@goethe.de');
      expect(createdCoords).toHaveLength(1);
      expect(createdCoords[0]).toMatchObject({
        name: 'Herr Wagner',
        role: 'Coordinator',
        approved: false,
        password_hash: ''
      });

      // Verify invitation record is inserted
      expect(db.mockDb.invitations).toHaveLength(1);
      expect(db.mockDb.invitations[0]).toMatchObject({
        school_id: 'school_1',
        recipient_name: 'Herr Wagner',
        recipient_email: 'wagner@goethe.de',
        status: 'generated'
      });

      // Verify school status updated
      const school = db.mockDb.schools.find(s => s.id === 'school_1');
      expect(school.onboarding_status).toBe('invite_generated');

      // Verify response content
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        invitationId: expect.any(String),
        activationUrl: expect.stringContaining('signup?token=reset_'),
        expiresAt: expect.any(String)
      }));
    });
  });

  describe('Invitation Acceptance / Password Update Flow', () => {
    it('should mark invitation accepted and update school status to activated upon password reset completion', async () => {
      // 1. Generate invitation
      const adminToken = auth.signJwt({ id: 'coord_admin', email: 'john@25Thirty.com', role: 'admin' });
      const resInvite = responseMock();
      await invitationHandler({
        method: 'POST',
        headers: { authorization: `Bearer ${adminToken}` },
        body: {
          schoolId: 'school_1',
          recipientName: 'M. Dupont',
          recipientEmail: 'dupont@lycee.fr',
          language: 'fr',
          role: 'school_coordinator'
        }
      }, resInvite);

      const responseBody = resInvite.json.mock.calls[0][0];
      const tokenString = responseBody.activationUrl.split('token=')[1];

      // 2. Validate token
      const resVal = responseMock();
      await resetPasswordHandler({
        method: 'POST',
        body: { action: 'validate', token: tokenString }
      }, resVal);
      expect(resVal.status).toHaveBeenCalledWith(200);

      // 3. Execute activation
      const resExec = responseMock();
      await resetPasswordHandler({
        method: 'POST',
        body: { action: 'execute', token: tokenString, password: 'SecureNewPassword123!' }
      }, resExec);

      expect(resExec.status).toHaveBeenCalledWith(200);

      // Verify invitation status is accepted
      const invite = db.mockDb.invitations.find(i => i.recipient_email === 'dupont@lycee.fr');
      expect(invite.status).toBe('accepted');
      expect(invite.accepted_at).not.toBeNull();

      // Verify school onboarding status is updated to activated
      const school = db.mockDb.schools.find(s => s.id === 'school_1');
      expect(school.onboarding_status).toBe('activated');

      // Verify coordinator is approved
      const coord = db.mockDb.coordinators.find(c => c.email === 'dupont@lycee.fr');
      expect(coord.approved).toBe(true);
      expect(coord.password_hash).not.toBe('');
    });
  });
});
