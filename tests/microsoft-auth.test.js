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

describe('Microsoft Entra ID authentication endpoint', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'microsoft-auth-test-secret';
  });

  test('requires a Microsoft credential token', async () => {
    const res = responseMock();
    await handler({ method: 'POST', headers: {}, body: {} }, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing Microsoft credential token' });
  });

  test('authenticates a registered student user using a mock token', async () => {
    db.select.mockImplementation(async (table, query) => {
      if (table === 'identity_providers') {
        return [{ school_id: 'school_1', provider: 'microsoft', client_id: 'leicester-high-client-id-placeholder', enabled: true }];
      }
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
      name: 'Harriet Potter',
      tid: 'school_1',
      exp: Math.floor(Date.now() / 1000) + 3600
    };
    const mockHeader = { kid: 'mock-kid' };
    const mockToken = Buffer.from(JSON.stringify(mockHeader)).toString('base64url') + '.' + Buffer.from(JSON.stringify(mockPayload)).toString('base64url') + '.mock_microsoft_token_';

    const res = responseMock();
    await handler({
      method: 'POST',
      headers: {},
      body: { credential: mockToken, schoolId: 'school_1' }
    }, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      token: expect.any(String),
      user: expect.objectContaining({ id: 'stud_1', email: 'harriet@leicesterhigh.edu', role: 'student' })
    }));
  });

  test('authenticates a registered teacher/coordinator using a mock token', async () => {
    db.select.mockImplementation(async (table, query) => {
      if (table === 'identity_providers') {
        return [{ school_id: 'school_1', provider: 'microsoft', client_id: 'leicester-high-client-id-placeholder', enabled: true }];
      }
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
      name: 'Mrs. Smith',
      tid: 'school_1',
      exp: Math.floor(Date.now() / 1000) + 3600
    };
    const mockHeader = { kid: 'mock-kid' };
    const mockToken = Buffer.from(JSON.stringify(mockHeader)).toString('base64url') + '.' + Buffer.from(JSON.stringify(mockPayload)).toString('base64url') + '.mock_microsoft_token_';

    const res = responseMock();
    await handler({
      method: 'POST',
      headers: {},
      body: { credential: mockToken, schoolId: 'school_1' }
    }, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      token: expect.any(String),
      user: expect.objectContaining({ id: 'coord_1', email: 'smith@leicesterhigh.edu', role: 'coordinator' })
    }));
  });
});
