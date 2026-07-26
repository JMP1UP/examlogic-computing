const schema12Fixture = require('./fixtures/schema-12-data');
const anonymisedSchema12Fixture = require('./fixtures/schema-12-anonymised-verification');

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

describe('StudySpice local-data migrations', () => {
  beforeEach(() => {
    jest.resetModules();
    global.window = {};
    global.localStorage = {
      getItem: jest.fn(() => null),
      setItem: jest.fn()
    };
  });

  afterEach(() => {
    delete global.window;
    delete global.localStorage;
  });

  test('upgrades schema 12 to 13 without deleting learner or school records', () => {
    const stored = clone(schema12Fixture);
    global.localStorage.getItem.mockReturnValue(JSON.stringify(stored));

    require('../database');
    const migrated = global.window.db.cachedData;

    expect(migrated.schemaVersion).toBe(13);
    [
      'attempts',
      'writtenSubmissions',
      'programmingSubmissions',
      'assignments',
      'settings',
      'studentProgress',
      'students',
      'messages',
      'auditLogs',
      'customUserRecords'
    ].forEach(key => expect(migrated[key]).toEqual(stored[key]));
  });

  test('merges new default curriculum records while retaining unknown legacy records', () => {
    global.localStorage.getItem.mockReturnValue(JSON.stringify(clone(schema12Fixture)));

    require('../database');
    const migrated = global.window.db.cachedData;

    expect(migrated.curriculumContent.find(item => item.id === '1.1.1')).toBeDefined();
    expect(migrated.curriculumContent.find(item => item.id === 'legacy_curriculum_item')).toEqual(
      schema12Fixture.curriculumContent[0]
    );
    expect(migrated.questions.find(item => item.id === 'legacy_teacher_question')).toEqual(
      schema12Fixture.questions[0]
    );
    expect(migrated.questions.find(item => item.id === 'legacy_teacher_question')).not.toHaveProperty('retryHint');
  });

  test('persists the migrated schema instead of silently resetting it', () => {
    global.localStorage.getItem.mockReturnValue(JSON.stringify(clone(schema12Fixture)));

    require('../database');

    const storedWrite = global.localStorage.setItem.mock.calls.find(([key]) => key === 'studyspice_db');
    expect(storedWrite).toBeDefined();
    expect(JSON.parse(storedWrite[1])).toMatchObject({
      schemaVersion: 13,
      attempts: schema12Fixture.attempts,
      assignments: schema12Fixture.assignments
    });
  });

  test('reconciles schema 13 system content without changing user-owned records', () => {
    const stored = clone(schema12Fixture);
    stored.schemaVersion = 13;
    stored.questions = [
      { id: 'q_1_1_a', topicId: 'topic_1_1', specificationPointId: '1.1.1' },
      { id: 'q_1_1_a', topicId: 'topic_1_1', specificationPointId: '1.1.1' }
    ];
    global.localStorage.getItem.mockReturnValue(JSON.stringify(stored));

    require('../database');
    const reconciled = global.window.db.cachedData;
    const questionIds = reconciled.questions.map(question => question.id);

    expect(new Set(questionIds).size).toBe(questionIds.length);
    expect(reconciled.attempts).toEqual(stored.attempts);
    expect(reconciled.settings).toEqual(stored.settings);
  });

  test('verifies an anonymised realistic schema 12 dataset before and after migration', () => {
    const stored = clone(anonymisedSchema12Fixture);
    global.localStorage.getItem.mockReturnValue(JSON.stringify(stored));

    require('../database');
    const migrated = global.window.db.cachedData;
    const preservedCollections = [
      'schools',
      'coordinators',
      'students',
      'classes',
      'attempts',
      'writtenSubmissions',
      'programmingSubmissions',
      'assignments',
      'settings',
      'studentProgress',
      'messages',
      'auditLogs',
      'customUserRecords'
    ];

    preservedCollections.forEach(key => expect(migrated[key]).toEqual(stored[key]));
    expect(migrated.schemaVersion).toBe(13);
    expect(migrated.curriculumContent).toEqual(expect.arrayContaining(stored.curriculumContent));
    expect(migrated.questions).toEqual(expect.arrayContaining(stored.questions));
  });
});
