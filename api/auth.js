// Consolidated authentication entry point.
// Vercel rewrites preserve the existing public endpoint URLs while keeping
// password login and session validation in a single serverless function.

const login = require('../lib/auth-routes/login');
const validateSession = require('../lib/auth-routes/validate-session');

const handlers = {
  login,
  'validate-session': validateSession
};

module.exports = async function handler(req, res) {
  const action = req.query && req.query.action;
  const actionHandler = handlers[action];

  if (!actionHandler) {
    return res.status(404).json({ error: 'Authentication action not found' });
  }

  return actionHandler(req, res);
};
