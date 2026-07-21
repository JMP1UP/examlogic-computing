const { detectSafeguardingFlag } = require('../safeguarding');

describe('Shared safeguarding detector', () => {
  test.each([
    'Call me on 07123 456789',
    'Mon numéro de téléphone est 06 12 34 56 78',
    'Meine Telefonnummer ist 0176 12345678',
    'Mi número de teléfono es 612 345 678',
    'My personal email is student.private@example.com',
    'Let us meet in secret after school',
    'Message me on sn.apch.at'
  ])('flags risky content consistently: %s', text => {
    expect(detectSafeguardingFlag(text).flagged).toBe(true);
  });

  test.each([
    'Let us meet the project deadline tomorrow.',
    'The secret ingredient in my cake is cinnamon.',
    'My student number is 2026 and the room is 104.',
    'Please email the finished class project to our teacher.'
  ])('allows benign classroom content: %s', text => {
    expect(detectSafeguardingFlag(text)).toEqual({ flagged: false, reason: '' });
  });
});

describe('Local safeguarding workflow', () => {
  let localDb;

  beforeEach(() => {
    const storage = new Map();
    global.localStorage = {
      getItem: jest.fn(key => storage.get(key) ?? null),
      setItem: jest.fn((key, value) => storage.set(key, value)),
      removeItem: jest.fn(key => storage.delete(key))
    };
    global.BridgeSafeguarding = require('../safeguarding');
    global.window = {};
    jest.resetModules();
    require('../database');
    localDb = global.window.db;
  });

  afterEach(() => {
    delete global.window;
    delete global.localStorage;
    delete global.BridgeSafeguarding;
  });

  test('risky content creates an alert, pauses chat, and writes an audit event', () => {
    const flagsBefore = localDb.getFlags().length;
    const logsBefore = localDb.getAuditLogs().length;

    const message = localDb.addMessage(
      'match_1',
      'stud_1',
      'Synthetic safety test: contact me on 07123 456789'
    );

    expect(message.flagged).toBe(true);
    expect(localDb.getFlags()).toHaveLength(flagsBefore + 1);
    expect(localDb.getFlags().at(-1)).toMatchObject({
      messageId: message.id,
      status: 'Pending'
    });
    expect(localDb.getMatches().find(match => match.id === 'match_1').paused).toBe(true);
    expect(localDb.getAuditLogs()).toHaveLength(logsBefore + 2);
    expect(localDb.getAuditLogs().at(-1).action).toBe('Auto Safeguard Flag');
  });

  test('benign classroom text does not create safeguarding side effects', () => {
    const flagsBefore = localDb.getFlags().length;
    const logsBefore = localDb.getAuditLogs().length;

    const message = localDb.addMessage(
      'match_1',
      'stud_1',
      'Let us meet the project deadline; the secret ingredient is cinnamon.'
    );

    expect(message.flagged).toBe(false);
    expect(localDb.getFlags()).toHaveLength(flagsBefore);
    expect(localDb.getMatches().find(match => match.id === 'match_1').paused).toBe(false);
    expect(localDb.getAuditLogs()).toHaveLength(logsBefore);
  });
});
