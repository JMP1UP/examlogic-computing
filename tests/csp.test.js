const fs = require('fs');
const path = require('path');

describe('Content Security Policy deployment configuration', () => {
  const config = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'vercel.json'), 'utf8')
  );
  const headers = config.headers.flatMap(rule => rule.headers || []);
  const enforcedPolicy = headers.find(
    header => header.key.toLowerCase() === 'content-security-policy'
  );

  test('uses an enforced policy rather than report-only mode', () => {
    expect(enforcedPolicy).toBeDefined();
    expect(
      headers.some(
        header => header.key.toLowerCase() === 'content-security-policy-report-only'
      )
    ).toBe(false);
  });

  test('does not permit inline scripts', () => {
    const scriptDirective = enforcedPolicy.value
      .split(';')
      .map(directive => directive.trim())
      .find(directive => directive.startsWith('script-src '));

    expect(scriptDirective).toBeDefined();
    expect(scriptDirective).not.toContain("'unsafe-inline'");
  });

  test('retains the required framing and connection allowlists', () => {
    expect(enforcedPolicy.value).toContain("frame-src 'self' https://fairmeeting.net");
    expect(enforcedPolicy.value).toContain('wss://*.pusher.com');
    expect(enforcedPolicy.value).toContain('wss://*.pusher.com https://*.pusher.com https://fairmeeting.net');
  });

  test('allows the pinned Python runtime in a same-origin worker', () => {
    expect(enforcedPolicy.value).toContain("worker-src 'self'");
    expect(enforcedPolicy.value).toContain("script-src 'self' 'unsafe-eval' 'wasm-unsafe-eval' https://cdn.jsdelivr.net");
    expect(enforcedPolicy.value).toContain("connect-src 'self' https://cdn.jsdelivr.net");
  });
});
