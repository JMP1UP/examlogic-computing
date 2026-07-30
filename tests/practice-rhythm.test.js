const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadApp() {
  const data = {
    attempts: [],
    assignments: [],
    programmingSubmissions: [],
    questions: [],
    keyTerms: [],
    controls: {},
    units: []
  };
  const database = {
    addAttempt: jest.fn(attempt => data.attempts.push({ id: `attempt_${data.attempts.length}`, date: new Date().toISOString(), ...attempt })),
    getAssignments: jest.fn(() => data.assignments),
    getAttempts: jest.fn(() => data.attempts),
    getClassroomControls: jest.fn(() => data.controls),
    getExamTransferTasks: jest.fn(() => []),
    getKeyTerms: jest.fn(() => data.keyTerms),
    getProgrammingSubmissions: jest.fn(() => data.programmingSubmissions),
    getQuestions: jest.fn(() => data.questions),
    selectObjectiveRecallQuestions: jest.fn((questions, objectiveId) =>
      questions.filter(question => question.specificationPointId === objectiveId)
    ),
    getUnits: jest.fn(() => data.units)
  };
  const document = {
    addEventListener: jest.fn(),
    body: { classList: { add: jest.fn(), remove: jest.fn(), toggle: jest.fn() } },
    getElementById: jest.fn(() => null),
    querySelector: jest.fn(() => null),
    querySelectorAll: jest.fn(() => [])
  };
  const window = { addEventListener: jest.fn(), db: database, location: { href: '', search: '' } };
  const context = vm.createContext({
    clearTimeout, console, Date, document, fetch: jest.fn(), JSON, Map, Math, Set, setTimeout, URLSearchParams, window
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8'), context);
  window.app.currentUser = { id: 'student_1', role: 'student', classId: 'class_1' };
  return { app: window.app, data, database };
}

describe('weekly practice rhythm', () => {
  test('counts retrieval on separate days and not repeated activity, views or confidence', () => {
    const { app, data } = loadApp();
    data.attempts.push(
      { studentId: 'student_1', type: 'spaced_theory', date: '2026-07-27T09:00:00', score: '2/3' },
      { studentId: 'student_1', type: 'spaced_theory', date: '2026-07-27T10:00:00', score: '3/3' },
      { studentId: 'student_1', type: 'page_view', date: '2026-07-28T09:00:00' },
      { studentId: 'student_1', type: 'confidence_reflection', date: '2026-07-28T10:00:00' }
    );

    expect(app.getStudentPracticeRhythm('student_1', new Date('2026-07-29T12:00:00')).retrievalDays).toBe(1);

    data.attempts.push({ studentId: 'student_1', type: 'retrieval_deck_session', date: '2026-07-29T09:00:00', completionStatus: 'completed' });
    expect(app.getStudentPracticeRhythm('student_1', new Date('2026-07-29T12:00:00')).retrievalDays).toBe(2);
  });

  test('keeps awaiting-review exam work as submitted engagement and outside attainment', () => {
    const { app, data } = loadApp();
    data.attempts.push({
      studentId: 'student_1',
      type: 'exam_transfer_retry',
      date: '2026-07-27T09:00:00',
      score: 'awaiting review',
      completionStatus: 'awaiting_review',
      evidenceType: 'unassessed_submission',
      contributesToMastery: false
    });

    const rhythm = app.getStudentPracticeRhythm('student_1', new Date('2026-07-29T12:00:00'));
    const exam = rhythm.items.find(item => item.id === 'exam');
    if (exam) expect(exam).toMatchObject({ done: 1, awaitingReview: true });
    expect(app.getDemonstratedMastery(data.attempts).ratio).toBeNull();
  });

  test('rating requires an attempt and reveal, changes scheduling only, and preserves attainment', () => {
    const { app, data, database } = loadApp();
    const card = { id: 'term_cpu', topicId: 'topic_1_1' };
    expect(app.recordRetrievalDeckRating(card, 'secure', new Date('2026-07-29T12:00:00'))).toBe(false);
    app.retrievalDeckAttempt = 'It processes instructions.';
    app.retrievalDeckRevealed = true;

    expect(app.recordRetrievalDeckRating(card, 'secure', new Date('2026-07-29T12:00:00'))).toBe(true);
    expect(database.addAttempt).toHaveBeenCalledWith(expect.objectContaining({
      type: 'retrieval_rating',
      selfRating: 'secure',
      evidenceType: 'engagement_only',
      contributesToMastery: false
    }));
    expect(app.getLocalDateKey(data.attempts[0].dueDate)).toBe('2026-08-05');
    expect(app.getDemonstratedMastery(data.attempts).ratio).toBeNull();
    expect(app.getRetrievalIntervalDays('difficult', 'correct')).toBeGreaterThan(
      app.getRetrievalIntervalDays('difficult', 'incorrect')
    );
  });

  test('weekly reset creates no backlog and class-wide assignment status does not invent learner completion', () => {
    const { app, data } = loadApp();
    data.assignments.push(
      { title: 'Weekly number fluency', status: 'Completed', completedAt: '2026-07-28T09:00:00', classId: 'class_1' },
      { title: 'Python programming practice', status: 'Completed', completedAt: '2026-07-28T09:00:00', classId: 'class_1' }
    );
    data.attempts.push({ studentId: 'student_1', type: 'spaced_theory', date: '2026-07-20T09:00:00', score: '3/3' });

    const rhythm = app.getStudentPracticeRhythm('student_1', new Date('2026-07-29T12:00:00'));
    expect(rhythm.retrievalDays).toBe(0);
    expect(rhythm.items.find(item => item.id === 'number').done).toBe(0);
    expect(rhythm.items.find(item => item.id === 'programming').done).toBe(0);
    expect(rhythm.items.every(item => item.done <= item.target)).toBe(true);
  });

  test('bounds the standard recall activity at three cards and extra cards do not inflate the day count', () => {
    const { app, data } = loadApp();
    const cards = [
      { id: 'term_cpu', topicId: 'topic_1_1' },
      { id: 'term_ram', topicId: 'topic_1_1' },
      { id: 'term_cache', topicId: 'topic_1_1' }
    ];

    for (let index = 0; index < 3; index++) {
      app.retrievalDeckAttempt = `Meaningful recall attempt ${index}`;
      app.retrievalDeckRevealed = true;
      expect(app.recordRetrievalDeckRating(cards[index], 'difficult', new Date('2026-07-29T12:00:00'))).toBe(true);
    }

    expect(app.retrievalDeckRatedCount).toBe(3);
    expect(app.retrievalDeckSessionComplete).toBe(true);
    expect(data.attempts.filter(item => item.type === 'retrieval_rating')).toHaveLength(3);
    expect(data.attempts.filter(item => item.type === 'retrieval_deck_session')).toHaveLength(1);
    expect(data.attempts.find(item => item.type === 'retrieval_deck_session').questionIds).toEqual(
      cards.map(card => card.id)
    );

    app.retrievalDeckExtraMode = true;
    app.retrievalDeckAttempt = 'Another meaningful recall attempt';
    app.retrievalDeckRevealed = true;
    expect(app.recordRetrievalDeckRating(cards[0], 'secure', new Date('2026-07-29T12:10:00'))).toBe(true);
    expect(data.attempts.filter(item => item.type === 'retrieval_deck_extra')).toHaveLength(1);
    expect(app.getStudentPracticeRhythm('student_1', new Date('2026-07-29T13:00:00')).retrievalDays).toBe(1);
  });

  test('shows a clear engagement-only completion state after three recall cards', () => {
    const { app, data } = loadApp();
    data.controls.topic_1_1 = 'teaching';
    data.units.push({ topics: [{ id: 'topic_1_1', name: 'Systems' }] });
    data.keyTerms.push(
      { id: 'a', topicId: 'topic_1_1', term: 'CPU', definition: 'Processor' },
      { id: 'b', topicId: 'topic_1_1', term: 'RAM', definition: 'Memory' },
      { id: 'c', topicId: 'topic_1_1', term: 'Cache', definition: 'Fast memory' }
    );
    const panel = {
      innerHTML: '',
      querySelector: jest.fn(() => null),
      querySelectorAll: jest.fn(() => [])
    };
    app.retrievalDeckRatedCount = 3;
    app.retrievalDeckSessionComplete = true;

    app.renderStudentRetrievalDeck(panel);

    expect(panel.innerHTML).toContain('You rated 3 cards');
    expect(panel.innerHTML).toContain('engagement only');
    expect(panel.innerHTML).toContain('Back to your plan');
    expect(panel.innerHTML).toContain('Continue with extra cards');
  });

  test('one or two scheduling ratings cannot create a weekly retrieval day', () => {
    const { app } = loadApp();
    app.retrievalDeckSessionTarget = 3;
    for (const card of [
      { id: 'one', topicId: 'topic_1_1' },
      { id: 'two', topicId: 'topic_1_1' }
    ]) {
      app.retrievalDeckAttempt = 'A useful technical explanation';
      app.retrievalDeckRevealed = true;
      app.recordRetrievalDeckRating(card, 'difficult', new Date('2026-07-29T12:00:00'));
    }
    expect(app.getStudentPracticeRhythm('student_1', new Date('2026-07-29T13:00:00')).retrievalDays).toBe(0);
  });

  test('rejects obvious filler while allowing short valid technical terms', () => {
    const { app } = loadApp();
    expect(app.isMeaningfulLearnerResponse('ok', 2)).toBe(false);
    expect(app.isMeaningfulLearnerResponse('no', 2)).toBe(false);
    expect(app.isMeaningfulLearnerResponse('blah blah blah', 2)).toBe(false);
    expect(app.isMeaningfulLearnerResponse('RAM', 2)).toBe(true);
    expect(app.isMeaningfulLearnerResponse('CPU', 2)).toBe(true);
  });

  test('one-card session preserves a draft on pause and moves focus after reveal and completion', () => {
    const { app, data } = loadApp();
    data.controls.topic_1_1 = 'teaching';
    data.units.push({ topics: [{ id: 'topic_1_1', name: 'Systems' }] });
    data.keyTerms.push({ id: 'cpu', topicId: 'topic_1_1', term: 'CPU', definition: 'Processes instructions' });
    const elements = {
      '#retrieval-topic-filter': { value: 'all' },
      '#retrieval-card-attempt': { value: 'CPU', focus: jest.fn() },
      '#retrieval-reveal-btn': {},
      '#retrieval-card-answer': { focus: jest.fn() },
      '#retrieval-pause-btn': {},
      '#retrieval-session-back-btn': { focus: jest.fn() }
    };
    const rating = { getAttribute: () => 'secure' };
    const panel = {
      innerHTML: '',
      querySelector: jest.fn(selector => elements[selector] || null),
      querySelectorAll: jest.fn(selector => selector === '.retrieval-rating-btn' ? [rating] : [])
    };
    app.switchTab = jest.fn();

    app.renderStudentRetrievalDeck(panel);
    elements['#retrieval-card-attempt'].oninput();
    elements['#retrieval-pause-btn'].onclick();
    expect(app.retrievalDeckAttempt).toBe('CPU');
    expect(app.switchTab).toHaveBeenCalledWith('stud-practice');

    elements['#retrieval-reveal-btn'].onclick();
    expect(elements['#retrieval-card-answer'].focus).toHaveBeenCalled();
    rating.onclick();
    expect(app.retrievalDeckSessionComplete).toBe(true);
    expect(elements['#retrieval-session-back-btn'].focus).toHaveBeenCalled();
  });

  test('builds a three-card session from due cards first and then non-due covered cards', () => {
    const { app, data } = loadApp();
    data.controls.topic_1_1 = 'teaching';
    data.units.push({ topics: [{ id: 'topic_1_1', name: 'Systems' }] });
    app.getRetrievalDeckCards = jest.fn(() => [
      { id: 'due', topicId: 'topic_1_1', term: 'CPU', definition: 'Processor', due: true },
      { id: 'later-one', topicId: 'topic_1_1', term: 'RAM', definition: 'Memory', due: false },
      { id: 'later-two', topicId: 'topic_1_1', term: 'Cache', definition: 'Fast memory', due: false }
    ]);
    const panel = {
      innerHTML: '',
      querySelector: jest.fn(() => null),
      querySelectorAll: jest.fn(() => [])
    };

    app.renderStudentRetrievalDeck(panel);

    expect(app.retrievalDeckSessionTarget).toBe(3);
    expect(panel.innerHTML).toContain('Card 1 of 3');
    expect(panel.innerHTML).toContain('Explain: CPU');
  });

  test('scheduled exam activity chooses and resets a 4–6 mark task', () => {
    const { app, database } = loadApp();
    database.getExamTransferTasks.mockReturnValue([
      { id: 'short', topicId: 'topic_1', specificationPointId: '1.1', paper: 'Paper 1', marks: 2, commandWord: 'State' },
      { id: 'scheduled', topicId: 'topic_2', specificationPointId: '2.1', paper: 'Paper 2', marks: 6, commandWord: 'Explain' }
    ]);
    app.switchTab = jest.fn();
    app.activeExamTransferId = 'stale';
    app.examTransferStage = 'answer';
    app.examTransferPlan = { stale: true };
    app.examTransferResponse = 'stale';

    expect(app.activateScheduledExamTransfer()).toBe(true);
    expect(app.activeExamTransferId).toBe('scheduled');
    expect(app.activeTopicId).toBe('topic_2');
    expect(app.activeObjectiveId).toBe('2.1');
    expect(app.examTransferStage).toBe('decode');
    expect(app.examTransferPlan).toEqual({});
    expect(app.examTransferResponse).toBe('');
    expect(app.switchTab).toHaveBeenCalledWith('stud-exam-transfer');
  });

  test('focused section selection never fills from a different objective', () => {
    const { app } = loadApp();
    const selected = app.selectFocusedRecallQuestions([
      { id: 'matching', specificationPointId: '1.1.1' },
      { id: 'wrong-one', specificationPointId: '1.1.2' },
      { id: 'wrong-two', specificationPointId: '1.1.3' }
    ], '1.1.1');

    expect(selected.map(question => question.id)).toEqual(['matching']);
  });
});
