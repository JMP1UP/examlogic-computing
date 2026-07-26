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

  test('requires answer-safe actionable guidance for every reachable recall question', () => {
    const reachable = data.units.flatMap(unit =>
      unit.topics.flatMap(topic => data.questions.filter(question => question.topicId === topic.id).slice(0, 3))
    );
    expect(reachable).toHaveLength(36);
    expect(new Set(reachable.map(question => question.retryHint)).size).toBe(36);
    reachable.forEach(question => {
      expect(Object.prototype.hasOwnProperty.call(question, 'retryHint')).toBe(true);
      expect(question.retryHint).toEqual(expect.any(String));
      expect(question.retryHint.length).toBeGreaterThanOrEqual(50);
      expect(question.retryHint).not.toMatch(/reread|read the question|try again|review the question wording|review this topic|check your notes|think carefully/i);
      expect(question.retryHint.toLowerCase().replace(/[^a-z0-9]/g, ''))
        .not.toContain(String(question.answer).toLowerCase().replace(/[^a-z0-9]/g, ''));
    });
  });

  test('rejects missing, generic and answer-revealing retry guidance', () => {
    const reachableId = data.units[0].topics[0].id;
    const questionId = data.questions.find(question => question.topicId === reachableId).id;
    const malformed = JSON.parse(JSON.stringify(data));
    malformed.questions.find(question => question.id === questionId).retryHint = '';
    expect(() => database.validateQuestionBank(malformed)).toThrow(/actionable conceptual retry guidance/);

    malformed.questions.find(question => question.id === questionId).retryHint = 'Review the question wording and try again after rereading it carefully.';
    expect(() => database.validateQuestionBank(malformed)).toThrow(/actionable conceptual retry guidance/);

    const revealing = JSON.parse(JSON.stringify(data));
    const revealingQuestion = revealing.questions.find(question => question.id === questionId);
    revealingQuestion.retryHint = `The correct answer is ${revealingQuestion.answer}; select that option to continue.`;
    expect(() => database.validateQuestionBank(revealing)).toThrow(/reveals its answer/);
  });

  test.each([
    ['diagnostic_2_2_1', 'Trace assignment in sequence and distinguish storing a new value from comparing two existing values.'],
    ['diagnostic_2_2_2', 'Choose the control structure by asking whether execution is sequential, conditional or controlled by a loop.'],
    ['diagnostic_2_2_3', 'Check the data structure, index boundaries and declared interface of the string, array, record or subprogram.'],
    ['diagnostic_1_3_1', 'Identify the geographical scale and ownership of the network, then separate topology from network type.']
  ])('rejects guidance for %s that does not match its reviewed conceptual focus', (questionId, retryHint) => {
    const malformed = JSON.parse(JSON.stringify(data));
    malformed.questions.find(question => question.id === questionId).retryHint = retryHint;

    expect(() => database.validateQuestionBank(malformed)).toThrow(/does not match its reviewed conceptual focus/);
  });

  test('rejects a defragmentation hint that closely paraphrases the answer', () => {
    const malformed = JSON.parse(JSON.stringify(data));
    malformed.questions.find(question => question.id === 'diagnostic_1_5_2').retryHint =
      'Reorganise file blocks so they become contiguous on the magnetic disk and can be accessed more efficiently.';

    expect(() => database.validateQuestionBank(malformed)).toThrow(/reveals its answer|closely paraphrases its answer/);
  });

  test('rejects copied questions, copied distractors and duplicate hints', () => {
    const reachable = data.units.flatMap(unit =>
      unit.topics.flatMap(topic => data.questions.filter(question => question.topicId === topic.id).slice(0, 3))
    );

    const copiedQuestion = JSON.parse(JSON.stringify(data));
    const questionCopy = copiedQuestion.questions.find(question => question.id === reachable[0].id);
    questionCopy.retryHint = `${questionCopy.question} Work through each part before choosing an option.`;
    expect(() => database.validateQuestionBank(copiedQuestion)).toThrow(/copies the question/);

    const copiedDistractor = JSON.parse(JSON.stringify(data));
    const distractorCopy = copiedDistractor.questions.find(question => question.id === 'diagnostic_2_2_2');
    distractorCopy.retryHint = 'A Character is the most useful comparison here; now reconsider which representation permits exactly two logical states.';
    expect(() => database.validateQuestionBank(copiedDistractor)).toThrow(/repeats a distractor/);

    const duplicate = JSON.parse(JSON.stringify(data));
    const first = duplicate.questions.find(question => question.id === reachable[0].id);
    const second = duplicate.questions.find(question => question.id === reachable[1].id);
    second.retryHint = first.retryHint;
    expect(() => database.validateQuestionBank(duplicate)).toThrow(/reviewed conceptual focus|reuse identical retry guidance/);
  });
});
