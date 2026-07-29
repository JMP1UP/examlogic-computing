const fs = require('fs');
const path = require('path');

describe('objective-level curriculum coverage integrity', () => {
  let data;

  beforeAll(() => {
    global.window = {};
    global.localStorage = {
      getItem: () => null,
      setItem: () => {}
    };
    jest.isolateModules(() => {
      require('../database');
      data = global.window.db.cachedData;
    });
  });

  test('uses the complete set of selectable specification objectives as the coverage spine', () => {
    const objectives = data.units.flatMap(unit => unit.topics.flatMap(topic => topic.objectives));
    expect(objectives).toHaveLength(32);
    expect(new Set(objectives.map(objective => objective.id)).size).toBe(32);
  });

  test('keeps internal teaching strands traceable to an official OCR requirement', () => {
    const objectives = data.units.flatMap(unit => unit.topics.flatMap(topic => topic.objectives));
    const officialPoints = [
      '1.1.1', '1.1.2', '1.1.3', '1.2.1', '1.2.2', '1.2.3', '1.2.4',
      '1.2.5', '1.3.1', '1.3.2', '1.4.1', '1.4.2', '1.5.1', '1.5.2',
      '1.6.1', '2.1.1', '2.1.2', '2.1.3', '2.2.1', '2.2.2', '2.2.3',
      '2.3.1', '2.3.2', '2.4.1', '2.5.1', '2.5.2', '2d / 2.2', '3c / 2.1-2.3'
    ];
    expect(data.curriculumContent).toHaveLength(objectives.length);
    data.curriculumContent.forEach(item => {
      expect(item.officialSpecificationPointId).toBeTruthy();
      expect(item.sourcePages).toBeTruthy();
      expect(item.scope).toBeTruthy();
      expect(item.explanation.length).toBeGreaterThan(80);
      expect(item.workedExample.length).toBeGreaterThan(30);
      expect(item.keyTerms.length).toBeGreaterThan(1);
      expect(item.misconception).toBeTruthy();
      expect(item.requiredKnowledge.length).toBeGreaterThan(0);
      expect(item.requiredSkills.length).toBeGreaterThan(0);
      expect(item.assessmentModes.length).toBeGreaterThan(0);
      expect(item.supportedPractice.length).toBeGreaterThan(80);
      expect(item.workload.coreLearningMinutes).toBeLessThanOrEqual(15);
      expect(item.workload.retrievalMinutes).toBeLessThanOrEqual(5);
      expect(item.qualityStatus).toBe('implemented-against-j277-v3.1-awaiting-qualified-teacher-qa');
    });
    expect(new Set(data.curriculumContent.map(item => item.id))).toEqual(new Set(objectives.map(item => item.id)));
    expect(new Set(data.curriculumContent.map(item => item.officialSpecificationPointId)))
      .toEqual(new Set(officialPoints));
  });

  test('provides an original diagnostic check for every teaching strand', () => {
    const objectiveIds = data.units.flatMap(unit => unit.topics.flatMap(topic => topic.objectives.map(objective => objective.id)));
    objectiveIds.forEach(id => {
      const diagnostics = data.questions.filter(question => question.specificationPointId === id && question.purpose === 'diagnostic');
      expect(diagnostics).toHaveLength(1);
      expect(diagnostics[0].options).toContain(diagnostics[0].answer);
      expect(diagnostics[0].explanation).toBeTruthy();
    });
  });

  test('keeps the CPU fetch guided task focused on one clear learner output', () => {
    const cpuPurpose = data.curriculumContent.find(item => item.id === '1.1.1');

    expect(cpuPurpose.supportedPractice).toContain('three-step flow diagram');
    expect(cpuPurpose.supportedPractice).toContain('difference between the MAR and MDR');
    expect(cpuPurpose.supportedPractice).not.toContain('four-column table');
    expect(cpuPurpose.supportedPractice).not.toContain('decode, execute and store');
  });

  test('aligns the 1.1.1 exam application and four-mark rubric', () => {
    const task = data.examTransferTasks.find(item => item.specificationPointId === '1.1.1');
    expect(task).toMatchObject({ marks: 4, commandWord: 'Explain' });
    expect(task.question).toContain('PC');
    expect(task.question).toContain('MAR');
    expect(task.question).toContain('MDR');
    expect(task.requiredElements).toHaveLength(4);
    expect(task.planningLabels).toEqual(['PC role', 'Address moves to MAR', 'Instruction moves to MDR', 'PC increment']);
  });

  test('provides complete practice evidence for the priority Paper 2 strands', () => {
    ['2.2.3', '2.2.ERL', '2.1.2', '2.2.1', '2.3.2'].forEach(id => {
      const retrieval = data.questions.filter(item => item.specificationPointId === id && item.purpose === 'retrieval');
      const diagnostic = data.questions.filter(item => item.specificationPointId === id && item.purpose === 'diagnostic');
      const application = data.writtenQuestions.filter(item => item.specificationPointId === id && item.purpose === 'application');
      const examTransfer = data.examTransferTasks.filter(item => item.specificationPointId === id && item.purpose === 'exam-transfer');
      expect(retrieval.length).toBeGreaterThanOrEqual(3);
      expect(diagnostic).toHaveLength(1);
      expect(application.length).toBeGreaterThanOrEqual(2);
      expect(examTransfer.length).toBeGreaterThanOrEqual(1);
      expect(retrieval.length + diagnostic.length + application.length + examTransfer.length).toBeGreaterThanOrEqual(8);
    });
  });

  test('uses OCR Exam Reference Language notation in the dedicated pathway', () => {
    const erlItems = [
      ...data.questions,
      ...data.writtenQuestions,
      ...data.examTransferTasks
    ].filter(item => item.specificationPointId === '2.2.ERL');
    const source = JSON.stringify(erlItems);
    const assessedAnswers = JSON.stringify(erlItems.map(item => ({
      answer: item.answer,
      modelAnswer: item.modelAnswer,
      modelPlan: item.modelPlan,
      requiredElements: item.requiredElements
    })));
    expect(source).toContain('endif');
    expect(source).toContain('next i');
    expect(source).toContain('do ... until');
    expect(source).toContain('endfunction');
    expect(source).toContain('MOD 2 == 0');
    expect(assessedAnswers).not.toContain('range(');
  });

  test('maps every existing content item to a valid specification point', () => {
    const validIds = new Set(data.units.flatMap(unit => unit.topics.flatMap(topic => topic.objectives.map(objective => objective.id))));
    const mappedItems = [
      ...data.questions,
      ...data.writtenQuestions,
      ...data.keyTerms,
      ...data.examTransferTasks,
      ...data.programmingChallenges
    ];
    expect(mappedItems.length).toBeGreaterThan(0);
    mappedItems.forEach(item => {
      expect(item.specificationPointId).toBeTruthy();
      expect(validIds.has(item.specificationPointId)).toBe(true);
    });
  });

  test('labels learning evidence by purpose rather than counting topic totals as coverage', () => {
    const activeQuestions = data.questions.filter(question => !question.retired);
    expect(activeQuestions.every(question => question.purpose === 'retrieval' || question.purpose === 'diagnostic')).toBe(true);
    expect(data.writtenQuestions.every(question => question.purpose === 'application')).toBe(true);
    expect(data.examTransferTasks.every(task => task.purpose === 'exam-transfer')).toBe(true);
    expect(data.programmingChallenges.some(task => task.purpose === 'application')).toBe(true);
    expect(data.programmingChallenges.some(task => task.purpose === 'exam-transfer')).toBe(true);
    expect(data.questions.find(question => question.id === 'q_1_4_b')).toMatchObject({
      purpose: 'historical',
      retired: true,
      assessmentStatus: 'retired_out_of_scope'
    });
  });

  test('provides a reviewable application route for every teaching strand without awarding automatic mastery', () => {
    const objectiveIds = data.units.flatMap(unit => unit.topics.flatMap(topic => topic.objectives.map(objective => objective.id)));
    const reviewableItems = [...data.writtenQuestions, ...data.programmingChallenges];
    objectiveIds.forEach(id => {
      expect(reviewableItems.some(item => item.specificationPointId === id)).toBe(true);
    });
    data.writtenQuestions
      .filter(item => item.id.startsWith('curriculum_app_'))
      .forEach(item => {
        expect(item).toMatchObject({
          evidenceType: 'unassessed_submission',
          contributesToMastery: false,
          completionStatus: 'awaiting_review'
        });
      });
  });

  test('corrects legacy questions that were filed under the wrong broad topic', () => {
    expect(data.questions.find(question => question.id === 'q_1_2_d')).toMatchObject({
      topicId: 'topic_1_3',
      specificationPointId: '1.2.3'
    });
    expect(data.questions.find(question => question.id === 'q_6')).toMatchObject({
      topicId: 'topic_1_2',
      specificationPointId: '1.2.1'
    });
    expect(data.questions.find(question => question.id === 'q_2_2_a')).toMatchObject({
      topicId: 'topic_2_2',
      specificationPointId: '2.2.1'
    });
  });

  test('keeps corrected scope and terminology out of live learner content', () => {
    const activeSource = JSON.stringify(data.questions.filter(question => !question.retired));
    const landingSource = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    expect(activeSource).not.toContain('Transport');
    expect(activeSource).not.toContain('permanently embedded');
    expect(landingSource).not.toContain('specification ready');
    expect(landingSource).not.toContain('Everything you need to master');
  });

  test('covers required core programming techniques without labelling them as extensions', () => {
    const techniques = new Set(data.programmingChallenges.flatMap(item => item.programmingTechniques));
    [
      'strings', 'file handling', 'records', 'arrays', '2D arrays', 'function',
      'random numbers', 'authentication', 'validation', 'boundary testing'
    ].forEach(technique => expect(techniques.has(technique)).toBe(true));
    ['pc_10', 'pc_11'].forEach(id => {
      const challenge = data.programmingChallenges.find(item => item.id === id);
      expect(`${challenge.concept} ${challenge.title}`).toMatch(/core/i);
      expect(`${challenge.concept} ${challenge.title}`).not.toMatch(/extension/i);
    });
  });

  test('prevents readiness when required evidence types are absent', () => {
    const appSource = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
    expect(appSource).toContain('getObjectiveCoverage()');
    expect(appSource).toContain("missing.push('objective explanation')");
    expect(appSource).toContain("missing.push('diagnostic')");
    expect(appSource).toContain("missing.push('retrieval')");
    expect(appSource).toContain("missing.push('application or review route')");
    expect(appSource).toContain("missing.push('assessment-mode mapping')");
    expect(appSource).toContain("missing.push('required-skill mapping')");
    expect(appSource).not.toContain("missing.push('retrieval alternatives')");
    expect(appSource).not.toContain("missing.push('spaced alternatives')");
    expect(appSource).toContain("completeEvidence ? 'Awaiting QA'");
    expect(appSource).toContain('Choose a specification section');
    expect(appSource).toContain('item.officialSpecificationPointId');
  });
});
