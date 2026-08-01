const fs = require('fs');
const path = require('path');

describe('Quiet Desk student dashboard', () => {
  const app = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');
  const css = fs.readFileSync(path.join(__dirname, '../style.css'), 'utf8');

  test('puts the weekly plan before calendar and flashcards', () => {
    const surface = app.slice(app.indexOf('<div class="student-desk-surface">'));

    expect(surface.indexOf('${weeklyRhythmHtml}')).toBeLessThan(surface.indexOf('${upcomingDatesHtml}'));
    expect(surface.indexOf('${upcomingDatesHtml}')).toBeLessThan(surface.indexOf('${myDeckHtml}'));
  });

  test('keeps the visual treatment scoped to student pages', () => {
    expect(css).toContain('.app-container[data-user-role="student"] .student-desk-surface');
    expect(css).not.toContain('.app-container[data-user-role="teacher"] .student-desk-surface');
  });

  test('supports dark, narrow and forced-colour displays', () => {
    expect(css).toContain('--desk-surface-start: #111B26');
    expect(css).toContain('@media (max-width: 520px)');
    expect(css).toContain('.student-desk-surface { margin-inline: 0;');
    expect(css).toContain('@media (forced-colors: active)');
    expect(css).toContain('.student-calendar-date');
    expect(css).toContain('background: Canvas;');
  });

  test('keeps the flashcard action large enough to operate', () => {
    const actionRule = css.slice(css.indexOf('.student-deck-card .deck-topic-review-btn'));
    expect(actionRule.slice(0, 180)).toContain('min-height: 44px');
  });
});
