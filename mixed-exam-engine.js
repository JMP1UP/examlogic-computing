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
  const PROGRAMMING_STRANDS = ['2.1.2', '2.1.3', '2.2.1', '2.2.2', '2.2.3', '2.2.PY', '2.2.ERL', '2.3.1', '2.3.2'];

  function hashString(value) {
    let hash = 2166136261;
    String(value).split('').forEach(character => {
      hash ^= character.charCodeAt(0);
      hash = Math.imul(hash, 16777619);
    });
    hash += hash << 13;
    hash ^= hash >>> 7;
    hash += hash << 3;
    hash ^= hash >>> 17;
    hash += hash << 5;
    return hash >>> 0;
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
    if (/trace/.test(command) || task.responseForm === 'algorithm-trace') return 'algorithm-or-design';
    if (/calculate|complete/.test(command)) return 'calculation-or-completion';
    if (/write|design|refine/.test(command)) return 'algorithm-or-design';
    if (/discuss|evaluate|recommend|justify/.test(command)) return 'extended-application';
    if (/compare/.test(command)) return 'comparison';
    return 'short-explanation';
  }

  function isAO3Task(task) {
    return task.assessmentObjective === 'AO3';
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
    const formatWeight = targetMinutes <= 10 ? 5 : 20;
    return (formats * formatWeight) + (specifications * 10) + (targetMinutes >= 40 ? extended * 25 : 0) + (ao3 * 20) + tasks.length;
  }

  function selectionTieBreak(tasks, seed) {
    const ids = tasks.map(task => task.id).sort().join('|');
    return hashString(`${seed}:selection:${ids}`);
  }

  function filterBySelection(items, paperType, selectedStrandIds, idAccessor) {
    if (Array.isArray(selectedStrandIds)) {
      return items.filter(item => selectedStrandIds.includes(idAccessor(item)));
    }
    if (paperType === 'paper1') return items.filter(item => PAPER_1_STRANDS.includes(idAccessor(item)));
    if (paperType === 'paper2') return items.filter(item => PAPER_2_STRANDS.includes(idAccessor(item)));
    if (paperType === 'programming') return items.filter(item => PROGRAMMING_STRANDS.includes(idAccessor(item)));
    return items;
  }

  function selectTimedTasks(tasks, targetMinutes, seed, requireAO3 = false, markRange = null, requireBothPapers = false, requiredConstructedQuestions = null, requireAlgorithmic = false, requiredTaskId = null) {
    const ordered = seededOrder(tasks, seed);
    const maximumMinutes = Math.max(targetMinutes + 3, Math.ceil(targetMinutes * 1.15));
    const combinations = new Map([['0:none', { minutes: 0, selected: [] }]]);
    const combinationKey = (minutes, selected) => {
      const papers = [...new Set(selected.map(task => task.paper || 'unknown'))].sort().join(',');
      const formats = [...new Set(selected.map(responseFamily))].sort().join(',');
      const specifications = [...new Set(selected.map(task => task.specificationPointId))].sort().join(',');
      const includesRequiredTask = requiredTaskId && selected.some(task => task.id === requiredTaskId);
      return `${minutes}:${papers}:${formats}:${specifications}:${selected.some(isAO3Task) ? 'ao3' : 'no-ao3'}:${includesRequiredTask ? 'required' : 'not-required'}`;
    };

    ordered.forEach(task => {
      const minutes = Math.max(1, Math.ceil((Number(task.marks) || 1) * 1.125));
      [...combinations.values()].sort((a, b) => b.minutes - a.minutes).forEach(({ minutes: total, selected }) => {
        if (task.selectionFamilyId && selected.some(item => item.selectionFamilyId === task.selectionFamilyId)) return;
        const nextTotal = total + minutes;
        if (nextTotal > maximumMinutes) return;
        const nextSelection = [...selected, task];
        const key = combinationKey(nextTotal, nextSelection);
        const existing = combinations.get(key);
        const nextQuality = selectionQuality(nextSelection, targetMinutes);
        const existingQuality = existing ? selectionQuality(existing.selected, targetMinutes) : -1;
        if (!existing || nextQuality > existingQuality || (
          nextQuality === existingQuality
          && selectionTieBreak(nextSelection, seed) < selectionTieBreak(existing.selected, seed)
        )) {
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
    const shaped = viable.filter(candidate => meetsExamShape(candidate) && withinMarkRange(candidate[1]) && (!requireAO3 || candidate[1].some(isAO3Task)) && (!requireBothPapers || hasBothPapers(candidate[1])) && (!requireAlgorithmic || candidate[1].some(task => responseFamily(task) === 'algorithm-or-design')) && (!requiredTaskId || candidate[1].some(task => task.id === requiredTaskId)));
    const hasHardShapeRequirement = requireAO3 || requireBothPapers || requireAlgorithmic || requiredTaskId;
    const candidates = shaped.length ? shaped : (hasHardShapeRequirement ? [] : viable);
    if (!candidates.length) return [0, []];
    const bestDistance = Math.min(...candidates.map(candidate => Math.abs(candidate[0] - targetMinutes)));
    const nearest = candidates.filter(candidate => Math.abs(candidate[0] - targetMinutes) === bestDistance);
    const bestQuality = Math.max(...nearest.map(candidate => selectionQuality(candidate[1], targetMinutes)));
    const balanced = nearest.filter(candidate => selectionQuality(candidate[1], targetMinutes) >= bestQuality - 10);
    balanced.sort((left, right) => {
      const tieDifference = selectionTieBreak(left[1], seed) - selectionTieBreak(right[1], seed);
      if (tieDifference) return tieDifference;
      if (left[0] !== right[0]) return right[0] - left[0];
      return right[1].length - left[1].length;
    });
    return balanced[0] || [0, []];
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
      sufficientForRequestedTime: false,
      questions: selected
    };
  }

  return {
    createMixedExamSession(paperType = 'all', targetMinutes = 20, curriculumContent = [], examTransferTasks = [], examinerKnowledge = null, selectedStrandIds = null, sessionSeed = Date.now()) {
      const seed = String(sessionSeed);
      const duration = Math.max(5, Number(targetMinutes) || 20);
      const maximumTaskMarks = duration <= 5 ? 5 : duration <= 10 ? 6 : Infinity;
      const taskPool = filterBySelection(examTransferTasks, paperType, selectedStrandIds, item => item.specificationPointId)
        .filter(task => task?.question && Number(task.marks) > 0 && Number(task.marks) <= maximumTaskMarks);

      if (!taskPool.length) {
        return createDiagnosticFallback(paperType, Math.max(1, Math.round(duration / 2)), curriculumContent, selectedStrandIds, seed);
      }

      const desiredShortParts = duration <= 5
        ? 0
        : duration <= 10
        ? 1
        : duration <= 20 && ['paper2', 'programming'].includes(paperType)
          ? 2
          : duration <= 20 ? 3 : 4;
      const ao3Required = (paperType === 'programming' || (paperType === 'paper2' && duration > 10)) && taskPool.some(task => isAO3Task(task) && /^2\.(1|2|3)/.test(task.specificationPointId));
      const markRange = {
        minimum: (duration <= 5 ? 4 : duration <= 10 ? 7 : duration <= 20 ? 15 : 32) - desiredShortParts,
        maximum: (duration <= 5 ? 5 : duration <= 10 ? 9 : duration <= 20 ? 18 : 36) - desiredShortParts
      };
      const mixedPaperRequired = paperType === 'all';
      const requiredConstructedQuestions = paperType === 'paper2' && duration <= 10 ? 2 : null;
      const traceCandidates = taskPool.filter(task => task.responseForm === 'algorithm-trace');
      const requiredTraceTask = duration >= 20 && ['paper2', 'programming'].includes(paperType) && traceCandidates.length
        ? seededOrder(traceCandidates, `${seed}:required-trace`)[0].id
        : null;
      const [constructedMinutes, selectedTasks] = selectTimedTasks(taskPool, Math.max(5, duration - desiredShortParts), seed, ao3Required, markRange, mixedPaperRequired, requiredConstructedQuestions, paperType === 'programming', requiredTraceTask);
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
        assessmentObjective: task.assessmentObjective || null,
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
        .sort((left, right) => Number(selectedSpecificationIds.has(left.id)) - Number(selectedSpecificationIds.has(right.id)));
      const maximumMinutes = duration <= 10 ? 12 : Math.max(duration + 3, Math.ceil(duration * 1.15));
      const shortQuestions = [];
      orderedDiagnostics.some((item, index) => {
        if (shortQuestions.length >= desiredShortParts || constructedMinutes + shortQuestions.length + 1 > maximumMinutes) return true;
        shortQuestions.push({
          id: `mixed_short_${index + 1}_${item.id}`,
          specificationPointId: item.id,
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
      const minimumQuestions = duration <= 5 ? 1 : duration <= 10 ? 2 : duration <= 20 ? 4 : 7;
      const minimumFormats = duration <= 5 ? 1 : duration <= 10 ? 2 : duration <= 20 ? 3 : 4;
      const responseFormats = new Set([...selectedTasks.map(responseFamily), ...(shortQuestions.length ? ['short-selection'] : [])]);
      const minimumMarks = duration <= 5 ? 4 : duration <= 10 ? 7 : duration <= 20 ? 15 : 32;
      const maximumMarks = duration <= 5 ? 5 : duration <= 10 ? 9 : duration <= 20 ? 18 : 36;
      const ao3Available = ao3Required;
      const ao3Included = selectedTasks.some(isAO3Task);
      const includesBothPapers = new Set(selectedTasks.map(task => task.paper)).size >= 2;
      const validShortPaper2Shape = paperType !== 'paper2' || duration <= 5 || duration > 10 || selectedTasks.length >= 2;

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
