const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadApplication() {
  const storage = new Map();
  const context = {
    console,
    crypto: require('crypto').webcrypto,
    TextEncoder,
    Uint8Array,
    URLSearchParams,
    setTimeout,
    clearTimeout,
    alert: jest.fn(),
    confirm: jest.fn(() => true),
    fetch: jest.fn().mockRejectedValue(new Error('API offline')),
    localStorage: {
      getItem: key => storage.has(key) ? storage.get(key) : null,
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: key => storage.delete(key)
    },
    sessionStorage: {
      getItem: key => storage.has(`session:${key}`) ? storage.get(`session:${key}`) : null,
      setItem: (key, value) => storage.set(`session:${key}`, String(value))
    },
    document: {
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener: () => {},
      body: { appendChild: () => {}, classList: { add: () => {}, remove: () => {}, toggle: () => {} } }
    },
    navigator: {},
    location: { origin: 'http://localhost', search: '', href: 'http://localhost/' }
  };
  context.window = context;
  context.globalThis = context;
  context.window.addEventListener = jest.fn();
  const vmContext = vm.createContext(context);
  ['curriculum-content.js', 'priority-assessments.js', 'database.js', 'app.js'].forEach(source => {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '..', source), 'utf8'), vmContext, { filename: source });
  });
  context.app.currentUser = context.db.getStudents()[0];
  context.db.cachedData.attempts = [];
  context.db.cachedData.programmingSubmissions = [];
  return context;
}

function assessedAttempt({
  id,
  activityId,
  questionIds,
  outcomes,
  questionMetadata = {},
  checkpointRuleVersions = {},
  date = '2026-07-29T09:00:00.000Z'
}) {
  const earned = outcomes.filter(Boolean).length;
  return {
    id,
    studentId: 'stud_1',
    type: 'spaced_theory',
    evidenceType: 'demonstrated',
    evidenceVersion: 2,
    contributesToMastery: true,
    completionStatus: 'completed',
    activityId,
    attemptSetId: `${activityId}:set`,
    originalQuestionIds: questionIds,
    originalDenominator: questionIds.length,
    questionEvidence: questionIds.map((questionId, index) => ({
      questionId,
      specificationPointId: questionMetadata[questionId]?.specificationPointId || null,
      assessmentFocus: questionMetadata[questionId]?.assessmentFocus || null,
      correct: outcomes[index]
    })),
    checkpointRuleVersions,
    score: `${earned}/${questionIds.length}`,
    date
  };
}

function createPanel() {
  return {
    innerHTML: '',
    querySelector: () => null,
    querySelectorAll: () => []
  };
}

function cleanLearner() {
  return {
    id: 'student_release_fixture',
    name: 'New Learner',
    email: 'new-learner@example.invalid',
    role: 'student',
    yearGroup: 'New starter',
    achievements: [],
    personalRevisionPriorities: [],
    isDemo: true,
    isCleanDemo: true
  };
}

function metadataFor(questions) {
  return Object.fromEntries(questions.map(question => [question.id, {
    specificationPointId: question.specificationPointId,
    assessmentFocus: question.assessmentFocus
  }]));
}

