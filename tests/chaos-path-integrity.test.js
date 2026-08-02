const fs = require('fs');
const path = require('path');
const vm = require('vm');

function makeStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: jest.fn(key => values.has(key) ? values.get(key) : null),
    setItem: jest.fn((key, value) => values.set(key, String(value))),
    removeItem: jest.fn(key => values.delete(key)),
    values
  };
}

function loadApp({ localStorage = makeStorage(), sessionStorage = makeStorage(), confirmResult = true } = {}) {
  const document = {
    addEventListener: jest.fn(),
    body: { classList: { add: jest.fn(), remove: jest.fn(), toggle: jest.fn() } },
    getElementById: jest.fn(() => null),
    querySelector: jest.fn(() => null),
    querySelectorAll: jest.fn(() => [])
  };
  const window = {
    addEventListener: jest.fn(),
    confirm: jest.fn(() => confirmResult),
    db: {
      getAttempts: jest.fn(() => []),
      getExamTransferTasks: jest.fn(() => [{ id: 'task_1', topicId: 'topic_1', specificationPointId: '1.1.1' }]),
      getUnits: jest.fn(() => [])
    },
    location: { href: '', search: '' }
  };
  const context = vm.createContext({
    clearTimeout,
    confirm: window.confirm,
    console,
    Date,
    document,
    fetch: jest.fn(),
    JSON,
    localStorage,
    Map,
    Math,
    sessionStorage,
    Set,
    setTimeout,
    URLSearchParams,
    window
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8'), context);
  return { app: window.app, document, localStorage, sessionStorage, window };
}

describe('chaos-path integrity guards', () => {
  test('restores a saved exam draft after a reload', () => {
    const sessionStorage = makeStorage();
    const first = loadApp({ sessionStorage });
    first.app.currentUser = { id: 'student_1', role: 'student' };
    first.app.activeExamTransferId = 'task_1';
    first.app.examTransferStage = 'answer';
    first.app.examTransferDecodeResponse = 'Explain the register roles';
    first.app.examTransferPlan = { 0: 'PC stores the next address' };
    first.app.examTransferResponse = 'The PC sends the address to the MAR.';

    first.app.saveExamTransferDraft();

    const second = loadApp({ sessionStorage });
    second.app.currentUser = { id: 'student_1', role: 'student' };
    expect(second.app.restoreExamTransferDraft()).toBe(true);
    expect(second.app.activeExamTransferId).toBe('task_1');
    expect(second.app.examTransferStage).toBe('answer');
    expect(second.app.examTransferResponse).toBe('The PC sends the address to the MAR.');
    expect(second.app.examTransferPlan).toEqual({ 0: 'PC stores the next address' });
  });

  test('does not leave an exam route when the learner cancels draft disposal', () => {
    const { app, window } = loadApp({ confirmResult: false });
    app.currentUser = { id: 'student_1', role: 'student' };
    app.activeTab = 'stud-exam-transfer';
    app.examTransferStage = 'answer';
    app.examTransferResponse = 'A useful unfinished response';
    app.saveExamTransferDraft();
    app.render = jest.fn();

    expect(app.switchTab('stud-dashboard')).toBe(false);
    expect(app.activeTab).toBe('stud-exam-transfer');
    expect(window.confirm).toHaveBeenCalledWith('Leave this exam question and discard your unfinished work?');
    expect(app.render).not.toHaveBeenCalled();
  });

  test('restores a saved custom paper with stable questions and answers', () => {
    const sessionStorage = makeStorage();
    const first = loadApp({ sessionStorage });
    first.app.currentUser = { id: 'student_1', role: 'student' };
    first.app.currentTestSession = {
      sessionId: 'paper_1', totalMarks: 5, timeLimitMinutes: 6,
      questions: [
        { id: 'q1', type: 'constructed', question: 'Explain a process.', marks: 4 },
        { id: 'q2', type: 'mcq', question: 'Choose one.', marks: 1 }
      ]
    };
    first.app.currentTestAnswers = ['A developed saved answer', 'Option B'];
    first.app.saveCustomTestDraft();

    const second = loadApp({ sessionStorage });
    second.app.currentUser = { id: 'student_1', role: 'student' };
    expect(second.app.restoreCustomTestDraft()).toBe(true);
    expect(second.app.currentTestSession.sessionId).toBe('paper_1');
    expect(second.app.currentTestSession.questions.map(question => question.id)).toEqual(['q1', 'q2']);
    expect(second.app.currentTestAnswers).toEqual(['A developed saved answer', 'Option B']);
  });

  test('keeps an unfinished custom paper when the learner leaves and allows unanswered review', () => {
    const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');

    expect(source).toContain("case 'stud-custom-test':");
    expect(source).toContain("this.switchTab('stud-custom-test')");
    expect(source).toContain('custom-test-navigator');
    expect(source).toContain('data-jump-question');
    expect(source).toContain("button.classList.toggle('is-answered', answered)");
    expect(source).toContain('Open self-check anyway');
    expect(source).toContain('Review unanswered');
    expect(source).toContain('Review and finish');
    expect(source).toContain('Your answers are saved in this browser session');
    expect(source).toContain('Build a new practice paper and replace your saved unfinished paper?');
    expect(source).toContain('sessionStorage.removeItem?.(key)');
    expect(source).toContain('<form id="num-skills-form" novalidate>');
    expect(source).toContain('Blank boxes are not counted as answers.');
    expect(source).not.toContain("alert('Please enter a prediction before proceeding.')");
  });
});
