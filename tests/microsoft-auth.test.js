jest.mock('../lib/db', () => ({
  select: jest.fn()
}));

const crypto = require('crypto');
const db = require('../lib/db');
const auth = require('../lib/auth-helper');
const handler = require('../api/auth-microsoft');

function responseMock() {
  return {
    setHeader: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    end: jest.fn()
  };
}

describe('Microsoft Entra ID PKCE authentication endpoint', () => {
  let oldNodeEnv;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'microsoft-auth-test-secret';
    oldNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'test'; // non-production for default tests
  });

  afterEach(() => {
    process.env.NODE_ENV = oldNodeEnv;
  });

  test('requires a Microsoft authorization code', async () => {
    const res = responseMock();
    await handler({ method: 'POST', headers: {}, body: {} }, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing Microsoft authorization code' });
  });

  test('authenticates a registered student user using a mock auth code in development', async () => {
    db.select.mockImplementation(async (table, query) => {
      if (table === 'students') {
        return [{ id: 'stud_1', school_id: 'school_1', name: 'Harriet Potter', email: 'harriet@leicesterhigh.edu', active: true, password_hash: 'mock-pwh' }];
      }
      if (table === 'coordinators') {
        return [];
      }
      return [];
    });

    const mockPayload = {
      email: 'harriet@leicesterhigh.edu',
      name: 'Harriet Potter'
    };
    const mockCode = 'mock_code_' + Buffer.from(JSON.stringify(mockPayload)).toString('base64');

    const res = responseMock();
    await handler({
      method: 'POST',
      headers: {},
      body: { code: mockCode, verifier: 'mock-verifier', schoolId: 'school_1' }
    }, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      token: expect.any(String),
      user: expect.objectContaining({ id: 'stud_1', email: 'harriet@leicesterhigh.edu', role: 'student' })
    }));
  });

  test('authenticates a registered teacher/coordinator using a mock code in development', async () => {
    db.select.mockImplementation(async (table, query) => {
      if (table === 'coordinators') {
        return [{ id: 'coord_1', school_id: 'school_1', name: 'Mrs. Smith', email: 'smith@leicesterhigh.edu', role: 'Coordinator', approved: true, password_hash: 'mock-pwh' }];
      }
      if (table === 'students') {
        return [];
      }
      return [];
    });

    const mockPayload = {
      email: 'smith@leicesterhigh.edu',
      name: 'Mrs. Smith'
    };
    const mockCode = 'mock_code_' + Buffer.from(JSON.stringify(mockPayload)).toString('base64');

    const res = responseMock();
    await handler({
      method: 'POST',
      headers: {},
      body: { code: mockCode, verifier: 'mock-verifier', schoolId: 'school_1' }
    }, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      token: expect.any(String),
      user: expect.objectContaining({ id: 'coord_1', email: 'smith@leicesterhigh.edu', role: 'coordinator' })
    }));
  });

  test('strictly rejects mock codes in production environments', async () => {
    process.env.NODE_ENV = 'production';

    const mockPayload = { email: 'any@school.edu' };
    const mockCode = 'mock_code_' + Buffer.from(JSON.stringify(mockPayload)).toString('base64');

    const res = responseMock();
    await handler({
      method: 'POST',
      headers: {},
      body: { code: mockCode, verifier: 'mock-verifier', schoolId: 'school_1' }
    }, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Mock authentication is disabled in production.' });
  });
});
