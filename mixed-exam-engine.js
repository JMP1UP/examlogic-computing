// Original Unseen Mixed Mock Exam Engine for OCR GCSE Computer Science J277.
(function initialiseMixedExamEngine(root, factory) {
  const engine = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = engine;
  if (root) {
    root.StudySpiceContent = root.StudySpiceContent || {};
    root.StudySpiceContent.mixedExamEngine = engine;
  }
})(typeof window !== 'undefined' ? window : globalThis, function buildMixedExamEngine() {
  'use strict';

  return {
    createMixedExamSession(paperType = 'all', questionCount = 10, curriculumContent = [], priorityAssessments = [], examinerKnowledge = null, selectedStrandIds = null) {
      const selected = [];
      const paper1Strands = ['1.1.1', '1.1.2', '1.1.3', '1.2.1', '1.2.2', '1.2.3', '1.2.4a', '1.2.4b', '1.2.4c', '1.2.4d', '1.2.5', '1.3.1', '1.3.2', '1.4.1', '1.4.2', '1.5.1', '1.5.2', '1.6.1', '1.6.2'];
      const paper2Strands = ['2.1.1', '2.1.2', '2.1.3', '2.2.1', '2.2.2', '2.2.3', '2.2.PY', '2.2.ERL', '2.3.1', '2.3.2', '2.4.1', '2.5.1', '2.5.2'];

      let pool = curriculumContent;
      if (Array.isArray(selectedStrandIds) && selectedStrandIds.length > 0) {
        pool = curriculumContent.filter(item => selectedStrandIds.includes(item.id));
      } else if (paperType === 'paper1') {
        pool = curriculumContent.filter(item => paper1Strands.includes(item.id));
      } else if (paperType === 'paper2') {
        pool = curriculumContent.filter(item => paper2Strands.includes(item.id));
      }

      // Shuffle pool deterministic seed
      const shuffled = [...pool].sort((a, b) => a.id.localeCompare(b.id));

      shuffled.slice(0, questionCount).forEach((item, index) => {
        let questionObj = {
          id: `mixed_q_${index + 1}`,
          specificationPointId: item.officialSpecificationPointId,
          strandId: item.id,
          // Hide strand title to force concept identification
          displayTopicHeader: `Section Question ${index + 1}`,
          type: 'mcq',
          question: item.diagnostic.question,
          options: item.diagnostic.options,
          answer: item.diagnostic.answer,
          explanation: item.diagnostic.explanation
        };

        // Add parametric blueprint if available
        if (examinerKnowledge && typeof examinerKnowledge.generateBlueprintQuestion === 'function') {
          const blueprint = examinerKnowledge.generateBlueprintQuestion(item.id, index + 1);
          if (blueprint) {
            questionObj.blueprint = blueprint;
          }
        }

        selected.push(questionObj);
      });

      return {
        sessionId: `mock_session_${Date.now()}`,
        paperType,
        totalQuestions: selected.length,
        timeLimitMinutes: Math.ceil(selected.length * 1.5),
        questions: selected
      };
    },

    evaluateExamPerformance(userAnswers = [], session = {}) {
      let score = 0;
      const breakdown = {};

      session.questions.forEach((q, idx) => {
        const userAnswer = userAnswers[idx];
        const isCorrect = userAnswer === q.answer;
        if (isCorrect) score += 1;

        const section = q.strandId.startsWith('1.') ? 'Paper 1: Computer Systems' : 'Paper 2: Computational Thinking';
        if (!breakdown[section]) {
          breakdown[section] = { correct: 0, total: 0 };
        }
        breakdown[section].total += 1;
        if (isCorrect) breakdown[section].correct += 1;
      });

      const percentage = Math.round((score / Math.max(1, session.questions.length)) * 100);

      return {
        score,
        total: session.questions.length,
        percentage,
        gradeEstimate: percentage >= 80 ? 'Grade 8/9' : percentage >= 65 ? 'Grade 6/7' : percentage >= 50 ? 'Grade 4/5' : 'Grade 1-3',
        breakdown
      };
    }
  };
});
