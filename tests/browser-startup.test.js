const fs = require('fs');
const path = require('path');
const vm = require('vm');

function createBrowserContext() {
  const storage = new Map();
  const context = {
    __storage: storage,
    console,
    crypto: require('crypto').webcrypto,
    TextEncoder,
    Uint8Array,
    URLSearchParams,
    setTimeout,
    clearTimeout,
    alert: jest.fn(),
    fetch: jest.fn().mockRejectedValue(new Error('API offline')),
    localStorage: {
      getItem: key => storage.has(key) ? storage.get(key) : null,
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: key => storage.delete(key),
      key: index => [...storage.keys()][index] || null,
      get length() { return storage.size; }
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
      body: { appendChild: () => {} }
    },
    navigator: {},
    location: { origin: 'http://localhost', search: '', href: 'http://localhost/' }
  };
  context.window = context;
  context.globalThis = context;
  context.window.addEventListener = jest.fn();
  return vm.createContext(context);
}

function loadProductionScripts() {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const scriptSources = [...html.matchAll(/<script src="([^"]+)"/g)]
    .map(match => match[1].split('?')[0]);
  const context = createBrowserContext();

  for (const source of scriptSources) {
    const script = fs.readFileSync(path.join(__dirname, '..', source), 'utf8');
    vm.runInContext(script, context, { filename: source });
  }

  return context;
}

function createPanel() {
  return {
    innerHTML: '',
    querySelector: () => null,
    querySelectorAll: () => []
  };
}

