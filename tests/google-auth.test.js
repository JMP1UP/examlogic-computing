const auth = require('../api/auth-helper');
const db = require('../api/db');
const googleAuthHandler = require('../api/auth-google');
const inviteHandler = require('../api/admin/invitations');

jest.mock('../api/db', () => ({
  select: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}));

function responseMock() {
  return {
    setHeader: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    end: jest.fn()
  };
}

describe('Google Authentication and Role Management Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = 'test';
    process.env.JWT_SECRET = 'test-suite-secure-key-string-long';
    process.env.GOOGLE_CLIENT_ID = 'test-google-client-id';
    process.env.ALLOWED_DOMAINS = 'https://www.school-bridge.org';
    db.insert.mockImplementation(async (table, data) => ({ id: 'mock_inserted_id', ...data }));
    db.update.mockResolvedValue([{ id: 'updated_id' }]);
  });

  test('Auto-registers and logs in john@25thirty.com as Admin on first login', async () => {
    // Mock john not existing in coordinators initially
    db.select.mockImplementation(async (table, query) => {
      if (table === 'coordinators') {
        if (query && query.includes('john@25thirty.com')) {
          // Empty on first select call, but return newly inserted on second call
          if (db.insert.mock.calls.length > 0) {
            return [{ id: 'coord_admin_john', email: 'john@25thirty.com', role: 'Admin', approved: true, school_id: 'school_1' }];
          }
          return [];
        }
      }
      return [];
    });

    const mockPayload = {
      iss: 'https://accounts.google.com',
      aud: 'test-google-client-id',
      exp: Math.floor(Date.now() / 1000) + 3600,
      email: 'john@25thirty.com',
      email_verified: true,
      name: 'John Partridge'
    };

    const header = { alg: 'RS256', kid: 'key-1' };
    const credential = Buffer.from(JSON.stringify(header)).toString('base64url') + '.' + Buffer.from(JSON.stringify(mockPayload)).toString('base64url') + '.mock_google_token_';

    const req = {
      method: 'POST',
      body: { credential, clientId: 'test-google-client-id' }
    };
    const res = responseMock();

    await googleAuthHandler(req, res);

    expect(db.insert).toHaveBeenCalledWith('coordinators', expect.objectContaining({
      email: 'john@25thirty.com',
      role: 'Admin',
      approved: true
    }));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      user: expect.objectContaining({
        email: 'john@25thirty.com',
        role: 'admin'
      })
    }));
  });

  test('Authenticates registered Coordinator via Google Sign-In', async () => {
    db.select.mockImplementation(async (table, query) => {
      if (table === 'coordinators' && query.includes('teacher@school.edu')) {
        return [{ id: 'coord_teacher', email: 'teacher@school.edu', role: 'Coordinator', approved: true, school_id: 'school_1' }];
      }
      return [];
    });

    const mockPayload = {
      iss: 'https://accounts.google.com',
      aud: 'test-google-client-id',
      exp: Math.floor(Date.now() / 1000) + 3600,
      email: 'teacher@school.edu',
      email_verified: true,
      name: 'Teacher Smith'
    };

    const credential = Buffer.from(JSON.stringify({ kid: '1' })).toString('base64url') + '.' + Buffer.from(JSON.stringify(mockPayload)).toString('base64url') + '.mock_google_token_';

    const req = {
      method: 'POST',
      body: { credential, clientId: 'test-google-client-id' }
    };
    const res = responseMock();

    await googleAuthHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      user: expect.objectContaining({
        email: 'teacher@school.edu',
        role: 'coordinator'
      })
    }));
  });

  test('Rejects unregistered Google email addresses', async () => {
    db.select.mockResolvedValue([]); // Unregistered email

    const mockPayload = {
      iss: 'https://accounts.google.com',
      aud: 'test-google-client-id',
      exp: Math.floor(Date.now() / 1000) + 3600,
      email: 'unknown@school.edu',
      email_verified: true
    };

    const credential = Buffer.from(JSON.stringify({ kid: '1' })).toString('base64url') + '.' + Buffer.from(JSON.stringify(mockPayload)).toString('base64url') + '.mock_google_token_';

    const req = {
      method: 'POST',
      body: { credential, clientId: 'test-google-client-id' }
    };
    const res = responseMock();

    await googleAuthHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: expect.stringContaining('Access denied: Google account is not registered')
    }));
  });

  test('Creates coordinator with Admin role when requested in invitation', async () => {
    db.select.mockImplementation(async (table, query) => {
      if (table === 'coordinators') return [];
      if (table === 'invitations') return [];
      return [];
    });

    const token = auth.signJwt({ id: 'admin_1', role: 'admin' });
    const req = {
      method: 'POST',
      headers: { authorization: `Bearer ${token}` },
      body: {
        schoolId: 'school_1',
        recipientName: 'New Admin',
        recipientEmail: 'new-admin@school.edu',
        role: 'Admin'
      }
    };
    const res = responseMock();

    await inviteHandler(req, res);

    expect(db.insert).toHaveBeenCalledWith('coordinators', expect.objectContaining({
      email: 'new-admin@school.edu',
      role: 'Admin',
      approved: false
    }));
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