describe('evidence-backed section milestones', () => {
  test('labels and excludes checkpoints that lack enough mapped questions to be secured', () => {
    const { app } = loadApplication();
    const unavailable = app.getSectionMilestones('stud_1')
      .filter(item => !item.available)
      .map(item => item.id);

    expect(unavailable).toEqual(['1.2.4c', '1.5.2', '2.1.1', '2.2.2', '2.2.PY']);
  });

  test('starts every curriculum section without inherited evidence', () => {
    const { app } = loadApplication();
    const milestones = app.getSectionMilestones('stud_1');

    expect(milestones).toHaveLength(32);
    expect(milestones.filter(item => item.available)).toHaveLength(27);
    expect(milestones.filter(item => item.available).every(item => item.state === 'not_started')).toBe(true);
    expect(milestones.filter(item => !item.available).every(item => item.state === 'not_available')).toBe(true);
  });

  test('gives a clean learner one guided primary action without a competing milestone button', () => {
    const { app, db } = loadApplication();
    app.currentUser = cleanLearner();
    const panel = createPanel();

    app.renderStudentDashboard(panel);

    expect(panel.innerHTML).toContain('Start guided learning');
    expect(panel.innerHTML).toContain('0 of 27 available checkpoints');
    expect(panel.innerHTML).not.toContain('milestone-next-btn');
    expect(panel.innerHTML).not.toContain('last practised conversions three weeks ago');
  });

  test('keeps every curriculum section visible while clearly excluding unavailable checkpoints', () => {
    const { app, db } = loadApplication();
    app.currentUser = cleanLearner();
    const panel = createPanel();

    app.renderStudentProgress(panel);

    expect(panel.innerHTML).toContain('0 of 27 available section checkpoints');
    expect(panel.innerHTML).toContain('5 curriculum sections are shown below but excluded');
    expect((panel.innerHTML.match(/milestone-list-row/g) || [])).toHaveLength(32);
    expect((panel.innerHTML.match(/Checkpoint unavailable/g) || [])).toHaveLength(5);
  });

  test('ignores page views, formative checks, awaiting-review work and reduced-precision history', () => {
    const { app, db } = loadApplication();
    db.cachedData.attempts.push(
      { id: 'view', studentId: 'stud_1', type: 'lesson_view', score: '1/1', contributesToMastery: false },
      { id: 'definition', studentId: 'stud_1', type: 'definition_test', score: '1/1', evidenceType: 'formative', contributesToMastery: false },
      { id: 'review', studentId: 'stud_1', type: 'pseudocode_review', score: 'awaiting review', completionStatus: 'awaiting_review', contributesToMastery: false },
      { id: 'legacy', studentId: 'stud_1', type: 'spaced_theory', score: '3/3', evidenceType: 'demonstrated', contributesToMastery: true }
    );

    expect(app.getSectionMilestones('stud_1').filter(item => item.available).every(item => item.state === 'not_started')).toBe(true);
  });

  test('uses the latest activity evidence and never turns a one-question retry into a standalone checkpoint', () => {
    const { app, db } = loadApplication();
    const questions = db.getQuestions().filter(question => question.specificationPointId === '2.2.3').slice(0, 3);
    expect(questions).toHaveLength(3);
    const questionIds = questions.map(question => question.id);
    const questionMetadata = metadataFor(questions);
    db.cachedData.attempts.push(
      assessedAttempt({ id: 'original', activityId: 'activity-one', questionIds, outcomes: [true, true, false], questionMetadata, checkpointRuleVersions: { '2.2.3': 1 } }),
      assessedAttempt({ id: 'retry', activityId: 'activity-one', questionIds, outcomes: [true, true, true], questionMetadata, checkpointRuleVersions: { '2.2.3': 1 }, date: '2026-07-29T10:00:00.000Z' })
    );

    const milestone = app.getSectionMilestones('stud_1').find(item => item.id === '2.2.3');
    expect(milestone).toMatchObject({
      state: 'practice_completed',
      evidenceSourceCount: 1,
      attemptedQuestionCount: 3,
      correctQuestionCount: 3
    });
  });

  test('shows assessed practice without claiming a checkpoint when evidence is weak', () => {
    const { app, db } = loadApplication();
    const questions = db.getQuestions().filter(question => question.specificationPointId === '2.2.3').slice(0, 3);
    const questionIds = questions.map(question => question.id);
    db.cachedData.attempts.push(
      assessedAttempt({ id: 'partial', activityId: 'activity-partial', questionIds, outcomes: [true, false, false], questionMetadata: metadataFor(questions), checkpointRuleVersions: { '2.2.3': 1 } })
    );

    expect(app.getSectionMilestones('stud_1').find(item => item.id === '2.2.3')).toMatchObject({
      state: 'practice_completed',
      evidenceSourceCount: 1,
      attemptedQuestionCount: 3,
      correctQuestionCount: 1
    });
  });

  test('does not multiply evidence when the same activity is retried repeatedly', () => {
    const { app, db } = loadApplication();
    const questions = db.getQuestions()
      .filter(question => question.specificationPointId === '2.2.3')
      .slice(0, 3);
    const questionIds = questions.map(question => question.id);
    const questionMetadata = metadataFor(questions);
    db.cachedData.attempts.push(
      assessedAttempt({ id: 'first', activityId: 'one-activity', questionIds, outcomes: [true, true, false], questionMetadata, checkpointRuleVersions: { '2.2.3': 1 } }),
      assessedAttempt({ id: 'second', activityId: 'one-activity', questionIds, outcomes: [true, false, true], questionMetadata, checkpointRuleVersions: { '2.2.3': 1 }, date: '2026-07-29T10:00:00.000Z' }),
      assessedAttempt({ id: 'third', activityId: 'one-activity', questionIds, outcomes: [true, true, false], questionMetadata, checkpointRuleVersions: { '2.2.3': 1 }, date: '2026-07-29T11:00:00.000Z' })
    );

    expect(app.getSectionMilestones('stud_1').find(item => item.id === '2.2.3')).toMatchObject({
      state: 'practice_completed',
      evidenceSourceCount: 1,
      attemptedQuestionCount: 3,
      correctQuestionCount: 2
    });
  });

  test('uses the newest outcome when separate activities contain the same questions', () => {
    const { app, db } = loadApplication();
    const questions = db.getQuestions()
      .filter(question => question.specificationPointId === '2.2.3')
      .slice(0, 3);
    const questionIds = questions.map(question => question.id);
    const questionMetadata = metadataFor(questions);
    db.cachedData.attempts.push(
      assessedAttempt({ id: 'newer', activityId: 'newer-activity', questionIds, outcomes: [false, true, true], questionMetadata, checkpointRuleVersions: { '2.2.3': 1 }, date: '2026-07-29T11:00:00.000Z' }),
      assessedAttempt({ id: 'older', activityId: 'older-activity', questionIds, outcomes: [true, true, true], questionMetadata, checkpointRuleVersions: { '2.2.3': 1 }, date: '2026-07-29T09:00:00.000Z' })
    );

    expect(app.getSectionMilestones('stud_1').find(item => item.id === '2.2.3')).toMatchObject({
      state: 'practice_completed',
      evidenceSourceCount: 2,
      correctQuestionCount: 2
    });
  });

  test('does not mistake duplicate-concept question IDs for checkpoint breadth', () => {
    const { app, db } = loadApplication();
    const questions = ['diagnostic_1_1_1', 'q_1_1_b', 'q_1']
      .map(id => db.getQuestions().find(question => question.id === id));
    const questionIds = questions.map(question => question.id);
    db.cachedData.attempts.push(assessedAttempt({
      id: 'same-focus',
      activityId: 'same-focus-activity',
      questionIds,
      outcomes: [true, true, true],
      questionMetadata: metadataFor(questions),
      checkpointRuleVersions: { '1.1.1': 1 }
    }));

    expect(app.getSectionMilestones('stud_1').find(item => item.id === '1.1.1')).toMatchObject({
      state: 'practice_completed',
      demonstratedFocuses: ['register-and-fetch-roles']
    });
  });

  test('secures a checkpoint only after every versioned required focus is demonstrated', () => {
    const { app, db } = loadApplication();
    const questions = ['q_1_1_cpu_purpose', 'diagnostic_1_1_1', 'q_1_1_a']
      .map(id => db.getQuestions().find(question => question.id === id));
    const questionIds = questions.map(question => question.id);
    db.cachedData.attempts.push(assessedAttempt({
      id: 'breadth',
      activityId: 'breadth-activity',
      questionIds,
      outcomes: [true, true, true],
      questionMetadata: metadataFor(questions),
      checkpointRuleVersions: { '1.1.1': 1 }
    }));

    expect(app.getSectionMilestones('stud_1').find(item => item.id === '1.1.1')).toMatchObject({
      state: 'checkpoint_secured',
      checkpointRuleVersion: 1,
      remainingFocuses: []
    });
  });

  test('does not reinterpret focus evidence under a missing or different rule version', () => {
    const { app, db } = loadApplication();
    const questions = ['q_1_1_cpu_purpose', 'diagnostic_1_1_1', 'q_1_1_a']
      .map(id => db.getQuestions().find(question => question.id === id));
    const questionIds = questions.map(question => question.id);
    db.cachedData.attempts.push(assessedAttempt({
      id: 'wrong-version',
      activityId: 'wrong-version-activity',
      questionIds,
      outcomes: [true, true, true],
      questionMetadata: metadataFor(questions),
      checkpointRuleVersions: { '1.1.1': 99 }
    }));

    expect(app.getSectionMilestones('stud_1').find(item => item.id === '1.1.1')).toMatchObject({
      state: 'practice_completed',
      demonstratedFocuses: []
    });
  });
});
