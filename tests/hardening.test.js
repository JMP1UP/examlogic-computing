const auth = require('../lib/auth-helper');
const crypto = require('crypto');

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

function authHeaders(id, role, schoolId = 'school_1', passwordHash = '') {
  const pwh = crypto.createHash('sha256').update(passwordHash).digest('hex');
  return {
    authorization: `Bearer ${auth.signJwt({ id, role, school_id: schoolId, pwh })}`
  };
}

describe('Security Hardening Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = 'test';
    process.env.JWT_SECRET = 'test-suite-secure-key-string-long';
  });

  test('x-forwarded-for handles proxy chains by extracting leftmost IP', async () => {
    db.select.mockResolvedValue([]);
    const res = responseMock();
    await loginHandler({
      method: 'POST',
      headers: { 'x-forwarded-for': '203.0.113.195, 70.41.3.18, 150.172.238.178' },
      body: { email: 'john@25Thirty.com', password: 'test' }
    }, res);

    // Verify the query to logs table checks the extracted canonical IP
    const logCalls = db.select.mock.calls.filter(([table]) => table === 'logs');
    expect(logCalls.length).toBeGreaterThan(0);
    // actor should be the leftmost IP
    expect(logCalls[0][1]).toContain('actor=eq.203.0.113.195');
  });

  test('timing-safe string comparison helper works correctly', async () => {
    const payload = { id: 'stud_1', role: 'student' };
    const token = auth.signJwt(payload);
    
    // Valid token
    expect(auth.verifyJwt(token)).toEqual(expect.objectContaining(payload));
    
    // Invalid token signature
    const parts = token.split('.');
    parts[2] = parts[2].substring(0, parts[2].length - 1) + (parts[2].endsWith('a') ? 'b' : 'a');
    const corruptedToken = parts.join('.');
    expect(auth.verifyJwt(corruptedToken)).toBeNull();
  });

  test('phone number scanner does not flag concatenated separate numbers like year and ID', async () => {
    db.select.mockImplementation(async table => {
      if (table === 'students') return [{ id: 'stud_1', school_id: 'school_1', active: true }];
      if (table === 'connections') return [{ id: 'conn_1', student_a_id: 'stud_1', student_b_id: 'stud_2', status: 'Active' }];
      return [];
    });

    const res = responseMock();
    await syncHandler({
      method: 'POST',
      headers: authHeaders('stud_1', 'student'),
      body: {
        updates: [{
          action: 'insert',
          table: 'messages',
          data: {
            id: 'msg_1',
            connection_id: 'conn_1',
            sender_id: 'stud_1',
            text: 'My graduation year is 2006 and my internal ID is 123456789'
          }
        }]
      }
    }, res);

    const inserted = db.insert.mock.calls.find(([table]) => table === 'messages');
    expect(inserted).toBeDefined();
    expect(inserted[1].flagged).toBe(false);
  });

  test('coordinators cannot update protected student fields', async () => {
    db.select.mockImplementation(async (table, query) => {
      if (table === 'students' && query === 'id=eq.stud_1') {
        return [{ id: 'stud_1', school_id: 'school_1', active: true }];
      }
      if (table === 'coordinators' && query === 'id=eq.coord_1') {
        return [{ id: 'coord_1', name: 'Real Coordinator Name', approved: true, school_id: 'school_1' }];
      }
      return [];
    });

    const res = responseMock();
    await syncHandler({
      method: 'POST',
      headers: authHeaders('coord_1', 'coordinator', 'school_1'),
      body: {
        updates: [{
          action: 'update',
          table: 'students',
          match: 'id=eq.stud_1',
          data: {
            school_id: 'school_2' // Attempt to change school_id
          }
        }]
      }
    }, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  test('teachers cannot update message text or sender identity', async () => {
    db.select.mockImplementation(async (table, query) => {
      if (table === 'coordinators' && query === 'id=eq.coord_1') {
        return [{ id: 'coord_1', name: 'Real Coordinator Name', approved: true, school_id: 'school_1' }];
      }
      return [];
    });

    const res = responseMock();
    await syncHandler({
      method: 'POST',
      headers: authHeaders('coord_1', 'coordinator', 'school_1'),
      body: {
        updates: [{
          action: 'update',
          table: 'messages',
          match: 'id=eq.msg_1',
          data: {
            text: 'new message text'
          }
        }]
      }
    }, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  test('students cannot move project slides to other projects', async () => {
    db.select.mockImplementation(async (table, query) => {
      if (table === 'project_slides' && query === 'id=eq.slide_1') {
        return [{ id: 'slide_1', project_id: 'proj_1', author: 'Alice|stud_1', editable_by_others: false }];
      }
      if (table === 'projects' && query === 'id=eq.proj_1') {
        return [{ id: 'proj_1', creator_school_id: 'school_1', target_school_id: 'school_2' }];
      }
      if (table === 'students' && query === 'id=eq.stud_1') {
        return [{ id: 'stud_1', name: 'Alice', school_id: 'school_1', active: true }];
      }
      return [];
    });

    const res = responseMock();
    await syncHandler({
      method: 'POST',
      headers: authHeaders('stud_1', 'student', 'school_1'),
      body: {
        updates: [{
          action: 'update',
          table: 'project_slides',
          match: 'id=eq.slide_1',
          data: {
            project_id: 'proj_2'
          }
        }]
      }
    }, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  test('coordinators cannot forge reviewer identity on resolved flags', async () => {
    db.select.mockImplementation(async (table, query) => {
      if (table === 'flags' && query === 'id=eq.flag_1') {
        return [{ id: 'flag_1', message_id: 'msg_1', resolved: false }];
      }
      if (table === 'messages' && query === 'id=eq.msg_1') {
        return [{ id: 'msg_1', connection_id: 'conn_1' }];
      }
      if (table === 'connections' && query === 'id=eq.conn_1') {
        return [{ id: 'conn_1', student_a_id: 'stud_1', student_b_id: 'stud_2' }];
      }
      if (table === 'students' && query === 'id=in.(stud_1,stud_2)') {
        return [{ id: 'stud_1', school_id: 'school_1' }, { id: 'stud_2', school_id: 'school_2' }];
      }
      if (table === 'coordinators' && query === 'id=eq.coord_1') {
        return [{ id: 'coord_1', name: 'Real Coordinator Name', approved: true, school_id: 'school_1' }];
      }
      return [];
    });

    const res = responseMock();
    await syncHandler({
      method: 'POST',
      headers: authHeaders('coord_1', 'coordinator', 'school_1'),
      body: {
        updates: [{
          action: 'update',
          table: 'flags',
          match: 'id=eq.flag_1',
          data: {
            reviewed_by: 'Forged Coordinator Name',
            resolved: true
          }
        }]
      }
    }, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  test('coordinators cannot update host_school_id or partner_school_id on speed sessions', async () => {
    db.select.mockImplementation(async (table, query) => {
      if (table === 'speed_sessions' && query === 'id=eq.sess_1') {
        return [{ id: 'sess_1', host_school_id: 'school_1', partner_school_id: 'school_2' }];
      }
      if (table === 'coordinators' && query === 'id=eq.coord_1') {
        return [{ id: 'coord_1', name: 'Real Coordinator Name', approved: true, school_id: 'school_1' }];
      }
      return [];
    });

    const res = responseMock();
    await syncHandler({
      method: 'POST',
      headers: authHeaders('coord_1', 'coordinator', 'school_1'),
      body: {
        updates: [{
          action: 'update',
          table: 'speed_sessions',
          match: 'id=eq.sess_1',
          data: {
            partner_school_id: 'school_3'
          }
        }]
      }
    }, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  test('students cannot update a slide locked by someone else', async () => {
    const futureTime = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    db.select.mockImplementation(async (table, query) => {
      if (table === 'project_slides' && query === 'id=eq.slide_1') {
        return [{ 
          id: 'slide_1', 
          project_id: 'proj_1', 
          author: 'Bob|stud_2', 
          editable_by_others: true,
          locked_by_id: 'stud_2',
          locked_expires_at: futureTime
        }];
      }
      if (table === 'projects' && query === 'id=eq.proj_1') {
        return [{ id: 'proj_1', creator_school_id: 'school_1', target_school_id: 'school_2' }];
      }
      if (table === 'students' && query === 'id=eq.stud_1') {
        return [{ id: 'stud_1', name: 'Alice', school_id: 'school_1', active: true }];
      }
      return [];
    });

    const res = responseMock();
    await syncHandler({
      method: 'POST',
      headers: authHeaders('stud_1', 'student', 'school_1'),
      body: {
        updates: [{
          action: 'update',
          table: 'project_slides',
          match: 'id=eq.slide_1',
          data: {
            title: 'Hacked Title'
          }
        }]
      }
    }, res);

    expect(res.status).toHaveBeenCalledWith(409);
  });

  test('students cannot forge slide authorship on insert', async () => {
    db.select.mockImplementation(async (table, query) => {
      if (table === 'projects' && query === 'id=eq.proj_1') {
        return [{ id: 'proj_1', creator_school_id: 'school_1', target_school_id: 'school_2' }];
      }
      if (table === 'students' && query === 'id=eq.stud_1') {
        return [{ id: 'stud_1', name: 'Alice', school_id: 'school_1', active: true }];
      }
      return [];
    });

    const res = responseMock();
    await syncHandler({
      method: 'POST',
      headers: authHeaders('stud_1', 'student', 'school_1'),
      body: {
        updates: [{
          action: 'insert',
          table: 'project_slides',
          data: {
            project_id: 'proj_1',
            author: 'Bob|stud_2',
            title: 'New Slide'
          }
        }]
      }
    }, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  test('coordinators resolving flags have their reviewer details populated server-side if omitted', async () => {
    db.select.mockImplementation(async (table, query) => {
      if (table === 'flags' && query === 'id=eq.flag_1') {
        return [{ id: 'flag_1', message_id: 'msg_1', resolved: false }];
      }
      if (table === 'messages' && query === 'id=eq.msg_1') {
        return [{ id: 'msg_1', connection_id: 'conn_1' }];
      }
      if (table === 'connections' && query === 'id=eq.conn_1') {
        return [{ id: 'conn_1', student_a_id: 'stud_1', student_b_id: 'stud_2' }];
      }
      if (table === 'students' && query === 'id=in.(stud_1,stud_2)') {
        return [{ id: 'stud_1', school_id: 'school_1' }, { id: 'stud_2', school_id: 'school_2' }];
      }
      if (table === 'coordinators' && query === 'id=eq.coord_1') {
        return [{ id: 'coord_1', name: 'Real Coordinator Name', approved: true, school_id: 'school_1' }];
      }
      return [];
    });

    const res = responseMock();
    await syncHandler({
      method: 'POST',
      headers: authHeaders('coord_1', 'coordinator', 'school_1'),
      body: {
        updates: [{
          action: 'update',
          table: 'flags',
          match: 'id=eq.flag_1',
          data: {
            status: 'Resolved'
          }
        }]
      }
    }, res);

    const updateCalls = db.update.mock.calls.filter(([table]) => table === 'flags');
    expect(updateCalls.length).toBeGreaterThan(0);
    expect(updateCalls[0][1].reviewed_by).toBe('Real Coordinator Name');
    expect(updateCalls[0][1].reviewed_at).toBeDefined();
  });
});
