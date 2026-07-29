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

    expect(panel.innerHTML).toContain('Learn each specification requirement');
    expect(panel.innerHTML).toContain('1.2.3');
    expect(panel.innerHTML).toContain('Worked example');
    expect(panel.innerHTML).toContain('A text file with 2,000 characters');
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
      expect(panel.innerHTML).toContain('Learn each specification requirement');
    });

    const missingPanel = createPanel();
    context.app.activeTopicId = 'topic_missing';
    context.app.renderStudentLearn(missingPanel);
    expect(missingPanel.innerHTML).toContain('Learning content unavailable');
  });
});
