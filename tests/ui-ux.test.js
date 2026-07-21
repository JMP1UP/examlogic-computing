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
    expect(html).toContain('style.css?v=1.5.5');
    expect(html).toContain('app.js?v=1.5.5');
  });

  test('mobile navigation is collapsible and keyboard dismissible', () => {
    expect(html).toContain('id="mobile-nav-toggle"');
    expect(html).toContain('aria-controls="app-role-navigation"');
    expect(html).toContain('aria-expanded="false"');
    expect(app).toContain("event.key === 'Escape'");
    expect(app).toContain("activeNav.classList.add('active-role-nav')");
    expect(css).toContain('.sidebar:not(.mobile-nav-open) .nav-links.active-role-nav');
  });

  test('student safeguarding report actions remain touch accessible', () => {
    expect(app).toContain('safeguarding-report-btn');
    expect(css).toMatch(/@media \(max-width: 768px\)[\s\S]*?\.safeguarding-report-btn[\s\S]*?min-height: 44px;/);
  });
});
