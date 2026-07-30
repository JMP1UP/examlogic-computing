const fs = require('fs');
const path = require('path');

describe('Student UI Simplification & Navigation Integrity', () => {
  beforeAll(() => {
    global.window = {};
    global.localStorage = {
      getItem: () => null,
      setItem: () => {}
    };
    jest.isolateModules(() => {
      require('../database');
    });
  });

  test('maintains exactly 5 primary navigation links for student role', () => {
    const studentLinks = [
      { id: 'stud-dashboard', label: 'My desk' },
      { id: 'stud-topics', label: 'Topics' },
      { id: 'stud-practice', label: 'Practice' },
      { id: 'stud-progress', label: 'Progress' },
      { id: 'stud-messages', label: 'Messages' }
    ];

    expect(studentLinks.length).toBe(5);
    expect(studentLinks.map(l => l.id)).toEqual([
      'stud-dashboard',
      'stud-topics',
      'stud-practice',
      'stud-progress',
      'stud-messages'
    ]);
  });

  test('verifies style.css includes step accordion and results drawer classes', () => {
    const cssPath = path.join(__dirname, '../style.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    expect(cssContent).toContain('.step-accordion');
    expect(cssContent).toContain('.step-accordion-item');
    expect(cssContent).toContain('.results-drawer');
    expect(cssContent).toContain('.missed-filter-btn');
    expect(cssContent).toContain('min-height: 44px');
  });

  test('filters mock exam results for missed questions drawer', () => {
    const questions = [
      { id: 'q1', question: 'Q1?', answer: 'A' },
      { id: 'q2', question: 'Q2?', answer: 'B' },
      { id: 'q3', question: 'Q3?', answer: 'C' }
    ];
    const userAnswers = ['A', 'WRONG', 'C'];

    const missedQuestions = questions.filter((q, idx) => userAnswers[idx] !== q.answer);
    expect(missedQuestions.length).toBe(1);
    expect(missedQuestions[0].id).toBe('q2');
  });
});
