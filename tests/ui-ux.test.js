const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, '..', 'style.css'), 'utf8');

describe('User experience regression checks', () => {
  test('sign-in exposes progress feedback and prevents duplicate submissions', () => {
    expect(html).toContain('id="login-submit-btn"');
    expect(html).toContain('id="login-status"');
    expect(html).toContain('role="status"');
    expect(html).toContain('aria-live="polite"');
    expect(app).toContain("submitBtn.setAttribute('aria-busy', 'true')");
    expect(app).toContain('if (submitBtn?.disabled) return;');
  });

  test('successful modal sign-in releases the dashboard interaction guard', () => {
    expect(app).toContain("this.closeModal('login-modal')");
    expect(app).toContain("loginModal.style.display = 'none'");
  });

  test('dynamic action cards receive keyboard semantics', () => {
    expect(app).toContain("root.querySelectorAll('[data-action]')");
    expect(app).toContain("element.setAttribute('tabindex', '0')");
    expect(app).toContain("element.setAttribute('role', 'button')");
    expect(app).toContain('new MutationObserver');
  });

  test('mobile interactive targets have a 44 pixel minimum height', () => {
    expect(css).toMatch(/@media \(max-width: 768px\)[\s\S]*?\.top-actions button,[\s\S]*?min-height: 44px;/);
  });

  test('updated interface assets use the current cache-busting release', () => {
    expect(html).toContain('style.css?v=1.6.13');
    expect(html).toContain('database.js?v=1.6.13');
    expect(html).toContain('app.js?v=1.6.13');
  });

  test('mobile navigation is collapsible and keyboard dismissible', () => {
    expect(html).toContain('id="mobile-nav-toggle"');
    expect(html).toContain('aria-controls="app-role-navigation"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('aria-label="Open navigation menu"');
    expect(app).toContain("event.key === 'Escape'");
    expect(app).toContain("sidebar?.classList.toggle('mobile-nav-open')");
    expect(app).toContain('this.closeMobileNav(); this.switchTab(link.id)');
    expect(app).toContain("activeNav.classList.add('active-role-nav')");
    expect(css).toMatch(/@media \(max-width: 768px\)[\s\S]*?\.mobile-nav-toggle[\s\S]*?display: inline-flex/);
    expect(css).toContain('.sidebar:not(.mobile-nav-open) .nav-links.active-role-nav');
    expect(css).toContain('.sidebar.mobile-nav-open .nav-links.active-role-nav');
  });

  test('sign-in dialog has semantics, focus containment and focus restoration', () => {
    expect(html).toContain('role="dialog"');
    expect(html).toContain('aria-modal="true"');
    expect(html).toContain('aria-labelledby="microsoft-auth-title"');
    expect(html).toContain('aria-label="Close sign-in dialog"');
    expect(app).toContain("const activeModal = document.querySelector('.modal-overlay.active[role=\"dialog\"]')");
    expect(app).toContain('this.modalReturnFocus = document.activeElement');
    expect(app).toContain('this.modalReturnFocus.focus()');
  });

  test('keyboard users can skip repeated navigation', () => {
    expect(html).toContain('id="skip-link"');
    expect(html).toContain('href="#login-screen"');
    expect(html).toContain('id="main-panel" tabindex="-1"');
    expect(app).toContain("skipLink.setAttribute('href', '#main-panel')");
    expect(css).toContain('.skip-link:focus');
  });

  test('programming controls have persistent accessible names', () => {
    expect(app).toContain('<label for="predict-input"');
    expect(app).toContain('<label class="sr-only" for="python-editor">Python code editor</label>');
    expect(app).toContain('<label for="coding-explanation-response"');
    expect(app).toContain('aria-label="Start ${index === 0');
  });

  test('programming support preserves structured evidence and gates reflection on success', () => {
    expect(app).toContain('this.activeSupportFeedback[step] = text');
    expect(app).not.toContain('this.activeSupportFeedback = text;');
    expect(app).toContain('const allProgrammingTestsPassed');
    expect(app).toContain('${allProgrammingTestsPassed ? `');
    expect(app).toContain('Python runtime: previous test results preserved');
  });

  test('student safeguarding report actions remain touch accessible', () => {
    expect(app).toContain('safeguarding-report-btn');
    expect(css).toMatch(/@media \(max-width: 768px\)[\s\S]*?\.safeguarding-report-btn[\s\S]*?min-height: 44px;/);
  });

  test('offers a clean learner demo and keeps code workspaces readable and responsive', () => {
    expect(html).toContain('id="hero-demo-clean-student-btn"');
    expect(html).toContain('id="demo-clean-student-btn"');
    expect(app).toContain("quickLogin('clean-student')");
    expect(css).toMatch(/pre,\s*code,\s*\.code-input/);
    expect(css).toContain('.pseudocode-workspace');
    expect(css).toMatch(/@media \(max-width: 768px\)[\s\S]*?\.pseudocode-workspace\s*\{[\s\S]*?grid-template-columns: 1fr;/);
    expect(css).toContain(':focus-visible');
  });

  test('uses accessible foreground accents and guards against unreadably small interface text', () => {
    expect(css).toContain('--teal-text: #1B6E66');
    expect(css).toContain('--amber-text: #78350F');
    expect(css).toContain('--red-text: #B91C1C');
    expect(css).toContain('[style*="font-size: 9px"]');
    expect(css).toMatch(/\[style\*="font-size:12px"\][\s\S]*?font-size: 13px !important;/);
    expect(css).toMatch(/body\.dark-mode[\s\S]*?--amber-text: #FCD34D/);
    expect(app).not.toContain('color: var(--amber-alert');
    expect(app).toContain('color: var(--amber-text)');
  });
});
