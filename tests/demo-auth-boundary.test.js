const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadApp() {
  const storage = new Map();
  const context = {
    console: { log: jest.fn(), warn: jest.fn(), error: jest.fn() },
    crypto: require('crypto').webcrypto,
    TextEncoder,
    Uint8Array,
    URLSearchParams,
    setTimeout,
    clearTimeout,
    alert: jest.fn(),
    fetch: jest.fn(),
    localStorage: {
      getItem: key => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: key => storage.delete(key),
      key: index => [...storage.keys()][index] || null,
      get length() { return storage.size; }
    },
    sessionStorage: {
      getItem: key => storage.get(`session:${key}`) || null,
      setItem: (key, value) => storage.set(`session:${key}`, String(value))
    },
    document: {
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener: () => {},
      body: { appendChild: () => {}, classList: { add: () => {}, remove: () => {} } }
    },
    navigator: {},
    location: { origin: 'https://studyspice.co.uk', search: '', href: 'https://studyspice.co.uk/' }
  };
  context.window = context;
  context.globalThis = context;
  context.window.addEventListener = jest.fn();
  const sandbox = vm.createContext(context);
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(match => match[1].split('?')[0]);
  scripts.forEach(source => vm.runInContext(
    fs.readFileSync(path.join(__dirname, '..', source), 'utf8'),
    sandbox,
    { filename: source }
  ));
  sandbox.app.render = jest.fn();
  return sandbox;
}

describe('demo and production authentication boundary', () => {
  test('student and teacher demos never call production school discovery', async () => {
    const browser = loadApp();
    await browser.app.quickLogin('student');
    expect(browser.fetch).not.toHaveBeenCalled();
    expect(browser.app.currentUser).toEqual(expect.objectContaining({ role: 'student', isDemo: true }));

    await browser.app.quickLogin('teacher');
    expect(browser.fetch).not.toHaveBeenCalled();
    expect(browser.app.currentUser).toEqual(expect.objectContaining({ role: 'teacher', isDemo: true }));
  });

  test('a production SSO lookup failure cannot become a local demo login', async () => {
    const browser = loadApp();
    browser.fetch
      .mockResolvedValueOnce({ ok: true, json: async () => ({ mockMode: false }) })
      .mockResolvedValueOnce({ ok: false, json: async () => ({ error: 'School configuration unavailable.' }) });

    await browser.app.handleMicrosoftLogin('harriet@leicesterhigh.edu', 'ignored');

    expect(browser.app.currentUser).toBeNull();
    expect(browser.console.error).toHaveBeenCalledWith(
      'Microsoft SSO could not start:',
      'School configuration unavailable.'
    );
  });
});
