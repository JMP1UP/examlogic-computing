const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadApp() {
  const data = {
    students: [{ id: 'student_1', role: 'student', classId: 'class_1' }],
    attempts: [],
    controls: { topic_1_1: 'practice' },
    units: [{
      paper: 'Paper 1',
      title: 'Computer systems',
      topics: [{
        id: 'topic_1_1',
        code: '1.1',
        name: 'Systems Architecture',
        objectives: [{ id: '1.1.1', name: 'Architecture of the CPU' }]
      }]
    }]
  };
  const database = {
    getAttempts: jest.fn(() => data.attempts),
    getClassroomControls: jest.fn(() => data.controls),
    getCurriculumContent: jest.fn(() => [{
      id: '1.1.1',
      scope: 'Architecture of the CPU',
      explanation: 'The CPU fetches, decodes and executes instructions.',
      workedExample: 'The PC supplies the next address.',
      misconception: 'The MAR stores an address.'
    }]),
    getExamTransferTasks: jest.fn(() => [{
      id: 'transfer_cpu',
      topicId: 'topic_1_1',
      specificationPointId: '1.1.1',
      marks: 4
    }]),
    getKeyTerms: jest.fn(() => [{ id: 'term_cpu', topicId: 'topic_1_1', specificationPointId: '1.1.1', term: 'CPU', definition: 'Processor' }]),
    getProgrammingSubmissions: jest.fn(() => []),
    getQuestions: jest.fn(() => []),
    getStudents: jest.fn(() => data.students),
    getTheoryNotes: jest.fn(() => []),
    getTheoryNoteByTopic: jest.fn(() => ({ topicId: 'topic_1_1', paper: 'Paper 1' })),
    getUnits: jest.fn(() => data.units),
    getWrittenSubmissions: jest.fn(() => []),
    getAssignments: jest.fn(() => []),
    getTestPreps: jest.fn(() => []),
    getCheckpointRules: jest.fn(() => ({})),
    updateStudent: jest.fn((id, updates) => Object.assign(data.students.find(student => student.id === id), updates))
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
  window.app.currentUser = data.students[0];
  return { app: window.app, data, database };
}

function panel() {
  return {
    innerHTML: '',
    querySelectorAll: jest.fn(() => []),
    querySelector: jest.fn(() => null)
  };
}

describe('student pathway simplification', () => {
  test('maps every legacy student route to one of five parent destinations', () => {
    const { app } = loadApp();
    expect(new Set([
      'stud-dashboard', 'stud-learn', 'stud-simulators', 'stud-programming',
      'stud-practise', 'stud-retrieval', 'stud-recall', 'stud-written',
      'stud-exam-transfer', 'stud-progress', 'stud-messages'
    ].map(route => app.getStudentRouteParent(route)))).toEqual(new Set([
      'stud-dashboard', 'stud-topics', 'stud-practice', 'stud-progress', 'stud-messages'
    ]));
    expect(app.getStudentRouteParent('stud-missing')).toBeNull();
  });

  test('learner objective controls persist without changing classroom controls or evidence', () => {
    const { app, data, database } = loadApp();
    const controlsBefore = JSON.stringify(data.controls);
    const attemptsBefore = JSON.stringify(data.attempts);

    expect(app.updateLearnerObjectiveState('1.1.1', 'covered', 'active')).toBe(true);

    expect(database.updateStudent).toHaveBeenCalledTimes(1);
    expect(data.students[0].learnerObjectiveStates[0]).toMatchObject({
      studentId: 'student_1',
      specificationPointId: '1.1.1',
      state: 'covered',
      cardState: 'active',
      source: 'learner'
    });
    expect(JSON.stringify(data.controls)).toBe(controlsBefore);
    expect(JSON.stringify(data.attempts)).toBe(attemptsBefore);
  });

  test('resolves saved objective state after a slim session is reloaded', () => {
    const { app, data } = loadApp();
    app.updateLearnerObjectiveState('1.1.1', 'covered', 'active');
    app.currentUser = { id: 'student_1', role: 'student', classId: 'class_1' };

    expect(app.getLearnerObjectiveState('1.1.1')).toMatchObject({
      state: 'covered',
      cardState: 'active'
    });
    expect(data.students[0].learnerObjectiveStates).toHaveLength(1);
  });

  test('objective controls include only mapped cards and do not pause another objective', () => {
    const { app, data, database } = loadApp();
    data.controls = {};
    data.units[0].topics[0].objectives.push({ id: '1.1.2', name: 'CPU performance' });
    database.getCurriculumContent.mockReturnValue([
      { id: '1.1.1', keyTerms: ['CPU'] },
      { id: '1.1.2', keyTerms: ['Clock speed'] }
    ]);
    database.getKeyTerms.mockReturnValue([
      { id: 'term_cpu', topicId: 'topic_1_1', term: 'CPU', definition: 'Processor' },
      { id: 'term_clock', topicId: 'topic_1_1', term: 'Clock speed', definition: 'Cycles per second' }
    ]);

    app.updateLearnerObjectiveState('1.1.1', 'covered', 'active');
    expect(app.getEligibleRecallCards().map(item => item.card.id)).toEqual(['term_cpu']);

    app.updateLearnerObjectiveState('1.1.2', 'covered', 'active');
    app.updateLearnerObjectiveState('1.1.1', 'covered', 'paused');
    expect(app.getEligibleRecallCards().map(item => item.card.id)).toEqual(['term_clock']);
    expect(app.getEligibleRecallTopics().has('topic_1_1')).toBe(true);
  });

  test('keeps untraceable cards in honest legacy topic coverage only', () => {
    const { app, database } = loadApp();
    database.getCurriculumContent.mockReturnValue([{ id: '1.1.1', keyTerms: [] }]);
    database.getKeyTerms.mockReturnValue([
      { id: 'legacy', topicId: 'topic_1_1', term: 'Ambiguous term', definition: 'Legacy definition' }
    ]);
    expect(app.getEligibleRecallCards()[0]).toMatchObject({
      precision: 'legacy_topic',
      objectiveId: null
    });
  });

  test('pausing cards preserves retrieval history and confidence remains separate', () => {
    const { app, data } = loadApp();
    data.attempts.push({
      id: 'rating_1',
      studentId: 'student_1',
      type: 'retrieval_rating',
      topic: 'topic_1_1',
      questionId: 'term_cpu',
      selfRating: 'secure',
      dueDate: '2026-08-10T00:00:00.000Z',
      contributesToMastery: false
    });
    const historyBefore = JSON.stringify(data.attempts);
    app.updateLearnerObjectiveState('1.1.1', 'covered', 'paused');

    expect(JSON.stringify(data.attempts)).toBe(historyBefore);
    expect(app.getObjectiveRecallConfidence('1.1.1')).toBe('Usually recalled');
  });

  test('repeated ratings for one card cannot create consistently recalled confidence', () => {
    const { app, data } = loadApp();
    for (let index = 0; index < 5; index++) {
      data.attempts.push({
        id: `rating_${index}`,
        studentId: 'student_1',
        type: 'retrieval_rating',
        topic: 'topic_1_1',
        questionId: 'term_cpu',
        selfRating: 'secure',
        date: `2026-07-${20 + index}T10:00:00.000Z`
      });
    }
    expect(app.getObjectiveRecallConfidence('1.1.1')).toBe('Usually recalled');
  });

  test('Topics presents study, recall and checked work as separate statuses', () => {
    const { app } = loadApp();
    app.getSectionMilestones = jest.fn(() => []);
    const target = panel();
    app.renderStudentTopics(target);
    expect(target.innerHTML).toContain('Computer Science topics');
    expect(target.innerHTML).toContain('Study state');
    expect(target.innerHTML).toContain('Recall confidence');
    expect(target.innerHTML).toContain('Checked work');
    expect(target.innerHTML).toContain('Covered means you have studied');
  });

  test('focused learning has an exact exam action and no topic chooser or generic check', () => {
    const { app } = loadApp();
    const target = panel();
    app.renderFocusedStudentLearning(
      target,
      { topicId: 'topic_1_1' },
      {
        id: '1.1.1',
        scope: 'Architecture of the CPU',
        explanation: 'The CPU fetches, decodes and executes instructions.',
        workedExample: 'The PC supplies the next address.',
        misconception: 'The MAR stores an address.'
      }
    );
    expect(target.innerHTML).toContain('Try a 4-mark exam question');
    expect(target.innerHTML).toContain('Back to Topics');
    expect(target.innerHTML).not.toContain('Choose a specification section');
    expect(target.innerHTML).not.toContain('Check this section');
  });

  test('binary shifts are discoverable from their exact objective', () => {
    const { app } = loadApp();
    const target = panel();
    app.renderFocusedStudentLearning(
      target,
      { topicId: 'topic_1_1' },
      {
        id: '1.2.4a',
        scope: 'Binary numbers',
        explanation: 'Binary shifts move bits.',
        workedExample: '0010 shifted left becomes 0100.',
        misconception: 'A shift is not a rotation.'
      }
    );
    expect(target.innerHTML).toContain('Open the binary-shift tool');
  });

  test('exam practice resets stale state and chooses a current exact task', () => {
    const { app } = loadApp();
    app.activeTopicId = 'topic_1_1';
    app.activeObjectiveId = '1.1.1';
    app.activeExamTransferId = 'stale';
    app.examTransferStage = 'retry';
    app.examTransferPlan = { stale: true };
    app.examTransferResponse = 'old answer';
    app.switchTab = jest.fn();

    expect(app.startStudentExamPractice()).toBe(true);
    expect(app.activeExamTransferId).toBe('transfer_cpu');
    expect(app.examTransferStage).toBe('decode');
    expect(app.examTransferPlan).toEqual({});
    expect(app.examTransferResponse).toBe('');
    expect(app.switchTab).toHaveBeenCalledWith('stud-exam-transfer');
  });

  test('deck change preserves disclosures, restores focus and announces the result', () => {
    const { app } = loadApp();
    app.getSectionMilestones = jest.fn(() => []);
    const paper = { dataset: { disclosureId: 'paper-0' }, open: true };
    const topic = { dataset: { disclosureId: 'topic-topic_1_1' }, open: true };
    const cover = { dataset: { objectiveId: '1.1.1' }, focus: jest.fn() };
    const target = {
      innerHTML: '',
      querySelectorAll: jest.fn(selector => {
        if (selector === 'details[data-disclosure-id]') return [paper, topic];
        if (selector === 'details[data-disclosure-id][open]') return [paper, topic].filter(item => item.open);
        if (selector === '.objective-cover-btn') return [cover];
        return [];
      }),
      querySelector: jest.fn(selector =>
        selector.includes('.objective-cover-btn[data-objective-id="1.1.1"]') ? cover : null
      )
    };
    app.renderStudentTopics(target);
    cover.onclick();
    expect(paper.open).toBe(true);
    expect(topic.open).toBe(true);
    expect(cover.focus).toHaveBeenCalled();
    expect(target.innerHTML).toContain('1.1.1 marked covered and recall cards added.');
  });
});
