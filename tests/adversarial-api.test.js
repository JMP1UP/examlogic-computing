const auth = require('../api/auth-helper');

jest.mock('../api/db', () => ({
  select: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}));

const db = require('../api/db');
const loginHandler = require('../api/login');
const syncHandler = require('../api/sync');

function responseMock() {
  return {
    setHeader: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    end: jest.fn()
  };
}

function syncRequest(payload, body) {
  const crypto = require('crypto');
  const pwh = crypto.createHash('sha256').update('').digest('hex');
  const fullPayload = { pwh, ...payload };
  return {
    method: 'POST',
    headers: { authorization: `Bearer ${auth.signJwt(fullPayload)}` },
    body
  };
}

describe('Adversarial API and permission-matrix tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = 'test';
    process.env.JWT_SECRET = 'test-suite-secure-key-string-long';
    process.env.ALLOWED_DOMAINS = 'https://www.school-bridge.org';
    db.insert.mockResolvedValue({ id: 'inserted' });
    db.update.mockResolvedValue({ id: 'updated' });
    db.delete.mockResolvedValue(null);
    db.select.mockImplementation(async (table, query) => {
      if (table === 'students') {
        return [{ id: 'stud_1', name: 'Alice', school_id: 'school_1', active: true }];
      }
      if (table === 'coordinators') {
        return [{ id: 'coord_admin', name: 'Admin', school_id: 'school_1', approved: true, role: 'Admin' }, { id: 'coord_1', name: 'Coordinator', school_id: 'school_1', approved: true, role: 'Coordinator' }];
      }
      return [];
    });
  });

  describe('Token rejection', () => {
    test('rejects missing bearer tokens', async () => {
      const res = responseMock();
      await syncHandler({ method: 'POST', headers: {}, body: { updates: [] } }, res);
      expect(res.status).toHaveBeenCalledWith(401);
    });

    test('rejects expired bearer tokens', async () => {
      const res = responseMock();
      const expired = auth.signJwt({ id: 'stud_1', role: 'student' }, -1000);
      await syncHandler({
        method: 'POST',
        headers: { authorization: `Bearer ${expired}` },
        body: { updates: [] }
      }, res);
      expect(res.status).toHaveBeenCalledWith(401);
    });

    test('rejects signature-tampered bearer tokens', async () => {
      const res = responseMock();
      const valid = auth.signJwt({ id: 'stud_1', role: 'student' });
      const tampered = `${valid.slice(0, -1)}${valid.endsWith('a') ? 'b' : 'a'}`;
      await syncHandler({
        method: 'POST',
        headers: { authorization: `Bearer ${tampered}` },
        body: { updates: [] }
      }, res);
      expect(res.status).toHaveBeenCalledWith(401);
    });
  });

  describe('Account-state enforcement', () => {
    test('does not issue a session token to an unapproved coordinator', async () => {
      const res = responseMock();
      const password = 'StrongActivationPassword!';
      const passwordHash = await auth.hashPassword(password);

      db.select.mockImplementation(async table => {
        if (table === 'logs') return [];
        if (table === 'coordinators') return [{
          id: 'coord_pending',
          email: 'pending@example.edu',
          name: 'Pending Teacher',
          role: 'Coordinator',
          school_id: 'school_1',
          approved: false,
          password_hash: passwordHash
        }];
        return [];
      });

      await loginHandler({
        method: 'POST',
        headers: {},
        body: { email: 'pending@example.edu', password }
      }, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).not.toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }));
    });

    test('does not let an unapproved coordinator use sync writes', async () => {
      const res = responseMock();
      db.select.mockImplementation(async (table, query) => {
        if (table === 'coordinators' && query.includes('coord_pending')) {
          return [{ id: 'coord_pending', school_id: 'school_1', approved: false }];
        }
        return [];
      });

      await syncHandler(syncRequest(
        { id: 'coord_pending', role: 'coordinator' },
        { updates: [{
          action: 'insert',
          table: 'news',
          data: { id: 'news_attack', school_id: 'school_1', title: 'Unauthorized' }
        }] }
      ), res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(db.insert).not.toHaveBeenCalled();
    });
  });

  describe('Student write boundaries', () => {
    beforeEach(() => {
      db.select.mockImplementation(async (table, query) => {
        if (table === 'students' && query.includes('stud_1')) {
          return [{ id: 'stud_1', school_id: 'school_1', active: true }];
        }
        return [];
      });
    });

    test('blocks a student from editing their school record', async () => {
      const res = responseMock();
      await syncHandler(syncRequest(
        { id: 'stud_1', role: 'student' },
        { updates: [{
          action: 'update',
          table: 'schools',
          match: 'id=eq.school_1',
          data: { name: 'Compromised School' }
        }] }
      ), res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(db.update).not.toHaveBeenCalled();
    });

    test.each([
      ['match_status', 'matched'],
      ['activity_level', 'High'],
      ['password_hash', 'attacker-controlled'],
      ['personal_biog_status', 'Approved']
    ])('blocks privileged student profile field %s', async (field, value) => {
      const res = responseMock();
      await syncHandler(syncRequest(
        { id: 'stud_1', role: 'student' },
        { updates: [{
          action: 'update',
          table: 'students',
          match: 'id=eq.stud_1',
          data: { [field]: value }
        }] }
      ), res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(db.update).not.toHaveBeenCalled();
    });
  });

  describe('Coordinator write boundaries', () => {
    test('blocks password-hash replacement through the generic sync API', async () => {
      const res = responseMock();
      db.select.mockResolvedValue([{ id: 'coord_1', school_id: 'school_1', approved: true }]);

      await syncHandler(syncRequest(
        { id: 'coord_1', role: 'coordinator' },
        { updates: [{
          action: 'update',
          table: 'coordinators',
          match: 'id=eq.coord_1',
          data: { password_hash: 'attacker-controlled' }
        }] }
      ), res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(db.update).not.toHaveBeenCalled();
    });

    test('blocks cross-school student deletion', async () => {
      const res = responseMock();
      db.select.mockImplementation(async (table, query) => {
        if (table === 'coordinators') return [{ id: 'coord_1', school_id: 'school_1', approved: true }];
        if (table === 'students' && query.includes('stud_foreign')) {
          return [{ id: 'stud_foreign', school_id: 'school_2' }];
        }
        return [];
      });

      await syncHandler(syncRequest(
        { id: 'coord_1', role: 'coordinator' },
        { updates: [{
          action: 'delete',
          table: 'students',
          match: 'id=eq.stud_foreign',
          data: {}
        }] }
      ), res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(db.delete).not.toHaveBeenCalled();
    });
  });

  describe('Payload validation', () => {
    test.each([null, {}, { updates: 'not-an-array' }])('rejects malformed update payload %#', async body => {
      const res = responseMock();
      await syncHandler(syncRequest({ id: 'stud_1', role: 'student' }, body), res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    test('rejects unknown actions without touching the database', async () => {
      const res = responseMock();
      db.select.mockResolvedValue([{ id: 'coord_admin', role: 'Admin', approved: true }]);
      await syncHandler(syncRequest(
        { id: 'coord_admin', role: 'admin' },
        { updates: [{ action: 'execute', table: 'students', data: {}, match: 'id=eq.stud_1' }] }
      ), res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(db.insert).not.toHaveBeenCalled();
      expect(db.update).not.toHaveBeenCalled();
      expect(db.delete).not.toHaveBeenCalled();
    });
  });
});
