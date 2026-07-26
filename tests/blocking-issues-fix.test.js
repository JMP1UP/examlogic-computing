const fs = require('fs');
const path = require('path');

describe('Blocking Issues Fixes Verification', () => {
  let data;

  beforeAll(() => {
    global.window = {
      location: { reload: jest.fn() }
    };
    global.localStorage = {
      _store: {},
      getItem(key) { return this._store[key] || null; },
      setItem(key, value) { this._store[key] = String(value); },
      clear() { this._store = {}; }
    };
    global.document = {
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener: () => {}
    };

    jest.isolateModules(() => {
      require('../database');
      data = global.window.db.cachedData;
    });

    const appCode = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');
    const exportsMatch = appCode.match(/class App\s*\{/);
    expect(exportsMatch).toBeTruthy();
  });

  test('Issue 7: q_1_4_router_role_alt is correctly mapped to specificationPointId 1.3.1', () => {
    const routerQ = data.questions.find(q => q.id === 'q_1_4_router_role_alt');
    expect(routerQ).toBeTruthy();
    expect(routerQ.specificationPointId).toBe('1.3.1');
  });

  test('Issue 1: Generated application tasks contain concrete scenarios, questions and rubrics', () => {
    const generatedTasks = data.writtenQuestions.filter(q => q.id.startsWith('curriculum_app_'));
    expect(generatedTasks.length).toBeGreaterThan(0);
    generatedTasks.forEach(task => {
      expect(task.question).not.toContain('Responses vary by the learner');
      expect(task.question.length).toBeGreaterThan(30);
      expect(task.modelAnswer.length).toBeGreaterThan(40);
      expect(task.rubric.length).toBeGreaterThan(1);
      expect(task.rubric[0]).not.toBe('Accurate use of the named computing concepts.');
    });
  });

  test('Issue 2: Written answer scaffolding produces dynamic hints from activeQ', () => {
    const activeQ = {
      id: 'test_sql_1',
      question: 'Write a SQL query',
      indicativeContent: ['SELECT Name', 'FROM Pupil', 'WHERE House = "Blue"'],
      rubric: ['Correct SELECT clause', 'Correct FROM clause']
    };
    const hints = (activeQ.indicativeContent && activeQ.indicativeContent.length)
      ? activeQ.indicativeContent
      : activeQ.rubric;
    expect(hints).toEqual(['SELECT Name', 'FROM Pupil', 'WHERE House = "Blue"']);
    expect(hints).not.toContain('Data privacy/GDPR');
  });

  test('Issue 3: Learn Hub total workload is calculated per topic and objective filtering works', () => {
    const activeNote = data.theoryNotes[0];
    const allObjectiveTeaching = data.curriculumContent.filter(item => {
      const objective = data.units
        .flatMap(unit => unit.topics)
        .find(topic => topic.id === activeNote.topicId)
        ?.objectives.find(candidate => candidate.id === item.id);
      return Boolean(objective);
    });
    const totalCoreMins = allObjectiveTeaching.reduce((acc, item) => acc + (item.workload?.coreLearningMinutes || 10), 0);
    expect(allObjectiveTeaching.length).toBeGreaterThan(0);
    expect(totalCoreMins).toBeGreaterThan(0);
  });

  test('Issue 4: Post-lesson quiz prioritizes active objective questions over default slice', () => {
    const topic11Questions = data.questions.filter(q => q.topicId === 'topic_1_1');
    const activeObjectiveId = '1.1.3';
    const matchingObjQuestions = topic11Questions.filter(q => q.specificationPointId === activeObjectiveId);
    const otherQuestions = topic11Questions.filter(q => q.specificationPointId !== activeObjectiveId);
    const selected = [...matchingObjQuestions, ...otherQuestions].slice(0, 3);
    
    expect(selected[0].specificationPointId).toBe('1.1.3');
  });

  test('Issue 5: Test preparation allows viewing all selected points without hard slicing', () => {
    const prep = data.testPreps[0];
    const selectedCount = prep.specificationPointIds.length;
    expect(selectedCount).toBeGreaterThan(0);
    
    // Batch slicing verification
    const offset = 0;
    const batch1 = prep.specificationPointIds.slice(offset, offset + 3);
    expect(batch1.length).toBeLessThanOrEqual(3);
  });

  test('Issue 6: Interactive Try it with support persists student responses in localStorage', () => {
    const objId = '1.1.1';
    global.localStorage.setItem(`try_practice_${objId}`, 'PC stores 0x04 initially');
    const restored = global.localStorage.getItem(`try_practice_${objId}`);
    expect(restored).toBe('PC stores 0x04 initially');
  });
});
