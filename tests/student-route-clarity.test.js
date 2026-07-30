const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadApp() {
  const database = {
    addMessage: jest.fn(),
    getAttempts: jest.fn(() => []),
    getClasses: jest.fn(() => []),
    getCoordinators: jest.fn(() => []),
    getCurriculumContent: jest.fn(() => []),
    getMessages: jest.fn(() => []),
    getProgrammingSubmissions: jest.fn(() => []),
    getSettings: jest.fn(() => ({ communicationHours: '08:30 - 17:00' })),
    getStudents: jest.fn(() => []),
    getUnits: jest.fn(() => []),
    getWrittenSubmissions: jest.fn(() => [])
  };
  const document = {
    addEventListener: jest.fn(),
    body: { classList: { add: jest.fn(), remove: jest.fn(), toggle: jest.fn() } },
    getElementById: jest.fn(() => null),
    querySelector: jest.fn(() => null),
    querySelectorAll: jest.fn(() => [])
  };
  const window = {
    addEventListener: jest.fn(),
    db: database,
    location: { href: '', search: '' }
  };
  const context = vm.createContext({
    clearTimeout,
    confirm: jest.fn(() => true),
    console,
    Date,
    document,
    fetch: jest.fn(),
    JSON,
    Map,
    Math,
    Set,
    setTimeout,
    URLSearchParams,
    window
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8'), context);
  return { app: window.app, database };
}

describe('student route clarity behaviour', () => {
  test('messages use only the assigned contact for identity and delivery', () => {
    const { app, database } = loadApp();
    app.currentUser = { id: 'student_1', classId: 'class_1', role: 'student' };
    app.messageDraft = 'Please help';
    app.render = jest.fn();
    database.getStudents.mockReturnValue([app.currentUser]);
    database.getClasses.mockReturnValue([{ id: 'class_1', teacherId: 'teacher_1' }]);
    database.getCoordinators.mockReturnValue([
      { id: 'teacher_1', name: 'Assigned Teacher' },
      { id: 'teacher_2', name: 'Other Teacher' }
    ]);
    database.getMessages.mockReturnValue([
      { senderId: 'teacher_1', receiverId: 'student_1', text: 'Assigned message', timestamp: '2026-01-01' },
      { senderId: 'teacher_2', receiverId: 'student_1', text: 'Other message', timestamp: '2026-01-02' }
    ]);
    const panel = { innerHTML: '', querySelector: jest.fn(() => null) };

    app.renderStudentMessages(panel);
    app.sendMessage();

    expect(panel.innerHTML).toContain('Assigned Teacher');
    expect(panel.innerHTML).toContain('Assigned message');
    expect(panel.innerHTML).not.toContain('Other message');
    expect(database.addMessage).toHaveBeenCalledWith(expect.objectContaining({
      senderId: 'student_1',
      receiverId: 'teacher_1',
      text: 'Please help'
    }));
  });

  test('messages fail safely when no assigned contact can be confirmed', () => {
    const { app, database } = loadApp();
    app.currentUser = { id: 'student_1', classId: 'missing_class', role: 'student' };
    app.messageDraft = 'Do not send';
    app.alert = jest.fn();
    database.getStudents.mockReturnValue([app.currentUser]);
    const panel = { innerHTML: '', querySelector: jest.fn(() => null) };

    app.renderStudentMessages(panel);
    app.sendMessage();

    expect(panel.innerHTML).toContain('Teacher messaging unavailable');
    expect(database.addMessage).not.toHaveBeenCalled();
    expect(app.alert).toHaveBeenCalledWith(expect.stringContaining('No message was sent'));
  });

  test('messages display stored markup as text rather than executable HTML', () => {
    const { app, database } = loadApp();
    app.currentUser = { id: 'student_1', classId: 'class_1', role: 'student' };
    database.getStudents.mockReturnValue([app.currentUser]);
    database.getClasses.mockReturnValue([{ id: 'class_1', teacherId: 'teacher_1' }]);
    database.getCoordinators.mockReturnValue([{ id: 'teacher_1', name: 'Teacher <img src=x>' }]);
    database.getMessages.mockReturnValue([{
      senderId: 'teacher_1',
      receiverId: 'student_1',
      text: '<img src=x onerror="alert(1)"><script>alert(2)</script>',
      timestamp: '2026-01-01'
    }]);
    const panel = { innerHTML: '', querySelector: jest.fn(() => null) };

    app.renderStudentMessages(panel);

    expect(panel.innerHTML).toContain('&lt;script&gt;alert(2)&lt;/script&gt;');
    expect(panel.innerHTML).toContain('Teacher &lt;img src=x&gt;');
    expect(panel.innerHTML).not.toContain('<script>');
    expect(panel.innerHTML).not.toContain('<img src=x onerror=');
  });

  test('Progress opens a focused Learn route only when teaching exists', () => {
    const { app, database } = loadApp();
    app.currentUser = { id: 'student_1', role: 'student', achievements: [] };
    app.getSectionMilestones = jest.fn(() => [{
      available: true,
      demonstratedFocuses: [],
      evidenceSourceCount: 0,
      id: '1.1.1',
      latestDate: null,
      name: 'CPU architecture',
      paper: 'Paper 1',
      remainingFocuses: ['knowledge'],
      state: 'not_started'
    }]);
    app.switchTab = jest.fn();
    database.getStudents.mockReturnValue([app.currentUser]);
    database.getCurriculumContent.mockReturnValue([{ id: '1.1.1' }]);
    database.getUnits.mockReturnValue([{
      paper: 'Paper 1',
      topics: [{ id: 'topic_1', name: 'Systems', objectives: [{ id: '1.1.1' }] }]
    }]);
    const routeButton = { getAttribute: jest.fn(() => '1.1.1'), onclick: null };
    const panel = {
      innerHTML: '',
      querySelectorAll: jest.fn(() => [routeButton])
    };

    app.renderStudentProgress(panel);
    routeButton.onclick();

    expect(app.activeTopicId).toBe('topic_1');
    expect(app.activeObjectiveId).toBe('1.1.1');
    expect(app.switchTab).toHaveBeenCalledWith('stud-learn');
  });

  test('Progress does not promise a focused route when teaching is missing', () => {
    const { app, database } = loadApp();
    app.currentUser = { id: 'student_1', role: 'student', achievements: [] };
    app.getSectionMilestones = jest.fn(() => [{
      available: false,
      demonstratedFocuses: [],
      evidenceSourceCount: 0,
      id: 'missing_objective',
      latestDate: null,
      name: 'Unavailable section',
      paper: 'Paper 1',
      remainingFocuses: [],
      state: 'not_available'
    }]);
    database.getStudents.mockReturnValue([app.currentUser]);
    database.getUnits.mockReturnValue([{ paper: 'Paper 1', topics: [] }]);
    const panel = { innerHTML: '', querySelectorAll: jest.fn(() => []) };

    app.renderStudentProgress(panel);

    expect(panel.innerHTML).not.toContain('data-objective-id="missing_objective"');
    expect(panel.innerHTML).toContain('Learning route unavailable for this section.');
  });

  test.each([
    ['binary-shift', 'Perform one left shift', 'shift-left-1'],
    ['fde-cycle', 'complete fetch-decode-execute cycle', 'fde-step-btn'],
    ['logic-gates', 'Try two input combinations', 'toggle-input-a'],
    ['algorithms', 'compare the displayed traces', 'alg-type-btn'],
    ['file-size-calc', 'check its file-size units', 'calc-img-w']
  ])('simulator %s pairs its brief with an existing control and exit', (tool, brief, control) => {
    const { app } = loadApp();
    app.activeSimTool = tool;
    const panel = { innerHTML: '', querySelectorAll: jest.fn(() => []) };

    app.renderStudentSimulators(panel);

    expect(panel.innerHTML).toContain(brief);
    expect(panel.innerHTML).toContain(control);
    expect(panel.innerHTML).toContain('Finish and return to Topics');
  });
});
