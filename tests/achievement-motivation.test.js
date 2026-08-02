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

    expect(html).toContain('Next badges to earn');
    expect(html).toContain('Complete the Number skills activity');
    expect(html).toContain('Fix loop &amp; pass tests');
    expect((html.match(/student-achievement-card--next/g) || [])).toHaveLength(2);
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

  test.each([
    ['pc_14', 'def binary_search(values, target):\n    return values.index(target)', ['\\.index\\s*\\(']],
    ['pc_15', 'def bubble_sort(values):\n    return sorted(values)', ['\\bsorted\\s*\\(', '\\.sort\\s*\\(']]
  ])('does not award %s algorithm evidence for a built-in shortcut', (id, code, forbiddenCompletionPatterns) => {
    const { app } = loadApplication();
    const challenge = { id, code: 'pass', testCases: [{ expected: 'ok' }], forbiddenCompletionPatterns };
    app.alert = jest.fn();
    app.editorCode = code;
    app.lastProgrammingEvidence = [{ passed: true }];
    app.lastProgrammingTestRun = { challengeId: id, code, testCount: 1, allPassed: true };

    expect(app.submitProgramChallenge(challenge, 'I used the named algorithm.')).toBe(false);
    expect(app.alert).toHaveBeenCalledWith(expect.stringContaining('algorithm named in the task'));
  });

  test('does not turn unchanged guided starter code into programming completion', () => {
    const { app, db } = loadApplication();
    const challenge = db.getProgrammingChallenges().find(item => item.id === 'pc_1');
    app.alert = jest.fn();
    app.switchTab = jest.fn();
    app.editorCode = challenge.code;
    app.lastProgrammingEvidence = challenge.testCases.map(() => ({ passed: true }));
    app.lastProgrammingTestRun = {
      challengeId: challenge.id,
      code: challenge.code,
      testCount: challenge.testCases.length,
      allPassed: true
    };

    expect(app.submitProgramChallenge(challenge, 'The strings are joined.')).toBe(false);
    expect(db.getProgrammingSubmissions()).toHaveLength(0);
    expect(app.alert).toHaveBeenCalledWith(expect.stringContaining('Make a meaningful change'));
  });

  test('stores guided completion separately from demonstrated programming evidence', () => {
    const { app, db } = loadApplication();
    const challenge = db.getProgrammingChallenges().find(item => item.id === 'pc_1');
    app.alert = jest.fn();
    app.switchTab = jest.fn();
    app.editorCode = `${challenge.code}\n# I traced this example`;
    app.lastProgrammingEvidence = challenge.testCases.map(() => ({ passed: true }));
    app.lastProgrammingTestRun = {
      challengeId: challenge.id,
      code: app.editorCode,
      testCount: challenge.testCases.length,
      allPassed: true
    };

    expect(app.submitProgramChallenge(challenge, 'The strings are joined.')).toBe(true);
    expect(db.getProgrammingSubmissions()[0]).toMatchObject({
      status: 'Formative Complete',
      contributesToMastery: false,
      evidenceLevel: 'guided-practice'
    });
  });

  test('opens exam programming directly in independent editor mode', () => {
    const { app } = loadApplication();

    expect(app.activateProgrammingChallenge('pc_9', 'exam')).toBe(true);
    expect(app.programmingPracticeMode).toBe('exam');
    expect(app.programmingStage).toBe('run');
  });

  test('persists ERL model exposure beyond volatile page state', () => {
    const { app, db } = loadApplication();
    expect(app.recordPseudocodeSupport('pseudocode_6', 'model')).toBe(true);
    app.pseudocodeSupportByTask = {};

    expect(app.getPseudocodeSupport('pseudocode_6')).toBe('model');
    expect(db.getStudents().find(student => student.id === app.currentUser.id).pseudocodeSupportHistory)
      .toMatchObject({ pseudocode_6: 'model' });
    expect(app.recordPseudocodeSupport('pseudocode_6', 'hint')).toBe(false);
    expect(app.getPseudocodeSupport('pseudocode_6')).toBe('model');
  });

  test('interprets modern, reviewed and legacy programming evidence safely', () => {
    const { app } = loadApplication();
    expect(app.isIndependentProgrammingSubmission({ status: 'Passed', evidenceLevel: 'independent', supportUsed: 'None' })).toBe(true);
    expect(app.isIndependentProgrammingSubmission({ status: 'Passed', evidenceLevel: 'completed-with-support', supportUsed: 'High' })).toBe(false);
    expect(app.isIndependentProgrammingSubmission({ status: 'Teacher Reviewed', supportUsed: 'Medium' })).toBe(true);
    expect(app.isIndependentProgrammingSubmission({ status: 'Passed', supportUsed: 'None' })).toBe(true);
    expect(app.isIndependentProgrammingSubmission({ status: 'Passed', supportUsed: 'High' })).toBe(false);
    expect(app.isIndependentProgrammingSubmission({ status: 'Passed' })).toBe(false);
  });

  test('does not reveal expected answers from unseen programming checks', async () => {
    const { app } = loadApplication();
    const challenge = {
      id: 'hidden_test_challenge',
      code: 'print("wrong")',
      testCases: [{ input: 'private input', expected: 'private expected', visibility: 'hidden' }]
    };
    app.editorCode = challenge.code;
    app.alert = jest.fn();
    app.executePythonTests = jest.fn().mockResolvedValue([{ output: 'wrong', error: '' }]);

    await app.runPythonCodeSandbox(challenge);

    expect(app.lastProgrammingEvidence[0].passed).toBe(false);
    expect(app.lastProgrammingEvidence[0].error).toContain('unseen case');
    expect(app.lastProgrammingEvidence[0].error).not.toContain('private expected');
    expect(app.lastProgrammingEvidence[0].error).not.toContain('private input');
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
