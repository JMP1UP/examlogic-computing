let data;

beforeAll(() => {
  global.window = {};
  global.localStorage = { getItem: () => null, setItem: () => {} };
  jest.isolateModules(() => {
    require('../database');
    data = global.window.db.cachedData;
  });
});

const getTopic = id => data.curriculumContent.find(item => item.id === id);
const teachingText = id => JSON.stringify(getTopic(id).teachingSections);
const expectAttemptAndCheck = (id, expectedSections) => {
  const sections = getTopic(id).teachingSections;
  expect(sections).toHaveLength(expectedSections);
  sections.forEach(section => {
    expect((section.items || []).some(item => item.label === 'Try it now — use paper')).toBe(true);
    expect(section.html).toMatch(/<details>.*<summary>Check/s);
  });
};

describe('independent revision teaching depth', () => {
  test('teaches all five search and sort algorithms as separate worked cycles', () => {
    const topic = getTopic('2.1.3');
    expect(topic.teachingSections.map(section => section.heading)).toEqual([
      expect.stringMatching(/linear search/i),
      expect.stringMatching(/binary search/i),
      expect.stringMatching(/bubble sort/i),
      expect.stringMatching(/insertion sort/i),
      expect.stringMatching(/merge sort/i)
    ]);
    const text = teachingText('2.1.3');
    expect(text).toMatch(/not found/i);
    expect(text).toMatch(/numbered from 0/i);
    expect(text).toMatch(/sorted data/i);
    expect(text).toMatch(/two middle items/i);
    expect(text).toMatch(/complete pass makes no swaps/i);
    expect(text).toMatch(/sorted section grows/i);
    expect(text).toMatch(/\[6\].*\[2\].*\[5\].*\[1\]/i);
    expect(text).toMatch(/common mistake/i);
    expect(topic.teachingSections.flatMap(section => section.items || []).filter(item => item.label === 'Try it now — use paper')).toHaveLength(5);
    expect(text.match(/Check your/g)).toHaveLength(5);
  });

  test('connects network components, layouts and services in worked contexts', () => {
    const text = teachingText('1.3.1');
    [/local area network/i, /wide area network/i, /client-server/i, /peer-to-peer/i,
      /star network/i, /mesh network/i, /switch/i, /router/i, /network interface/i,
      /wireless access point/i, /DNS lookup/i, /cloud/i].forEach(term => expect(text).toMatch(term));
    expect(text).toMatch(/central switch has separate direct connections/i);
    expect(text).toMatch(/Router → Internet/i);
  });

  test('applies operating-system and utility functions rather than only naming them', () => {
    const operatingSystems = teachingText('1.5.1');
    expect(operatingSystems).toMatch(/pupil edits an image while music plays/i);
    expect(operatingSystems).toMatch(/print request/i);
    expect(operatingSystems).toMatch(/Check the OS-function matching task/i);
    const utilities = teachingText('1.5.2');
    expect(utilities).toMatch(/stolen laptop/i);
    expect(utilities).toMatch(/large attachment/i);
    expect(utilities).toMatch(/magnetic hard disk/i);
    expect(utilities).toMatch(/Do not recommend it for an SSD/i);
    expect(utilities).toMatch(/photographer needs smaller preview images/i);
  });

  test('gives novice programmers and secure-design learners a repeatable process', () => {
    const python = teachingText('2.2.PY');
    expect(python).toMatch(/smallest working step/i);
    expect(python).toMatch(/normal input, a boundary/i);
    expect(python).toMatch(/unsuitable input such as text/i);
    const defensive = teachingText('2.3.1');
    expect(defensive).toMatch(/valid-looking input is not proof of identity/i);
    expect(defensive).toMatch(/clear retry/i);
    expect(defensive).toMatch(/clearly named subprograms/i);
    expect(defensive).toMatch(/repeat input until presence and length checks pass/i);
    expect(defensive).toMatch(/rate limit or temporary lockout/i);
  });

  test('makes algorithm design and programming-fundamentals practice checkable', () => {
    expectAttemptAndCheck('2.1.2', 4);
    expectAttemptAndCheck('2.2.1', 4);
    const design = teachingText('2.1.2');
    expect(design).toMatch(/Correct totals: 4, 5, 11/i);
    expect(design).toMatch(/parallelogram/i);
    expect(design).toMatch(/off-by-one error/i);
    const fundamentals = teachingText('2.2.1');
    expect(fundamentals).toMatch(/23 DIV 5 is 4/i);
    expect(fundamentals).toMatch(/inner loop of four.*12 times/i);
    expect(fundamentals).toMatch(/count-controlled loop for exactly three attempts/i);
  });

  test('makes broad programming-technique examples independently checkable', () => {
    expectAttemptAndCheck('2.2.3', 4);
    const text = teachingText('2.2.3');
    expect(text).toMatch(/substring\(1, 3\).*ETW/i);
    expect(getTopic('2.2.3').teachingSections[1].html).toContain('SELECT Name FROM Pupil WHERE House = "Blue"');
    expect(text).toMatch(/n.*is the parameter/i);
    expect(text).toMatch(/at least 1 and at most 10/i);
  });

  test('adds checkable application to security, impacts, law and translators', () => {
    [['1.4.1', 0], ['1.4.2', 2], ['1.6.1', 1], ['1.6.2', 0], ['2.5.1', 1]]
      .forEach(([id, index]) => {
        const section = getTopic(id).teachingSections[index];
        expect(section.items.some(item => item.label === 'Try it now — use paper')).toBe(true);
        expect(section.html).toMatch(/<details>.*<summary>Check/s);
      });
    expect(teachingText('1.4.1')).toMatch(/social engineering.*malware/i);
    expect(teachingText('1.6.2')).toMatch(/Computer Misuse Act 1990/i);
    expect(teachingText('2.5.1')).toMatch(/supply a translated form without giving users the source/i);
  });
});
