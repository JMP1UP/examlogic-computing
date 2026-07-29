const fs = require('fs');
const path = require('path');

const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, '..', 'style.css'), 'utf8');

describe('student Signal / Paste visual system', () => {
  test('scopes the visual direction to the authenticated role', () => {
    expect(app).toContain("appShell.setAttribute('data-user-role', this.currentUser.role)");
    expect(app).toContain("appShell.removeAttribute('data-user-role')");
    expect(css).toContain('.app-container[data-user-role="student"]');
    expect(css).not.toContain('.app-container[data-user-role="teacher"]');
  });

  test('uses student-facing dashboard language without weakening evidence wording', () => {
    expect(app).toContain('Latest checked work:');
    expect(app).toContain('Work that counts');
    expect(app).toContain('checked ${demonstratedProgress.evidenceCount === 1');
    expect(app).toContain('Your next checkpoint');
    expect(app).toContain('Your study plan');
    expect(app).toContain('Based on completed checks.');
    expect(app).toContain('minutes required this week');
    expect(app).toContain('Optional quick recall: up to 5 minutes.');
  });

  test('connects required work to a relevant checkpoint without changing milestone state', () => {
    expect(app).toContain("activeTestPreps[0].specificationPointIds.includes(item.id)");
    expect(app).toContain('item.topicId === dominantAssignment.topicId');
    expect(app).toContain('This test preparation builds towards this checkpoint.');
    expect(app).toContain('This assignment builds towards this checkpoint.');
    expect(app).not.toContain('id="milestone-next-btn"');
  });

  test('keeps decorative styling non-essential and accessible', () => {
    expect(css).toContain('@media (forced-colors: active)');
    expect(css).toContain('body.dark-mode .app-container[data-user-role="student"]');
    expect(css).toContain('@media (max-width: 480px)');
    expect(css).toContain('pointer-events: none');
    expect(css).toContain('font-size: 13px !important');
    expect(css).not.toMatch(/glitch|flicker|animation:\s*scan/i);
  });
});
