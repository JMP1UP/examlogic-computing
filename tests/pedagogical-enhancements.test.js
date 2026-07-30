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
      expect(session.questions[0].question).toBe('Q1');
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
  });

  describe('Scaffolded 6-8 Mark Extended Response Builder', () => {
    test('provides structured ladder scaffold for 1.6.1 Ethical & Environmental Impacts', () => {
      const scaffold = extendedWritingBuilder.getExtendedWritingScaffold('1.6.1');
      expect(scaffold.marks).toBe(6);
      expect(scaffold.scaffoldLadder).toHaveLength(4);
    });

    test('evaluates student 4-stage selections against marking criteria', () => {
      const scaffold = extendedWritingBuilder.getExtendedWritingScaffold('1.6.1');
      const selections = {
        stage1: [scaffold.scaffoldLadder[0].correctSelections[0]],
        stage2: [scaffold.scaffoldLadder[1].correctSelections[0]],
        stage3Text: 'Laptops allow pupils to work from home, but those without internet face digital divide.',
        stage4Text: 'In conclusion, e-waste recycling ensures environmental benefit outweighs cost.'
      };

      const result = extendedWritingBuilder.evaluateExtendedResponse('1.6.1', selections);
      expect(result.marksAwarded).toBeGreaterThanOrEqual(4);
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