describe('production browser startup', () => {
  test('loads behaviourally coupled assets with one release token', () => {
    const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    const releaseTokens = [
      ...html.matchAll(/(?:style\.css|database\.js|app\.js)\?v=([^"']+)/g)
    ].map(match => match[1]);

    expect(releaseTokens).toHaveLength(3);
    expect(new Set(releaseTokens).size).toBe(1);
  });

  test('loads production scripts together and opens the Student Demo', async () => {
    const context = loadProductionScripts();

    expect(context.db).toBeDefined();
    expect(context.app).toBeDefined();

    context.app.render = jest.fn();
    await context.app.quickLogin('student');

    expect(context.app.currentUser).toMatchObject({
      id: 'stud_1',
      role: 'student',
      isDemo: true
    });
    expect(context.app.activeTab).toBe('stud-dashboard');
  });

  test('shows a focused read-only recovery screen when saved browser data cannot be upgraded', () => {
    const context = loadProductionScripts();
    const recoveryPanel = { focus: jest.fn() };
    const reloadButton = {};
    const loginScreen = { style: {} };
    const appShell = {
      style: {},
      setAttribute: jest.fn(),
      removeAttribute: jest.fn()
    };
    const mainPanel = {
      innerHTML: '',
      querySelector: selector => selector === '#storage-recovery'
        ? recoveryPanel
        : selector === '#storage-recovery-reload-btn' ? reloadButton : null
    };
    const navList = { innerHTML: '' };
    const skipLink = { setAttribute: jest.fn() };
    const userName = { textContent: '' };
    const userRole = { textContent: '' };
    const elements = {
      'login-screen': loginScreen,
      'app-shell': appShell,
      'main-panel': mainPanel,
      'nav-links-list': navList,
      'skip-link': skipLink,
      'user-display-name': userName,
      'user-display-role': userRole
    };
    context.document.getElementById = id => elements[id] || null;
    context.db.recoveryState = { active: true, reason: 'migration' };
    context.db.readOnly = true;
    context.location.reload = jest.fn();

    context.app.render();

    expect(mainPanel.innerHTML).toContain('Your saved work has not been deleted or replaced.');
    expect(mainPanel.innerHTML).toContain('role="alert"');
    expect(recoveryPanel.focus).toHaveBeenCalled();
    expect(loginScreen.style.display).toBe('none');
    expect(appShell.style.display).toBe('flex');
    expect(appShell.removeAttribute).toHaveBeenCalledWith('data-user-role');
    reloadButton.onclick();
    expect(context.location.reload).toHaveBeenCalled();
  });

  test('opens a selectable new-learner demo without seeded evidence or badges', async () => {
    const context = loadProductionScripts();

    context.app.render = jest.fn();
    await context.app.quickLogin('clean-student');

    expect(context.app.currentUser).toMatchObject({
      id: 'student_release_fixture',
      role: 'student',
      isDemo: true,
      isCleanDemo: true,
      achievements: []
    });
    expect(context.app.currentUser.personalRevisionPriorities).toEqual([]);
    expect(context.db.getAttempts().filter(item => item.studentId === context.app.currentUser.id)).toEqual([]);
    expect(context.db.getProgrammingSubmissions().filter(item => item.studentId === context.app.currentUser.id)).toEqual([]);
    expect(context.db.getWrittenSubmissions().filter(item => item.studentId === context.app.currentUser.id)).toEqual([]);
  });

  test('renders a stored secondary assignment as literal text without mutating it', async () => {
    const context = loadProductionScripts();
    context.app.render = jest.fn();
    await context.app.quickLogin('student');
    const hostileAssignment = {
      id: 'assign_hostile',
      title: '<img src=x onerror="alert(1)"> Revision',
      classId: 'class_1',
      topicId: 'topic_1_3" autofocus onfocus="alert(2)',
      dueDate: '2026-08-20',
      status: 'Recommended',
      estimatedMinutes: 5,
      completedCount: 0
    };
    context.db.cachedData.assignments.push(hostileAssignment);
    context.app.dashboardSeeMoreExpanded = true;
    const target = createPanel();
    target.querySelectorAll = () => [];
    const before = JSON.stringify(hostileAssignment);

    context.app.renderStudentDashboard(target);

    expect(target.innerHTML).toContain('&lt;img src=x onerror=&quot;alert(1)&quot;&gt; Revision');
    expect(target.innerHTML).not.toContain('<img src=x onerror=');
    expect(target.innerHTML).toContain('topic_1_3&quot; autofocus onfocus=&quot;alert(2)');
    expect(JSON.stringify(hostileAssignment)).toBe(before);
  });

  test('re-entering the clean demo removes only fixture evidence and namespaced drafts', async () => {
    const context = loadProductionScripts();
    const fixtureId = 'student_release_fixture';
    const otherAttempt = { id: 'other_attempt', studentId: 'stud_1', type: 'spaced_theory', score: '1/3' };
    const fixtureAttempt = { id: 'fixture_attempt', studentId: fixtureId, type: 'spaced_theory', score: '3/3' };
    const fixtureProgramming = { id: 'fixture_programming', studentId: fixtureId, challengeId: 'pc_1' };
    const fixtureWritten = { id: 'fixture_written', studentId: fixtureId, questionId: 'wq_1' };
    context.db.cachedData.attempts.push(otherAttempt, fixtureAttempt);
    context.db.cachedData.programmingSubmissions.push(fixtureProgramming);
    context.db.cachedData.writtenSubmissions.push(fixtureWritten);
    context.db.cachedData.students.push({
      id: fixtureId,
      name: 'Stale fixture',
      role: 'student',
      achievements: ['Binary Fluent'],
      personalRevisionPriorities: ['stale']
    });
    const assignmentsBefore = JSON.parse(JSON.stringify(context.db.getAssignments()));
    const settingsBefore = JSON.parse(JSON.stringify(context.db.getSettings()));
    const protectedCollectionsBefore = JSON.parse(JSON.stringify({
      schemaVersion: context.db.cachedData.schemaVersion,
      classes: context.db.cachedData.classes,
      classroomControls: context.db.cachedData.classroomControls,
      curriculumContent: context.db.cachedData.curriculumContent,
      questions: context.db.cachedData.questions,
      testPreps: context.db.cachedData.testPreps,
      supportSessions: context.db.cachedData.supportSessions
    }));
    context.__storage.set('try_practice_student_release_fixture_1.1.1', 'fixture draft');
    context.__storage.set('try_practice_student_release_fixture_removed-objective', 'orphaned fixture draft');
    context.__storage.set('try_practice_stud_1_1.1.1', 'other learner draft');
    context.__storage.set('try_practice_1.1.1', 'preserved legacy draft');
    context.app.render = jest.fn();
    context.app.quizAnswers = { 0: 'other learner answer' };
    context.app.quizEvidenceSet = { activityId: 'other_activity' };
    context.app.writtenResponseText = 'other learner writing';
    context.app.editorCode = 'other learner code';
    context.app.messageDraft = 'private message';

    await context.app.quickLogin('clean-student');

    expect(context.db.getAttempts()).toContainEqual(otherAttempt);
    expect(context.db.getAttempts().some(item => item.studentId === fixtureId)).toBe(false);
    expect(context.db.getProgrammingSubmissions().some(item => item.studentId === fixtureId)).toBe(false);
    expect(context.db.getWrittenSubmissions().some(item => item.studentId === fixtureId)).toBe(false);
    expect(context.db.getStudents().some(item => item.id === fixtureId)).toBe(false);
    expect(context.db.getAssignments()).toEqual(assignmentsBefore);
    expect(context.db.getSettings()).toEqual(settingsBefore);
    expect({
      schemaVersion: context.db.cachedData.schemaVersion,
      classes: context.db.cachedData.classes,
      classroomControls: context.db.cachedData.classroomControls,
      curriculumContent: context.db.cachedData.curriculumContent,
      questions: context.db.cachedData.questions,
      testPreps: context.db.cachedData.testPreps,
      supportSessions: context.db.cachedData.supportSessions
    }).toEqual(protectedCollectionsBefore);
    expect(context.__storage.has('try_practice_student_release_fixture_1.1.1')).toBe(false);
    expect(context.__storage.has('try_practice_student_release_fixture_removed-objective')).toBe(false);
    expect(context.__storage.get('try_practice_stud_1_1.1.1')).toBe('other learner draft');
    expect(context.__storage.get('try_practice_1.1.1')).toBe('preserved legacy draft');
    expect(context.app.currentUser.achievements).toEqual([]);
    expect(context.app.quizAnswers).toEqual({});
    expect(context.app.quizEvidenceSet).toBeNull();
    expect(context.app.writtenResponseText).toBe('');
    expect(context.app.editorCode).toBe('');
    expect(context.app.messageDraft).toBe('');

    context.db.cachedData.attempts.push(fixtureAttempt);
    context.db.cachedData.programmingSubmissions.push(fixtureProgramming);
    context.db.cachedData.writtenSubmissions.push(fixtureWritten);
    context.db.cachedData.students.push({
      id: fixtureId,
      name: 'Recreated fixture',
      role: 'student',
      achievements: ['Binary Fluent'],
      personalRevisionPriorities: ['stale again']
    });
    context.__storage.set('try_practice_student_release_fixture_1.1.1', 'second fixture draft');

    await context.app.quickLogin('clean-student');

    expect(context.db.getAttempts().some(item => item.studentId === fixtureId)).toBe(false);
    expect(context.db.getProgrammingSubmissions().some(item => item.studentId === fixtureId)).toBe(false);
    expect(context.db.getWrittenSubmissions().some(item => item.studentId === fixtureId)).toBe(false);
    expect(context.db.getStudents().some(item => item.id === fixtureId)).toBe(false);
    expect(context.__storage.has('try_practice_student_release_fixture_1.1.1')).toBe(false);
  });

  test('practice draft keys are isolated by learner', () => {
    const context = loadProductionScripts();

    expect(context.app.getPracticeDraftKey('1.1.1', 'stud_1')).toBe('try_practice_stud_1_1.1.1');
    expect(context.app.getPracticeDraftKey('1.1.1', 'stud_2')).toBe('try_practice_stud_2_1.1.1');
    expect(context.app.getPracticeDraftKey('1.1.1', 'stud_1'))
      .not.toBe(context.app.getPracticeDraftKey('1.1.1', 'stud_2'));
  });

  test.each(['stud_1', '', 'student_release_fixture_copy'])(
    'clean-demo reset rejects non-fixture learner ID %p without mutation',
    studentId => {
      const context = loadProductionScripts();
      const before = JSON.parse(JSON.stringify(context.db.cachedData));

      expect(() => context.db.resetCleanDemoLearnerData(studentId)).toThrow(/dedicated fixture learner/);
      expect(context.db.cachedData).toEqual(before);
    }
  );

  test('executes the canonical Learn renderer with objective teaching and a worked example', () => {
    const context = loadProductionScripts();
    const panel = createPanel();

    context.app.activeTopicId = 'topic_1_3';
    context.app.renderStudentLearn(panel);

    expect(panel.innerHTML).toContain('Choose a specification section');
    expect(panel.innerHTML).toContain('1.2.3');
    expect(panel.innerHTML).toContain('Worked example');
    expect(panel.innerHTML).toContain('A text file with 2,000 characters');
  });

  test('unfiltered Learn has one primary start and opens that focused section', () => {
    const context = loadProductionScripts();
    const startButton = { getAttribute: () => '1.2.3' };
    const panel = createPanel();
    panel.querySelector = selector => selector === '#learn-recommended-start-btn' ? startButton : null;
    context.app.activeTopicId = 'topic_1_3';
    context.app.activeObjectiveId = 'all';
    context.app.focusMainContent = jest.fn();

    context.app.renderStudentLearn(panel);

    expect(panel.innerHTML.match(/class="[^"]*\bbtn-primary\b/g)).toHaveLength(1);
    expect(panel.innerHTML).toContain('Suggested starting point');
    expect(panel.innerHTML).toContain('More ways to revise this topic');

    startButton.onclick();

    expect(context.app.activeObjectiveId).toBe('1.2.3');
    expect(panel.innerHTML).toContain('Review this section');
    expect(panel.innerHTML).toContain('Back to Topics');
  });

  test('focused guided learning leads with one section and defers broad navigation', () => {
    const context = loadProductionScripts();
    const panel = createPanel();
    context.app.activeTopicId = 'topic_1_1';
    context.app.activeObjectiveId = '1.1.1';

    context.app.renderStudentLearn(panel);

    expect(panel.innerHTML).toContain('Review this section');
    expect(panel.innerHTML).toContain('Try a 4-mark exam question');
    expect(panel.innerHTML).toContain('Add flashcards to my desk');
    expect(panel.innerHTML).toContain('Back to Topics');
    expect(panel.innerHTML).not.toContain('More ways to revise this topic');
    expect(panel.innerHTML).not.toContain('Choose a specification section');
  });

  test('focused learning does not turn reading or coverage into checked evidence', () => {
    const context = loadProductionScripts();
    const panel = createPanel();
    context.app.activeTopicId = 'topic_1_1';
    context.app.activeObjectiveId = '1.1.1';
    context.app.getSectionMilestones = jest.fn(() => [{
      id: '1.1.1',
      state: 'checkpoint_secured',
      label: 'Section goal met'
    }]);

    context.app.renderStudentLearn(panel);

    expect(panel.innerHTML).toContain('Reading helps you prepare but does not update Progress');
    expect(panel.innerHTML).toContain('does not mean you have mastered the topic');
    expect(panel.innerHTML).not.toContain('Check this section');
  });

  test('focused learning can return to Topics', () => {
    const context = loadProductionScripts();
    const topicsButton = { addEventListener: jest.fn((event, handler) => { topicsButton.handler = handler; }) };
    const panel = createPanel();
    panel.querySelector = selector => selector === '#focused-topics-btn' ? topicsButton : null;
    context.app.activeTopicId = 'topic_1_1';
    context.app.activeObjectiveId = '1.1.1';
    context.app.focusMainContent = jest.fn();
    context.app.switchTab = jest.fn();

    context.app.renderStudentLearn(panel);
    topicsButton.handler();

    expect(context.app.switchTab).toHaveBeenCalledWith('stud-topics');
  });

  test('completed recall binds every explicit next action without a runtime error', async () => {
    const context = loadProductionScripts();
    context.app.render = jest.fn();
    await context.app.quickLogin('clean-student');
    const mainPanel = { innerHTML: '', querySelector: () => null };
    const continueButton = {};
    const transferButton = {};
    const retryButton = {};
    const elements = {
      'main-panel': mainPanel,
      'quiz-continue-home-btn': continueButton,
      'quiz-exam-transfer-btn': transferButton,
      'quiz-retry-btn': retryButton
    };
    context.document.getElementById = id => elements[id] || null;
    context.document.querySelector = () => ({ value: 'incorrect' });
    context.document.querySelectorAll = () => [];
    context.app.focusMainContent = jest.fn();
    context.app.switchTab = jest.fn();
    context.app.renderStudentRecall = jest.fn();
    context.app.activeTopicId = 'topic_1_1';
    context.app.activeObjectiveId = '1.1.1';
    context.app.activeExamTransferId = 'transfer_1';
    context.app.examTransferStage = 'answer';
    context.app.examTransferPlan = { 0: 'stale plan' };
    context.app.examTransferResponse = 'stale response';
    context.app.quizQuestions = [{
      id: 'retry_fixture',
      type: 'mcq',
      question: 'Which answer is correct?',
      options: ['incorrect', 'correct'],
      answer: 'correct',
      explanation: 'Explanation',
      retryHint: 'Compare the role of each option.'
    }];
    context.app.quizEvidenceSet = context.app.createEvidenceSet(
      'spaced_theory',
      context.app.activeTopicId,
      context.app.quizQuestions
    );

    expect(() => context.app.gradeQuiz()).not.toThrow();
    retryButton.onclick();
    expect(context.app.renderStudentRecall).toHaveBeenCalledWith(mainPanel);
    continueButton.onclick();
    expect(context.app.switchTab).toHaveBeenCalledWith('stud-dashboard');
    transferButton.onclick();
    expect(context.app.switchTab).toHaveBeenCalledWith('stud-exam-transfer');
    expect(context.app.activeExamTransferId).toBe('transfer_5');
    expect(context.app.examTransferStage).toBe('decode');
    expect(context.app.examTransferPlan).toEqual({});
    expect(context.app.examTransferResponse).toBe('');
  });

  test('multiple-choice option order is mixed without mutating authored questions', () => {
    const context = loadProductionScripts();
    const questions = context.db.getQuestions().filter(question => question.type === 'mcq');
    const originals = questions.map(question => [...question.options]);
    const ordered = questions.map(question =>
      context.app.getStableOptionOrder(question, 'activity_option_order_fixture')
    );
    const correctPositions = ordered.map(question => question.options.indexOf(question.answer));

    expect(new Set(correctPositions).size).toBeGreaterThan(1);
    expect(correctPositions.filter(position => position === 0).length).toBeLessThan(correctPositions.length);
    expect(questions.map(question => question.options)).toEqual(originals);
  });

  test('a retry preserves the option order from the original activity', () => {
    const context = loadProductionScripts();
    const question = context.db.getQuestions().find(item => item.type === 'mcq');
    const activityQuestion = context.app.getStableOptionOrder(question, 'stable_retry_activity');
    context.app.quizQuestions = [activityQuestion];

    const retryQuestions = context.app.getRetryQuestions(context.app.quizQuestions, [false]);

    expect(retryQuestions[0]).toBe(activityQuestion);
    expect(retryQuestions[0].options).toEqual(activityQuestion.options);
  });

  test('section-labelled exam transfer requires an exact specification match', () => {
    const context = loadProductionScripts();

    context.app.activeTopicId = 'topic_1_1';
    context.app.activeObjectiveId = '1.1.2';
    expect(context.app.getMatchingExamTransferTask()).toBeNull();
    expect(context.app.getMatchingExamTransferTask(undefined, undefined, true)).toMatchObject({
      id: 'transfer_5',
      topicId: 'topic_1_1'
    });

    context.app.activeTopicId = 'topic_missing';
    context.app.activeObjectiveId = 'missing';
    expect(context.app.getMatchingExamTransferTask()).toBeNull();
    expect(context.app.activateExamTransferForCurrentLearning()).toBe(false);
  });

  test('the Learn renderer binds its exact-match exam application action', () => {
    const context = loadProductionScripts();
    const examButton = { addEventListener: jest.fn((event, handler) => { examButton.handler = handler; }) };
    const panel = {
      innerHTML: '',
      querySelector: selector => selector === '#focused-exam-btn' ? examButton : null,
      querySelectorAll: () => []
    };
    context.app.currentUser = context.db.getStudents()[0];
    context.app.activeTopicId = 'topic_1_1';
    context.app.activeObjectiveId = '1.1.1';
    context.app.switchTab = jest.fn();

    context.app.renderStudentLearn(panel);

    expect(panel.innerHTML).toContain('Try a 4-mark exam question');
    expect(examButton.handler).toEqual(expect.any(Function));
    examButton.handler();
    expect(context.app.activeExamTransferId).toBe('transfer_5');
    expect(context.app.switchTab).toHaveBeenCalledWith('stud-exam-transfer');
  });

  test('exam-transfer scenarios are ordered by paper and specification point', () => {
    const context = loadProductionScripts();
    const labels = context.app.getOrderedExamTransferTasks()
      .map(task => `${task.paper}:${task.specificationPointId}`);

    expect(labels).toEqual([
      'Paper 1:1.1.1',
      'Paper 1:1.2.1',
      'Paper 1:1.2.4c',
      'Paper 1:1.3.2',
      'Paper 1:1.6.1',
      'Paper 2:2.1.2',
      'Paper 2:2.1.3',
      'Paper 2:2.2.1',
      'Paper 2:2.2.3',
      'Paper 2:2.2.ERL',
      'Paper 2:2.3.2',
      'Paper 2:2.3.2',
      'Paper 2:2.5.1'
    ]);
  });

  test('every exam-transfer stage keeps the question visible and moves focus predictably', () => {
    const context = loadProductionScripts();
    const question = { scrollIntoView: jest.fn() };
    const stage = { focus: jest.fn() };
    const panel = {
      innerHTML: '',
      querySelector: selector => selector === '#exam-transfer-question'
        ? question
        : selector === '#exam-transfer-stage' ? stage : null,
      querySelectorAll: () => []
    };
    context.app.currentUser = context.db.getStudents()[0];

    for (const activeStage of ['decode', 'plan', 'answer', 'check', 'retry']) {
      context.app.examTransferStage = activeStage;
      context.app.renderStudentExamTransfer(panel);
      expect(panel.innerHTML).toContain('id="exam-transfer-question"');
      expect(panel.innerHTML).toContain('id="exam-transfer-stage"');
    }

    expect(question.scrollIntoView).toHaveBeenCalledTimes(5);
    expect(stage.focus).toHaveBeenCalledTimes(5);
    expect(stage.focus).toHaveBeenLastCalledWith({ preventScroll: true });
  });

  test('dashboard combines required workloads and aligns the suggested clean-learner duration', async () => {
    const context = loadProductionScripts();
    context.app.render = jest.fn();
    await context.app.quickLogin('clean-student');
    context.db.cachedData.assignments = [{
      id: 'required_fixture',
      title: 'Required check',
      topicId: 'topic_1_1',
      status: 'Required',
      estimatedMinutes: 10
    }];
    context.db.cachedData.testPreps = [{
      id: 'prep_fixture',
      title: 'Test preparation',
      status: 'Active',
      weeklyMinutes: 15,
      sessionMinutes: 10,
      specificationPointIds: ['1.1.1'],
      testDate: '2026-08-01'
    }];
    context.db.cachedData.supportSessions = [];
    const panel = createPanel();

    context.app.renderStudentDashboard(panel);

    expect(panel.innerHTML).toContain('two required tasks · 25 minutes');
    expect(panel.innerHTML).toContain('Required work takes priority');
    expect(panel.innerHTML).not.toContain('3 of 5 test cases passed');
  });

  test('required work remains the only true dashboard next action', () => {
    const context = loadProductionScripts();
    const panel = createPanel();
    context.app.currentUser = context.db.getStudents()[0];

    context.app.renderStudentDashboard(panel);

    expect(panel.innerHTML).toContain('Weekly study rhythm &middot; paused');
    expect(panel.innerHTML).toContain('Recommended study resumes after required work');
    expect(panel.innerHTML).not.toContain('planned activities complete');
    expect(panel.innerHTML).not.toContain('id="weekly-rhythm-next"');
  });

  test('pause and real route re-entry preserve the active recall session', () => {
    const context = loadProductionScripts();
    const mainPanel = createPanel();
    mainPanel.focus = jest.fn();
    const navList = { innerHTML: '', appendChild: jest.fn() };
    const appShell = { style: {}, setAttribute: jest.fn(), removeAttribute: jest.fn() };
    const elements = {
      'login-screen': { style: {} },
      'app-shell': appShell,
      'skip-link': { setAttribute: jest.fn() },
      'nav-links-list': navList,
      'main-panel': mainPanel,
      'user-display-name': { textContent: '' },
      'user-display-role': { textContent: '' },
      'demo-banner': { style: {} }
    };
    context.document.getElementById = id => elements[id] || null;
    context.document.createElement = () => ({
      innerHTML: '',
      querySelector: () => ({ onclick: null }),
      appendChild: jest.fn()
    });
    context.app.currentUser = context.db.getStudents()[0];
    context.app.retrievalDeckSessionId = 'stable-session';
    context.app.retrievalDeckSeenCardIds = ['term_cpu'];
    context.app.retrievalDeckRatedCount = 1;
    context.app.retrievalDeckSessionTarget = 3;
    context.app.retrievalDeckAttempt = 'cache stores frequently used data';
    context.app.renderStudentDashboard = jest.fn();

    context.app.switchTab('stud-dashboard');
    context.app.switchTab('stud-retrieval');

    expect(context.app.retrievalDeckSessionId).toBe('stable-session');
    expect(context.app.retrievalDeckSeenCardIds).toEqual(['term_cpu']);
    expect(context.app.retrievalDeckRatedCount).toBe(1);
    expect(context.app.retrievalDeckAttempt).toBe('cache stores frequently used data');
    expect(mainPanel.innerHTML).toContain('Card 2 of 3');
  });

  test('full-topic Learn describes its recall as a sample rather than complete evidence', () => {
    const context = loadProductionScripts();
    const panel = createPanel();
    context.app.currentUser = context.db.getStudents()[0];
    context.app.activeTopicId = 'topic_1_1';
    context.app.activeObjectiveId = 'all';

    context.app.renderStudentLearn(panel);

    expect(panel.innerHTML).toContain('Check what you remember (up to 3 questions)');
    expect(panel.innerHTML).toContain('does not prove complete coverage of the whole topic');
    expect(panel.innerHTML).not.toContain('Optional: start 1.1 retrieval practice');
  });

  test('dashboard details expand and collapse while earned achievements remain evidence-backed', async () => {
    const context = loadProductionScripts();
    context.app.render = jest.fn();
    await context.app.quickLogin('clean-student');
    const toggleButton = { focus: jest.fn() };
    const achievementsButton = {};
    const panel = {
      innerHTML: '',
      querySelector: selector => selector === '#toggle-see-more-btn'
        ? toggleButton
        : selector === '#dashboard-achievements-btn' ? achievementsButton : null,
      querySelectorAll: () => []
    };

    context.app.renderStudentDashboard(panel);
    expect(panel.innerHTML).toContain('aria-expanded="false"');
    expect(panel.innerHTML).not.toContain('achievement earned');

    toggleButton.onclick();
    expect(context.app.dashboardSeeMoreExpanded).toBe(true);
    expect(panel.innerHTML).toContain('aria-expanded="true"');
    expect(panel.innerHTML).toContain('id="dashboard-more-details"');
    expect(toggleButton.focus).toHaveBeenCalled();

    toggleButton.onclick();
    expect(context.app.dashboardSeeMoreExpanded).toBe(false);
    expect(panel.innerHTML).toContain('Show more assignments and progress');

    context.app.currentUser.achievements = ['Binary Fluent'];
    context.app.renderStudentDashboard(panel);
    expect(panel.innerHTML).toContain('Earned through checked work');
    expect(panel.innerHTML).toContain('Binary Check Complete');
    context.app.switchTab = jest.fn();
    achievementsButton.onclick();
    expect(context.app.switchTab).toHaveBeenCalledWith('stud-progress');
  });

  test('renders every selectable topic and controls a missing-strand state', () => {
    const context = loadProductionScripts();
    const topicIds = context.db.getUnits()
      .flatMap(unit => unit.topics.map(topic => topic.id));

    topicIds.forEach(topicId => {
      const panel = createPanel();
      context.app.activeTopicId = topicId;
      context.app.renderStudentLearn(panel);
      expect(panel.innerHTML).not.toContain('Learning content unavailable');
      expect(panel.innerHTML).toContain('Choose a specification section');
    });

    const missingPanel = createPanel();
    context.app.activeTopicId = 'topic_missing';
    context.app.renderStudentLearn(missingPanel);
    expect(missingPanel.innerHTML).toContain('Topic review unavailable');
  });
});
