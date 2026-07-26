const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadApp() {
  const saveData = jest.fn();
  const addAttempt = jest.fn(attempt => ({ id: 'attempt_fixture', ...attempt }));
  const database = {
    saveData,
    addAttempt,
    getQuestions: jest.fn(() => []),
    getUnits: jest.fn(() => []),
    getAttempts: jest.fn(() => [])
  };
  const document = {
    getElementById: jest.fn(() => null),
    querySelectorAll: jest.fn(() => []),
    querySelector: jest.fn(() => null),
    addEventListener: jest.fn(),
    body: { classList: { add: jest.fn(), remove: jest.fn(), toggle: jest.fn() } }
  };
  const window = {
    db: database,
    addEventListener: jest.fn(),
    location: { search: '', href: '' }
  };
  const context = vm.createContext({
    window,
    document,
    console,
    Date,
    Math,
    JSON,
    Set,
    Map,
    URLSearchParams,
    setTimeout,
    clearTimeout,
    confirm: jest.fn(() => true),
    fetch: jest.fn()
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8'), context);
  return { app: window.app, database, document };
}

describe('learning-record integrity', () => {
  test('does not award mastery for page views, model views, self-marking or unassessed submissions', () => {
    const { app } = loadApp();
    const mastery = app.getDemonstratedMastery([
      { type: 'lesson_view', score: '1/1' , contributesToMastery: false },
      { type: 'pseudocode', score: 'model checked' },
      { type: 'exam_transfer', score: '5/5' },
      { type: 'exam_transfer_self_check', score: 'self-check 5/5', contributesToMastery: false },
      { type: 'exam_transfer_retry', score: 'awaiting review', contributesToMastery: false }
    ]);

    expect(mastery).toEqual({
      earned: 0,
      available: 0,
      ratio: null,
      label: 'No demonstrated evidence',
      evidenceCount: 0
    });
  });

  test('uses only the latest assessed result per activity so repeat retries cannot inflate evidence count', () => {
    const { app } = loadApp();
    const mastery = app.getDemonstratedMastery([
      { questionId: 'question_01', type: 'spaced_theory', score: '0/1', date: '2026-01-01T00:00:00.000Z' },
      { questionId: 'question_01', type: 'spaced_theory', score: '1/1', date: '2026-01-02T00:00:00.000Z' },
      { questionId: 'question_01', type: 'spaced_theory', score: '1/1', date: '2026-01-03T00:00:00.000Z' }
    ]);

    expect(mastery.evidenceCount).toBe(1);
    expect(mastery.earned).toBe(1);
    expect(mastery.available).toBe(1);
  });

  test('rejects empty, placeholder and meaningless learner decisions', () => {
    const { app, database } = loadApp();
    const attempt = { id: 'attempt_fixture' };

    expect(app.isMeaningfulLearnerResponse('')).toBe(false);
    expect(app.isMeaningfulLearnerResponse('aaaaaa')).toBe(false);
    expect(app.isMeaningfulLearnerResponse('idk')).toBe(false);
    expect(app.recordQuizConfidence(attempt, '')).toBe(false);
    expect(app.recordQuizConfidence(attempt, 'anything')).toBe(false);
    expect(database.saveData).not.toHaveBeenCalled();

    expect(app.recordQuizConfidence(attempt, 'partial_before_feedback')).toBe(true);
    expect(attempt.confidence).toBe('partial_before_feedback');
    expect(database.saveData).toHaveBeenCalledTimes(1);
  });

  test('confidence cannot change attainment or completion calculations', () => {
    const { app } = loadApp();
    const attempt = {
      id: 'attempt_fixture',
      questionId: 'question_fixture',
      type: 'spaced_theory',
      score: '1/3',
      evidenceType: 'demonstrated'
    };
    const before = app.getDemonstratedMastery([attempt]);

    expect(app.recordQuizConfidence(attempt, 'secure_before_feedback')).toBe(true);

    expect(app.getDemonstratedMastery([attempt])).toEqual(before);
    expect(attempt).not.toHaveProperty('completionStatus');
  });

  test('pseudocode completion requires a meaningful submitted answer matching the required logic', () => {
    const { app } = loadApp();

    expect(app.assessPseudocodeResponse('', 'print(total)')).toBe(false);
    expect(app.assessPseudocodeResponse('anything anything', 'print(total)')).toBe(false);
    expect(app.assessPseudocodeResponse('print(total)', 'print(total)')).toBe(true);
  });

  test('opening a lesson or quiz does not create evidence and five-minute quizzes are capped', () => {
    const { app, database } = loadApp();
    database.getQuestions.mockReturnValue(Array.from({ length: 10 }, (_, index) => ({
      id: `question_${index}`,
      topicId: 'topic_fixture',
      type: 'mcq',
      question: `Synthetic question ${index}`,
      options: ['A', 'B'],
      answer: 'A'
    })));
    database.getUnits.mockReturnValue([{
      paper: 'Paper fixture',
      topics: [{ id: 'topic_fixture', name: 'Synthetic topic' }]
    }]);
    app.activeTopicId = 'topic_fixture';
    const panel = { innerHTML: '' };

    app.renderStudentRecall(panel);

    expect(app.quizQuestions).toHaveLength(3);
    expect(panel.innerHTML).toContain('about 5 minutes');
    expect(database.addAttempt).not.toHaveBeenCalled();
  });

  test('incorrect responses always retain a retry route', () => {
    const { app } = loadApp();
    const questions = [{ id: 'q1' }, { id: 'q2' }, { id: 'q3' }];

    expect(app.getRetryQuestions(questions, [true, false, false])).toEqual([
      questions[1],
      questions[2]
    ]);
  });
});
