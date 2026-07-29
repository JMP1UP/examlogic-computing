const fs = require('fs');
const path = require('path');

const css = fs.readFileSync(path.join(__dirname, '..', 'style.css'), 'utf8');
const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const relativeLuminance = hex => {
  const channels = hex.slice(1).match(/../g).map(value => parseInt(value, 16) / 255);
  const linear = channels.map(value => value <= 0.04045
    ? value / 12.92
    : ((value + 0.055) / 1.055) ** 2.4);
  return (0.2126 * linear[0]) + (0.7152 * linear[1]) + (0.0722 * linear[2]);
};

const contrastRatio = (foreground, background) => {
  const first = relativeLuminance(foreground);
  const second = relativeLuminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
};

describe('cross-page text readability', () => {
  test.each([
    ['light teal text', '#1B6E66', '#FFFFFF'],
    ['primary button text', '#FFFFFF', '#1B6E66'],
    ['light amber text', '#78350F', '#FFFFFF'],
    ['light green text', '#047857', '#FFFFFF'],
    ['light coral text', '#9A3412', '#FFFFFF'],
    ['light red text', '#B91C1C', '#FFFFFF'],
    ['muted text on warm white', '#5F6F86', '#FAF8F2'],
    ['dark teal text', '#6EE7D8', '#18233F'],
    ['dark amber text', '#FCD34D', '#18233F'],
    ['dark green text', '#6EE7B7', '#18233F'],
    ['dark coral text', '#FDBA74', '#18233F'],
    ['dark red text', '#FCA5A5', '#18233F']
  ])('%s meets WCAG AA for normal text', (_label, foreground, background) => {
    expect(contrastRatio(foreground, background)).toBeGreaterThanOrEqual(4.5);
  });

  test('the examiner warning uses a foreground token rather than the pale fill token', () => {
    expect(app).toContain('color: var(--amber-text)');
    expect(app).not.toContain('color: var(--amber-alert');
  });

  test('all application surfaces receive the small-text readability guard', () => {
    ['8', '9', '10', '11', '12'].forEach(size => {
      expect(css).toContain(`[style*="font-size: ${size}px"]`);
      expect(css).toContain(`[style*="font-size:${size}px"]`);
    });
    expect(css).toMatch(/\[style\*="font-size:12px"\][\s\S]*?font-size: 13px !important;/);
    expect(css).toContain('.btn-sm');
    expect(css).toMatch(/\.btn-sm\s*\{[\s\S]*?font-size: 14px;/);
    expect(css).toMatch(/\.badge\s*\{[\s\S]*?font-size: 13px;/);
    expect(css).toContain('.sidebar .btn-destructive');
    expect(css).toContain('color: #6EE7D8 !important');
  });

  test('the global readability stylesheet is loaded by public and authenticated views', () => {
    expect(html).toMatch(/href="style\.css\?v=[^"]+"/);
    expect(html).toContain('id="login-screen"');
    expect(html).toContain('id="app-shell"');
  });

  test('interactive routes expose current state, focus handling and result announcements', () => {
    expect(app).toContain('aria-current="page"');
    expect(app).toContain('focusMainContent(selector');
    expect(app).toContain('id="quiz-result-summary" role="status" aria-live="polite" aria-atomic="true"');
    expect(app).toContain('for="try-input-${item.id}"');
    expect(app).toMatch(/renderStudentPractise\(document\.getElementById\('main-panel'\)\);\s*this\.focusMainContent\(\);/);
    expect(app).toMatch(/renderStudentRecall\(document\.getElementById\('main-panel'\)\);\s*this\.focusMainContent\(\);/);
  });

  test('all generated table column headers declare their scope', () => {
    expect(app).not.toMatch(/<th\b(?![^>]*\bscope="col")/);
    expect(app).toContain('<th scope="col"');
  });

  test('missing-content states are announced and provide named recovery actions', () => {
    [
      'Learning content unavailable',
      'Objective teaching unavailable',
      'Recall questions unavailable',
      'Challenge not found',
      'Screen not found'
    ].forEach(heading => expect(app).toContain(heading));
    ['Back to Home', 'Back to Learn', 'Back to Programming'].forEach(action =>
      expect(app).toContain(action)
    );
  });

  test('narrow layouts and reduced-motion preferences have explicit safeguards', () => {
    expect(css).toContain('#main-panel [style*="grid-template-columns"]');
    expect(css).toContain('.binary-bit-grid');
    expect(css).toContain('grid-template-columns: repeat(4, minmax(44px, 1fr)) !important');
    expect(css).toContain('.quiz-confidence-options');
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
    expect(css).toContain('transition-duration: 0.01ms !important');
    expect(css).toContain('transform: none !important');
  });

  test('the stylesheet has balanced rule and media braces', () => {
    expect((css.match(/{/g) || []).length).toBe((css.match(/}/g) || []).length);
  });

  test('scrollable tables are promoted to named keyboard regions after render', () => {
    expect(app).toContain("container.setAttribute('tabindex', '0')");
    expect(app).toContain("container.setAttribute('role', 'region')");
    expect(app).toContain('Scrollable data table');
    expect(app).toContain('class="table-container" tabindex="0" role="region" aria-label="Exam Reference Language syntax table"');
  });
});
