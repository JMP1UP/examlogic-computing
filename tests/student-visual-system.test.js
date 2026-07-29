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
    expect(app).toContain('Work that counts');
    expect(app).toContain('Latest checked work');
    expect(app).toContain('Connected checkpoint');
    expect(app).toContain('student-primary-task');
    expect(app).toContain('student-signal-strip');
    expect(app).toContain('student-earned-marks');
    expect(app).toContain('No checked work yet');
    expect(app).toContain('>Achievements</h2>');
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
    expect(css).toContain('.student-primary-task__action');
    expect(css).toContain('.student-checkpoint-route');
    expect(css).toContain('.student-brief__motif');
    expect(css).toContain('--student-earned-bg: #175C56');
    expect(css).toMatch(/#student-profile-dropdown\s*\{[\s\S]*?visibility: hidden/);
    expect(css).toMatch(/#student-profile-dropdown\.show-dropdown\s*\{[\s\S]*?visibility: visible/);
    expect(css).not.toMatch(/glitch|flicker|animation:\s*scan/i);
  });

  test('exposes checkpoint and profile state without relying on colour', () => {
    expect(app).toContain('aria-current="step"');
    expect(app).toContain('<span class="sr-only"> completed</span>');
    expect(app).toContain('aria-controls="student-profile-dropdown"');
    expect(app).toContain("event.key !== 'Escape'");
    expect(css).toContain('.student-checkpoint-route .is-current');
  });
});
