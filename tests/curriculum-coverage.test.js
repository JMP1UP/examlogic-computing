const fs = require('fs');
const path = require('path');

describe('objective-level curriculum coverage integrity', () => {
  let data;

  beforeAll(() => {
    global.window = {};
    global.localStorage = {
      getItem: () => null,
      setItem: () => {}
    };
    jest.isolateModules(() => {
      require('../database');
      data = global.window.db.cachedData;
    });
  });

  test('uses the complete set of selectable specification objectives as the coverage spine', () => {
    const objectives = data.units.flatMap(unit => unit.topics.flatMap(topic => topic.objectives));
    expect(objectives).toHaveLength(32);
    expect(new Set(objectives.map(objective => objective.id)).size).toBe(32);
  });

  test('keeps internal teaching strands traceable to an official OCR requirement', () => {
    const objectives = data.units.flatMap(unit => unit.topics.flatMap(topic => topic.objectives));
    const officialPoints = [
      '1.1.1', '1.1.2', '1.1.3', '1.2.1', '1.2.2', '1.2.3', '1.2.4',
      '1.2.5', '1.3.1', '1.3.2', '1.4.1', '1.4.2', '1.5.1', '1.5.2',
      '1.6.1', '2.1.1', '2.1.2', '2.1.3', '2.2.1', '2.2.2', '2.2.3',
      '2.3.1', '2.3.2', '2.4.1', '2.5.1', '2.5.2', '2d / 2.2', '3c / 2.1-2.3'
    ];
    expect(data.curriculumContent).toHaveLength(objectives.length);
    data.curriculumContent.forEach(item => {
      expect(item.officialSpecificationPointId).toBeTruthy();
      expect(item.sourcePages).toBeTruthy();
      expect(item.scope).toBeTruthy();
      expect(item.explanation.length).toBeGreaterThan(80);
      expect(item.workedExample.length).toBeGreaterThan(30);
      expect(item.keyTerms.length).toBeGreaterThan(1);
      expect(item.misconception).toBeTruthy();
      expect(item.requiredKnowledge.length).toBeGreaterThan(0);
      expect(item.requiredSkills.length).toBeGreaterThan(0);
      expect(item.assessmentModes.length).toBeGreaterThan(0);
      expect(item.supportedPractice.length).toBeGreaterThan(80);
      expect(item.workload.coreLearningMinutes).toBeLessThanOrEqual(60);
      expect(item.workload.retrievalMinutes).toBeLessThanOrEqual(5);
      expect(item.qualityStatus).toBe('implemented-against-j277-v3.1-awaiting-qualified-teacher-qa');
    });
    expect(new Set(data.curriculumContent.map(item => item.id))).toEqual(new Set(objectives.map(item => item.id)));
    expect(new Set(data.curriculumContent.map(item => item.officialSpecificationPointId)))
      .toEqual(new Set(officialPoints));
  });

  test('provides an original diagnostic check for every teaching strand', () => {
    const objectiveIds = data.units.flatMap(unit => unit.topics.flatMap(topic => topic.objectives.map(objective => objective.id)));
    objectiveIds.forEach(id => {
      const diagnostics = data.questions.filter(question => question.specificationPointId === id && question.purpose === 'diagnostic');
      expect(diagnostics).toHaveLength(1);
      expect(diagnostics[0].options).toContain(diagnostics[0].answer);
      expect(diagnostics[0].explanation).toBeTruthy();
    });
  });

  test('keeps the CPU fetch guided task focused on one clear learner output', () => {
    const cpuPurpose = data.curriculumContent.find(item => item.id === '1.1.1');

    expect(cpuPurpose.supportedPractice).toContain('three-step flow diagram');
    expect(cpuPurpose.supportedPractice).toContain('difference between the MAR and MDR');
    expect(cpuPurpose.supportedPractice).not.toContain('four-column table');
    expect(cpuPurpose.supportedPractice).not.toContain('decode, execute and store');
  });

  test('aligns the 1.1.1 exam application and four-mark rubric', () => {
    const task = data.examTransferTasks.find(item => item.specificationPointId === '1.1.1');
    expect(task).toMatchObject({ marks: 4, commandWord: 'Explain' });
    expect(task.question).toContain('PC');
    expect(task.question).toContain('MAR');
    expect(task.question).toContain('MDR');
    expect(task.requiredElements).toHaveLength(4);
    expect(task.planningLabels).toEqual(['PC role', 'Address moves to MAR', 'Instruction moves to MDR', 'PC increment']);
  });

  test('keeps exam-transfer retries and depth within their mapped J277 strand', () => {
    const memory = data.examTransferTasks.find(item => item.id === 'transfer_6');
    expect(memory.specificationPointId).toBe('1.2.1');
    expect(memory.retryQuestion).toMatch(/RAM.*ROM/);
    expect(memory.retryQuestion).not.toMatch(/SSD|HDD/);

    const search = data.examTransferTasks.find(item => item.id === 'transfer_7');
    expect(search.requiredElements).toContain('The list must be sorted');
    expect(search.requiredElements.join(' ')).not.toMatch(/logarithm|20 comparisons/i);

    const translator = data.examTransferTasks.find(item => item.id === 'transfer_8');
    expect(translator.requiredElements).toContain('Recommendation linked to development or release needs');
    expect(translator.requiredElements.join(' ')).not.toContain('Justified recommendation for Compiler');
  });

  test('keeps Data Representation exam evidence separate and method-aware', () => {
    const expectedForms = {
      '1.2.3': 'calculation',
      '1.2.4a': 'number-representation',
      '1.2.4b': 'explanation',
      '1.2.4c': undefined,
      '1.2.4d': 'calculation'
    };
    Object.entries(expectedForms).forEach(([id, responseForm]) => {
      const tasks = data.examTransferTasks.filter(item => item.specificationPointId === id);
      expect(tasks.length).toBeGreaterThanOrEqual(1);
      if (responseForm) expect(tasks.every(task => task.responseForm === responseForm)).toBe(true);
      expect(tasks.every(task => task.retryQuestion)).toBe(true);
    });

    ['1.2.3', '1.2.4d'].forEach(id => {
      const task = data.examTransferTasks.find(item => item.specificationPointId === id);
      expect(task.requiredElements.join(' ')).toMatch(/convert|divide/i);
      expect(task.requiredElements.join(' ')).toMatch(/unit|bytes|MB/i);
    });
    const numbers = data.examTransferTasks.find(item => item.specificationPointId === '1.2.4a');
    expect(numbers.requiredElements.join(' ')).toMatch(/denary/i);
    expect(numbers.requiredElements.join(' ')).toMatch(/hexadecimal/i);
    expect(numbers.requiredElements.join(' ')).not.toMatch(/overflow/i);
    expect(data.examTransferTasks.find(item => item.id === 'priority_transfer_124a_add').requiredElements.join(' ')).toMatch(/overflow/i);
    expect(data.examTransferTasks.find(item => item.id === 'transfer_1').traceabilitySpecificationPointIds).toContain('1.2.3');
    expect(data.examTransferTasks.find(item => item.id === 'priority_transfer_124d').traceabilitySpecificationPointIds).toContain('1.2.3');
    expect(data.examTransferTasks.find(item => item.id === 'priority_transfer_123_text').question).toMatch(/text file/i);
  });

  test('provides complete practice evidence for the priority Paper 2 strands', () => {
    ['2.2.3', '2.2.ERL', '2.1.2', '2.2.1', '2.3.2'].forEach(id => {
      const retrieval = data.questions.filter(item => item.specificationPointId === id && item.purpose === 'retrieval');
      const diagnostic = data.questions.filter(item => item.specificationPointId === id && item.purpose === 'diagnostic');
      const application = data.writtenQuestions.filter(item => item.specificationPointId === id && item.purpose === 'application');
      const examTransfer = data.examTransferTasks.filter(item => item.specificationPointId === id && item.purpose === 'exam-transfer');
      expect(retrieval.length).toBeGreaterThanOrEqual(3);
      expect(diagnostic).toHaveLength(1);
      expect(application.length).toBeGreaterThanOrEqual(2);
      expect(examTransfer.length).toBeGreaterThanOrEqual(1);
      expect(retrieval.length + diagnostic.length + application.length + examTransfer.length).toBeGreaterThanOrEqual(8);
    });
  });

  test('uses OCR Exam Reference Language notation in the dedicated pathway', () => {
    const erlItems = [
      ...data.questions,
      ...data.writtenQuestions,
      ...data.examTransferTasks
    ].filter(item => item.specificationPointId === '2.2.ERL');
    const source = JSON.stringify(erlItems);
    const assessedAnswers = JSON.stringify(erlItems.map(item => ({
      answer: item.answer,
      modelAnswer: item.modelAnswer,
      modelPlan: item.modelPlan,
      requiredElements: item.requiredElements
    })));
    expect(source).toContain('endif');
    expect(source).toContain('next i');
    expect(source).toContain('do ... until');
    expect(source).toContain('endfunction');
    expect(source).toContain('MOD 2 == 0');
    expect(assessedAnswers).not.toContain('range(');
  });

  test('maps every existing content item to a valid specification point', () => {
    const validIds = new Set(data.units.flatMap(unit => unit.topics.flatMap(topic => topic.objectives.map(objective => objective.id))));
    const mappedItems = [
      ...data.questions,
      ...data.writtenQuestions,
      ...data.keyTerms,
      ...data.examTransferTasks,
      ...data.programmingChallenges
    ];
    expect(mappedItems.length).toBeGreaterThan(0);
    mappedItems.forEach(item => {
      expect(item.specificationPointId).toBeTruthy();
      expect(validIds.has(item.specificationPointId)).toBe(true);
    });
  });

  test('gives every specification strand an explicitly mapped starter flashcard set', () => {
    const objectiveIds = data.units.flatMap(unit => unit.topics.flatMap(topic => topic.objectives.map(objective => objective.id)));
    const termIds = new Set();
    data.keyTerms.forEach(term => {
      expect(term.id).toBeTruthy();
      expect(termIds.has(term.id)).toBe(false);
      termIds.add(term.id);
      expect(term.specificationPointId).toBeTruthy();
      expect(term.definition.length).toBeGreaterThan(30);
      expect(term.keywords.length).toBeGreaterThanOrEqual(2);
    });
    objectiveIds.forEach(id => {
      expect(data.keyTerms.filter(term => term.specificationPointId === id).length).toBeGreaterThanOrEqual(1);
    });
  });

  test('uses a valid prerequisite graph rather than treating scope headings as prerequisites', () => {
    const objectiveIds = new Set(data.curriculumContent.map(item => item.id));
    data.curriculumContent.forEach(item => {
      expect(Array.isArray(item.prerequisiteSpecificationPointIds)).toBe(true);
      item.prerequisiteSpecificationPointIds.forEach(id => {
        expect(objectiveIds.has(id)).toBe(true);
        expect(id).not.toBe(item.id);
      });
    });
    expect(data.curriculumContent.find(item => item.id === '1.2.4d').prerequisiteSpecificationPointIds).toContain('1.2.3');
    expect(data.curriculumContent.find(item => item.id === '2.2.3').prerequisiteSpecificationPointIds).toEqual(['2.2.1', '2.2.2']);
    expect(data.curriculumContent.find(item => item.id === '1.2.5').prerequisiteSpecificationPointIds).toEqual([]);
    expect(data.curriculumContent.find(item => item.id === '2.4.1').prerequisiteSpecificationPointIds).toEqual([]);
  });

  test('provides sequenced teaching for the broadest previously compressed strands', () => {
    ['1.3.1', '2.1.1', '2.2.3', '2.2.PY'].forEach(id => {
      const content = data.curriculumContent.find(item => item.id === id);
      expect(content.teachingSections.length).toBeGreaterThanOrEqual(1);
      content.teachingSections.forEach(section => {
        expect(section.heading).toBeTruthy();
        expect(section.body.length).toBeGreaterThan(80);
      });
    });
  });

  test('provides sequenced teaching and a usable flashcard deck across systems and storage', () => {
    const systemsAndStorage = ['1.1.1', '1.1.2', '1.1.3', '1.2.1', '1.2.2', '1.2.3', '1.2.4a', '1.2.4b', '1.2.4c', '1.2.4d', '1.2.5'];
    systemsAndStorage.forEach(id => {
      const content = data.curriculumContent.find(item => item.id === id);
      expect(content.teachingSections.length).toBeGreaterThanOrEqual(1);
      expect(data.keyTerms.filter(term => term.specificationPointId === id).length).toBeGreaterThanOrEqual(2);
    });
  });

  test('adds markable exam-transfer routes for the previously missing systems and storage strands', () => {
    ['1.1.2', '1.1.3', '1.2.2', '1.2.5'].forEach(id => {
      const task = data.examTransferTasks.find(item => item.specificationPointId === id);
      expect(task).toBeTruthy();
      expect(task.requiredElements).toHaveLength(task.marks);
      expect(task.retryQuestion.length).toBeGreaterThan(60);
      expect(task.responseForm).toBeTruthy();
    });
    expect(data.examTransferTasks.find(item => item.specificationPointId === '1.2.2').question).toMatch(/wildlife camera/i);
    expect(data.examTransferTasks.find(item => item.specificationPointId === '1.2.5').question).toMatch(/lossless/i);
  });

  test('provides sequenced teaching, mapped cards and exam transfer across every Paper 1 strand', () => {
    const paper1Ids = data.units[0].topics.flatMap(topic => topic.objectives.map(objective => objective.id));
    paper1Ids.forEach(id => {
      const content = data.curriculumContent.find(item => item.id === id);
      const task = data.examTransferTasks.find(item => item.specificationPointId === id);
      expect(content.teachingSections.length).toBeGreaterThanOrEqual(1);
      expect(data.keyTerms.filter(term => term.specificationPointId === id).length).toBeGreaterThanOrEqual(2);
      expect(task).toBeTruthy();
      expect(task.requiredElements.length).toBeGreaterThanOrEqual(Math.min(3, task.marks));
      expect(task.retryQuestion).toBeTruthy();
    });
  });

  test('provides the same structured baseline across every Paper 2 strand', () => {
    const paper2Ids = data.units[1].topics.flatMap(topic => topic.objectives.map(objective => objective.id));
    paper2Ids.forEach(id => {
      const content = data.curriculumContent.find(item => item.id === id);
      const task = data.examTransferTasks.find(item => item.specificationPointId === id);
      expect(content.teachingSections.length).toBeGreaterThanOrEqual(1);
      expect(data.keyTerms.filter(term => term.specificationPointId === id).length).toBeGreaterThanOrEqual(2);
      expect(task).toBeTruthy();
      expect(task.requiredElements.length).toBeGreaterThanOrEqual(Math.min(3, task.marks));
      expect(task.retryQuestion).toBeTruthy();
    });
  });

  test('teaches required random-number use and keeps IDE assessment within named facilities', () => {
    expect(data.curriculumContent.find(item => item.id === '2.2.3').teachingSections
      .some(section => /random(?:-| )number|random values/i.test(section.heading + section.body))).toBe(true);
    const ideTask = data.examTransferTasks.find(item => item.id === 'priority_transfer_252');
    expect(ideTask.question).toMatch(/run-time environment/i);
    expect(JSON.stringify(ideTask)).not.toMatch(/debugger|step-through/i);
  });

  test('keeps live curriculum and assessment text free from common encoding corruption', () => {
    const liveText = JSON.stringify({
      curriculum: data.curriculumContent,
      questions: data.questions.filter(item => !item.retired),
      written: data.writtenQuestions,
      transfers: data.examTransferTasks,
      cards: data.keyTerms
    });
    ['Ã—', 'Ã·', 'â€™', 'â€“', 'â†’', 'Â·', 'ï¸'].forEach(sequence => {
      expect(liveText).not.toContain(sequence);
    });
  });

  test('keeps retry questions on the same assessed construct as the original task', () => {
    expect(data.examTransferTasks.find(item => item.id === 'transfer_2').retryQuestion).toMatch(/DNS.*IP address/i);
    expect(data.examTransferTasks.find(item => item.id === 'transfer_5').retryQuestion).toMatch(/PC.*MAR.*MDR/i);
    expect(data.examTransferTasks.find(item => item.id === 'transfer_6').retryQuestion).toMatch(/RAM.*ROM/i);
    expect(data.examTransferTasks.find(item => item.id === 'transfer_8').retryQuestion).toMatch(/compiler.*interpreter/i);
  });

  test('labels learning evidence by purpose rather than counting topic totals as coverage', () => {
    const activeQuestions = data.questions.filter(question => !question.retired);
    expect(activeQuestions.every(question => question.purpose === 'retrieval' || question.purpose === 'diagnostic')).toBe(true);
    expect(data.writtenQuestions.every(question => question.purpose === 'application')).toBe(true);
    expect(data.examTransferTasks.every(task => task.purpose === 'exam-transfer')).toBe(true);
    expect(data.programmingChallenges.some(task => task.purpose === 'application')).toBe(true);
    expect(data.programmingChallenges.some(task => task.purpose === 'exam-transfer')).toBe(true);
    expect(data.questions.find(question => question.id === 'q_1_4_b')).toMatchObject({
      purpose: 'historical',
      retired: true,
      assessmentStatus: 'retired_out_of_scope'
    });
  });

  test('provides a reviewable application route for every teaching strand without awarding automatic mastery', () => {
    const objectiveIds = data.units.flatMap(unit => unit.topics.flatMap(topic => topic.objectives.map(objective => objective.id)));
    const reviewableItems = [...data.writtenQuestions, ...data.programmingChallenges];
    objectiveIds.forEach(id => {
      expect(reviewableItems.some(item => item.specificationPointId === id)).toBe(true);
    });
    data.writtenQuestions
      .filter(item => item.id.startsWith('curriculum_app_'))
      .forEach(item => {
        expect(item).toMatchObject({
          evidenceType: 'unassessed_submission',
          contributesToMastery: false,
          completionStatus: 'awaiting_review'
        });
      });
  });

  test('corrects legacy questions that were filed under the wrong broad topic', () => {
    expect(data.questions.find(question => question.id === 'q_1_2_d')).toMatchObject({
      topicId: 'topic_1_3',
      specificationPointId: '1.2.3'
    });
    expect(data.questions.find(question => question.id === 'q_6')).toMatchObject({
      topicId: 'topic_1_2',
      specificationPointId: '1.2.1'
    });
    expect(data.questions.find(question => question.id === 'q_2_2_a')).toMatchObject({
      topicId: 'topic_2_2',
      specificationPointId: '2.2.1'
    });
  });

  test('keeps corrected scope and terminology out of live learner content', () => {
    const activeSource = JSON.stringify(data.questions.filter(question => !question.retired));
    const landingSource = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    expect(activeSource).not.toContain('Transport');
    expect(activeSource).not.toContain('permanently embedded');
    expect(landingSource).not.toContain('specification ready');
    expect(landingSource).not.toContain('Everything you need to master');
  });

  test('keeps concise theory free from the confirmed August 2026 accuracy failures', () => {
    const liveTheory = JSON.stringify(data.curriculumContent);
    expect(liveTheory).not.toMatch(/F-D-E cycles executed per second/i);
    expect(liveTheory).not.toMatch(/maximum speed and physical durability/i);
    expect(liveTheory).not.toMatch(/MAC Address[^.]+does not change/i);
    expect(liveTheory).not.toMatch(/Physical Hardware Address \(Permanent\)/i);
    expect(liveTheory).not.toMatch(/POP:[^<]+deletes from server/i);
    expect(liveTheory).not.toMatch(/malware creation illegal/i);
    expect(liveTheory).not.toMatch(/always produces? (?:a )?standalone executable/i);
    expect(liveTheory).toMatch(/four facilities named by OCR/i);
    expect(liveTheory).toMatch(/debugging tools[^.]+additional context/i);
    expect(liveTheory).not.toMatch(/CPU is the ["']brain/i);
    expect(liveTheory).not.toMatch(/superfast/i);
    expect(liveTheory).not.toMatch(/disk thrashing|Virtual Memory paging/i);
    expect(liveTheory).not.toMatch(/immune to water/i);
    expect(liveTheory).not.toMatch(/Reports all errors together|re-translates loops/i);
    const appSource = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
    expect(appSource).not.toMatch(/Capped at Level [12]|Examiners cannot award Level 2 or 3 to bullet points/i);
  });

  test('covers required core programming techniques without labelling them as extensions', () => {
    const techniques = new Set(data.programmingChallenges.flatMap(item => item.programmingTechniques));
    [
      'strings', 'file handling', 'records', 'arrays', '2D arrays', 'function',
      'random numbers', 'authentication', 'validation', 'boundary testing'
    ].forEach(technique => expect(techniques.has(technique)).toBe(true));
    ['pc_10', 'pc_11'].forEach(id => {
      const challenge = data.programmingChallenges.find(item => item.id === id);
      expect(`${challenge.concept} ${challenge.title}`).toMatch(/core/i);
      expect(`${challenge.concept} ${challenge.title}`).not.toMatch(/extension/i);
    });
  });

  test('protects explicit OCR specification bullets rather than section or word counts', () => {
    const requiredContent = {
      '1.1.1': [/control unit/i, /ALU/i, /program counter/i, /MAR/i, /MDR/i, /accumulator/i, /fetch/i, /decode/i, /execute/i],
      '1.1.2': [/clock speed/i, /cache/i, /cores?/i],
      '1.2.1': [/RAM/i, /ROM/i, /virtual memory/i],
      '1.2.2': [/magnetic/i, /optical/i, /solid.state/i, /capacity/i, /durability/i, /portability/i],
      '1.2.3': [/bit/i, /nibble/i, /byte/i, /kilobyte/i, /petabyte|1 PB/i],
      '1.3.1': [/LAN/i, /WAN/i, /DNS/i, /hosting/i, /cloud/i],
      '1.3.2': [/IP address/i, /MAC address/i, /TCP\/IP/i, /HTTP/i, /FTP/i, /SMTP/i, /POP/i, /IMAP/i],
      '1.4.1': [/malware/i, /social engineering/i, /brute force/i, /denial.of.service/i, /interception/i, /SQL injection/i],
      '1.4.2': [/penetration testing/i, /anti.malware/i, /firewall/i, /access level/i, /password/i, /encryption/i, /physical security/i, /network forensics/i, /network policy/i],
      '1.5.1': [/user interface/i, /memory management/i, /multitasking/i, /peripheral/i, /driver/i, /user management/i, /file management/i],
      '1.5.2': [/encryption/i, /defragmentation/i, /compression/i],
      '1.6.2': [/Data Protection Act/i, /Computer Misuse Act/i, /Copyright, Designs and Patents Act/i, /open.source/i, /proprietary/i],
      '2.1.3': [/linear search/i, /binary search/i, /bubble sort/i, /insertion sort/i, /merge sort/i],
      '2.2.1': [/MOD/i, /DIV/i, /AND/i, /OR/i, /NOT/i, /sequence/i, /selection/i, /iteration/i],
      '2.2.3': [/string/i, /1D array/i, /2D array/i, /record/i, /file/i, /SELECT/i, /function/i, /procedure/i, /local/i, /global/i, /random/i],
      '2.3.1': [/validation/i, /authentication/i, /maintainable/i],
      '2.3.2': [/normal/i, /boundary/i, /invalid/i, /erroneous/i, /expected result/i, /actual result/i, /retest/i],
      '2.4.1': [/AND/i, /OR/i, /NOT/i, /truth.table/i],
      '2.5.1': [/high.level/i, /low.level/i, /compiler/i, /interpreter/i],
      '2.5.2': [/editor/i, /error diagnostics/i, /run.time environment/i, /translator/i]
    };

    Object.entries(requiredContent).forEach(([id, requirements]) => {
      const item = data.curriculumContent.find(entry => entry.id === id);
      const teaching = JSON.stringify(item);
      requirements.forEach(requirement => expect(teaching).toMatch(requirement));
    });
  });

  test('consolidates broad reviews into manageable study sessions', () => {
    const programmingTechniques = data.curriculumContent.find(item => item.id === '2.2.3');
    const examReferenceLanguage = data.curriculumContent.find(item => item.id === '2.2.ERL');
    expect(programmingTechniques.teachingSections).toHaveLength(4);
    expect(programmingTechniques.workload.coreLearningMinutes).toBeLessThanOrEqual(24);
    expect(examReferenceLanguage.teachingSections).toHaveLength(2);
    expect(examReferenceLanguage.workload.coreLearningMinutes).toBeLessThanOrEqual(12);
    const appSource = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
    expect(appSource).toContain('How to use this review');
    expect(appSource).toContain('Study session ${sessionNumber} of ${totalSessions}');
    expect(appSource.match(/renderTeachingReviewPart\(section, index, [^)]+\)/g)).toHaveLength(3);
  });

  test('prevents readiness when required evidence types are absent', () => {
    const appSource = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
    expect(appSource).toContain('getObjectiveCoverage()');
    expect(appSource).toContain("missing.push('objective explanation')");
    expect(appSource).toContain("missing.push('diagnostic')");
    expect(appSource).toContain("missing.push('retrieval')");
    expect(appSource).toContain("missing.push('application or review route')");
    expect(appSource).toContain("missing.push('assessment-mode mapping')");
    expect(appSource).toContain("missing.push('required-skill mapping')");
    expect(appSource).not.toContain("missing.push('retrieval alternatives')");
    expect(appSource).not.toContain("missing.push('spaced alternatives')");
    expect(appSource).toContain("completeEvidence ? 'Awaiting QA'");
    expect(appSource).toContain('Choose a specification section');
    expect(appSource).toContain('item.officialSpecificationPointId');
  });
});
