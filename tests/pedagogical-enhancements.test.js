const mixedExamEngine = require('../mixed-exam-engine');
const extendedWritingBuilder = require('../extended-writing-builder');
const visualTracers = require('../visual-tracers');

describe('Senior Developer Pedagogical & Examiner Enhancements', () => {
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

  describe('Unseen Mixed Mock Exam Engine', () => {
    test('creates a mixed exam session without revealing explicit strand headers', () => {
      const curriculumContent = [
        { id: '1.1.1', officialSpecificationPointId: '1.1.1', diagnostic: { question: 'Q1', options: ['A','B'], answer: 'A', explanation: 'E1' } },
        { id: '1.2.3', officialSpecificationPointId: '1.2.3', diagnostic: { question: 'Q2', options: ['C','D'], answer: 'C', explanation: 'E2' } },
        { id: '2.1.2', officialSpecificationPointId: '2.1.2', diagnostic: { question: 'Q3', options: ['E','F'], answer: 'E', explanation: 'E3' } }
      ];

      const session = mixedExamEngine.createMixedExamSession('all', 3, curriculumContent, [], null);
      expect(session.questions).toHaveLength(3);
      expect(session.questions[0].displayTopicHeader).toBe('Section Question 1');
      expect(session.questions.map(question => question.question).sort()).toEqual(['Q1', 'Q2', 'Q3']);
    });

    test('evaluates exam performance and calculates grade estimates', () => {
      const session = {
        questions: [
          { strandId: '1.1.1', answer: 'A' },
          { strandId: '2.1.2', answer: 'B' }
        ]
      };

      const result = mixedExamEngine.evaluateExamPerformance(['A', 'B'], session);
      expect(result.score).toBe(2);
      expect(result.percentage).toBe(100);
      expect(result.gradeEstimate).toBe('Grade 8/9');
    });

    test('never infers a grade from the auto-marked part of a custom exam session', () => {
      const result = mixedExamEngine.evaluateExamPerformance(['Correct', 'A developed written response'], {
        questionStyle: 'exam',
        questions: [
          { type: 'mcq', strandId: '1.1.1', marks: 1, answer: 'Correct' },
          { type: 'constructed', strandId: '1.1.1', marks: 4 }
        ]
      });

      expect(result.requiresSelfCheck).toBe(true);
      expect(result.gradeEstimate).toBeNull();
    });

    test('treats an explicit empty strand selection as no questions, not all questions', () => {
      const curriculumContent = [
        { id: '1.1.1', officialSpecificationPointId: '1.1.1', diagnostic: { question: 'Q1', options: ['A', 'B'], answer: 'A', explanation: 'E1' } }
      ];

      const emptySession = mixedExamEngine.createMixedExamSession('paper1', 5, curriculumContent, [], null, []);
      const selectedSession = mixedExamEngine.createMixedExamSession('paper1', 5, curriculumContent, [], null, ['1.1.1']);

      expect(emptySession.questions).toEqual([]);
      expect(selectedSession.questions).toHaveLength(1);
      expect(selectedSession.questions[0].strandId).toBe('1.1.1');
      expect(selectedSession.questionStyle).toBe('diagnostic');
      expect(selectedSession.sufficientForRequestedTime).toBe(false);
    });

    test('builds a timed OCR-style test from constructed exam questions and preserves specification mapping', () => {
      const examTasks = [
        { id: 'exam_111', specificationPointId: '1.1.1', topicId: 'topic_1_1', paper: 'Paper 1', commandWord: 'Explain', marks: 4, minutes: 6, question: 'Explain the register roles.', requiredElements: ['PC role', 'MAR role', 'MDR role', 'linked sequence'] },
        { id: 'exam_112', specificationPointId: '1.1.2', topicId: 'topic_1_1', paper: 'Paper 1', commandWord: 'Compare', marks: 6, minutes: 9, question: 'Compare two processors.', requiredElements: ['clock speed', 'cache', 'cores'] },
        { id: 'exam_113', specificationPointId: '1.1.3', topicId: 'topic_1_1', paper: 'Paper 1', commandWord: 'Explain', marks: 4, minutes: 6, question: 'Explain an embedded controller.', requiredElements: ['larger system', 'dedicated purpose'] }
      ];
      const curriculumContent = ['1.1.1', '1.1.2', '1.1.3'].map((id, index) => ({
        id,
        officialSpecificationPointId: id,
        diagnostic: { question: `Short question ${index + 1}`, options: ['Correct', 'Wrong'], answer: 'Correct', explanation: 'Explanation' }
      }));

      const session = mixedExamEngine.createMixedExamSession('paper1', 10, curriculumContent, examTasks, null, ['1.1.1', '1.1.2', '1.1.3'], 'fixed-seed');

      expect(session.questionStyle).toBe('exam');
      expect(session.sufficientForRequestedTime).toBe(true);
      expect(session.timeLimitMinutes).toBeGreaterThanOrEqual(8);
      expect(session.timeLimitMinutes).toBeLessThanOrEqual(13);
      expect(session.totalMarks).toBeGreaterThanOrEqual(7);
      expect(session.totalMarks).toBeLessThanOrEqual(9);
      expect(session.questions.length).toBeGreaterThanOrEqual(2);
      expect(session.questions.length).toBeLessThanOrEqual(3);
      expect(session.questions.filter(question => question.type === 'constructed').length).toBeGreaterThanOrEqual(1);
      expect(session.questions.filter(question => question.type === 'mcq')).toHaveLength(1);
      expect(session.questions.every(question => ['1.1.1', '1.1.2', '1.1.3'].includes(question.specificationPointId))).toBe(true);
      expect(session.questions.every(question => /^1\.1\.[1-3]$/.test(question.officialSpecificationPointId))).toBe(true);
      expect(session.questions.every(question => question.markScheme.length > 0)).toBe(true);
    });

    test('does not place the correct multiple-choice option in one fixed position', () => {
      const curriculumContent = [
        { id: '1.1.1', officialSpecificationPointId: '1.1.1', diagnostic: { question: 'Q1', options: ['Correct', 'B', 'C', 'D'], answer: 'Correct', explanation: 'E1' } }
      ];
      const positions = new Set(Array.from({ length: 40 }, (_, index) => `seed-${index}`).map(seed => {
        const session = mixedExamEngine.createMixedExamSession('paper1', 5, curriculumContent, [], null, ['1.1.1'], seed);
        return session.questions[0].options.indexOf('Correct');
      }));

      expect([...positions].sort()).toEqual([0, 1, 2, 3]);
    });

    test('refuses a misleading duration when a narrow topic has too little exam material', () => {
      const task = { id: 'only_task', specificationPointId: '1.1.1', topicId: 'topic_1_1', paper: 'Paper 1', commandWord: 'Explain', marks: 4, minutes: 6, question: 'Explain one CPU process.', requiredElements: ['point one', 'point two', 'point three', 'point four'] };
      const curriculum = [{ id: '1.1.1', officialSpecificationPointId: '1.1.1', diagnostic: { question: 'Short check', options: ['Correct', 'Wrong'], answer: 'Correct', explanation: 'Why' } }];

      const session = mixedExamEngine.createMixedExamSession('paper1', 20, curriculum, [task], null, ['1.1.1'], 'narrow');

      expect(session.timeLimitMinutes).toBeLessThan(16);
      expect(session.sufficientForRequestedTime).toBe(false);
    });

    test('includes AO3 algorithm work in a viable Paper 2 programming test', () => {
      const tasks = [
        { id: 'p2_explain', specificationPointId: '2.2.2', topicId: 'topic_2_2', paper: 'Paper 2', commandWord: 'Explain', marks: 4, minutes: 6, question: 'Explain data types.', requiredElements: ['one', 'two', 'three', 'four'] },
        { id: 'p2_compare', specificationPointId: '2.1.1', topicId: 'topic_2_1', paper: 'Paper 2', commandWord: 'Compare', marks: 6, minutes: 9, question: 'Compare approaches.', requiredElements: ['one', 'two', 'three', 'four', 'five', 'six'] },
        { id: 'p2_write', specificationPointId: '2.2.1', topicId: 'topic_2_2', paper: 'Paper 2', commandWord: 'Write', marks: 6, minutes: 9, question: 'Write an algorithm.', requiredElements: ['one', 'two', 'three', 'four', 'five', 'six'] }
      ];
      const curriculum = tasks.map(task => ({ id: task.specificationPointId, officialSpecificationPointId: task.specificationPointId, diagnostic: { question: `Short ${task.id}`, options: ['Correct', 'Wrong'], answer: 'Correct', explanation: 'Why' } }));

      const session = mixedExamEngine.createMixedExamSession('paper2', 20, curriculum, tasks, null, tasks.map(task => task.specificationPointId), 'paper-two');

      expect(session.sufficientForRequestedTime).toBe(true);
      expect(session.includesAO3).toBe(true);
      expect(session.questions.some(question => question.commandWord === 'Write')).toBe(true);
      expect(session.responseFormatCount).toBeGreaterThanOrEqual(3);
      expect(session.totalMarks).toBeGreaterThanOrEqual(15);
      expect(session.totalMarks).toBeLessThanOrEqual(18);
    });

    test('builds honest ten-minute Paper 2 and mixed-paper shapes', () => {
      const tasks = [
        { id: 'p1_a', specificationPointId: '1.1.1', paper: 'Paper 1', commandWord: 'Explain', marks: 4, question: 'Explain one CPU feature.', requiredElements: ['one', 'two', 'three', 'four'] },
        { id: 'p2_a', specificationPointId: '2.1.1', paper: 'Paper 2', commandWord: 'Explain', marks: 4, question: 'Explain one algorithm feature.', requiredElements: ['one', 'two', 'three', 'four'] },
        { id: 'p2_b', specificationPointId: '2.2.2', paper: 'Paper 2', commandWord: 'Compare', marks: 4, question: 'Compare two data types.', requiredElements: ['one', 'two', 'three', 'four'] },
        { id: 'p2_oversized', specificationPointId: '2.2.3', paper: 'Paper 2', commandWord: 'Write', marks: 8, question: 'Write a long file algorithm.', requiredElements: ['one'] }
      ];
      const curriculum = tasks.map(task => ({ id: task.specificationPointId, officialSpecificationPointId: task.specificationPointId, diagnostic: { question: `Short ${task.id}`, options: ['Correct', 'B', 'C', 'D'], answer: 'Correct', explanation: 'Why' } }));
      const paper2 = mixedExamEngine.createMixedExamSession('paper2', 10, curriculum, tasks, null, ['2.1.1', '2.2.2', '2.2.3'], 'short-p2');
      const mixed = mixedExamEngine.createMixedExamSession('all', 10, curriculum, tasks, null, ['1.1.1', '2.1.1'], 'short-mixed');

      expect(paper2.sufficientForRequestedTime).toBe(true);
      expect(paper2.questions.filter(question => question.type === 'constructed')).toHaveLength(2);
      expect(Math.max(...paper2.questions.filter(question => question.type === 'constructed').map(question => question.marks))).toBeLessThanOrEqual(6);
      expect(mixed.sufficientForRequestedTime).toBe(true);
      expect(new Set(mixed.questions.map(question => question.paper))).toEqual(new Set(['Paper 1', 'Paper 2']));
    });
  });

  describe('Scaffolded 8 Mark Extended Response Builder', () => {
    test('provides one coherent facial-recognition scaffold for 1.6.1', () => {
      const scaffold = extendedWritingBuilder.getExtendedWritingScaffold('1.6.1');
      expect(scaffold.marks).toBe(8);
      expect(scaffold.scaffoldLadder).toHaveLength(4);
      expect(scaffold.scenario).toContain('facial recognition');
      expect(JSON.stringify(scaffold)).not.toMatch(/500|laptop|e-waste/i);
    });

    test('keeps the planning scaffold formative rather than awarding automatic marks', () => {
      const scaffold = extendedWritingBuilder.getExtendedWritingScaffold('1.6.1');
      const selections = {
        stage1: [scaffold.scaffoldLadder[0].correctSelections[0]],
        stage2: [scaffold.scaffoldLadder[1].correctSelections[0]],
        stage3Text: 'An incorrect match could mark a pupil absent, so staff need a way to check the record.',
        stage4Text: 'The school should use a less intrusive attendance method unless it can justify storing biometric data.'
      };

      const result = extendedWritingBuilder.evaluateExtendedResponse('1.6.1', selections);
      expect(result.marksAwarded).toBeNull();
      expect(result.reviewStatus).toBe('practice_only');
      expect(result.totalMarks).toBe(8);
      expect(result.feedback.length).toBeGreaterThan(2);
    });
  });

  describe('Visual Tracing Scaffolds', () => {
    test('simulates binary shift left and right with dropped bit calculation', () => {
      const shiftLeft = visualTracers.simulateBinaryShift('00001101', 'left', 1);
      expect(shiftLeft.finalBinary).toBe('00011010');
      expect(shiftLeft.mathEffect).toContain('Multiplied');

      const shiftRight = visualTracers.simulateBinaryShift('00001100', 'right', 1);
      expect(shiftRight.finalBinary).toBe('00000110');
      expect(shiftRight.mathEffect).toContain('Divided');
    });

    test('simulates logic gate signal propagation', () => {
      const gateAnd = visualTracers.simulateLogicGate('AND', 1, 1);
      expect(gateAnd.output).toBe(1);

      const gateXor = visualTracers.simulateLogicGate('XOR', 1, 1);
      expect(gateXor.output).toBe(0);
    });
  });

  describe('LocalDB Integration', () => {
    test('exposes all pedagogical enhancement methods on LocalDB instance', () => {
      const db = global.window.db;
      expect(db.createMixedExamSession('paper1', 5)).not.toBeNull();
      expect(db.getExtendedWritingScaffold('1.6.1')).not.toBeNull();
      expect(db.simulateBinaryShift('00000010', 'left', 1)).not.toBeNull();
      expect(db.simulateLogicGate('OR', 1, 0)).not.toBeNull();
    });
  });
});
