const crypto = require('crypto');
const auth = require('../lib/auth-helper');

jest.mock('../lib/db', () => ({
  select: jest.fn(),
  update: jest.fn(),
  insert: jest.fn()
}));

const db = require('../lib/db');
const handler = require('../api/change-password');

function responseMock() {
  return {
    setHeader: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    end: jest.fn().mockReturnThis()
  };
}

describe('Authenticated password changes', () => {
  let passwordHash;
  let token;

  beforeEach(async () => {
    jest.clearAllMocks();
    passwordHash = await auth.hashPassword('CurrentPassword2026!');
    token = auth.signJwt({
      id: 'coord_admin',
      role: 'admin',
      pwh: crypto.createHash('sha256').update(passwordHash).digest('hex')
    });
    db.select.mockResolvedValue([{ id: 'coord_admin', role: 'Admin', password_hash: passwordHash }]);
    db.update.mockResolvedValue([]);
    db.insert.mockResolvedValue([]);
  });

  test('changes only the authenticated account after verifying its current password', async () => {
    const res = responseMock();
    await handler({
      method: 'POST',
      headers: { authorization: `Bearer ${token}` },
      body: { currentPassword: 'CurrentPassword2026!', newPassword: 'NewSecurePassword2026!' }
    }, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(db.update).toHaveBeenCalledWith(
      'coordinators',
      expect.objectContaining({ password_hash: expect.stringContaining(':') }),
      'id=eq.coord_admin'
    );
  });

  test('rejects an incorrect current password', async () => {
    const res = responseMock();
    await handler({
      method: 'POST',
      headers: { authorization: `Bearer ${token}` },
      body: { currentPassword: 'IncorrectPassword!', newPassword: 'NewSecurePassword2026!' }
    }, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(db.update).not.toHaveBeenCalled();
  });

  test('rejects unauthenticated and short-password requests', async () => {
    const noAuthRes = responseMock();
    await handler({ method: 'POST', headers: {}, body: {} }, noAuthRes);
    expect(noAuthRes.status).toHaveBeenCalledWith(401);

    const shortRes = responseMock();
    await handler({
      method: 'POST',
      headers: { authorization: `Bearer ${token}` },
      body: { currentPassword: 'CurrentPassword2026!', newPassword: 'short' }
    }, shortRes);
    expect(shortRes.status).toHaveBeenCalledWith(400);
    expect(db.update).not.toHaveBeenCalled();
  });
});
