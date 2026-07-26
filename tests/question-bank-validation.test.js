describe('question-bank identifier and mapping integrity', () => {
  let database;
  let data;

  beforeAll(() => {
    global.window = {};
    global.localStorage = { getItem: () => null, setItem: () => {} };
    database = require('../database');
    data = database.defaultDatabase;
  });

  afterAll(() => {
    delete global.window;
    delete global.localStorage;
  });

  test('accepts the production question bank', () => {
    expect(database.validateQuestionBank(data)).toBe(true);
  });

  test('rejects duplicate and missing question IDs', () => {
    const duplicate = JSON.parse(JSON.stringify(data));
    duplicate.questions[1].id = duplicate.questions[0].id;
    expect(() => database.validateQuestionBank(duplicate)).toThrow(/Duplicate StudySpice question ID/);

    const missing = JSON.parse(JSON.stringify(data));
    delete missing.questions[0].id;
    expect(() => database.validateQuestionBank(missing)).toThrow(/must have a stable ID/);
  });

  test('rejects unknown specification references', () => {
    const invalid = JSON.parse(JSON.stringify(data));
    invalid.questions[0].specificationPointId = '9.9.9';
    expect(() => database.validateQuestionBank(invalid)).toThrow(/unknown specification reference/);
  });

  test('rejects conflicting topic and semantic mappings', () => {
    const topicConflict = JSON.parse(JSON.stringify(data));
    topicConflict.questions.find(item => item.id === 'q_1_1_a').topicId = 'topic_2_4';
    expect(() => database.validateQuestionBank(topicConflict)).toThrow(/conflicts with topic/);

    const semanticConflict = JSON.parse(JSON.stringify(data));
    semanticConflict.questions.find(item => item.id === 'q_1_1_a').specificationPointId = '1.1.2';
    expect(() => database.validateQuestionBank(semanticConflict)).toThrow(/semantic specification mappings/);
  });

  test('keeps legacy duplicate IDs on renamed content for audit interpretation', () => {
    const renamed = data.questions.filter(item => item.legacyQuestionId);
    expect(renamed).toHaveLength(13);
    renamed.forEach(item => {
      expect(data.questions.some(question => question.id === item.legacyQuestionId)).toBe(true);
      expect(item.specificationPointId).toBeTruthy();
    });
  });
});
