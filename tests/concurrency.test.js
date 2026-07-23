// Set environment variables before requiring dependencies
process.env.ENABLE_MOCK_DB = 'true';
process.env.JWT_SECRET = 'test-suite-secure-key-string-long';
process.env.ALLOWED_DOMAINS = 'https://www.school-bridge.org';

const crypto = require('crypto');
const auth = require('../lib/auth-helper');
const db = require('../lib/db');
const syncHandler = require('../api/sync');

function responseMock() {
  const res = {
    statusCode: 200,
    headers: {},
    setHeader: jest.fn((name, val) => { res.headers[name] = val; }),
    status: jest.fn().mockImplementation((code) => {
      res.statusCode = code;
      return res;
    }),
    json: jest.fn().mockImplementation((data) => {
      res.body = data;
      return res;
    }),
    end: jest.fn()
  };
  return res;
}

async function syncRequest(studentId, body) {
  const students = await db.select('students', `id=eq.${studentId}`);
  const student = students[0];
  const pwh = crypto.createHash('sha256').update(student.password_hash || '').digest('hex');
  const token = auth.signJwt({ id: studentId, role: 'student', pwh });
  return {
    method: 'POST',
    headers: { authorization: `Bearer ${token}` },
    body
  };
}

describe('Slide Lock Concurrency Integration Tests', () => {
  beforeEach(async () => {
    // Clear lock properties on slide_1
    await db.update('project_slides', {
      locked_by_id: null,
      locked_by_name: null,
      locked_expires_at: null
    }, 'id=eq.slide_1');
  });

  it('should allow exactly one student to acquire the lock and reject the concurrent attempt with 409', async () => {
    const newExpiry = new Date(Date.now() + 60 * 1000).toISOString();

    const harrietPayload = {
      updates: [{
        action: 'update',
        table: 'project_slides',
        data: {
          locked_by_id: 'stud_1',
          locked_by_name: 'Harriet Potter',
          locked_expires_at: newExpiry
        },
        match: 'id=eq.slide_1'
      }]
    };

    const lukasPayload = {
      updates: [{
        action: 'update',
        table: 'project_slides',
        data: {
          locked_by_id: 'stud_7',
          locked_by_name: 'Lukas Schmidt',
          locked_expires_at: newExpiry
        },
        match: 'id=eq.slide_1'
      }]
    };

    const resHarriet = responseMock();
    const resLukas = responseMock();

    const reqHarriet = await syncRequest('stud_1', harrietPayload);
    const reqLukas = await syncRequest('stud_7', lukasPayload);

    // Trigger both simultaneously to run concurrently across asynchronous boundaries
    const promiseHarriet = syncHandler(reqHarriet, resHarriet);
    const promiseLukas = syncHandler(reqLukas, resLukas);

    await Promise.all([promiseHarriet, promiseLukas]);

    // Exactly one must be 200, and exactly one must be 409
    const statusCodes = [resHarriet.statusCode, resLukas.statusCode];
    expect(statusCodes).toContain(200);
    expect(statusCodes).toContain(409);

    // Verify database state has the winner
    const slides = await db.select('project_slides', 'id=eq.slide_1');
    expect(slides).toHaveLength(1);
    const lockOwner = slides[0].locked_by_id;
    expect(['stud_1', 'stud_7']).toContain(lockOwner);

    if (lockOwner === 'stud_1') {
      expect(resHarriet.statusCode).toBe(200);
      expect(resLukas.statusCode).toBe(409);
    } else {
      expect(resLukas.statusCode).toBe(200);
      expect(resHarriet.statusCode).toBe(409);
    }
  });

  it('allows a collaborator to lock an editable slide using the full browser payload', async () => {
    const slidesBefore = await db.select('project_slides', 'id=eq.slide_1');
    const slide = slidesBefore[0];
    expect(slide.author).toBe('Harriet Potter');
    expect(slide.editable_by_others).toBe(true);

    const req = await syncRequest('stud_7', {
      updates: [{
        action: 'update',
        table: 'project_slides',
        match: 'id=eq.slide_1',
        data: {
          slide_index: slide.slide_index,
          layout: slide.layout,
          title: slide.title,
          content: slide.content,
          photo_url: slide.photo_url,
          author: slide.author,
          editable_by_others: slide.editable_by_others,
          locked_by_id: 'stud_7',
          locked_by_name: 'Lukas Schmidt',
          locked_expires_at: new Date(Date.now() + 60 * 1000).toISOString()
        }
      }]
    });
    const res = responseMock();

    await syncHandler(req, res);

    expect(res.statusCode).toBe(200);
    const slidesAfter = await db.select('project_slides', 'id=eq.slide_1');
    expect(slidesAfter[0].locked_by_id).toBe('stud_7');
    expect(slidesAfter[0].author).toBe('Harriet Potter');
    expect(slidesAfter[0].editable_by_others).toBe(true);
  });

  it('still rejects a collaborator who changes protected slide ownership fields', async () => {
    const req = await syncRequest('stud_7', {
      updates: [{
        action: 'update',
        table: 'project_slides',
        match: 'id=eq.slide_1',
        data: {
          author: 'Lukas Schmidt|stud_7',
          editable_by_others: false,
          locked_by_id: 'stud_7',
          locked_by_name: 'Lukas Schmidt',
          locked_expires_at: new Date(Date.now() + 60 * 1000).toISOString()
        }
      }]
    });
    const res = responseMock();

    await syncHandler(req, res);

    expect(res.statusCode).toBe(403);
    const slides = await db.select('project_slides', 'id=eq.slide_1');
    expect(slides[0].author).toBe('Harriet Potter');
    expect(slides[0].editable_by_others).toBe(true);
    expect(slides[0].locked_by_id).toBeNull();
  });
});
