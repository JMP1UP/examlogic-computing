// Original unseen mixed exam-practice engine for OCR GCSE Computer Science J277.
(function initialiseMixedExamEngine(root, factory) {
  const engine = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = engine;
  if (root) {
    root.StudySpiceContent = root.StudySpiceContent || {};
    root.StudySpiceContent.mixedExamEngine = engine;
  }
})(typeof window !== 'undefined' ? window : globalThis, function buildMixedExamEngine() {
  'use strict';

  const PAPER_1_STRANDS = ['1.1.1', '1.1.2', '1.1.3', '1.2.1', '1.2.2', '1.2.3', '1.2.4a', '1.2.4b', '1.2.4c', '1.2.4d', '1.2.5', '1.3.1', '1.3.2', '1.4.1', '1.4.2', '1.5.1', '1.5.2', '1.6.1', '1.6.2'];
  const PAPER_2_STRANDS = ['2.1.1', '2.1.2', '2.1.3', '2.2.1', '2.2.2', '2.2.3', '2.2.PY', '2.2.ERL', '2.3.1', '2.3.2', '2.4.1', '2.5.1', '2.5.2'];

  function hashString(value) {
    return String(value).split('').reduce((hash, character) => ((hash * 31) + character.charCodeAt(0)) >>> 0, 2166136261);
  }

  function seededOrder(items, seed) {
    return [...items].sort((left, right) => {
      const difference = hashString(`${seed}:${left.id}`) - hashString(`${seed}:${right.id}`);
      return difference || String(left.id).localeCompare(String(right.id));
    });
  }

  function rotateOptions(options, seed, questionId) {
    if (!Array.isArray(options) || options.length < 2) return [...(options || [])];
    const offset = hashString(`${seed}:${questionId}`) % options.length;
    return [...options.slice(offset), ...options.slice(0, offset)];
  }

  function responseFamily(task) {
    const command = String(task.commandWord || '').toLowerCase();
    if (/calculate|complete/.test(command)) return 'calculation-or-completion';
    if (/write|design|refine/.test(command)) return 'algorithm-or-design';
    if (/discuss|evaluate|recommend|justify/.test(command)) return 'extended-application';
    if (/compare/.test(command)) return 'comparison';
    return 'short-explanation';
  }

  function isAO3Task(task) {
    return /write|design|refine|complete/i.test(String(task.commandWord || ''));
  }

  function officialSpecificationId(objectiveId) {
    const id = String(objectiveId || '');
    if (/^1\.2\.4[a-d]$/i.test(id)) return '1.2.4';
    if (/^2\.2\.(PY|ERL)$/i.test(id)) return '2.2';
    return id;
  }

  function selectionQuality(tasks, targetMinutes) {
    const formats = new Set(tasks.map(responseFamily)).size;
    const specifications = new Set(tasks.map(task => task.specificationPointId)).size;
    const extended = tasks.some(task => Number(task.marks) >= 6) ? 1 : 0;
    const ao3 = tasks.some(isAO3Task) ? 1 : 0;
    return (formats * 100) + (specifications * 10) + (targetMinutes >= 40 ? extended * 25 : 0) + (ao3 * 20) + tasks.length;
  }

  function filterBySelection(items, paperType, selectedStrandIds, idAccessor) {
    if (Array.isArray(selectedStrandIds)) {
      return items.filter(item => selectedStrandIds.includes(idAccessor(item)));
    }
    if (paperType === 'paper1') return items.filter(item => PAPER_1_STRANDS.includes(idAccessor(item)));
    if (paperType === 'paper2') return items.filter(item => PAPER_2_STRANDS.includes(idAccessor(item)));
    return items;
  }

  function selectTimedTasks(tasks, targetMinutes, seed, requireAO3 = false, markRange = null, requireBothPapers = false, requiredConstructedQuestions = null) {
    const ordered = seededOrder(tasks, seed);
    const maximumMinutes = Math.max(targetMinutes + 3, Math.ceil(targetMinutes * 1.15));
    const combinations = new Map([['0:none', { minutes: 0, selected: [] }]]);
    const combinationKey = (minutes, selected) => {
      const papers = [...new Set(selected.map(task => task.paper || 'unknown'))].sort().join(',');
      const formats = [...new Set(selected.map(responseFamily))].sort().join(',');
      return `${minutes}:${papers}:${formats}:${selected.some(isAO3Task) ? 'ao3' : 'no-ao3'}`;
    };

    ordered.forEach(task => {
      const minutes = Math.max(1, Math.ceil((Number(task.marks) || 1) * 1.125));
      [...combinations.values()].sort((a, b) => b.minutes - a.minutes).forEach(({ minutes: total, selected }) => {
        const nextTotal = total + minutes;
        if (nextTotal > maximumMinutes) return;
        const nextSelection = [...selected, task];
        const key = combinationKey(nextTotal, nextSelection);
        const existing = combinations.get(key);
        if (!existing || selectionQuality(nextSelection, targetMinutes) > selectionQuality(existing.selected, targetMinutes)) {
          combinations.set(key, { minutes: nextTotal, selected: nextSelection });
        }
      });
    });

    const viable = [...combinations.values()].filter(({ minutes, selected }) => minutes > 0 && selected.length > 0).map(({ minutes, selected }) => [minutes, selected]);
    const minimumQuestions = requiredConstructedQuestions || (targetMinutes <= 10 ? 1 : targetMinutes <= 20 ? 2 : 4);
    const minimumFormats = targetMinutes <= 10 ? 1 : targetMinutes <= 20 ? 2 : 3;
    const meetsExamShape = ([, selected]) => selected.length >= minimumQuestions && new Set(selected.map(responseFamily)).size >= minimumFormats;
    const withinMarkRange = selected => !markRange || (() => {
      const marks = selected.reduce((total, task) => total + Number(task.marks || 0), 0);
      return marks >= markRange.minimum && marks <= markRange.maximum;
    })();
    const hasBothPapers = selected => new Set(selected.map(task => task.paper)).size >= 2;
    const shaped = viable.filter(candidate => meetsExamShape(candidate) && withinMarkRange(candidate[1]) && (!requireAO3 || candidate[1].some(isAO3Task)) && (!requireBothPapers || hasBothPapers(candidate[1])));
    const candidates = shaped.length ? shaped : viable;
    candidates.sort((left, right) => {
      const leftDistance = Math.abs(left[0] - targetMinutes);
      const rightDistance = Math.abs(right[0] - targetMinutes);
      if (leftDistance !== rightDistance) return leftDistance - rightDistance;
      const qualityDifference = selectionQuality(right[1], targetMinutes) - selectionQuality(left[1], targetMinutes);
      if (qualityDifference) return qualityDifference;
      if (left[0] !== right[0]) return right[0] - left[0];
      return right[1].length - left[1].length;
    });
    return candidates[0] || [0, []];
  }

  function createDiagnosticFallback(paperType, requestedCount, curriculumContent, selectedStrandIds, seed) {
    const pool = filterBySelection(curriculumContent, paperType, selectedStrandIds, item => item.id)
      .filter(item => item?.diagnostic?.question && Array.isArray(item.diagnostic.options));
    const selected = seededOrder(pool, seed).slice(0, requestedCount).map((item, index) => ({
      id: `mixed_q_${index + 1}_${item.id}`,
      specificationPointId: item.officialSpecificationPointId || item.id,
      strandId: item.id,
      displayTopicHeader: `Section Question ${index + 1}`,
      type: 'mcq',
      marks: 1,
      minutes: 1,
      commandWord: 'Select',
      question: item.diagnostic.question,
      options: rotateOptions(item.diagnostic.options, seed, item.id),
      answer: item.diagnostic.answer,
      explanation: item.diagnostic.explanation
    }));
    return {
      sessionId: `diagnostic_session_${seed}`,
      paperType,
      targetMinutes: Math.ceil(selected.length * 1.5),
      timeLimitMinutes: Math.ceil(selected.length * 1.5),
      totalQuestions: selected.length,
      totalMarks: selected.length,
      questionStyle: 'diagnostic',
      sufficientForRequestedTime: selected.length > 0,
      questions: selected
    };
  }

  return {
    createMixedExamSession(paperType = 'all', targetMinutes = 20, curriculumContent = [], examTransferTasks = [], examinerKnowledge = null, selectedStrandIds = null, sessionSeed = Date.now()) {
      const seed = String(sessionSeed);
      const duration = Math.max(5, Number(targetMinutes) || 20);
      const taskPool = filterBySelection(examTransferTasks, paperType, selectedStrandIds, item => item.specificationPointId)
        .filter(task => task?.question && Number(task.marks) > 0 && (duration > 10 || Number(task.marks) <= 6));

      if (!taskPool.length) {
        return createDiagnosticFallback(paperType, Math.max(1, Math.round(duration / 2)), curriculumContent, selectedStrandIds, seed);
      }

      const desiredShortParts = duration <= 10 ? 1 : duration <= 20 ? 3 : 4;
      const ao3Required = paperType === 'paper2' && duration > 10 && taskPool.some(task => isAO3Task(task) && /^2\.(1|2|3)/.test(task.specificationPointId));
      const markRange = {
        minimum: (duration <= 10 ? 7 : duration <= 20 ? 15 : 32) - desiredShortParts,
        maximum: (duration <= 10 ? 9 : duration <= 20 ? 18 : 36) - desiredShortParts
      };
      const mixedPaperRequired = paperType === 'all';
      const requiredConstructedQuestions = paperType === 'paper2' && duration <= 10 ? 2 : null;
      const [constructedMinutes, selectedTasks] = selectTimedTasks(taskPool, Math.max(5, duration - desiredShortParts), seed, ao3Required, markRange, mixedPaperRequired, requiredConstructedQuestions);
      const constructedQuestions = selectedTasks.map(task => ({
        id: task.id,
        specificationPointId: task.specificationPointId,
        officialSpecificationPointId: officialSpecificationId(task.specificationPointId),
        strandId: task.specificationPointId,
        topicId: task.topicId,
        paper: task.paper,
        type: 'constructed',
        responseForm: task.responseForm || (/calculate/i.test(task.commandWord) ? 'calculation' : /write|complete|design|refine/i.test(task.commandWord) ? 'algorithm' : 'explanation'),
        commandWord: task.commandWord,
        marks: Number(task.marks),
        minutes: Math.max(1, Math.ceil(Number(task.marks) * 1.125)),
        question: task.question,
        markScheme: [...(task.requiredElements || [])],
        planningPrompt: task.decodePrompt || '',
        retryQuestion: task.retryQuestion || ''
      }));
      const selectedSpecificationIds = new Set(selectedTasks.map(task => task.specificationPointId));
      const diagnosticPool = filterBySelection(curriculumContent, paperType, selectedStrandIds, item => item.id)
        .filter(item => item?.diagnostic?.question && Array.isArray(item.diagnostic.options));
      const orderedDiagnostics = seededOrder(diagnosticPool, `${seed}:short`)
        .sort((left, right) => Number(selectedSpecificationIds.has(right.id)) - Number(selectedSpecificationIds.has(left.id)));
      const maximumMinutes = duration <= 10 ? 12 : Math.max(duration + 3, Math.ceil(duration * 1.15));
      const shortQuestions = [];
      orderedDiagnostics.some((item, index) => {
        if (shortQuestions.length >= desiredShortParts || constructedMinutes + shortQuestions.length + 1 > maximumMinutes) return true;
        shortQuestions.push({
          id: `mixed_short_${index + 1}_${item.id}`,
          specificationPointId: item.officialSpecificationPointId || item.id,
          officialSpecificationPointId: officialSpecificationId(item.officialSpecificationPointId || item.id),
          strandId: item.id,
          paper: item.id.startsWith('1.') ? 'Paper 1' : 'Paper 2',
          type: 'mcq',
          responseForm: 'short-selection',
          commandWord: 'Select',
          marks: 1,
          minutes: 1,
          question: item.diagnostic.question,
          options: rotateOptions(item.diagnostic.options, seed, item.id),
          answer: item.diagnostic.answer,
          explanation: item.diagnostic.explanation,
          markScheme: [item.diagnostic.answer]
        });
        return false;
      });
      const questions = [];
      const unusedShortQuestions = [...shortQuestions];
      constructedQuestions.forEach(constructed => {
        const linkedIndex = unusedShortQuestions.findIndex(short => short.specificationPointId === constructed.specificationPointId);
        if (linkedIndex >= 0) questions.push(unusedShortQuestions.splice(linkedIndex, 1)[0]);
        questions.push(constructed);
      });
      questions.push(...unusedShortQuestions);
      const actualMinutes = constructedMinutes + shortQuestions.length;
      const totalMarks = questions.reduce((total, question) => total + question.marks, 0);
      const minimumUsefulTime = Math.ceil(duration * 0.8);
      const minimumQuestions = duration <= 10 ? 2 : duration <= 20 ? 4 : 7;
      const minimumFormats = duration <= 10 ? 2 : duration <= 20 ? 3 : 4;
      const responseFormats = new Set([...selectedTasks.map(responseFamily), ...(shortQuestions.length ? ['short-selection'] : [])]);
      const minimumMarks = duration <= 10 ? 7 : duration <= 20 ? 15 : 32;
      const maximumMarks = duration <= 10 ? 9 : duration <= 20 ? 18 : 36;
      const ao3Available = ao3Required;
      const ao3Included = selectedTasks.some(isAO3Task);
      const includesBothPapers = new Set(selectedTasks.map(task => task.paper)).size >= 2;
      const validShortPaper2Shape = paperType !== 'paper2' || duration > 10 || selectedTasks.length >= 2;

      return {
        sessionId: `exam_session_${seed}`,
        paperType,
        targetMinutes: duration,
        timeLimitMinutes: actualMinutes,
        totalQuestions: questions.length,
        totalMarks,
        questionStyle: 'exam',
        responseFormatCount: responseFormats.size,
        includesAO3: ao3Included,
        sufficientForRequestedTime: actualMinutes >= minimumUsefulTime && actualMinutes <= maximumMinutes && questions.length >= minimumQuestions && responseFormats.size >= minimumFormats && totalMarks >= minimumMarks && totalMarks <= maximumMarks && (!ao3Available || ao3Included) && (!mixedPaperRequired || includesBothPapers) && validShortPaper2Shape,
        questions
      };
    },

    evaluateExamPerformance(userAnswers = [], session = {}) {
      const automaticallyMarked = (session.questions || []).filter(question => question.type === 'mcq' || (!question.type && Object.prototype.hasOwnProperty.call(question, 'answer')));
      let score = 0;
      const breakdown = {};

      automaticallyMarked.forEach(question => {
        const index = session.questions.indexOf(question);
        const isCorrect = userAnswers[index] === question.answer;
        if (isCorrect) score += Number(question.marks) || 1;
        const section = question.strandId.startsWith('1.') ? 'Paper 1: Computer Systems' : 'Paper 2: Computational Thinking';
        breakdown[section] = breakdown[section] || { correct: 0, total: 0 };
        breakdown[section].total += Number(question.marks) || 1;
        if (isCorrect) breakdown[section].correct += Number(question.marks) || 1;
      });

      const total = automaticallyMarked.reduce((sum, question) => sum + (Number(question.marks) || 1), 0);
      const percentage = total ? Math.round((score / total) * 100) : null;
      const gradeEstimate = session.questionStyle === 'exam' || percentage === null ? null : percentage >= 80 ? 'Grade 8/9' : percentage >= 65 ? 'Grade 6/7' : percentage >= 50 ? 'Grade 4/5' : 'Grade 1-3';
      return { score, total, percentage, gradeEstimate, breakdown, requiresSelfCheck: automaticallyMarked.length !== (session.questions || []).length };
    }
  };
});
