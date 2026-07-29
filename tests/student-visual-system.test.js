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
    expect(app).toContain('Your next section goal');
    expect(app).toContain('student-primary-task');
    expect(app).toContain('student-signal-strip');
    expect(app).toContain('student-earned-marks');
    expect(app).toContain('No checked work yet');
    expect(app).toContain('>Achievements</h2>');
  });

  test('connects required work to a relevant checkpoint without changing milestone state', () => {
    expect(app).toContain("activeTestPreps[0].specificationPointIds.includes(item.id)");
    expect(app).toContain('item.topicId === dominantAssignment.topicId');
    expect(app).toContain('This test preparation helps you work towards this section goal.');
    expect(app).toContain('This assignment helps you work towards this section goal.');
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

  test('carries the student system into routes without competing with the task', () => {
    expect(app).toContain('student-instruction-route');
    expect(app).toContain('Recommended learning sequence');
    expect(app).toContain('Suggested starting point');
    expect(app).toContain('student-mini-brief');
    expect(app).toContain('student-workshop-selector');
    expect(app).toContain('Simulator use is optional and does not count towards Progress.');
    expect(css).toContain('.student-instruction-route');
    expect(css).toContain('.student-start-panel');
    expect(css).toContain('.student-route-header--quiet');
    expect(css).not.toContain('var(--student-electric)');
    expect(app).toContain('student-topic-grid');
    expect(css).toContain('.student-topic-grid .topic-pill-btn');
    expect(app).not.toContain('overflow-x: auto; padding-bottom: 16px; margin-bottom: 24px;');
    expect(app).not.toContain('Revise & Assess');
    expect(app).not.toContain('Ongoing spaced practice');
  });

  test('gives literal next-step and availability information', () => {
    expect(app).toContain('Learn this section');
    expect(app).toContain("this.activeObjectiveId = objectiveId");
    expect(app).toContain('Messages monitored');
    expect(app).toContain('a reply may not be immediate');
    expect(app).not.toContain('● Online');
    expect(app).toContain("window.db.getCoordinators().find(item => item.id === studentClass?.teacherId)");
    expect(app).toContain('Teacher messaging unavailable');
    expect(app).toContain('No message was sent');
    expect(app).toContain('message.senderId === contactId');
  });

  test('keeps formative and retry language honest and useful', () => {
    expect(app).toContain('This practice does not create a score automatically; your final independent response is sent for review.');
    expect(app).toContain('Your latest result has been saved and may change the support shown in this skill.');
    expect(app).not.toContain('Your results have been logged for adaptive spaced practice scaffolding.');
    expect(app).toContain('<button class="btn btn-secondary" onclick="app.switchTab(\'stud-dashboard\')"');
    expect(app).toContain('Work through Understand, Plan, Answer, Check and Retry.');
    expect(app).toContain('teachingObjectiveIds.has(item.id)');
  });
});
