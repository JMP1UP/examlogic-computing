const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadApp() {
  const database = {
    addAssignment: jest.fn(),
    getAssignments: jest.fn(() => []),
    getAttempts: jest.fn(() => []),
    getClasses: jest.fn(() => [{ id: 'class_1', name: 'Class <One>', teacherId: 'teacher_1' }]),
    getCoordinators: jest.fn(() => []),
    getMessages: jest.fn(() => []),
    getProgrammingChallenges: jest.fn(() => []),
    getProgrammingSubmissions: jest.fn(() => []),
    getStudents: jest.fn(() => []),
    getTestPreps: jest.fn(() => []),
    getSupportSessions: jest.fn(() => []),
    getClassroomControls: jest.fn(() => ({})),
    getUnits: jest.fn(() => []),
    getWrittenQuestions: jest.fn(() => []),
    getWrittenSubmissions: jest.fn(() => []),
    updateWrittenSubmission: jest.fn(),
    updateClassroomControl: jest.fn(),
    addMessage: jest.fn()
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
  return { app: window.app, database, document };
}

function panel() {
  return { innerHTML: '', querySelector: jest.fn(() => null), querySelectorAll: jest.fn(() => []) };
}

describe('staff integrity boundaries', () => {
  test('teacher message renderer escapes stored names, previews, bodies and draft attributes', () => {
    const { app, database } = loadApp();
    app.currentUser = { id: 'teacher_1', role: 'teacher' };
    app.teacherMessageDraft = '" autofocus onfocus="alert(4)';
    database.getStudents.mockReturnValue([{
      id: 'student_1',
      classId: 'class_1',
      name: 'Pupil <svg onload=alert(1)>',
      yearGroup: 'Year "10"'
    }]);
    database.getMessages.mockReturnValue([{
      senderId: 'student_1',
      receiverId: 'teacher_1',
      text: '<img src=x onerror="alert(2)"><script>alert(3)</script>',
      timestamp: '2026-01-01'
    }]);
    const target = panel();

    app.renderTeacherMessages(target);

    expect(target.innerHTML).toContain('Pupil &lt;svg onload=alert(1)&gt;');
    expect(target.innerHTML).toContain('&lt;script&gt;alert(3)&lt;/script&gt;');
    expect(target.innerHTML).not.toContain('<script>');
    expect(target.innerHTML).not.toContain('<img src=x onerror=');
    expect(target.innerHTML).toContain('&quot; autofocus onfocus=&quot;alert(4)');
  });

  test('programming review displays submitted code and explanations as literal text', () => {
    const { app, database } = loadApp();
    app.currentUser = { id: 'teacher_1', role: 'teacher' };
    database.getStudents.mockReturnValue([{ id: 'student_1', classId: 'class_1', name: '<b>Pupil</b>' }]);
    database.getProgrammingChallenges.mockReturnValue([{ id: 'challenge_1', title: '<i>Challenge</i>', testCases: [] }]);
    database.getProgrammingSubmissions.mockReturnValue([{
      studentId: 'student_1',
      challengeId: 'challenge_1',
      status: 'Awaiting <script>',
      supportUsed: 'None',
      explanationResponse: '<img src=x onerror=alert(1)>',
      code: 'if x < 2: print("<unsafe>")'
    }]);
    const target = panel();

    app.renderTeacherProgramming(target);

    expect(target.innerHTML).toContain('&lt;b&gt;Pupil&lt;/b&gt;');
    expect(target.innerHTML).toContain('&lt;i&gt;Challenge&lt;/i&gt;');
    expect(target.innerHTML).toContain('&lt;img src=x onerror=alert(1)&gt;');
    expect(target.innerHTML).toContain('if x &lt; 2: print(&quot;&lt;unsafe&gt;&quot;)');
    expect(target.innerHTML).not.toContain('<img src=x');
  });

  test('teacher context fails closed and scopes pupils, messages and submissions to an authorised class', () => {
    const { app, database } = loadApp();
    app.currentUser = { id: 'teacher_1', role: 'teacher' };
    database.getClasses.mockReturnValue([
      { id: 'class_1', name: 'Own class', teacherId: 'teacher_1' },
      { id: 'class_2', name: 'Other class', teacherId: 'teacher_2' }
    ]);
    database.getStudents.mockReturnValue([
      { id: 'student_1', classId: 'class_1' },
      { id: 'student_2', classId: 'class_2' },
      { id: 'orphan', classId: 'missing' }
    ]);
    database.getMessages.mockReturnValue([
      { id: 'own', senderId: 'student_1', receiverId: 'teacher_1' },
      { id: 'cross-class', senderId: 'student_2', receiverId: 'teacher_1' },
      { id: 'other-teacher', senderId: 'student_1', receiverId: 'teacher_2' }
    ]);
    const records = [
      { id: 'own', studentId: 'student_1' },
      { id: 'cross-class', studentId: 'student_2' },
      { id: 'orphan', studentId: 'orphan' }
    ];

    expect(app.getAuthorizedTeacherClasses().map(item => item.id)).toEqual(['class_1']);
    expect(app.getTeacherClassStudents().map(item => item.id)).toEqual(['student_1']);
    expect(app.getTeacherClassMessages().map(item => item.id)).toEqual(['own']);
    expect(app.getTeacherClassRecords(records).map(item => item.id)).toEqual(['own']);

    app.selectedTeacherClassId = 'class_2';
    expect(app.getSelectedTeacherClass().id).toBe('class_1');
  });

  test('teacher cannot message a pupil outside the selected authorised class', () => {
    const { app, database } = loadApp();
    app.currentUser = { id: 'teacher_1', role: 'teacher' };
    app.teacherMessageDraft = 'Private class message';
    app.alert = jest.fn();
    app.render = jest.fn();
    database.getStudents.mockReturnValue([
      { id: 'student_1', classId: 'class_1' },
      { id: 'student_2', classId: 'class_2' }
    ]);

    app.sendTeacherMessage('student_2');

    expect(database.addMessage).not.toHaveBeenCalled();
    expect(app.alert).toHaveBeenCalledWith(expect.stringContaining('not in your selected authorised class'));
    expect(app.teacherMessageDraft).toBe('Private class message');
  });

  test('legacy classroom controls remain readable while new changes are class-scoped', () => {
    const storage = new Map();
    global.localStorage = {
      getItem: jest.fn(key => storage.get(key) ?? null),
      setItem: jest.fn((key, value) => storage.set(key, value)),
      removeItem: jest.fn(key => storage.delete(key))
    };
    global.window = {};
    jest.resetModules();
    require('../database');
    const localDb = global.window.db;
    localDb.cachedData.classroomControls = { topic_1: 'teaching' };

    expect(localDb.getClassroomControls('class_2')).toEqual({ topic_1: 'teaching' });
    localDb.updateClassroomControl('topic_1', 'priority', 'class_2');
    expect(localDb.getClassroomControls('class_2')).toEqual({ topic_1: 'priority' });
    expect(localDb.cachedData.classroomControls.topic_1).toBe('teaching');

    delete global.window;
    delete global.localStorage;
  });

  test('teacher overview reports scoped flagged messages instead of a false clear state', () => {
    const { app, database } = loadApp();
    app.currentUser = { id: 'teacher_1', role: 'teacher' };
    database.getStudents.mockReturnValue([
      { id: 'student_1', classId: 'class_1', lastActive: '2026-07-29', personalRevisionPriorities: [] },
      { id: 'student_2', classId: 'class_2', lastActive: '2026-07-29', personalRevisionPriorities: [] }
    ]);
    database.getMessages.mockReturnValue([
      { senderId: 'student_1', receiverId: 'teacher_1', flagged: true },
      { senderId: 'student_2', receiverId: 'teacher_1', flagged: true }
    ]);
    const target = panel();

    app.renderTeacherOverview(target);

    expect(target.innerHTML).toContain('1 flagged message in this class');
    expect(target.innerHTML).not.toContain('No flagged messages in this class');
    expect(target.innerHTML).not.toContain('Message monitoring: clear');
  });

  test('pending written work hides automated estimates and requires an independent teacher mark', () => {
    const { app, database } = loadApp();
    app.currentUser = { id: 'teacher_1', role: 'teacher' };
    database.getStudents.mockReturnValue([{ id: 'student_1', classId: 'class_1', name: 'Pupil' }]);
    database.getWrittenQuestions.mockReturnValue([{ id: 'question_1', question: 'Explain this.', marks: 4 }]);
    database.getWrittenSubmissions.mockReturnValue([{
      id: 'submission_1',
      studentId: 'student_1',
      questionId: 'question_1',
      response: 'Response',
      estimatedMark: '4',
      strengths: 'A prompt',
      improvements: 'Another prompt',
      status: 'Awaiting Teacher Review',
      date: '2026-07-29'
    }]);
    const target = panel();

    app.renderTeacherWritten(target);

    expect(target.innerHTML).not.toContain('Estimated Mark');
    expect(target.innerHTML).not.toContain('value="4"');
    expect(target.innerHTML).toContain('name="teacherMark"');
    expect(target.innerHTML).toContain('Record reviewed mark');
    expect(database.getWrittenSubmissions()[0].estimatedMark).toBe('4');
  });

  test('only a valid explicitly entered teacher mark is recorded', () => {
    const { app, database } = loadApp();
    app.currentUser = { id: 'teacher_1', role: 'teacher' };
    app.alert = jest.fn();
    app.render = jest.fn();
    database.getStudents.mockReturnValue([{ id: 'student_1', classId: 'class_1' }]);
    database.getWrittenQuestions.mockReturnValue([{ id: 'question_1', marks: 4 }]);
    database.getWrittenSubmissions.mockReturnValue([{
      id: 'submission_1',
      studentId: 'student_1',
      questionId: 'question_1',
      estimatedMark: '4',
      status: 'Awaiting Teacher Review'
    }]);
    const invalidForm = { elements: { teacherMark: { value: '' }, teacherFeedback: { value: 'Check this.' } } };
    const validForm = { elements: { teacherMark: { value: '2' }, teacherFeedback: { value: 'Check this.' } } };

    app.submitTeacherWrittenOverride('submission_1', invalidForm);
    expect(database.updateWrittenSubmission).not.toHaveBeenCalled();

    app.submitTeacherWrittenOverride('submission_1', validForm);
    expect(database.updateWrittenSubmission).toHaveBeenCalledWith('submission_1', {
      teacherMark: '2',
      teacherFeedback: 'Check this.',
      status: 'Teacher Reviewed'
    });
  });

  test('an orphaned written submission is preserved but cannot be marked against an invented total', () => {
    const { app, database } = loadApp();
    app.currentUser = { id: 'teacher_1', role: 'teacher' };
    app.alert = jest.fn();
    database.getStudents.mockReturnValue([{ id: 'student_1', classId: 'class_1', name: 'Pupil' }]);
    database.getWrittenSubmissions.mockReturnValue([{
      id: 'orphan_submission',
      studentId: 'student_1',
      questionId: 'removed_question',
      response: 'Preserved response',
      estimatedMark: '4',
      status: 'Awaiting Teacher Review',
      date: '2026-07-29'
    }]);
    const target = panel();

    app.renderTeacherWritten(target);
    expect(target.innerHTML).toContain('Question unavailable — mark cannot be recorded');
    expect(target.innerHTML).not.toContain('class="teacher-grade-form"');

    app.submitTeacherWrittenOverride('orphan_submission', {
      elements: { teacherMark: { value: '4' }, teacherFeedback: { value: '' } }
    });
    expect(database.updateWrittenSubmission).not.toHaveBeenCalled();
    expect(database.getWrittenSubmissions()[0].response).toBe('Preserved response');
  });

  test('flagged-message action selects the affected authorised pupil before opening Messages', () => {
    const { app, database, document } = loadApp();
    app.currentUser = { id: 'teacher_1', role: 'teacher' };
    app.switchTab = jest.fn();
    database.getStudents.mockReturnValue([
      { id: 'student_1', classId: 'class_1', name: 'Pupil', lastActive: '2026-07-29', personalRevisionPriorities: [] }
    ]);
    database.getMessages.mockReturnValue([
      { id: 'flag_1', senderId: 'student_1', receiverId: 'teacher_1', flagged: true }
    ]);
    const flaggedButton = {};
    document.getElementById.mockImplementation(id => id === 'teacher-flagged-messages' ? flaggedButton : null);
    const target = panel();

    app.renderTeacherOverview(target);
    flaggedButton.onclick();

    expect(app.selectedChatStudentId).toBe('student_1');
    expect(app.switchTab).toHaveBeenCalledWith('teach-messages');
  });

  test('assignment publishing rejects an injected cross-class pupil and stores the selected class', () => {
    const { app, database, document } = loadApp();
    app.currentUser = { id: 'teacher_1', role: 'teacher' };
    app.alert = jest.fn();
    app.render = jest.fn();
    database.getStudents.mockReturnValue([
      { id: 'student_1', classId: 'class_1', name: 'Own pupil' },
      { id: 'student_2', classId: 'class_2', name: 'Other pupil' }
    ]);
    database.getUnits.mockReturnValue([{ topics: [{ id: 'topic_1', name: 'Systems' }] }]);
    const form = {};
    const elements = {
      'create-assign-form': form,
      'assign-title-in': { value: 'Short check' },
      'assign-topic-in': { value: 'topic_1' },
      'assign-date-in': { value: '2026-08-20' },
      'assign-minutes-in': { value: '10' },
      'assign-status-in': { value: 'Required' },
      'assign-recipient-in': { value: 'student_2' }
    };
    document.getElementById.mockImplementation(id => elements[id] || null);
    const target = panel();

    app.renderTeacherAssign(target);
    form.onsubmit({ preventDefault: jest.fn() });
    expect(database.addAssignment).not.toHaveBeenCalled();

    elements['assign-recipient-in'].value = 'student_1';
    form.onsubmit({ preventDefault: jest.fn() });
    expect(database.addAssignment).toHaveBeenCalledWith(expect.objectContaining({
      classId: 'class_1',
      recipientType: 'students',
      recipientIds: ['student_1']
    }));
  });

  test('class broadcast reaches only pupils in the selected class and uses the signed-in teacher', () => {
    const { app, database, document } = loadApp();
    app.currentUser = { id: 'teacher_1', role: 'teacher' };
    app.alert = jest.fn();
    app.render = jest.fn();
    database.getStudents.mockReturnValue([
      { id: 'student_1', classId: 'class_1', name: 'Own pupil', yearGroup: 'Year 10' },
      { id: 'student_2', classId: 'class_2', name: 'Other pupil', yearGroup: 'Year 10' }
    ]);
    const broadcastForm = {};
    const broadcastText = { value: 'Bring your notes' };
    const elements = {
      'broadcast-form': broadcastForm,
      'broadcast-text': broadcastText
    };
    document.getElementById.mockImplementation(id => elements[id] || null);
    const target = panel();

    app.renderTeacherMessages(target);
    broadcastForm.onsubmit({ preventDefault: jest.fn() });

    expect(database.addMessage).toHaveBeenCalledTimes(1);
    expect(database.addMessage).toHaveBeenCalledWith({
      senderId: 'teacher_1',
      receiverId: 'student_1',
      text: '[CLASS ANNOUNCEMENT]: Bring your notes'
    });
  });

  test('test-preparation and session renderers encode hostile preserved IDs and session fields', () => {
    const { app, database, document } = loadApp();
    app.currentUser = { id: 'teacher_1', role: 'teacher' };
    const hostileStudent = {
      id: 'student_1" autofocus onfocus="alert(1)',
      classId: 'class_1',
      name: 'Pupil <img src=x>'
    };
    const hostileSession = {
      id: 'session_1',
      classId: 'class_1',
      type: 'Revision',
      title: 'Stored session',
      date: '<img src=x onerror="alert(2)">',
      startTime: '15:45',
      durationMinutes: '<svg onload="alert(3)">',
      location: 'Room <One>',
      recipientType: 'class',
      recipientIds: []
    };
    database.getStudents.mockReturnValue([hostileStudent]);
    database.getSupportSessions.mockReturnValue([hostileSession]);
    const prepSummary = { textContent: '' };
    const prepWeekly = { value: '20' };
    const prepForm = {};
    const wholeClass = { checked: false };
    const sessionSummary = { textContent: '' };
    const sessionForm = {};
    const elements = {
      'prep-selection-summary': prepSummary,
      'prep-weekly-in': prepWeekly,
      'test-prep-form': prepForm,
      'session-whole-class-in': wholeClass,
      'session-recipient-summary': sessionSummary,
      'support-session-form': sessionForm
    };
    document.getElementById.mockImplementation(id => elements[id] || null);
    const prepPanel = panel();
    const sessionPanel = panel();
    const before = JSON.stringify({ hostileStudent, hostileSession });

    app.renderTeacherTestPrep(prepPanel);
    app.renderTeacherSessions(sessionPanel);

    expect(prepPanel.innerHTML).toContain('student_1&quot; autofocus onfocus=&quot;alert(1)');
    expect(prepPanel.innerHTML).toContain('Pupil &lt;img src=x&gt;');
    expect(sessionPanel.innerHTML).toContain('student_1&quot; autofocus onfocus=&quot;alert(1)');
    expect(sessionPanel.innerHTML).toContain('&lt;img src=x onerror=&quot;alert(2)&quot;&gt;');
    expect(sessionPanel.innerHTML).toContain('&lt;svg onload=&quot;alert(3)&quot;&gt;');
    expect(sessionPanel.innerHTML).not.toContain('<svg onload=');
    expect(JSON.stringify({ hostileStudent, hostileSession })).toBe(before);
  });
});
