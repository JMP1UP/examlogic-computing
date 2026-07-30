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
    fetch: jest.fn(),
    localStorage: {
      getItem: key => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: key => storage.delete(key)
    },
    sessionStorage: { getItem: () => null, setItem: () => {} },
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
  return context;
}

function panel() {
  return { innerHTML: '', querySelector: () => null, querySelectorAll: () => [] };
}

describe('teacher assessment insight', () => {
  test('class markbook keeps checked evidence and learner confidence separate', () => {
    const context = loadApplication();
    const teacher = context.db.getCoordinators()[0];
    const student = context.db.getStudents().find(item => item.classId === context.db.getClasses().find(cls => cls.teacherId === teacher.id).id);
    context.app.currentUser = teacher;
    context.app.selectedTeacherClassId = student.classId;
    context.app.selectedTeacherStudentId = student.id;
    context.db.cachedData.attempts.push({
      id: 'checked_activity',
      studentId: student.id,
      activityId: 'activity_one',
      type: 'number_skills',
      evidenceType: 'demonstrated',
      contributesToMastery: true,
      score: '2/3',
      date: '2026-07-30T09:00:00.000Z'
    });
    student.learnerObjectiveStates = [{ studentId: student.id, specificationPointId: '1.1.1', state: 'covered', cardState: 'active' }];
    const cardId = context.app.getRecallCardMappings().find(item => item.objectiveId === '1.1.1').card.id;
    context.db.cachedData.attempts.push({
      id: 'confidence_activity',
      studentId: student.id,
      type: 'retrieval_rating',
      questionId: cardId,
      selfRating: 'secure',
      contributesToMastery: false,
      date: '2026-07-30T10:00:00.000Z'
    });

    const target = panel();
    context.app.renderTeacherClasses(target);

    expect(target.innerHTML).toContain('markbook');
    expect(target.innerHTML).toContain('Developing latest result');
    expect(target.innerHTML).toContain('self-rated');
    expect(target.innerHTML).toContain('Checked performance');
    expect(target.innerHTML).toContain('Flashcard confidence');
    expect(target.innerHTML).toContain('Learner profile');
    expect(target.innerHTML).toContain('Topics on the learner');
  });

  test('teacher assessment reports preserve topic and technique judgements without creating attempts', () => {
    const context = loadApplication();
    const teacher = context.db.getCoordinators()[0];
    const selectedClass = context.db.getClasses().find(cls => cls.teacherId === teacher.id);
    const student = context.db.getStudents().find(item => item.classId === selectedClass.id);
    const prep = context.db.getTestPreps().find(item => item.classId === selectedClass.id);
    const attemptCount = context.db.getAttempts().length;
    context.app.currentUser = teacher;
    context.app.selectedTeacherClassId = selectedClass.id;

    const report = context.app.recordTeacherAssessmentReport({
      assessmentId: prep.id,
      classId: selectedClass.id,
      studentId: student.id,
      overallMark: '21',
      maxMark: '30',
      topicRatings: prep.specificationPointIds.map((id, index) => ({
        specificationPointId: id,
        rating: index === 0 ? 'strong' : index === 1 ? 'priority' : 'developing'
      })),
      examTechniqueTags: ['show-working', 'apply-scenario'],
      teacherNote: 'Revisit unit conversions before the next check.'
    });

    expect(context.db.getAttempts()).toHaveLength(attemptCount);
    expect(report.topicRatings).toHaveLength(prep.specificationPointIds.length);
    expect(report.examTechniqueTags).toEqual(['show-working', 'apply-scenario']);

    context.app.currentUser = student;
    context.app.activeTestPrepId = prep.id;
    const target = panel();
    context.app.renderStudentTestPrep(target);
    expect(target.innerHTML).toContain('How this assessment went');
    expect(target.innerHTML).toContain('21/30');
    expect(target.innerHTML).toContain('Improve this topic');
    expect(target.innerHTML).toContain('Show calculation working');
    expect(target.innerHTML).toContain('Practise with an exam question');
  });

  test('assessment reports reject pupils, topics and technique tags outside the authorised scope', () => {
    const context = loadApplication();
    const teacher = context.db.getCoordinators()[0];
    const selectedClass = context.db.getClasses().find(cls => cls.teacherId === teacher.id);
    const prep = context.db.getTestPreps().find(item => item.classId === selectedClass.id);
    context.app.currentUser = teacher;
    context.app.selectedTeacherClassId = selectedClass.id;
    const before = context.db.getAssessmentReports().length;
    const rejected = context.app.recordTeacherAssessmentReport({
      assessmentId: prep.id,
      classId: selectedClass.id,
      studentId: 'student_outside_class',
      overallMark: '',
      maxMark: '',
      topicRatings: prep.specificationPointIds.map(id => ({ specificationPointId: id, rating: 'strong' })),
      examTechniqueTags: ['invented-ai-judgement']
    });
    expect(rejected).toBe(false);
    expect(context.db.getAssessmentReports()).toHaveLength(before);
  });

  test('teacher overview uses the same learner summaries as the full markbook', () => {
    const context = loadApplication();
    const teacher = context.db.getCoordinators()[0];
    const selectedClass = context.db.getClasses().find(cls => cls.teacherId === teacher.id);
    const student = context.db.getStudents().find(item => item.classId === selectedClass.id);
    context.app.currentUser = teacher;
    context.app.selectedTeacherClassId = selectedClass.id;
    const target = panel();
    context.app.renderTeacherOverview(target);
    expect(target.innerHTML).toContain('Class markbook');
    expect(target.innerHTML).toContain(student.name);
    expect(target.innerHTML).toContain('Open full markbook');
    expect(target.innerHTML).toContain('Checked work and learner-rated confidence are shown separately');
  });

  test('report storage is available without a schema bump', () => {
    const context = loadApplication();
    expect(context.db.cachedData.schemaVersion).toBe(13);
    expect(context.db.getAssessmentReports()).toEqual([]);
  });

  test('school AI setting also controls the programming tutor', async () => {
    const context = loadApplication();
    context.app.currentUser = context.db.getStudents()[0];
    context.db.cachedData.settings.aiFeaturesEnabled = false;
    context.app.alert = jest.fn();
    await context.app.requestProgrammingTutor(context.db.getProgrammingChallenges()[0]);
    expect(context.app.alert).toHaveBeenCalledWith('Automated tutor feedback is disabled in school settings. Use the support ladder and test results instead.');
    expect(context.fetch).not.toHaveBeenCalled();
  });
});
