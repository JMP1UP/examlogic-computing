const auth = require('../lib/auth-helper');

jest.mock('../lib/db', () => ({
  select: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}));

const db = require('../lib/db');
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

function studentBearer() {
  const crypto = require('crypto');
  const pwh = crypto.createHash('sha256').update('').digest('hex');
  return { authorization: `Bearer ${auth.signJwt({ id: 'stud_1', role: 'student', pwh })}` };
}

function adminBearer() {
  const crypto = require('crypto');
  const pwh = crypto.createHash('sha256').update('').digest('hex');
  return { authorization: `Bearer ${auth.signJwt({ id: 'coord_admin', role: 'admin', pwh })}` };
}

describe('Extended AI launch-security tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = 'test';
    process.env.JWT_SECRET = 'test-suite-secure-key-string-long';
    db.insert.mockResolvedValue({ id: 'inserted' });
    db.update.mockResolvedValue({ id: 'updated' });
    db.delete.mockResolvedValue(null);
  });

  test('unknown and known accounts return the same generic login failure', async () => {
    const passwordHash = await auth.hashPassword('CorrectPassword!1');
    db.select.mockImplementation(async (table, query) => {
      if (table === 'logs') return [];
      if (table === 'coordinators' && query === 'email=eq.existing@example.org') {
        return [{ id: 'coord_1', email: 'existing@example.org', password_hash: passwordHash, approved: true, role: 'Coordinator' }];
      }
      return [];
    });

    const known = responseMock();
    await loginHandler({ method: 'POST', headers: {}, body: { email: 'existing@example.org', password: 'WrongPassword!1' } }, known);
    const unknown = responseMock();
    await loginHandler({ method: 'POST', headers: {}, body: { email: 'unknown@example.org', password: 'WrongPassword!1' } }, unknown);

    expect(known.status.mock.calls.at(-1)[0]).toBe(unknown.status.mock.calls.at(-1)[0]);
    expect(known.json.mock.calls.at(-1)[0]).toEqual(unknown.json.mock.calls.at(-1)[0]);
  });

  test('login rejects a null JSON body without throwing', async () => {
    const res = responseMock();
    await expect(loginHandler({ method: 'POST', headers: {}, body: null }, res)).resolves.toBeUndefined();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('admin sync tolerates optional console tables awaiting migration', async () => {
    db.select.mockImplementation(async (table, query) => {
      if (table === 'coordinators' && query?.startsWith('id=eq.coord_admin')) {
        return [{ id: 'coord_admin', school_id: 'school_1', approved: true, role: 'Admin', password_hash: '' }];
      }
      if (table === 'school_requests') {
        throw new Error("Could not find the table 'public.school_requests' in the schema cache");
      }
      if (table === 'invitations') {
        throw new Error('relation public.invitations does not exist');
      }
      return [];
    });

    const res = responseMock();
    await syncHandler({ method: 'GET', headers: adminBearer() }, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      school_requests: [],
      invitations: []
    }));
  });

  describe('multilingual safeguarding coverage', () => {
    beforeEach(() => {
      db.select.mockImplementation(async table => {
        if (table === 'students') return [{ id: 'stud_1', school_id: 'school_1', active: true }];
        if (table === 'connections') return [{ id: 'conn_1', student_a_id: 'stud_1', student_b_id: 'stud_2', status: 'Active' }];
        return [];
      });
    });

    test.each([
      'Mon numéro de téléphone est 06 12 34 56 78',
      'Meine Telefonnummer ist 0176 12345678',
      'Mi número de teléfono es 612 345 678',
      'Call me on 07123 456789'
    ])('flags risky contact sharing: %s', async text => {
      const res = responseMock();
      await syncHandler({
        method: 'POST', headers: studentBearer(),
        body: { updates: [{ action: 'insert', table: 'messages', data: { id: 'msg_1', connection_id: 'conn_1', sender_id: 'stud_1', text } }] }
      }, res);
      const inserted = db.insert.mock.calls.find(([table]) => table === 'messages');
      expect(inserted && inserted[1].flagged).toBe(true);
    });

    test.each([
      'Let us meet the project deadline tomorrow.',
      'The secret ingredient in my cake is cinnamon.'
    ])('does not flag benign classroom language: %s', async text => {
      const res = responseMock();
      await syncHandler({
        method: 'POST', headers: studentBearer(),
        body: { updates: [{ action: 'insert', table: 'messages', data: { id: 'msg_2', connection_id: 'conn_1', sender_id: 'stud_1', text } }] }
      }, res);
      const inserted = db.insert.mock.calls.find(([table]) => table === 'messages');
      expect(inserted && inserted[1].flagged).toBe(false);
    });

    test('direct API submission creates a staff alert, pauses chat, and writes an audit record', async () => {
      const res = responseMock();
      await syncHandler({
        method: 'POST', headers: studentBearer(),
        body: {
          updates: [{
            action: 'insert',
            table: 'messages',
            data: {
              id: 'msg_direct_safety',
              connection_id: 'conn_1',
              sender_id: 'stud_1',
              text: 'My personal email is student.private@example.com'
            }
          }]
        }
      }, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(db.insert).toHaveBeenCalledWith('flags', expect.objectContaining({
        id: 'flag_direct_safety',
        message_id: 'msg_direct_safety',
        status: 'Pending',
        reported_by: 'System'
      }));
      expect(db.update).toHaveBeenCalledWith(
        'connections',
        { status: 'Paused' },
        'id=eq.conn_1'
      );
      expect(db.insert).toHaveBeenCalledWith('logs', expect.objectContaining({
        id: 'log_safeguard_msg_direct_safety',
        type: 'Safeguarding Alert',
        actor: 'System'
      }));
    });

    test('duplicate client flag insertion reuses the server-created alert', async () => {
      const existing = { id: 'flag_direct_safety', message_id: 'msg_direct_safety' };
      db.select.mockImplementation(async (table, query) => {
        if (table === 'students') return [{ id: 'stud_1', school_id: 'school_1', active: true }];
        if (table === 'connections') return [{ id: 'conn_1', student_a_id: 'stud_1', student_b_id: 'stud_2', status: 'Paused' }];
        if (table === 'messages') return [{ id: 'msg_direct_safety', connection_id: 'conn_1' }];
        if (table === 'flags' && query === 'message_id=eq.msg_direct_safety') return [existing];
        return [];
      });

      const res = responseMock();
      await syncHandler({
        method: 'POST', headers: studentBearer(),
        body: {
          updates: [{
            action: 'insert', table: 'flags',
            data: { id: 'flag_client_duplicate', message_id: 'msg_direct_safety', status: 'Pending' }
          }]
        }
      }, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(db.insert).not.toHaveBeenCalledWith('flags', expect.anything());
    });
  });
});
