const fs = require('fs');
const path = require('path');

const appSource = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const databaseSource = fs.readFileSync(path.join(__dirname, '..', 'database.js'), 'utf8');

describe('GCSE learning design', () => {
  test('does not use tier-like Foundation difficulty labels', () => {
    expect(appSource).not.toMatch(/numberSkillsDifficulty\s*=\s*['"]Foundation['"]/);
    expect(appSource).toContain("'Guided'");
    expect(appSource).toContain("'Supported'");
    expect(appSource).toContain("'Independent'");
    expect(appSource).toContain("'Challenge'");
  });

  test('test preparation is selected by specification point and bounded by time', () => {
    expect(appSource).toContain('prep-point-checkbox');
    expect(appSource).toContain('Weekly limit');
    expect(databaseSource).toContain('specificationPointIds');
    expect(databaseSource).toContain('weeklyMinutes');
  });

  test('Python and OCR Exam Reference Language are separate learning strands', () => {
    expect(databaseSource).toContain('Practical Python: design, write, test and refine');
    expect(databaseSource).toContain('OCR Exam Reference Language: read, trace, complete and write');
    expect(appSource).toContain('Knowing Python does not automatically demonstrate fluency');
  });

  test('makes programming a first-class student area with separate progress', () => {
    expect(appSource).toContain("{ title: 'Programming'");
    expect(appSource).toContain("route: 'stud-programming'");
    expect(appSource).toContain('renderStudentProgrammingHub');
    expect(appSource).toContain('Practical Python');
    expect(appSource).toContain('OCR Exam Reference Language');
    expect(appSource).toContain('Programming replaces another revision activity when assigned');
    expect(appSource).toContain("type: 'pseudocode_assessed'");
    expect(appSource).toContain("type: 'pseudocode_review'");
    expect(appSource).toContain("completionStatus: 'awaiting_review'");
    expect(appSource).toContain("contributesToMastery: false");
    expect(appSource).not.toContain("score: 'model checked'");
  });

  test('reports content-bank readiness separately from pupil mastery', () => {
    expect(appSource).toContain('getCurriculumCoverage()');
    expect(appSource).toContain('Content-bank readiness');
    expect(appSource).toContain('This is not pupil mastery');
    expect(appSource).toContain('teacher quality assurance is still required before it can be called complete');
  });

  test('uses current OCR assignment and equality operators', () => {
    expect(appSource).toContain('OCR assignment uses <code>=</code>');
    expect(appSource).toContain('comparison for equality uses <code>==</code>');
    expect(appSource).not.toContain('uses left arrows for assignment');
  });

  test('explicitly teaches transfer into past-paper programming questions', () => {
    expect(appSource).toContain('Bridge to a past-paper question');
    expect(appSource).toContain('inputs-processes-outputs');
    expect(appSource).toContain('read and predict');
    expect(appSource).toContain('find and fix a fault');
  });

  test('provides a searchable dictionary and random ten-term definition check', () => {
    expect(databaseSource).toContain('keyTerms: [');
    expect(appSource).toContain('Computer Science dictionary');
    expect(appSource).toContain('Test me on 10 random terms');
    expect(appSource).toContain('.slice(0, 10)');
    expect(appSource).toContain('Practice feedback only');
    expect(appSource).toContain('This does not count towards Progress or give you a final result');
  });

  test('supports targeted publishing and dated intervention sessions', () => {
    expect(appSource).toContain('Publish to');
    expect(appSource).toContain('recipientType');
    expect(appSource).toContain('renderTeacherSessions');
    expect(databaseSource).toContain('supportSessions: [');
    expect(databaseSource).toContain('addSupportSession(session)');
  });

  test('reduces navigation and reveals complex practice choices progressively', () => {
    expect(appSource).toContain("{ id: 'stud-topics', label: 'Topics'");
    expect(appSource).toContain("{ id: 'stud-practice', label: 'Practice'");
    expect(appSource).toContain('Choose how to practise');
    expect(appSource).toContain("title: 'Flashcards'");
    expect(appSource).toContain("title: 'Exam questions'");
    expect(appSource).toContain("title: 'Number skills'");
    expect(appSource).toContain("title: 'Programming'");
  });

  test('derives the teacher weekly-engagement measure from pupil records', () => {
    expect(appSource).toContain('const activeThisWeek = students.filter');
    expect(appSource).toContain('opened the app in the last 7 days');
    expect(appSource).not.toContain('22 of 26 active this week');
  });

  test('labels static teacher examples as demonstration narrative', () => {
    expect(appSource).toContain('Demonstration narrative: named examples below');
    expect(appSource).toContain('Demonstration narrative only. These example reasons');
    expect(appSource).toContain('without claiming verified class-level detection');
  });

  test('teaches transfer into original exam-style questions one step at a time', () => {
    expect(databaseSource).toContain('examTransferTasks: [');
    expect(databaseSource).toContain("specificationPointId: '1.2.4c'");
    expect(appSource).toContain("const guidedStages = ['decode', 'plan', 'answer', 'check']");
    expect(appSource).toContain('Optional independent question');
    expect(appSource).toContain('This check is for practice, not a final mark');
    expect(appSource).toContain("type: 'exam_transfer_retry'");
  });

  test('expands programming through validation, lists, functions and exam transfer', () => {
    expect(databaseSource).toContain("id: 'pc_6'");
    expect(databaseSource).toContain("id: 'pc_7'");
    expect(databaseSource).toContain("id: 'pc_8'");
    expect(databaseSource).toContain("id: 'pc_9'");
    expect(databaseSource).toContain("functionName: 'linear_search'");
    expect(appSource).not.toContain('data-ccode=');
  });
});
