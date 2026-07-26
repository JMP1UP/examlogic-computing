const fs = require('fs');
const path = require('path');
const vm = require('vm');
const cleanNewLearner = require('./fixtures/clean-new-learner');

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
      evidenceCount: 0,
      legacyEvidenceCount: 0
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
    expect(mastery.legacyEvidenceCount).toBe(1);
  });

  test('keeps the full original denominator when a missed quiz question is retried correctly', () => {
    const { app } = loadApp();
    const questions = [{ id: 'q1' }, { id: 'q2' }, { id: 'q3' }];
    const evidenceSet = app.createEvidenceSet('spaced_theory', 'topic_fixture', questions);
    evidenceSet.latestOutcomes = { q1: true, q2: true, q3: false };
    const original = {
      ...app.buildQuestionLevelAttempt(evidenceSet, 'original'),
      type: 'spaced_theory',
      topic: 'topic_fixture',
      date: '2026-01-01T00:00:00.000Z'
    };
    evidenceSet.latestOutcomes.q3 = true;
    const retry = {
      ...app.buildQuestionLevelAttempt(evidenceSet, 'retry'),
      type: 'spaced_theory',
      topic: 'topic_fixture',
      date: '2026-01-02T00:00:00.000Z'
    };

    expect(original.score).toBe('2/3');
    expect(retry.score).toBe('3/3');
    expect(retry.originalDenominator).toBe(3);
    expect(retry.originalQuestionIds).toEqual(['q1', 'q2', 'q3']);
    expect(app.getDemonstratedMastery([original, retry])).toMatchObject({
      earned: 3,
      available: 3,
      evidenceCount: 1,
      legacyEvidenceCount: 0
    });
  });

  test('an incorrect partial retry preserves prior outcomes and does not create another activity', () => {
    const { app } = loadApp();
    const evidenceSet = app.createEvidenceSet('spaced_theory', 'topic_fixture', [{ id: 'q1' }, { id: 'q2' }, { id: 'q3' }]);
    evidenceSet.latestOutcomes = { q1: true, q2: true, q3: false };
    const original = { ...app.buildQuestionLevelAttempt(evidenceSet, 'original'), type: 'spaced_theory', date: '2026-01-01' };
    evidenceSet.latestOutcomes.q3 = false;
    const retryOne = { ...app.buildQuestionLevelAttempt(evidenceSet, 'retry'), type: 'spaced_theory', date: '2026-01-02' };
    const retryTwo = { ...app.buildQuestionLevelAttempt(evidenceSet, 'retry'), type: 'spaced_theory', date: '2026-01-03' };
    const mastery = app.getDemonstratedMastery([original, retryOne, retryTwo]);

    expect(retryOne.score).toBe('2/3');
    expect(retryOne.questionEvidence).toEqual([
      { questionId: 'q1', correct: true },
      { questionId: 'q2', correct: true },
      { questionId: 'q3', correct: false }
    ]);
    expect(mastery).toMatchObject({ earned: 2, available: 3, evidenceCount: 1 });
  });

  test('adaptive support also deduplicates retries from the same activity', () => {
    const { app, database } = loadApp();
    app.currentUser = { id: 'student_fixture' };
    database.getAttempts.mockReturnValue([
      { studentId: 'student_fixture', activityId: 'activity_one', evidenceVersion: 2, type: 'number_skills', topic: 'binary conversions', score: '0/3', date: '2026-01-01' },
      { studentId: 'student_fixture', activityId: 'activity_one', evidenceVersion: 2, type: 'number_skills', topic: 'binary conversions', score: '3/3', date: '2026-01-02' },
      { studentId: 'student_fixture', activityId: 'activity_two', evidenceVersion: 2, type: 'number_skills', topic: 'binary conversions', score: '0/3', date: '2026-01-03' }
    ]);

    expect(app.getLatestDemonstratedAttempts(database.getAttempts())).toHaveLength(2);
    expect(app.getAdaptiveSupportLevel('binary conversions')).toBe('Supported');
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

  test.each([
    'processor register address instruction',
    'register register register address address',
    'Which register stores the address of the next instruction?',
    'meaningless processor register address words'
  ])('definition keyword coverage remains formative and cannot create mastery: %s', response => {
    const { app } = loadApp();
    const attempt = {
      type: 'definition_test',
      topic: 'mixed key terms',
      score: '10/10',
      response,
      evidenceType: 'formative',
      contributesToMastery: false
    };

    expect(app.parseDemonstratedScore(attempt)).toBeNull();
    expect(app.getDemonstratedMastery([attempt])).toMatchObject({
      earned: 0,
      available: 0,
      evidenceCount: 0
    });
  });

  test('clean release learner starts without evidence or badges', () => {
    const { app } = loadApp();
    const mastery = app.getDemonstratedMastery(cleanNewLearner.attempts);

    expect(cleanNewLearner.learner.achievements).toEqual([]);
    expect(mastery).toMatchObject({
      ratio: null,
      evidenceCount: 0,
      legacyEvidenceCount: 0
    });
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
