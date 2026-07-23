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
  });
});
