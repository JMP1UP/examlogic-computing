const auth = require('../lib/auth-helper');

jest.mock('../lib/db', () => ({
  select: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}));

const db = require('../lib/db');
const loginHandler = require('../lib/auth-routes/login');
const syncHandler = require('../api/sync');
const sendInviteHandler = require('../api/send-invite');
const resetPasswordHandler = require('../api/reset-password');

function resMock() {
  return {
    setHeader: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    end: jest.fn()
  };
}

function bearer(id, role, passwordHash = '') {
  const crypto = require('crypto');
  const pwh = crypto.createHash('sha256').update(passwordHash).digest('hex');
  return { authorization: `Bearer ${auth.signJwt({ id, role, pwh })}` };
}

describe('Deep security, privacy and resilience tests', () => {
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
        return [{ id: 'stud_1', school_id: 'school_1', active: true }];
      }
      if (table === 'coordinators') {
        return [{ id: 'coord_1', school_id: 'school_1', approved: true }];
      }
      return [];
    });
  });

  describe('Suspended account enforcement', () => {
    test('inactive students cannot obtain a login token', async () => {
      const password = 'ValidPassword!123';
      const passwordHash = await auth.hashPassword(password);
      db.select.mockImplementation(async table => {
        if (table === 'logs') return [];
        if (table === 'coordinators') return [];
        if (table === 'students') return [{
          id: 'stud_suspended',
          school_id: 'school_1',
          name: 'Suspended Student',
          email: 'suspended@example.edu',
          active: false,
          password_hash: passwordHash
        }];
        return [];
      });

      const res = resMock();
      await loginHandler({
        method: 'POST', headers: {},
        body: { email: 'suspended@example.edu', password }
      }, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).not.toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }));
    });

    test('inactive students cannot use an existing token for sync writes', async () => {
      db.select.mockImplementation(async table => {
        if (table === 'students') return [{ id: 'stud_suspended', school_id: 'school_1', active: false }];
        if (table === 'connections') return [{
          id: 'conn_1', student_a_id: 'stud_suspended', student_b_id: 'stud_2', status: 'Active'
        }];
        return [];
      });

      const res = resMock();
      await syncHandler({
        method: 'POST', headers: bearer('stud_suspended', 'student'),
        body: { updates: [{
          action: 'insert', table: 'messages',
          data: { id: 'msg_1', connection_id: 'conn_1', sender_id: 'stud_suspended', text: 'hello' }
        }] }
      }, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(db.insert).not.toHaveBeenCalled();
    });
  });

  describe('Snapshot data minimisation', () => {
    test('teacher snapshots exclude coordinators from unrelated schools', async () => {
      const coordinators = [
        { id: 'coord_1', school_id: 'school_1', name: 'Own Teacher', email: 'own@example.edu', approved: true, password_hash: 'secret' },
        { id: 'coord_2', school_id: 'school_2', name: 'Partner Teacher', email: 'partner@example.edu', approved: true, password_hash: 'secret' },
        { id: 'coord_3', school_id: 'school_3', name: 'Unrelated Teacher', email: 'unrelated@example.edu', approved: true, password_hash: 'secret' }
      ];
      const students = [
        { id: 'stud_1', school_id: 'school_1' },
        { id: 'stud_2', school_id: 'school_2' }
      ];
      const connections = [{ id: 'conn_1', student_a_id: 'stud_1', student_b_id: 'stud_2' }];

      db.select.mockImplementation(async (table, query) => {
        if (table === 'coordinators') {
          if (query && query.includes('id=eq.coord_1')) return [coordinators[0]];
          return coordinators;
        }
        if (table === 'students') return students;
        if (table === 'connections') return connections;
        return [];
      });

      const res = resMock();
      await syncHandler({ method: 'GET', headers: bearer('coord_1', 'coordinator', 'secret') }, res);
      expect(res.status).toHaveBeenCalledWith(200);
      const snapshot = res.json.mock.calls[0][0];
      expect(snapshot.coordinators.map(c => c.id)).not.toContain('coord_3');
      expect(JSON.stringify(snapshot)).not.toContain('password_hash');
      expect(JSON.stringify(snapshot)).not.toContain('secret');
    });

    test('student snapshots do not expose classmates email addresses', async () => {
      const own = { id: 'stud_1', school_id: 'school_1', email: 'own@example.edu', active: true, password_hash: 'secret' };
      const classmate = { id: 'stud_2', school_id: 'school_1', email: 'classmate@example.edu', active: true, password_hash: 'secret' };

      db.select.mockImplementation(async (table, query) => {
        if (table === 'students') {
          if (query && query.includes('id=eq.stud_1')) return [own];
          return [own, classmate];
        }
        if (table === 'coordinators') return [];
        return [];
      });

      const res = resMock();
      await syncHandler({ method: 'GET', headers: bearer('stud_1', 'student', 'secret') }, res);
      expect(res.status).toHaveBeenCalledWith(200);
      const snapshot = res.json.mock.calls[0][0];
      const exposedClassmate = snapshot.students.find(s => s.id === 'stud_2');
      expect(exposedClassmate).toBeDefined();
      expect(exposedClassmate).not.toHaveProperty('email');
      expect(JSON.stringify(snapshot)).not.toContain('password_hash');
    });
  });

  describe('Server-side safeguarding enforcement', () => {
    beforeEach(() => {
      db.select.mockImplementation(async (table, query) => {
        if (table === 'students') return [{ id: 'stud_1', school_id: 'school_1', active: true }];
        if (table === 'connections') return [{ id: 'conn_1', student_a_id: 'stud_1', student_b_id: 'stud_2', status: 'Active' }];
        return [];
      });
    });

    test.each([
      'My phone number is 07123 456789',
      'Message me on WhatsApp',
      'My address is 10 Example Road',
      'Add me on sn.apch.at',
      'Let us meet in secret'
    ])('sensitive message is flagged or rejected server-side: %s', async text => {
      const res = resMock();
      await syncHandler({
        method: 'POST', headers: bearer('stud_1', 'student'),
        body: { updates: [{
          action: 'insert', table: 'messages',
          data: { id: 'msg_sensitive', connection_id: 'conn_1', sender_id: 'stud_1', text, flagged: false }
        }] }
      }, res);

      const rejected = res.status.mock.calls.some(([status]) => status === 403 || status === 422);
      const inserted = db.insert.mock.calls.find(([table]) => table === 'messages');
      const safelyFlagged = inserted && inserted[1] && inserted[1].flagged === true;
      expect(rejected || safelyFlagged).toBe(true);
    });

    test('rejects oversized chat messages before database insertion', async () => {
      const res = resMock();
      await syncHandler({
        method: 'POST', headers: bearer('stud_1', 'student'),
        body: { updates: [{
          action: 'insert', table: 'messages',
          data: { id: 'msg_huge', connection_id: 'conn_1', sender_id: 'stud_1', text: 'x'.repeat(100000) }
        }] }
      }, res);

      const rejected = res.status.mock.calls.some(([status]) => status === 400 || status === 413 || status === 422);
      expect(rejected).toBe(true);
      expect(db.insert).not.toHaveBeenCalled();
    });
  });

  describe('Protected relationship and ownership fields', () => {
    beforeEach(() => {
      db.select.mockImplementation(async (table, query) => {
        if (table === 'coordinators') return [{ id: 'coord_1', school_id: 'school_1', approved: true }];
        if (table === 'students') {
          if (query && query.includes('stud_1')) return [{ id: 'stud_1', school_id: 'school_1', active: true }];
          return [{ id: 'stud_2', school_id: 'school_2', active: true }];
        }
        if (table === 'connections') return [{ id: 'conn_1', student_a_id: 'stud_1', student_b_id: 'stud_2', status: 'Active' }];
        if (table === 'projects') return [{ id: 'proj_1', creator_school_id: 'school_1', target_school_id: 'school_2' }];
        if (table === 'news') return [{ id: 'news_1', school_id: 'school_1' }];
        return [];
      });
    });

    test.each([
      ['connections', { student_a_id: 'foreign_1', student_b_id: 'foreign_2' }, 'id=eq.conn_1'],
      ['projects', { creator_school_id: 'school_9' }, 'id=eq.proj_1'],
      ['news', { school_id: 'school_9' }, 'id=eq.news_1'],
      ['schools', { id: 'school_9' }, 'id=eq.school_1']
    ])('rejects rewriting protected ownership fields on %s', async (table, data, match) => {
      const res = resMock();
      await syncHandler({
        method: 'POST', headers: bearer('coord_1', 'coordinator'),
        body: { updates: [{ action: 'update', table, data, match }] }
      }, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(db.update).not.toHaveBeenCalled();
    });
  });

  describe('Malformed request resilience', () => {
    test.each([
      ['send-invite', sendInviteHandler],
      ['reset-password', resetPasswordHandler]
    ])('%s rejects a null JSON body without throwing', async (_name, handler) => {
      const res = resMock();
      await expect(handler({ method: 'POST', headers: {}, body: null }, res)).resolves.toBeUndefined();
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('Batch integrity', () => {
    test('a denied update does not leave earlier updates committed', async () => {
      db.select.mockImplementation(async (table, query) => {
        if (table === 'coordinators') return [{ id: 'coord_1', school_id: 'school_1', approved: true }];
        if (table === 'news' && query && query.includes('foreign_news')) {
          return [{ id: 'foreign_news', school_id: 'school_2' }];
        }
        return [];
      });

      const res = resMock();
      await syncHandler({
        method: 'POST', headers: bearer('coord_1', 'coordinator'),
        body: { updates: [
          { action: 'insert', table: 'news', data: { id: 'own_news', school_id: 'school_1', title: 'First', content: 'First' } },
          { action: 'delete', table: 'news', data: {}, match: 'id=eq.foreign_news' }
        ] }
      }, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(db.insert).not.toHaveBeenCalled();
      expect(db.delete).not.toHaveBeenCalled();
    });
  });
});
