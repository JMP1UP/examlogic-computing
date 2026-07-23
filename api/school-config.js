const { publicSchoolConfiguration } = require('../lib/school-discovery');

function setCors(req, res) {
  const allowed = process.env.ALLOWED_DOMAINS
    ? process.env.ALLOWED_DOMAINS.split(',').map(value => value.trim().toLowerCase())
    : ['http://localhost:3000', 'https://gcse-computer-science.vercel.app'];
  const origin = String(req.headers?.origin || '').toLowerCase();
  if (allowed.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
}

module.exports = async function handler(req, res) {
  setCors(req, res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const lookup = {
    email: req.query?.email,
    domain: req.query?.domain,
    slug: req.query?.slug
  };
  if (!lookup.email && !lookup.domain && !lookup.slug) {
    return res.status(400).json({ error: 'Enter a school email address or school code.' });
  }

  try {
    const configuration = await publicSchoolConfiguration(lookup);
    if (!configuration) {
      return res.status(404).json({
        error: 'This school is not set up yet.',
        canRegisterInterest: true
      });
    }
    return res.status(200).json(configuration);
  } catch (error) {
    console.error('School discovery failed:', error);
    return res.status(500).json({ error: 'Unable to look up the school right now.' });
  }
};

