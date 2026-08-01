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

  test('requires stable assessment focuses on every live question', () => {
    const malformed = JSON.parse(JSON.stringify(data));
    delete malformed.questions.find(question => question.retired !== true).assessmentFocus;
    expect(() => database.validateQuestionBank(malformed)).toThrow(/requires a stable assessment focus/);
  });

  test('rejects invalid or unreachable checkpoint focus rules', () => {
    const missingVersion = JSON.parse(JSON.stringify(database.CHECKPOINT_RULES));
    delete missingVersion['1.1.1'].version;
    expect(() => database.validateQuestionBank(data, missingVersion)).toThrow(/positive integer version/);

    const duplicateFocus = JSON.parse(JSON.stringify(database.CHECKPOINT_RULES));
    duplicateFocus['1.1.1'].requiredFocuses = ['cpu-component-roles', 'cpu-component-roles'];
    expect(() => database.validateQuestionBank(data, duplicateFocus)).toThrow(/distinct assessment focuses/);

    const unreachable = JSON.parse(JSON.stringify(database.CHECKPOINT_RULES));
    unreachable['1.1.1'].requiredFocuses.push('unreachable-focus');
    expect(() => database.validateQuestionBank(data, unreachable)).toThrow(/requires unreachable focus/);
  });

  test('rejects checkpoint rules with an invalid minimum ratio', () => {
    const rules = JSON.parse(JSON.stringify(database.CHECKPOINT_RULES));
    rules['1.1.1'].minimumRatio = 1.1;

    expect(() => database.validateQuestionBank(data, rules))
      .toThrow(/requires a minimum ratio above 0 and no greater than 1/);
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
    const reachable = database.enumerateReachableRecallQuestions(data);
    expect(reachable).toHaveLength(86);
    expect(reachable.map(question => question.id)).toContain('q_1_1_a');
    expect(new Set(reachable.map(question => question.retryHint)).size).toBe(86);
    expect(reachable.map(question => question.id)).toEqual(expect.arrayContaining([
      'priority_213_linear', 'priority_213_insertion', 'priority_213_bubble_pass'
    ]));
    reachable.forEach(question => {
      expect(Object.prototype.hasOwnProperty.call(question, 'retryHint')).toBe(true);
      expect(question.retryHint).toEqual(expect.any(String));
      expect(question.retryHint.length).toBeGreaterThanOrEqual(50);
      expect(question.retryHint).not.toMatch(/reread|read the question|try again|review the question wording|review this topic|check your notes|think carefully/i);
      const hintWords = question.retryHint.toLowerCase().match(/[a-z0-9]+/g) || [];
      const answerWords = String(question.answer).toLowerCase().match(/[a-z0-9]+/g) || [];
      expect(answerWords.length === 1
        ? hintWords.includes(answerWords[0])
        : hintWords.join(' ').includes(answerWords.join(' '))).toBe(false);
    });
  });

  test('rejects missing, generic and answer-revealing retry guidance', () => {
    const questionId = 'q_1_1_a';
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

  test('rejects retry guidance that reveals a correct matching pair', () => {
    const revealing = JSON.parse(JSON.stringify(data));
    const question = revealing.questions.find(item => item.id === 'q_1_3_d');
    question.retryHint = `Lossy Compression: ${question.items[0].match}`;

    expect(() => database.validateQuestionBank(revealing)).toThrow(/reveals its answer/);
  });

  test('rejects retry guidance that reveals a missing-word value', () => {
    const revealing = JSON.parse(JSON.stringify(data));
    const question = revealing.questions.find(item => item.id === 'q_1_1_a');
    question.type = 'missing_words';
    delete question.answer;
    delete question.options;
    question.blanks = { word1: 'decoder', word2: 'signal' };
    question.retryHint = 'The missing component is decoder; enter that exact word before considering the second blank.';

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
    const reachable = database.enumerateReachableRecallQuestions(data);

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

  test('uses the same topic and objective selectors that production exposes', () => {
    data.units.forEach(unit => {
      unit.topics.forEach(topic => {
        const questions = data.questions.filter(question => question.topicId === topic.id && question.retired !== true);
        expect(database.selectTopicRecallQuestions(questions)).toHaveLength(Math.min(3, questions.length));
        topic.objectives.forEach(objective => {
          const selected = database.selectObjectiveRecallQuestions(questions, objective.id);
          expect(selected.length).toBeLessThanOrEqual(3);
          expect(selected.every(question => question.specificationPointId === objective.id)).toBe(true);
        });
      });
    });
  });

  test('keeps reviewed factual corrections and OCR mappings in the live banks', () => {
    const question = id => data.questions.find(item => item.id === id);
    const written = id => data.writtenQuestions.find(item => item.id === id);
    const task = id => data.examTransferTasks.find(item => item.id === id);

    expect(question('q_1_2_a').explanation).not.toMatch(/permanent/i);
    expect(question('q_1_2_ram_rom_difference_alt').explanation).not.toMatch(/permanent/i);
    expect(question('q_1_2_d').explanation).not.toMatch(/1,?024/);
    expect(written('curriculum_app_1_3_2').question).not.toMatch(/fixed|permanent/i);
    expect(written('curriculum_app_1_6_2').rubric.join(' ')).toMatch(/Computer Misuse Act/i);
    expect(written('curriculum_app_1_6_2').rubric.join(' ')).not.toMatch(/Copyright|Data Protection/i);
    expect(written('curriculum_app_2_5_2').question).not.toMatch(/syntax highlighting/i);
    ['priority_transfer_231', 'priority_transfer_223', 'priority_transfer_erl', 'priority_transfer_212', 'transfer_3']
      .forEach(id => expect(task(id).assessmentObjective).toBe('AO3'));
  });

  test('keeps the reviewed short Paper 1 comparison alternatives markable', () => {
    const alternatives = data.examTransferTasks.filter(task =>
      task.paper === 'Paper 1' && task.commandWord === 'Compare' && task.marks === 3
    );

    expect(alternatives.map(task => task.id)).toEqual(expect.arrayContaining([
      'transfer_6', 'transfer_6_storage_compare'
    ]));
    alternatives.forEach(task => {
      expect(task.variantFamilyId).toEqual(expect.any(String));
      expect(task.requiredElements.length).toBeGreaterThanOrEqual(3);
      expect(task.retryQuestion).toEqual(expect.any(String));
    });
  });
});
