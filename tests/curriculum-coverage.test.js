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
    expect(data.curriculumContent).toHaveLength(objectives.length);
    data.curriculumContent.forEach(item => {
      expect(item.officialSpecificationPointId).toBeTruthy();
      expect(item.sourcePages).toBeTruthy();
      expect(item.scope).toBeTruthy();
      expect(item.explanation.length).toBeGreaterThan(80);
      expect(item.workedExample.length).toBeGreaterThan(30);
      expect(item.keyTerms.length).toBeGreaterThan(1);
      expect(item.misconception).toBeTruthy();
    });
    expect(new Set(data.curriculumContent.map(item => item.id))).toEqual(new Set(objectives.map(item => item.id)));
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
    expect(data.questions.every(question => question.purpose === 'retrieval' || question.purpose === 'diagnostic')).toBe(true);
    expect(data.writtenQuestions.every(question => question.purpose === 'application')).toBe(true);
    expect(data.examTransferTasks.every(task => task.purpose === 'exam-transfer')).toBe(true);
    expect(data.programmingChallenges.some(task => task.purpose === 'application')).toBe(true);
    expect(data.programmingChallenges.some(task => task.purpose === 'exam-transfer')).toBe(true);
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
  });

  test('prevents readiness when required evidence types are absent', () => {
    const appSource = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
    expect(appSource).toContain('getObjectiveCoverage()');
    expect(appSource).toContain("missing.push('objective explanation')");
    expect(appSource).toContain("missing.push('diagnostic')");
    expect(appSource).toContain("missing.push('retrieval alternatives')");
    expect(appSource).toContain("missing.push('application')");
    expect(appSource).toContain("missing.push('exam transfer')");
    expect(appSource).toContain("missing.push('spaced alternatives')");
    expect(appSource).toContain("completeEvidence ? 'Awaiting QA'");
    expect(appSource).toContain('Learn each specification requirement');
    expect(appSource).toContain('item.officialSpecificationPointId');
  });
});
