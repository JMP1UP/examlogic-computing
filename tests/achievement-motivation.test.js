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
  context.app.currentUser = context.db.getStudents().find(student => student.id === 'stud_3');
  context.app.currentUser.achievements = [];
  context.db.cachedData.attempts = [];
  context.db.cachedData.programmingSubmissions = [];
  return context;
}

describe('achievement motivation', () => {
  test('uses stable catalogue IDs without changing stored achievement names', () => {
    const { app, db } = loadApplication();
    const student = app.currentUser;

    expect(app.grantAchievement(student, 'binary-fluent')).toBe(true);
    expect(app.grantAchievement(student, 'binary-fluent')).toBe(false);
    expect(student.achievements).toEqual(['Binary Fluent']);
    expect(db.cachedData.schemaVersion).toBe(13);
  });

  test('keeps unknown historical awards visible without rewriting the learner record', () => {
    const { app } = loadApplication();
    const student = {
      achievements: ['Four-Week Habit', { title: 'Community Helper' }, 'four-week habit']
    };
    const before = JSON.stringify(student.achievements);
    const resolved = app.resolveStudentAchievements(student);

    expect(resolved.earned.map(item => item.title)).toEqual(['Four-Week Habit', 'Community Helper']);
    expect(resolved.earned.every(item => item.status === 'previously-earned')).toBe(true);
    expect(JSON.stringify(student.achievements)).toBe(before);
  });

  test('shows a clean learner two calm, specific goals and no earned badge', () => {
    const { app } = loadApplication();
    const html = app.renderStudentAchievementPanel({ achievements: [] });

    expect(html).toContain('Your first badges are ready to work towards');
    expect(html).toContain('Badges you can earn next');
    expect(html).toContain('Complete the Number skills activity, then retry anything you miss');
    expect(html).toContain('Fix the counting loop so it prints 1 to 5');
    expect((html.match(/Not earned yet/g) || [])).toHaveLength(2);
    expect(html).not.toContain('<span class="student-achievement-state">Earned</span>');
  });

  test('does not award Binary Fluent for an empty or incomplete result', () => {
    const { app } = loadApplication();
    app.mainContentHTML = jest.fn();
    app.numberSkillsSet = [];
    app.numberSkillsAnswers = {};
    app.numberSkillsEvidenceSet = app.createEvidenceSet('number_skills', 'binary conversions', []);
    app.gradeNumberSkillsSet();
    expect(app.currentUser.achievements).toEqual([]);

    app.numberSkillsSet = [{ id: 'number_skill_standard_2', type: 'Conversion', question: 'Question', answer: '1', hint: 'Hint' }];
    app.numberSkillsAnswers = { 0: '1' };
    app.numberSkillsEvidenceSet = {
      ...app.createEvidenceSet('number_skills', 'binary conversions', [
        { id: 'number_skill_standard_1' },
        { id: 'number_skill_standard_2' }
      ]),
      hasOriginalAttempt: true,
      latestOutcomes: { number_skill_standard_1: false }
    };
    app.gradeNumberSkillsSet();
    expect(app.currentUser.achievements).toEqual([]);
  });

  test('awards the programming badge only from a complete passing test run', () => {
    const { app } = loadApplication();
    const challenge = { id: 'pc_3', testCases: [{ input: [], expected: 'ok' }] };
    app.alert = jest.fn();
    app.switchTab = jest.fn();

    app.lastProgrammingEvidence = [];
    expect(app.submitProgramChallenge(challenge, 'I fixed the upper range boundary.')).toBe(false);
    expect(app.currentUser.achievements).toEqual([]);

    app.editorCode = 'for value in range(1, 6): print(value)';
    app.lastProgrammingEvidence = [{ passed: true }];
    app.lastProgrammingTestRun = {
      challengeId: 'pc_3',
      code: app.editorCode,
      testCount: 1,
      allPassed: true
    };
    expect(app.submitProgramChallenge(challenge, 'I fixed the upper range boundary.')).toBe(true);
    expect(app.currentUser.achievements).toEqual(['Debugging Detective']);
  });

  test('editing code after a passing run prevents submission and badge credit', () => {
    const { app, db } = loadApplication();
    const challenge = { id: 'pc_3', testCases: [{ input: [], expected: 'ok' }] };
    app.alert = jest.fn();
    app.switchTab = jest.fn();
    app.editorCode = 'passing code';
    app.lastProgrammingEvidence = [{ passed: true }];
    app.lastProgrammingTestRun = {
      challengeId: 'pc_3',
      code: 'passing code',
      testCount: 1,
      allPassed: true
    };

    app.editorCode = 'changed failing code';

    expect(app.submitProgramChallenge(challenge, 'I changed it after testing.')).toBe(false);
    expect(db.getProgrammingSubmissions()).toHaveLength(0);
    expect(app.currentUser.achievements).toEqual([]);
  });

  test('an edit made while tests run cannot inherit the earlier code results', async () => {
    const { app } = loadApplication();
    const challenge = { id: 'pc_3', testCases: [{ input: [], expected: 'ok' }] };
    app.alert = jest.fn();
    app.switchTab = jest.fn();
    app.editorCode = 'tested code';
    let finishTests;
    app.executePythonTests = jest.fn((_challenge, testedCode) => {
      expect(testedCode).toBe('tested code');
      return new Promise(resolve => { finishTests = resolve; });
    });

    const running = app.runPythonCodeSandbox(challenge);
    app.editorCode = 'edited while tests run';
    finishTests([{ output: 'ok', error: '' }]);
    await running;

    expect(app.lastProgrammingTestRun.code).toBe('tested code');
    expect(app.submitProgramChallenge(challenge, 'Reflection')).toBe(false);
    expect(app.currentUser.achievements).toEqual([]);
  });

  test('achievement actions open the intended learner routes and fail safely', () => {
    const { app, db } = loadApplication();
    app.switchTab = jest.fn();

    expect(app.openAchievementRoute('binary-fluent')).toBe(true);
    expect(app.switchTab).toHaveBeenCalledWith('stud-practise');

    app.activeChallengeId = 'pc_1';
    app.programmingStage = 'explain';
    app.editorCode = 'stale code';
    app.supportLevelUsed = 4;
    app.lastProgrammingEvidence = [{ passed: true }];
    app.lastProgrammingTestRun = { challengeId: 'pc_1', code: 'stale code', testCount: 1, allPassed: true };
    app.predictInputValue = 'stale prediction';
    app.codingExplanationValue = 'stale explanation';
    expect(app.openAchievementRoute('debugging-detective')).toBe(true);
    expect(app.activeChallengeId).toBe('pc_3');
    expect(app.programmingStage).toBe('predict');
    expect(app.lastProgrammingEvidence).toEqual([]);
    expect(app.lastProgrammingTestRun).toBeNull();
    expect(app.supportLevelUsed).toBe(0);
    expect(app.predictInputValue).toBe('');
    expect(app.codingExplanationValue).toBe('');
    expect(app.editorCode).toBe(db.getProgrammingChallenges().find(item => item.id === 'pc_3').code);
    expect(app.switchTab).toHaveBeenCalledWith('stud-programme');

    db.cachedData.programmingChallenges = [];
    const panel = { innerHTML: '', querySelector: () => null };
    expect(app.openAchievementRoute('debugging-detective', panel)).toBe(false);
    expect(panel.innerHTML).toContain('Activity unavailable');
  });
});
