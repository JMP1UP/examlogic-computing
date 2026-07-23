const db = require('./db');

function normaliseLookup(value) {
  return String(value || '').trim().toLowerCase();
}

function domainFromEmail(value) {
  const input = normaliseLookup(value);
  const at = input.lastIndexOf('@');
  return at > 0 && at < input.length - 1 ? input.slice(at + 1) : '';
}

async function findSchool({ email, domain, slug }) {
  const cleanSlug = normaliseLookup(slug);
  if (cleanSlug) {
    const schools = await db.select('schools', `slug=eq.${encodeURIComponent(cleanSlug)}`);
    return schools[0] || null;
  }

  const cleanDomain = normaliseLookup(domain) || domainFromEmail(email);
  if (!cleanDomain) return null;
  const domains = await db.select('school_domains', `domain=eq.${encodeURIComponent(cleanDomain)}`);
  if (!domains[0]?.school_id) return null;
  const schools = await db.select('schools', `id=eq.${encodeURIComponent(domains[0].school_id)}`);
  return schools[0] || null;
}

async function publicSchoolConfiguration(lookup) {
  const school = await findSchool(lookup);
  if (!school || !['trial', 'active'].includes(school.status)) return null;

  const providers = await db.select(
    'identity_providers',
    `school_id=eq.${encodeURIComponent(school.id)}&enabled=eq.true`
  );

  return {
    school: {
      id: school.id,
      name: school.name,
      slug: school.slug,
      logoUrl: school.logo_url || null
    },
    signInMethods: providers.map(provider => ({
      provider: provider.provider,
      displayName: provider.display_name,
      clientId: provider.client_id || null,
      tenant: provider.tenant_identifier || null
    }))
  };
}

module.exports = { normaliseLookup, domainFromEmail, findSchool, publicSchoolConfiguration };

