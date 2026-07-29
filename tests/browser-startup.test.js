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
    expect(panel.innerHTML).toContain('Today’s section');
    expect(panel.innerHTML).toContain('Recommended learning sequence');
  });

  test('focused guided learning leads with one section and defers broad navigation', () => {
    const context = loadProductionScripts();
    const panel = createPanel();
    context.app.activeTopicId = 'topic_1_1';
    context.app.activeObjectiveId = '1.1.1';

    context.app.renderStudentLearn(panel);

    expect(panel.innerHTML).toContain('Today’s section');
    expect(panel.innerHTML).toContain('about 10 minutes');
    expect(panel.innerHTML).toContain('Check this section (up to 3 questions)');
    expect(panel.innerHTML).toContain('View full topic');
    expect(panel.innerHTML).not.toContain('More ways to revise this topic');
    expect(panel.innerHTML).not.toContain('Copy notes and terms');
  });

  test('focused learning can return to the complete topic', () => {
    const context = loadProductionScripts();
    const viewFullTopicButton = {};
    const panel = createPanel();
    panel.querySelector = selector => selector === '#view-full-topic-btn' ? viewFullTopicButton : null;
    context.app.activeTopicId = 'topic_1_1';
    context.app.activeObjectiveId = '1.1.1';
    context.app.focusMainContent = jest.fn();

    context.app.renderStudentLearn(panel);
    viewFullTopicButton.onclick();

    expect(context.app.activeObjectiveId).toBe('all');
    expect(panel.innerHTML).toContain('Choose a specification section');
    expect(context.app.focusMainContent).toHaveBeenCalled();
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
    expect(panel.innerHTML).toContain('Suggested guided learning · 10 minutes');
    expect(panel.innerHTML).not.toContain('3 of 5 test cases passed');
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
    expect(panel.innerHTML).toContain('Binary Fluent');
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
    expect(missingPanel.innerHTML).toContain('Learning content unavailable');
  });
});
