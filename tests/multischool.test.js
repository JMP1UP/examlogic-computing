const crypto = require('crypto');
const db = require('../lib/db');
const auth = require('../lib/auth-helper');
const discovery = require('../lib/school-discovery');
const schoolConfigHandler = require('../api/school-config');

jest.mock('../lib/db', () => ({
  select: jest.fn()
}));

function responseMock() {
  return {
    setHeader: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    end: jest.fn()
  };
}

describe('multi-school tenant foundation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'multi-school-test-secret';
  });

  test('discovers a school from a pupil email without returning secrets', async () => {
    db.select.mockImplementation(async (table) => {
      if (table === 'school_domains') return [{ school_id: 'school_1' }];
      if (table === 'schools') return [{
        id: 'school_1', name: 'Leicester High School', slug: 'leicester-high',
        status: 'active', logo_url: '/logo.svg'
      }];
      if (table === 'identity_providers') return [{
        provider: 'microsoft',
        display_name: 'School Microsoft account',
        client_id: 'public-client-id',
        tenant_identifier: 'tenant-id',
        secret_reference: 'MICROSOFT_SECRET_SCHOOL_1'
      }];
      return [];
    });

    const config = await discovery.publicSchoolConfiguration({ email: 'student@leicesterhigh.co.uk' });
    expect(config.school.slug).toBe('leicester-high');
    expect(config.signInMethods).toEqual([expect.objectContaining({ provider: 'microsoft' })]);
    expect(JSON.stringify(config)).not.toContain('MICROSOFT_SECRET');
  });

  test('rejects a validly signed session when its school claim does not match the user', async () => {
    const passwordHash = 'stored-hash';
    db.select.mockResolvedValue([{
      id: 'student_1',
      school_id: 'school_b',
      active: true,
      password_hash: passwordHash
    }]);
    const decoded = {
      id: 'student_1',
      role: 'student',
      schoolId: 'school_a',
      pwh: crypto.createHash('sha256').update(passwordHash).digest('hex')
    };
    await expect(auth.validateSessionDb(decoded)).resolves.toBeNull();
  });

  test('gives prospective schools a safe registration route', async () => {
    db.select.mockResolvedValue([]);
    const req = {
      method: 'GET',
      headers: {},
      query: { email: 'teacher@newschool.org' }
    };
    const res = responseMock();
    await schoolConfigHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      canRegisterInterest: true
    }));
  });
});

