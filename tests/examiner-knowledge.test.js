const examinerKnowledge = require('../curriculum-examiner-knowledge');

describe('Curriculum Knowledge Base & Examiner Intelligence', () => {
  beforeAll(() => {
    global.window = {};
    global.localStorage = {
      getItem: () => null,
      setItem: () => {}
    };
    jest.isolateModules(() => {
      require('../database');
    });
  });

  test('contains misconception entry for all 32 strands', () => {
    const strands = [
      '1.1.1', '1.1.2', '1.1.3', '1.2.1', '1.2.2', '1.2.3', '1.2.4a', '1.2.4b',
      '1.2.4c', '1.2.4d', '1.2.5', '1.3.1', '1.3.2', '1.4.1', '1.4.2', '1.5.1',
      '1.5.2', '1.6.1', '1.6.2', '2.1.1', '2.1.2', '2.1.3', '2.2.1', '2.2.2',
      '2.2.3', '2.2.PY', '2.2.ERL', '2.3.1', '2.3.2', '2.4.1', '2.5.1', '2.5.2'
    ];

    expect(strands.length).toBe(32);
    strands.forEach(strandId => {
      const insight = examinerKnowledge.getExaminerInsights(strandId);
      expect(insight).toBeDefined();
      expect(insight.strandId).toBe(strandId);
      expect(insight.commonErrors.length).toBeGreaterThan(0);
      insight.commonErrors.forEach(err => {
        expect(err.error).toBeTruthy();
        expect(err.explanation).toBeTruthy();
        expect(err.examinerAdvice).toBeTruthy();
      });
    });
  });

  test('provides command word rubrics for all primary command words', () => {
    const commandWords = ['State', 'Identify', 'Describe', 'Explain', 'Compare', 'Evaluate', 'Write algorithm'];
    commandWords.forEach(cw => {
      const rubric = examinerKnowledge.getCommandWordRubric(cw);
      expect(rubric).toBeDefined();
      expect(rubric.commandWord).toBe(cw);
      expect(rubric.marks).toBeGreaterThan(0);
      expect(rubric.requirement).toBeTruthy();
    });
  });

  test('generates parametric blueprint questions with valid structures', () => {
    const qStorage = examinerKnowledge.generateBlueprintQuestion('1.2.3', 2);
    expect(qStorage).not.toBeNull();
    expect(qStorage.strandId).toBe('1.2.3');
    expect(qStorage.workingSteps.length).toBeGreaterThan(0);
    expect(qStorage.finalAnswer).toContain('KB');

    const qBinary = examinerKnowledge.generateBlueprintQuestion('1.2.4a', 5);
    expect(qBinary).not.toBeNull();
    expect(qBinary.strandId).toBe('1.2.4a');
    expect(qBinary.finalAnswer).toHaveLength(8);

    const qLogic = examinerKnowledge.generateBlueprintQuestion('2.4.1', 1);
    expect(qLogic).not.toBeNull();
    expect(qLogic.truthTable).toHaveLength(4);
  });

  test('integrates cleanly into LocalDB instance', () => {
    const db = global.window.db;
    expect(db.getExaminerInsights('1.1.1')).toBeDefined();
    expect(db.getCommandWordRubric('Explain')).toBeDefined();
    expect(db.generateBlueprintQuestion('1.2.3', 10)).not.toBeNull();
  });
});
