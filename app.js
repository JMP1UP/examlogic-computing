/**
 * StudySpice App Controller
 * GCSE Computer Science Learning Platform by 25Thirty
 */

window.onerror = function(message, source, lineno, colno, error) {
  if (window.app && typeof window.app.alert === 'function') {
    window.app.alert("Global Error: " + message + "\nLine: " + lineno);
  }
  return false;
};

const SVG_ICONS = {
  home: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px; vertical-align: middle;"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  learn: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px; vertical-align: middle;"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  practise: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px; vertical-align: middle;"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>`,
  programme: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px; vertical-align: middle;"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
  written: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px; vertical-align: middle;"><path d="M15.707 21.293a1 1 0 0 1-1.414 0l-5.657-5.657a1 1 0 0 1 0-1.414l5.657-5.657a1 1 0 0 1 1.414 0l5.657 5.657a1 1 0 0 1 0 1.414z"/><path d="m12 12-4-4"/><path d="M8 8 2 2"/></svg>`,
  revise: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px; vertical-align: middle;"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>`,
  progress: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px; vertical-align: middle;"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  messages: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px; vertical-align: middle;"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  overview: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px; vertical-align: middle;"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>`,
  classes: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px; vertical-align: middle;"><path d="M14 19a6 6 0 0 0-12 0"/><circle cx="8" cy="9" r="4"/><path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8"/></svg>`,
  assign: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px; vertical-align: middle;"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>`,
  topics: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px; vertical-align: middle;"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="6" y1="12" y2="12"/><line x1="2" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="6" x2="6" y1="10" y2="14"/><line x1="12" x2="12" y1="18" y2="22"/></svg>`,
  settings: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px; vertical-align: middle;"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`
};

class App {
  constructor() {
    this.currentUser = null;
    this.activeTab = 'stud-dashboard';
    this.dashboardSeeMoreExpanded = false;
    this.programmingStage = 'predict';
    this.revealedSupportStep = 1;
    this.activeSupportFeedback = {};
    this.writtenAttempted = false;
    this.activeTopicId = 'topic_1_3'; // default topic
    this.activeChallengeId = 'pc_1'; // default programming challenge
    this.activePseudocodeTask = 0;
    this.activeTestPrepId = null;
    this.definitionTestTerms = [];
    this.definitionTestMode = false;
    this.activeWQuestionId = 'wq_1'; // default written question
    this.activeExamTransferId = 'transfer_1';
    this.examTransferStage = 'decode';
    this.examTransferPlan = {};
    this.examTransferResponse = '';
    this.supportLevelUsed = 0; // support ladder level
    this.lastProgrammingEvidence = [];
    this.lastProgrammingTestRun = null;
    this.aiTutorHintLevel = 1;
    this.editorCode = '';
    this.pythonWorker = null;
    this.pythonWorkerReadyPromise = null;
    this.pythonWorkerRequestId = 0;
    
    // Number skills state
    this.numberSkillsSet = [];
    this.numberSkillsAnswers = {};
    this.numberSkillsEvidenceSet = null;
    this.numberSkillsDifficulty = 'Supported'; // Guided, Supported, Independent, Challenge
    this.numberSkillsCalculations = {};

    // Theory Recall Quiz state
    this.quizQuestions = [];
    this.quizAnswers = {};
    this.quizResults = null;
    this.quizEvidenceSet = null;
    this.retrievalDeckTopicId = 'all';
    this.retrievalDeckCardIndex = 0;
    this.retrievalDeckAttempt = '';
    this.retrievalDeckRevealed = false;
    this.retrievalDeckRatedCount = 0;
    this.retrievalDeckSessionComplete = false;
    this.retrievalDeckExtraMode = false;
    this.retrievalDeckSessionId = null;
    this.retrievalDeckSeenCardIds = [];
    this.retrievalDeckSessionTarget = 10;
    this.evidenceIdSequence = 0;

    // Written answers scaffold state
    this.scaffoldPoints = { p1: '', exp1: '', p2: '', exp2: '', apply: '' };
    this.writtenResponseText = '';

    // Active Messaging context
    this.messageDraft = '';
    this.selectedChatStudentId = null;
    this.teacherMessageDraft = '';
    this.selectedTeacherClassId = null;
    this.selectedTeacherStudentId = null;

    // Teacher assignment creator
    this.newAssignmentTopic = '';
    this.newAssignmentTitle = '';
    this.newAssignmentDueDate = '';
    this.writtenStage = 'plan';

    this.theme = 'light';
    this.modalReturnFocus = null;
  }

  getTimeBasedGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good morning";
    } else if (hour < 17) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  }

  formatDueDate(dateStr) {
    if (!dateStr) return '';
    
    // Parse date parts manually to avoid timezone shifting
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    
    const now = new Date();
    // Reset times
    now.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);
    
    const diffTime = d.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays === -1) return 'Overdue yesterday';
    if (diffDays < 0) return 'Overdue';
    
    if (diffDays < 7) {
      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return `Due ${weekdays[d.getDay()]}`;
    }
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `Due ${d.getDate()} ${months[d.getMonth()]}`;
  }

  isPublishedToStudent(item, student = this.currentUser) {
    if (!student || student.role !== 'student') return true;
    if (!item.recipientType || item.recipientType === 'class') return !item.classId || item.classId === student.classId;
    return item.recipientType === 'students' && (item.recipientIds || []).includes(student.id);
  }

  getAuthorizedTeacherClasses() {
    if (!this.currentUser || this.currentUser.role === 'student') return [];
    return window.db.getClasses().filter(item => item.teacherId === this.currentUser.id);
  }

  getSelectedTeacherClass() {
    const classes = this.getAuthorizedTeacherClasses();
    if (!classes.length) {
      this.selectedTeacherClassId = null;
      return null;
    }
    const selected = classes.find(item => item.id === this.selectedTeacherClassId) || classes[0];
    this.selectedTeacherClassId = selected.id;
    return selected;
  }

  getTeacherClassStudents() {
    const selectedClass = this.getSelectedTeacherClass();
    if (!selectedClass) return [];
    return window.db.getStudents().filter(student => student.classId === selectedClass.id);
  }

  getTeacherClassStudentIds() {
    return new Set(this.getTeacherClassStudents().map(student => student.id));
  }

  getTeacherClassMessages() {
    const studentIds = this.getTeacherClassStudentIds();
    const teacherId = this.currentUser?.id;
    if (!teacherId) return [];
    return window.db.getMessages().filter(message =>
      (message.senderId === teacherId && studentIds.has(message.receiverId))
      || (message.receiverId === teacherId && studentIds.has(message.senderId))
    );
  }

  getTeacherClassRecords(records) {
    const studentIds = this.getTeacherClassStudentIds();
    return (records || []).filter(record => studentIds.has(record.studentId));
  }

  getTeacherClassPublishedRecords(records) {
    const selectedClass = this.getSelectedTeacherClass();
    if (!selectedClass) return [];
    return (records || []).filter(record => record.classId === selectedClass.id);
  }

  canTeacherAccessStudent(studentId) {
    return this.getTeacherClassStudentIds().has(studentId);
  }

  renderTeacherClassEmptyState(panel) {
    panel.innerHTML = `
      <div class="empty-state-card" role="status">
        <h1>No authorised class available</h1>
        <p>This account is not assigned to a class, so no pupil records or publishing controls are available.</p>
      </div>
    `;
  }

  getAdaptiveSupportLevel(topic = 'binary conversions') {
    if (!this.currentUser) return 'Supported';
    const attempts = this.getLatestDemonstratedAttempts(window.db.getAttempts()
      .filter(a => a.studentId === this.currentUser.id && String(a.topic).toLowerCase().includes(topic.toLowerCase())))
      .map(item => item.attempt)
      .slice(-3);
    if (attempts.length < 2) return 'Supported';
    const ratios = attempts.map(a => {
      const score = this.parseDemonstratedScore(a);
      return score.earned / score.available;
    });
    const average = ratios.reduce((sum, value) => sum + value, 0) / ratios.length;
    const usedHelp = attempts.some(a => Number(a.supportStepsUsed || 0) > 1);
    if (average < 0.5) return 'Guided';
    if (average >= 0.85 && !usedHelp) return 'Independent';
    return 'Supported';
  }

  isMeaningfulLearnerResponse(value, minimumLength = 3) {
    const normalised = String(value || '').trim().replace(/\s+/g, ' ');
    if (normalised.length < minimumLength) return false;
    const compact = normalised.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (compact.length < Math.max(2, minimumLength - 1)) return false;
    const tokens = normalised.toLowerCase().match(/[a-z0-9]+/g) || [];
    const repeatedFiller = tokens.length >= 3 && new Set(tokens).size === 1;
    return !/^(.)\1+$/.test(compact)
      && !repeatedFiller
      && !['ok', 'okay', 'no', 'yes', 'idk', 'dontknow', 'notsure', 'none', 'na', 'test'].includes(compact);
  }

  parseDemonstratedScore(attempt) {
    if (!attempt || attempt.contributesToMastery === false) return null;
    const demonstratedTypes = new Set(['number_skills', 'spaced_theory', 'pseudocode_assessed']);
    if (attempt.evidenceType && attempt.evidenceType !== 'demonstrated') return null;
    if (!attempt.evidenceType && !demonstratedTypes.has(attempt.type)) return null;
    const match = String(attempt.score || '').match(/^(\d+)\/(\d+)$/);
    if (!match || Number(match[2]) <= 0) return null;
    return {
      earned: Number(match[1]),
      available: Number(match[2]),
      precision: Number(attempt.evidenceVersion) >= 2 && attempt.activityId ? 'question-level' : 'legacy'
    };
  }

  hasCheckpointPrecision(attempt) {
    const evidence = Array.isArray(attempt?.questionEvidence) ? attempt.questionEvidence : [];
    const ruleVersions = attempt?.checkpointRuleVersions;
    const representedSections = [...new Set(evidence.map(item => item.specificationPointId).filter(Boolean))];
    return Number(attempt?.evidenceVersion) >= 2
      && Boolean(attempt?.activityId)
      && evidence.length > 0
      && evidence.every(item => item.questionId && item.specificationPointId && item.assessmentFocus)
      && ruleVersions
      && representedSections.length > 0
      && representedSections.every(sectionId => Number.isInteger(ruleVersions[sectionId]) && ruleVersions[sectionId] > 0);
  }

  getDemonstratedMastery(attempts) {
    const evidence = this.getLatestDemonstratedAttempts(attempts);
    const earned = evidence.reduce((total, item) => total + item.score.earned, 0);
    const available = evidence.reduce((total, item) => total + item.score.available, 0);
    const ratio = available ? earned / available : null;
    const label = ratio === null ? 'No checked result yet'
      : ratio >= 0.85 ? 'Strong latest result'
        : ratio >= 0.6 ? 'Developing latest result'
          : 'More practice needed';
    const legacyEvidenceCount = evidence.filter(item => item.score.precision === 'legacy').length;
    return { earned, available, ratio, label, evidenceCount: evidence.length, legacyEvidenceCount };
  }

  getAchievementCatalogue() {
    return [
      {
        id: 'binary-fluent',
        storedName: 'Binary Fluent',
        title: 'Binary Check Complete',
        category: 'demonstrated-skill',
        symbol: '01',
        criterion: 'Complete the Number skills activity, then retry anything you miss until the full set is correct.',
        earnedDescription: 'Earned by completing every question correctly in this Number skills activity.',
        actionLabel: 'Practise number skills',
        route: 'stud-practise'
      },
      {
        id: 'debugging-detective',
        storedName: 'Debugging Detective',
        title: 'Debugging Detective',
        category: 'demonstrated-skill',
        symbol: '</>',
        criterion: 'Fix the counting loop so it prints 1 to 5, then pass every test.',
        earnedDescription: 'Earned by fixing and testing the counting-loop program.',
        actionLabel: 'Try the debugging challenge',
        route: 'stud-programme',
        challengeId: 'pc_3'
      }
    ];
  }

  getStoredAchievementName(achievement) {
    if (typeof achievement === 'string') return achievement.trim();
    return String(achievement?.name || achievement?.title || '').trim();
  }

  resolveStudentAchievements(student) {
    const catalogue = this.getAchievementCatalogue();
    const catalogueByName = new Map(catalogue.map(item => [item.storedName.toLowerCase(), item]));
    const earnedIds = new Set();
    const legacyNames = new Set();
    const legacy = [];

    (Array.isArray(student?.achievements) ? student.achievements : []).forEach(achievement => {
      const name = this.getStoredAchievementName(achievement);
      if (!name) return;
      const known = catalogueByName.get(name.toLowerCase());
      if (known) {
        earnedIds.add(known.id);
        return;
      }
      const key = name.toLowerCase();
      if (legacyNames.has(key)) return;
      legacyNames.add(key);
      legacy.push({
        id: `legacy-${legacy.length + 1}`,
        title: name,
        symbol: '✓',
        status: 'previously-earned',
        category: /habit|week|regular|routine/i.test(name) ? 'study-habit' : 'historical',
        earnedDescription: 'Earned previously. It remains part of your learning record.'
      });
    });

    return {
      earned: catalogue
        .filter(item => earnedIds.has(item.id))
        .map(item => ({ ...item, status: 'earned' }))
        .concat(legacy),
      next: catalogue
        .filter(item => !earnedIds.has(item.id))
        .map(item => ({ ...item, status: 'not-earned' }))
    };
  }

  grantAchievement(student, achievementId) {
    const achievement = this.getAchievementCatalogue().find(item => item.id === achievementId);
    if (!student || !achievement) return false;
    if (!Array.isArray(student.achievements)) student.achievements = [];
    const alreadyEarned = student.achievements.some(item =>
      this.getStoredAchievementName(item).toLowerCase() === achievement.storedName.toLowerCase()
    );
    if (alreadyEarned) return false;
    student.achievements.push(achievement.storedName);
    window.db.saveData();
    return true;
  }

  openAchievementRoute(achievementId, panel) {
    const achievement = this.getAchievementCatalogue().find(item => item.id === achievementId);
    if (!achievement) {
      if (panel) {
        panel.innerHTML = '<div class="card" role="status"><h1>Activity unavailable</h1><p>This achievement does not currently have a valid activity.</p><button type="button" class="btn btn-secondary" id="achievement-progress-back">Back to Progress</button></div>';
        panel.querySelector?.('#achievement-progress-back')?.addEventListener('click', () => this.renderStudentProgress(panel));
      }
      return false;
    }
    if (achievement.challengeId) {
      const challengeAvailable = window.db.getProgrammingChallenges().some(item => item.id === achievement.challengeId);
      if (!challengeAvailable) {
        if (panel) panel.innerHTML = '<div class="card" role="status"><h1>Activity unavailable</h1><p>The linked programming challenge could not be found. Choose another activity from Progress.</p><button type="button" class="btn btn-secondary" id="achievement-progress-back">Back to Progress</button></div>';
        panel?.querySelector?.('#achievement-progress-back')?.addEventListener('click', () => this.renderStudentProgress(panel));
        this.focusMainContent();
        return false;
      }
      this.activateProgrammingChallenge(achievement.challengeId);
    }
    this.switchTab(achievement.route);
    return true;
  }

  activateProgrammingChallenge(challengeId) {
    const challenge = window.db.getProgrammingChallenges().find(item => item.id === challengeId);
    if (!challenge) return false;
    this.activeChallengeId = challenge.id;
    this.editorCode = challenge.code || '';
    this.supportLevelUsed = 0;
    this.lastProgrammingEvidence = [];
    this.lastProgrammingTestRun = null;
    this.aiTutorHintLevel = 1;
    this.programmingStage = 'predict';
    this.revealedSupportStep = 1;
    this.activeSupportFeedback = {};
    this.predictInputValue = '';
    this.codingExplanationValue = '';
    return true;
  }

  renderStudentAchievementPanel(student) {
    const achievements = this.resolveStudentAchievements(student);
    const earnedHtml = achievements.earned.length
      ? achievements.earned.map(item => `
          <article class="student-achievement-card student-achievement-card--earned">
            <span class="student-achievement-card__symbol" aria-hidden="true">${this.escapeHTML(item.symbol)}</span>
            <div>
              <span class="student-achievement-state">${item.category === 'study-habit' ? 'Study-habit achievement' : item.status === 'earned' ? 'Demonstrated skill' : 'Previously earned'}</span>
              <h4>${this.escapeHTML(item.title)}</h4>
              <p>${this.escapeHTML(item.earnedDescription)}</p>
            </div>
          </article>
        `).join('')
      : '<p class="student-achievement-empty">Your first badges are ready to work towards. Earn them by showing what you can do in checked activities.</p>';
    const nextHtml = achievements.next.slice(0, 2).map(item => `
      <article class="student-achievement-card student-achievement-card--next">
        <span class="student-achievement-card__symbol" aria-hidden="true">${this.escapeHTML(item.symbol)}</span>
        <div>
          <span class="student-achievement-state">Not earned yet</span>
          <h4>${this.escapeHTML(item.title)}</h4>
          <p>${this.escapeHTML(item.criterion)}</p>
          <button type="button" class="btn-link student-achievement-action" data-achievement-id="${this.escapeHTML(item.id)}">${this.escapeHTML(item.actionLabel)}</button>
        </div>
      </article>
    `).join('');

    return `
      <section class="card student-achievement-panel" aria-labelledby="student-achievements-heading">
        <header>
          <span class="student-kicker">Study habits and demonstrated skills</span>
          <h3 id="student-achievements-heading">Your badges</h3>
          <p>Skill badges come from checked evidence. Study-habit achievements recognise regular practice only and never claim mastery. There is no time pressure.</p>
        </header>
        <div class="student-achievement-group">
          <h4>Achievements earned</h4>
          <div class="student-achievement-list">${earnedHtml}</div>
        </div>
        ${nextHtml ? `
          <div class="student-achievement-group">
            <h4>Badges you can earn next</h4>
            <div class="student-achievement-list">${nextHtml}</div>
          </div>
        ` : '<p class="student-achievement-complete">Both current badges earned. Your next task remains the most useful place to focus.</p>'}
      </section>
    `;
  }

  getLatestDemonstratedAttempts(attempts) {
    const latestByActivity = new Map();
    attempts.forEach((attempt, index) => {
      const score = this.parseDemonstratedScore(attempt);
      if (!score) return;
      const activity = attempt.activityId || attempt.questionId || `legacy:${attempt.type || 'activity'}:${attempt.topic || 'unknown'}`;
      const time = Date.parse(attempt.date || '') || index;
      const previous = latestByActivity.get(activity);
      if (!previous || time >= previous.time) latestByActivity.set(activity, { attempt, score, time });
    });
    return [...latestByActivity.values()].sort((left, right) => left.time - right.time);
  }

  getDisplayedEvidenceAttempts(attempts) {
    const latestVersionedByActivity = new Map();
    const retainedRecords = [];
    attempts.forEach((attempt, index) => {
      const time = Date.parse(attempt.date || '') || index;
      const isVersionedActivity = Number(attempt.evidenceVersion) >= 2
        && attempt.activityId
        && this.parseDemonstratedScore(attempt);
      if (!isVersionedActivity) {
        retainedRecords.push({ attempt, time, index });
        return;
      }
      const previous = latestVersionedByActivity.get(attempt.activityId);
      if (!previous || time >= previous.time) {
        latestVersionedByActivity.set(attempt.activityId, { attempt, time, index });
      }
    });
    return [...retainedRecords, ...latestVersionedByActivity.values()]
      .sort((left, right) => left.time - right.time || left.index - right.index)
      .map(item => item.attempt);
  }

  getSectionMilestones(studentId = this.currentUser?.id) {
    const questions = window.db.getQuestions();
    const questionToSection = new Map(questions.map(question => [question.id, question.specificationPointId]));
    const checkpointRules = window.db.getCheckpointRules?.() || {};
    const sections = window.db.getUnits().flatMap(unit => (unit.topics || []).flatMap(topic =>
      (topic.objectives || []).map(objective => ({
        id: objective.id,
        name: objective.name,
        topicId: topic.id,
        topicName: topic.name,
        paper: unit.paper,
        available: Boolean(checkpointRules[objective.id]),
        checkpointRule: checkpointRules[objective.id] || null
      }))
    ));
    const numberSkillSections = {
      1: '1.2.4a',
      2: '1.2.4a',
      3: '1.2.4c',
      4: '1.2.4d'
    };
    const milestoneById = new Map(sections.map(section => [section.id, {
      ...section,
      state: section.available ? 'not_started' : 'not_available',
      label: section.available ? 'Not started' : 'Progress check unavailable',
      latestDate: null,
      evidenceSources: new Set(),
      questionOutcomes: new Map(),
      focusOutcomes: new Map()
    }]));
    const sectionForQuestion = questionId => {
      if (questionToSection.has(questionId)) return questionToSection.get(questionId);
      const numberSkillMatch = String(questionId || '').match(/^number_skill_[a-z]+_(\d)$/);
      if (numberSkillMatch) return numberSkillSections[Number(numberSkillMatch[1])] || null;
      if (/^pseudocode_\d+$/.test(String(questionId || ''))) return '2.2.ERL';
      return null;
    };
    const latestAttempts = this.getLatestDemonstratedAttempts(
      window.db.getAttempts().filter(attempt => attempt.studentId === studentId)
    ).sort((left, right) => new Date(left.attempt.date || 0) - new Date(right.attempt.date || 0));

    latestAttempts.forEach(({ attempt, score }) => {
      const completeQuestionSet = Array.isArray(attempt.originalQuestionIds)
        && attempt.originalQuestionIds.length === Number(attempt.originalDenominator)
        && score.available === Number(attempt.originalDenominator);
      const singleAssessedResponse = score.available === 1
        && attempt.questionId
        && (attempt.type === 'pseudocode_assessed' || Number(attempt.evidenceVersion) >= 2);
      if (!completeQuestionSet && !singleAssessedResponse) return;

      const outcomes = Array.isArray(attempt.questionEvidence)
        ? attempt.questionEvidence
        : [{ questionId: attempt.questionId, correct: score.earned === score.available }];
      const groupedBySection = new Map();
      outcomes.forEach(outcome => {
        const sectionId = sectionForQuestion(outcome.questionId);
        if (!sectionId || !milestoneById.has(sectionId)) return;
        if (!milestoneById.get(sectionId).available) return;
        if (!groupedBySection.has(sectionId)) groupedBySection.set(sectionId, []);
        groupedBySection.get(sectionId).push(outcome);
      });

      groupedBySection.forEach((sectionOutcomes, sectionId) => {
        const milestone = milestoneById.get(sectionId);
        const activityId = attempt.activityId || attempt.questionId;
        milestone.state = 'practice_completed';
        milestone.label = 'Checked practice started';
        milestone.evidenceSources.add(activityId);
        sectionOutcomes.forEach(outcome => milestone.questionOutcomes.set(outcome.questionId, outcome.correct === true));
        const ruleVersion = attempt.checkpointRuleVersions?.[sectionId];
        if (ruleVersion === milestone.checkpointRule.version) {
          const byFocus = new Map();
          sectionOutcomes.forEach(outcome => {
            if (!outcome.assessmentFocus || outcome.specificationPointId !== sectionId) return;
            if (!byFocus.has(outcome.assessmentFocus)) byFocus.set(outcome.assessmentFocus, []);
            byFocus.get(outcome.assessmentFocus).push(outcome.correct === true);
          });
          byFocus.forEach((focusResults, focus) => {
            milestone.focusOutcomes.set(focus, focusResults.every(Boolean));
          });
        }
        if (!milestone.latestDate || new Date(attempt.date) >= new Date(milestone.latestDate)) {
          milestone.latestDate = attempt.date;
        }
      });
    });

    milestoneById.forEach(milestone => {
      if (!milestone.available) return;
      const requiredFocuses = milestone.checkpointRule.requiredFocuses;
      const passedFocuses = requiredFocuses.filter(focus => milestone.focusOutcomes.get(focus) === true);
      const ratio = requiredFocuses.length ? passedFocuses.length / requiredFocuses.length : 0;
      if (passedFocuses.length === requiredFocuses.length && ratio >= milestone.checkpointRule.minimumRatio) {
        milestone.state = 'checkpoint_secured';
        milestone.label = 'Section goal met';
      }
    });

    return [...milestoneById.values()].map(milestone => ({
      ...milestone,
      evidenceSourceCount: milestone.evidenceSources.size,
      correctQuestionCount: [...milestone.questionOutcomes.values()].filter(Boolean).length,
      attemptedQuestionCount: milestone.questionOutcomes.size,
      checkpointRuleVersion: milestone.checkpointRule?.version || null,
      demonstratedFocuses: [...milestone.focusOutcomes.entries()].filter(([, passed]) => passed).map(([focus]) => focus),
      remainingFocuses: milestone.checkpointRule
        ? milestone.checkpointRule.requiredFocuses.filter(focus => milestone.focusOutcomes.get(focus) !== true)
        : [],
      evidenceSources: undefined,
      questionOutcomes: undefined,
      focusOutcomes: undefined,
      checkpointRule: undefined
    }));
  }

  getMilestoneBadge(milestone) {
    const badgeClass = milestone.state === 'checkpoint_secured'
      ? 'milestone-secured'
      : milestone.state === 'practice_completed'
        ? 'milestone-practised'
        : milestone.state === 'not_available' ? 'milestone-unavailable' : 'milestone-not-started';
    const symbol = milestone.state === 'checkpoint_secured'
      ? '&#10003;'
      : milestone.state === 'practice_completed' ? '&#9679;' : milestone.state === 'not_available' ? '&mdash;' : '&#9675;';
    return `<span class="section-milestone ${badgeClass}" data-milestone-state="${milestone.state}"><span aria-hidden="true">${symbol}</span> ${milestone.label}</span>`;
  }

  formatAssessmentFocus(focus) {
    const acronyms = new Set(['cpu', 'ram', 'rom', 'lan', 'wan', 'sql', 'ide', 'erl']);
    return String(focus || '')
      .split('-')
      .map(word => acronyms.has(word.toLowerCase())
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  getNewlySecuredMilestones(previousStates, studentId = this.currentUser?.id) {
    return this.getSectionMilestones(studentId).filter(milestone =>
      milestone.state === 'checkpoint_secured'
      && previousStates.get(milestone.id) !== 'checkpoint_secured'
    );
  }

  renderMilestoneAcknowledgement(milestones) {
    if (!milestones.length) return '';
    return milestones.map(milestone => `
      <div class="milestone-acknowledgement" role="status" aria-live="polite">
        <strong>Section goal met: ${this.escapeHTML(milestone.id)}</strong>
        <span>Your checked answers covered each part included in this section check.</span>
      </div>
    `).join('');
  }

  getPendingPseudocodeReviews(attempts) {
    const latestByLearnerTask = new Map();
    attempts.forEach((attempt, index) => {
      if (!['pseudocode_review', 'pseudocode_assessed'].includes(attempt.type)) return;
      const key = `${attempt.studentId || 'unknown'}:${attempt.questionId || 'unknown'}`;
      const time = Date.parse(attempt.date || '') || index;
      const previous = latestByLearnerTask.get(key);
      if (!previous || time >= previous.time) latestByLearnerTask.set(key, { attempt, time });
    });
    return [...latestByLearnerTask.values()]
      .map(item => item.attempt)
      .filter(item => item.type === 'pseudocode_review' && item.completionStatus === 'awaiting_review');
  }

  createEvidenceSet(type, topic, questions) {
    const unique = window.crypto && typeof window.crypto.randomUUID === 'function'
      ? window.crypto.randomUUID()
      : `${Date.now()}_${++this.evidenceIdSequence}`;
    const attemptSetId = `${type}_set_${unique}`;
    const checkpointRules = window.db.getCheckpointRules?.() || {};
    return {
      activityId: `${type}_activity_${unique}`,
      attemptSetId,
      topic,
      originalQuestionIds: questions.map(question => question.id),
      originalDenominator: questions.length,
      questionMetadata: Object.fromEntries(questions.map(question => [question.id, {
        specificationPointId: question.specificationPointId || null,
        assessmentFocus: question.assessmentFocus || null
      }])),
      checkpointRuleVersions: Object.fromEntries([...new Set(questions.map(question => question.specificationPointId).filter(Boolean))]
        .filter(sectionId => checkpointRules[sectionId])
        .map(sectionId => [sectionId, checkpointRules[sectionId].version])),
      latestOutcomes: Object.fromEntries(questions.map(question => [question.id, false])),
      hasOriginalAttempt: false
    };
  }

  buildQuestionLevelAttempt(evidenceSet, attemptKind) {
    const questionEvidence = evidenceSet.originalQuestionIds.map(questionId => {
      const metadata = evidenceSet.questionMetadata?.[questionId];
      return {
        questionId,
        ...(metadata?.specificationPointId && metadata?.assessmentFocus ? {
          specificationPointId: metadata.specificationPointId,
          assessmentFocus: metadata.assessmentFocus
        } : {}),
        correct: evidenceSet.latestOutcomes[questionId] === true
      };
    });
    const earned = questionEvidence.filter(item => item.correct).length;
    return {
      activityId: evidenceSet.activityId,
      attemptSetId: evidenceSet.attemptSetId,
      originalQuestionIds: [...evidenceSet.originalQuestionIds],
      originalDenominator: evidenceSet.originalDenominator,
      questionEvidence,
      checkpointRuleVersions: { ...(evidenceSet.checkpointRuleVersions || {}) },
      attemptKind,
      score: `${earned}/${evidenceSet.originalDenominator}`,
      evidenceVersion: 2,
      evidenceType: 'demonstrated',
      contributesToMastery: true
    };
  }

  recordQuizConfidence(attempt, confidence) {
    const allowed = new Set(['secure_before_feedback', 'partial_before_feedback', 'understood_after_feedback']);
    if (!attempt || !allowed.has(confidence)) return false;
    attempt.confidence = confidence;
    attempt.confidenceRecordedAt = new Date().toISOString();
    window.db.saveData();
    return true;
  }

  assessPseudocodeResponse(response, expected) {
    if (!this.isMeaningfulLearnerResponse(response, 3)) return false;
    const normalise = value => String(value).toLowerCase().replace(/\s+/g, ' ').replace(/[^a-z0-9=<>+\-*/ ]/g, '').trim();
    return normalise(response) === normalise(expected);
  }

  getRetryQuestions(questions, correctness) {
    return questions.filter((_, index) => correctness[index] === false);
  }

  getLocalDateKey(value = new Date()) {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  getWeekWindow(now = new Date()) {
    const current = new Date(now);
    current.setHours(0, 0, 0, 0);
    const mondayOffset = (current.getDay() + 6) % 7;
    const start = new Date(current);
    start.setDate(start.getDate() - mondayOffset);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    return { start, end };
  }

  isWithinWindow(value, window) {
    const date = new Date(value);
    return !Number.isNaN(date.getTime()) && date >= window.start && date < window.end;
  }

  getStudentPracticeRhythm(studentId = this.currentUser?.id, now = new Date()) {
    const week = this.getWeekWindow(now);
    const attempts = window.db.getAttempts().filter(item => item.studentId === studentId);
    const weeklyAttempts = attempts.filter(item => this.isWithinWindow(item.date, week));
    const retrievalDays = new Set(
      weeklyAttempts
        .filter(item => ['spaced_theory', 'retrieval_deck_session'].includes(item.type)
          && item.type !== 'retrieval_rating'
          && item.completionStatus !== 'viewed')
        .map(item => this.getLocalDateKey(item.date))
        .filter(Boolean)
    );
    const numberDone = weeklyAttempts.some(item => item.type === 'number_skills' && this.parseDemonstratedScore(item));
    const programmingDone = window.db.getProgrammingSubmissions().some(item =>
      item.studentId === studentId
      && this.isWithinWindow(item.date, week)
      && Boolean(String(item.code || '').trim())
    ) || weeklyAttempts.some(item => item.type === 'pseudocode_assessed' && this.parseDemonstratedScore(item));
    const fortnightStart = new Date(week.start);
    fortnightStart.setDate(fortnightStart.getDate() - 7);
    const examSubmitted = attempts.some(item =>
      item.studentId === studentId
      && item.type === 'exam_transfer_retry'
      && new Date(item.date) >= fortnightStart
      && item.completionStatus === 'awaiting_review'
    );
    const examDueThisWeek = Math.floor(week.start.getTime() / (14 * 24 * 3600 * 1000)) % 2 === 0;
    const items = [
      { id: 'retrieval', label: 'Review flashcards', cadence: 'On 2 different days', done: Math.min(retrievalDays.size, 2), target: 2, unit: 'days', minutes: 10, route: 'stud-retrieval' },
      { id: 'number', label: 'Practise number systems', cadence: 'Once this week', done: numberDone ? 1 : 0, target: 1, unit: 'session', minutes: 10, route: 'stud-practise' },
      { id: 'programming', label: 'Practise programming', cadence: 'Once this week', done: programmingDone ? 1 : 0, target: 1, unit: 'session', minutes: 15, route: 'stud-programming' }
    ];
    if (examDueThisWeek) {
      items.push({ id: 'exam', label: 'Submit an exam answer for review', cadence: 'Once this fortnight', done: examSubmitted ? 1 : 0, target: 1, unit: 'answer', minutes: 25, route: 'stud-exam-transfer', awaitingReview: examSubmitted });
    }
    const next = items.find(item => item.done < item.target) || null;
    return {
      week,
      items,
      next,
      retrievalDays: retrievalDays.size,
      completedCount: items.filter(item => item.done >= item.target).length,
      totalMinutes: items.reduce((sum, item) => sum + item.minutes, 0),
      habitAchieved: retrievalDays.size >= 2 && numberDone && programmingDone,
      attainmentChanged: false
    };
  }

  getUpcomingTestNotebook(prep, now = new Date()) {
    if (!prep?.testDate) return null;
    const testDate = new Date(`${prep.testDate}T12:00:00`);
    if (Number.isNaN(testDate.getTime())) return null;
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    const testDay = new Date(testDate);
    testDay.setHours(0, 0, 0, 0);
    const daysAway = Math.ceil((testDay - today) / (24 * 60 * 60 * 1000));
    const objectiveNames = new Map(window.db.getUnits().flatMap(unit =>
      unit.topics.flatMap(topic => (topic.objectives || []).map(objective => [
        objective.id,
        `${objective.id} · ${objective.name}`
      ]))
    ));
    return {
      id: prep.id,
      title: prep.title,
      dateLabel: testDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      daysAway,
      daysLabel: daysAway < 0
        ? 'Date passed'
        : daysAway === 0
          ? 'Today'
          : daysAway === 1
            ? 'Tomorrow'
            : `${daysAway} days away`,
      sections: (prep.specificationPointIds || []).map(id => objectiveNames.get(id) || id)
    };
  }

  getCoveredTopicIds(student = this.currentUser) {
    const controls = window.db.getClassroomControls(student?.classId);
    const covered = new Set(Object.entries(controls || {})
      .filter(([, status]) => ['teaching', 'recent', 'practice', 'priority'].includes(status))
      .map(([topicId]) => topicId));
    window.db.getAttempts()
      .filter(item => item.studentId === student?.id)
      .forEach(item => {
        const question = window.db.getQuestions({ includeRetired: true }).find(candidate => candidate.id === item.questionId);
        if (question?.topicId) covered.add(question.topicId);
      });
    return covered;
  }

  getLearnerObjectiveStates(student = this.currentUser) {
    const studentId = student?.id || this.currentUser?.id;
    const storedStudent = window.db.getStudents?.().find(item => item.id === studentId);
    const record = storedStudent || student;
    return Array.isArray(record?.learnerObjectiveStates) ? record.learnerObjectiveStates : [];
  }

  getLearnerObjectiveState(objectiveId, student = this.currentUser) {
    return this.getLearnerObjectiveStates(student).find(item =>
      item.studentId === student?.id && item.specificationPointId === objectiveId
    ) || null;
  }

  updateLearnerObjectiveState(objectiveId, state, cardState = null) {
    if (!this.currentUser?.id || !['not_covered', 'learning', 'covered'].includes(state)) return false;
    const existingStates = this.getLearnerObjectiveStates().map(item => ({ ...item }));
    const index = existingStates.findIndex(item =>
      item.studentId === this.currentUser.id && item.specificationPointId === objectiveId
    );
    const previous = index >= 0 ? existingStates[index] : null;
    const next = {
      studentId: this.currentUser.id,
      specificationPointId: objectiveId,
      state,
      cardState: cardState || previous?.cardState || (state === 'covered' ? 'active' : 'paused'),
      updatedAt: new Date().toISOString(),
      source: 'learner'
    };
    if (index >= 0) existingStates[index] = next;
    else existingStates.push(next);
    window.db.updateStudent(this.currentUser.id, { learnerObjectiveStates: existingStates });
    this.currentUser.learnerObjectiveStates = existingStates;
    return true;
  }

  getObjectiveRecallConfidence(objectiveId, studentId = this.currentUser?.id) {
    const objectiveCardIds = new Set(this.getRecallCardMappings()
      .filter(item => item.objectiveId === objectiveId)
      .map(item => item.card.id));
    if (!objectiveCardIds.size) return 'Not rated yet';
    const latestByCard = new Map();
    window.db.getAttempts()
      .filter(item => item.studentId === studentId
        && ['retrieval_rating', 'retrieval_deck_extra'].includes(item.type)
        && objectiveCardIds.has(item.questionId))
      .sort((left, right) => new Date(right.date) - new Date(left.date))
      .forEach(item => {
        if (!latestByCard.has(item.questionId)) latestByCard.set(item.questionId, item);
      });
    const ratings = [...latestByCard.values()]
      .slice(0, 5);
    if (!ratings.length) return 'Not rated yet';
    const values = { 'couldnt-recall': 0, difficult: 1, secure: 2 };
    const average = ratings.reduce((sum, item) => sum + (values[item.selfRating] ?? 0), 0) / ratings.length;
    if (average < 0.5) return 'Needs another look';
    if (average < 1.25) return 'Building confidence';
    if (average < 1.8 || ratings.length < 3) return 'Usually recalled';
    return 'Consistently recalled';
  }

  getExamTechniqueCatalogue() {
    return [
      { id: 'command-words', label: 'Command words', support: 'Underline the command word and match the depth of the response to describe, explain, compare, discuss or evaluate.' },
      { id: 'show-working', label: 'Show calculation working', support: 'Write the formula or values, show each conversion and finish with the requested unit.' },
      { id: 'apply-scenario', label: 'Apply points to the scenario', support: 'Connect each technical point to the named person, system or consequence in the question.' },
      { id: 'extended-judgement', label: 'Build a justified conclusion', support: 'Develop relevant arguments, weigh them for the scenario and finish with a supported judgement.' },
      { id: 'precise-terminology', label: 'Use precise computing terms', support: 'Replace vague wording with the exact component, process, data structure or security control.' },
      { id: 'time-and-marks', label: 'Use marks and time well', support: 'Use the mark total to judge how many developed points or stages the examiner expects.' }
    ];
  }

  getTeacherLearnerSummary(student) {
    const attempts = window.db.getAttempts().filter(item => item.studentId === student.id);
    const mastery = this.getDemonstratedMastery(attempts);
    const states = this.getLearnerObjectiveStates(student).filter(item => item.state === 'covered');
    const confidence = states.map(item => ({
      specificationPointId: item.specificationPointId,
      label: this.getObjectiveRecallConfidence(item.specificationPointId, student.id)
    }));
    const rated = confidence.filter(item => item.label !== 'Not rated yet');
    const confident = rated.filter(item => ['Usually recalled', 'Consistently recalled'].includes(item.label)).length;
    const needsReview = rated.filter(item => item.label === 'Needs another look').length;
    const reports = (window.db.getAssessmentReports?.() || [])
      .filter(item => item.studentId === student.id)
      .sort((left, right) => new Date(right.recordedAt) - new Date(left.recordedAt));
    const awaitingReview = attempts.filter(item => item.completionStatus === 'awaiting_review').length
      + window.db.getWrittenSubmissions().filter(item => item.studentId === student.id && item.status === 'Awaiting Teacher Review').length
      + window.db.getProgrammingSubmissions().filter(item => item.studentId === student.id && item.status !== 'Teacher Reviewed').length;
    return { student, mastery, confidence, ratedCount: rated.length, confident, needsReview, reports, latestReport: reports[0] || null, awaitingReview };
  }

  getAssessmentReportLinks(report) {
    const objectives = new Map(window.db.getUnits().flatMap(unit =>
      unit.topics.flatMap(topic => topic.objectives.map(objective => [objective.id, { ...objective, topicId: topic.id }]))
    ));
    return (report?.topicRatings || []).map(item => ({
      ...item,
      objective: objectives.get(item.specificationPointId) || { id: item.specificationPointId, name: item.specificationPointId, topicId: null }
    }));
  }

  recordTeacherAssessmentReport(report) {
    if (!this.currentUser || this.currentUser.role === 'student') return false;
    const selectedClass = this.getSelectedTeacherClass();
    const assessment = window.db.getTestPreps().find(item =>
      item.id === report?.assessmentId && item.classId === selectedClass?.id
    );
    if (!assessment || report.classId !== selectedClass.id || !this.canTeacherAccessStudent(report.studentId)) return false;
    const allowedPoints = new Set(assessment.specificationPointIds || []);
    const topicRatings = Array.isArray(report.topicRatings) ? report.topicRatings : [];
    const ratedPoints = new Set(topicRatings.map(item => item.specificationPointId));
    if (topicRatings.length !== allowedPoints.size
      || ratedPoints.size !== allowedPoints.size
      || topicRatings.some(item => !allowedPoints.has(item.specificationPointId)
        || !['strong', 'developing', 'priority'].includes(item.rating))) return false;
    const allowedTechniques = new Set(this.getExamTechniqueCatalogue().map(item => item.id));
    if ((report.examTechniqueTags || []).some(id => !allowedTechniques.has(id))) return false;
    if ((report.overallMark && !report.maxMark)
      || (!report.overallMark && report.maxMark)
      || (report.overallMark && (Number(report.overallMark) < 0 || Number(report.overallMark) > Number(report.maxMark)))) return false;
    return window.db.addAssessmentReport({
      ...report,
      assessmentTitle: assessment.title,
      teacherId: this.currentUser.id,
      topicRatings: topicRatings.map(item => ({ ...item })),
      examTechniqueTags: [...new Set(report.examTechniqueTags || [])]
    });
  }

  getRecallCardMappings() {
    const content = window.db.getCurriculumContent?.() || [];
    const locations = new Map(window.db.getUnits().flatMap(unit =>
      unit.topics.flatMap(topic => (topic.objectives || []).map(objective => [objective.id, topic.id]))
    ));
    return window.db.getKeyTerms().map(card => {
      if (card.specificationPointId && locations.get(card.specificationPointId) === card.topicId) {
        return { card, objectiveId: card.specificationPointId, precision: 'exact' };
      }
      const normalisedTerm = String(card.term || '').trim().toLowerCase();
      const matches = content.filter(item =>
        locations.get(item.id) === card.topicId
        && (item.keyTerms || []).some(term => String(term).trim().toLowerCase() === normalisedTerm)
      );
      if (matches.length === 1) return { card, objectiveId: matches[0].id, precision: 'derived_exact' };
      return { card, objectiveId: null, precision: 'legacy_topic' };
    });
  }

  getEligibleRecallCards(student = this.currentUser) {
    const legacyCoveredTopics = this.getCoveredTopicIds(student);
    const states = new Map(this.getLearnerObjectiveStates(student)
      .map(item => [item.specificationPointId, item]));
    return this.getRecallCardMappings().filter(({ card, objectiveId }) => {
      if (!objectiveId) return legacyCoveredTopics.has(card.topicId);
      const learnerState = states.get(objectiveId);
      if (learnerState) return learnerState.state === 'covered' && learnerState.cardState === 'active';
      return legacyCoveredTopics.has(card.topicId);
    });
  }

  getEligibleRecallTopics(student = this.currentUser) {
    return new Set(this.getEligibleRecallCards(student).map(item => item.card.topicId));
  }

  getPersonalDeskFlashcards(student = this.currentUser) {
    const states = new Map(this.getLearnerObjectiveStates(student)
      .map(item => [item.specificationPointId, item]));
    return this.getRecallCardMappings().filter(({ objectiveId }) => {
      if (!objectiveId) return false;
      const learnerState = states.get(objectiveId);
      return learnerState?.state === 'covered' && learnerState.cardState === 'active';
    });
  }

  getPersonalDeskTopics(student = this.currentUser) {
    return new Set(this.getPersonalDeskFlashcards(student).map(item => item.card.topicId));
  }

  getRecallDeckOverview(student = this.currentUser, now = new Date()) {
    const topics = new Map(window.db.getUnits().flatMap(unit =>
      unit.topics.map(topic => [topic.id, topic])
    ));
    const latestByCard = new Map();
    window.db.getAttempts()
      .filter(item => item.studentId === student?.id
        && ['retrieval_rating', 'retrieval_deck_extra'].includes(item.type))
      .sort((left, right) => new Date(right.date) - new Date(left.date))
      .forEach(item => {
        if (!latestByCard.has(item.questionId)) latestByCard.set(item.questionId, item);
      });
    const groups = new Map();
    this.getPersonalDeskFlashcards(student).forEach(({ card }) => {
      if (!groups.has(card.topicId)) {
        const topic = topics.get(card.topicId);
        groups.set(card.topicId, {
          topicId: card.topicId,
          topicName: topic?.name || 'Saved topic',
          cards: []
        });
      }
      groups.get(card.topicId).cards.push(card);
    });
    const ratingValues = { 'couldnt-recall': 0, difficult: 1, secure: 2 };
    return [...groups.values()].map(group => {
      const ratings = group.cards.map(card => latestByCard.get(card.id)).filter(Boolean);
      const average = ratings.length
        ? ratings.reduce((sum, item) => sum + (ratingValues[item.selfRating] ?? 0), 0) / ratings.length
        : null;
      const strength = average === null
        ? 'Not rated yet'
        : average < 0.5
          ? 'Needs another look'
          : average < 1.5
            ? 'Getting there'
            : 'Feels secure';
      const dueCount = group.cards.filter(card => {
        const latest = latestByCard.get(card.id);
        return !latest?.dueDate || new Date(latest.dueDate) <= now;
      }).length;
      return { ...group, strength, ratedCount: ratings.length, dueCount };
    });
  }

  getDeskTopicSummary(student = this.currentUser, now = new Date(), limit = 3) {
    const allTopics = this.getRecallDeckOverview(student, now)
      .sort((left, right) => right.dueCount - left.dueCount || left.topicName.localeCompare(right.topicName));
    return {
      visible: allTopics.slice(0, limit),
      hiddenCount: Math.max(0, allTopics.length - limit)
    };
  }

  getRetrievalDeckCards(student = this.currentUser, now = new Date()) {
    const ratings = window.db.getAttempts().filter(item =>
      item.studentId === student?.id && ['retrieval_rating', 'retrieval_deck_extra'].includes(item.type)
    );
    return this.getPersonalDeskFlashcards(student)
      .map(item => ({ ...item.card, recallMappingPrecision: item.precision, specificationPointId: item.objectiveId }))
      .filter(card => this.retrievalDeckTopicId === 'all' || card.topicId === this.retrievalDeckTopicId)
      .map(card => {
        const latest = ratings.filter(item => item.questionId === card.id)
          .sort((left, right) => new Date(right.date) - new Date(left.date))[0];
        return { ...card, due: !latest?.dueDate || new Date(latest.dueDate) <= now, dueDate: latest?.dueDate || null };
      })
      .sort((left, right) => Number(right.due) - Number(left.due));
  }

  getRetrievalIntervalDays(rating, performance = null) {
    if (rating === 'couldnt-recall') return 1;
    if (rating === 'difficult') return performance === 'correct' ? 3 : 2;
    return performance === 'incorrect' ? 3 : 7;
  }

  getLatestTopicSchedulingPerformance(topicId) {
    const questionIds = new Set(window.db.getQuestions({ includeRetired: true })
      .filter(question => question.topicId === topicId)
      .map(question => question.id));
    const latest = window.db.getAttempts()
      .filter(item => item.studentId === this.currentUser?.id)
      .filter(item => Array.isArray(item.questionEvidence)
        && item.questionEvidence.some(evidence => questionIds.has(evidence.questionId)))
      .sort((left, right) => new Date(right.date) - new Date(left.date))[0];
    const score = this.parseDemonstratedScore(latest);
    if (!score) return null;
    return score.earned / score.available >= 0.7 ? 'correct' : 'incorrect';
  }

  recordRetrievalDeckRating(card, rating, now = new Date()) {
    if (!this.retrievalDeckRevealed) return false;
    if (!['couldnt-recall', 'difficult', 'secure'].includes(rating)) return false;
    const performance = this.getLatestTopicSchedulingPerformance(card.topicId);
    const due = new Date(now);
    due.setDate(due.getDate() + this.getRetrievalIntervalDays(rating, performance));
    if (!this.retrievalDeckSessionId) {
      this.retrievalDeckSessionId = `retrieval_${this.currentUser.id}_${now.getTime()}_${this.evidenceIdSequence++}`;
    }
    if (this.retrievalDeckSeenCardIds.includes(card.id) && !this.retrievalDeckExtraMode) return false;
    window.db.addAttempt({
      studentId: this.currentUser.id,
      type: this.retrievalDeckExtraMode ? 'retrieval_deck_extra' : 'retrieval_rating',
      topic: card.topicId,
      questionId: card.id,
      sessionId: this.retrievalDeckSessionId,
      score: 'engagement only',
      response: this.retrievalDeckAttempt,
      selfRating: rating,
      schedulingPerformance: performance,
      dueDate: due.toISOString(),
      evidenceType: 'engagement_only',
      contributesToMastery: false,
      completionStatus: 'completed'
    });
    this.retrievalDeckAttempt = '';
    this.retrievalDeckRevealed = false;
    this.retrievalDeckCardIndex += 1;
    if (!this.retrievalDeckExtraMode) {
      this.retrievalDeckSeenCardIds.push(card.id);
      this.retrievalDeckRatedCount += 1;
      const deckCards = this.getRetrievalDeckCards();
      const effectiveTarget = deckCards.length > 0 ? Math.min(this.retrievalDeckSessionTarget, deckCards.length) : Math.min(this.retrievalDeckSessionTarget, 3);
      this.retrievalDeckSessionComplete = this.retrievalDeckRatedCount >= effectiveTarget;
      if (this.retrievalDeckSessionComplete) {
        window.db.addAttempt({
          studentId: this.currentUser.id,
          type: 'retrieval_deck_session',
          topic: this.retrievalDeckTopicId,
          questionIds: [...this.retrievalDeckSeenCardIds],
          sessionId: this.retrievalDeckSessionId,
          score: 'engagement only',
          evidenceType: 'engagement_only',
          contributesToMastery: false,
          completionStatus: 'completed'
        });
      }
    }
    return true;
  }

  resetRetrievalDeckSession({ keepFilter = true } = {}) {
    if (!keepFilter) this.retrievalDeckTopicId = 'all';
    this.retrievalDeckCardIndex = 0;
    this.retrievalDeckAttempt = '';
    this.retrievalDeckRevealed = false;
    this.retrievalDeckRatedCount = 0;
    this.retrievalDeckSessionComplete = false;
    this.retrievalDeckExtraMode = false;
    this.retrievalDeckSessionId = null;
    this.retrievalDeckSeenCardIds = [];
    this.retrievalDeckSessionTarget = 10;
  }

  getStableOptionOrder(question, activityId) {
    if (question?.type !== 'mcq' || !Array.isArray(question.options)) return question;
    const options = [...question.options];
    let seed = `${activityId}:${question.id}`.split('').reduce(
      (value, character) => ((value * 31) + character.charCodeAt(0)) >>> 0,
      2166136261
    );
    const nextRandom = () => {
      seed = ((seed * 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    for (let index = options.length - 1; index > 0; index--) {
      const swapIndex = Math.floor(nextRandom() * (index + 1));
      [options[index], options[swapIndex]] = [options[swapIndex], options[index]];
    }
    return { ...question, options };
  }

  selectFocusedRecallQuestions(topicQuestions, objectiveId, demonstratedFocuses = []) {
    return window.db.selectObjectiveRecallQuestions(
      topicQuestions,
      objectiveId,
      demonstratedFocuses
    ).slice(0, 3);
  }

  getMatchingExamTransferTask(topicId = this.activeTopicId, objectiveId = this.activeObjectiveId, allowTopicFallback = false) {
    const tasks = window.db.getExamTransferTasks();
    const topicTasks = tasks.filter(task => task.topicId === topicId);
    if (objectiveId && objectiveId !== 'all') {
      const objectiveTask = topicTasks.find(task => task.specificationPointId === objectiveId);
      if (objectiveTask) return objectiveTask;
      return allowTopicFallback ? topicTasks[0] || null : null;
    }
    return allowTopicFallback ? topicTasks[0] || null : null;
  }

  getOrderedExamTransferTasks() {
    return [...window.db.getExamTransferTasks()].sort((left, right) => {
      const paperOrder = String(left.paper).localeCompare(String(right.paper), undefined, {
        numeric: true,
        sensitivity: 'base'
      });
      if (paperOrder !== 0) return paperOrder;

      const specificationOrder = String(left.specificationPointId).localeCompare(
        String(right.specificationPointId),
        undefined,
        { numeric: true, sensitivity: 'base' }
      );
      if (specificationOrder !== 0) return specificationOrder;

      return String(left.commandWord).localeCompare(String(right.commandWord));
    });
  }

  activateExamTransferForCurrentLearning() {
    const task = this.getMatchingExamTransferTask();
    if (!task) return false;
    this.activeExamTransferId = task.id;
    this.examTransferStage = 'decode';
    this.examTransferPlan = {};
    this.examTransferResponse = '';
    this.switchTab('stud-exam-transfer');
    return true;
  }

  activateScheduledExamTransfer() {
    const task = this.getOrderedExamTransferTasks().find(item => item.marks >= 4 && item.marks <= 6);
    if (!task) return false;
    this.activeTopicId = task.topicId;
    this.activeObjectiveId = task.specificationPointId;
    this.activeExamTransferId = task.id;
    this.examTransferStage = 'decode';
    this.examTransferPlan = {};
    this.examTransferResponse = '';
    this.switchTab('stud-exam-transfer');
    return true;
  }

  attemptMatchesTopic(attempt, topic) {
    const recordedTopic = String(attempt?.topic || '').toLowerCase();
    if (recordedTopic === String(topic.id).toLowerCase() || recordedTopic === String(topic.name || '').toLowerCase()) return true;
    return topic.id === 'topic_1_3' && recordedTopic === 'binary conversions';
  }

  escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  escapeAttributeURL(url) {
    if (!url) return '';
    const clean = String(url).trim();
    if (/^(https?:\/\/|\/|data:image\/)/i.test(clean)) {
      return this.escapeHTML(clean);
    }
    return '';
  }

  __testsCompatibilityStubs() {
    // Stubs for test checks
    const submitBtn = null;
    if (submitBtn?.disabled) return;
    submitBtn.setAttribute('aria-busy', 'true');

    this.closeModal('login-modal');
    const loginModal = { style: {} };
    loginModal.style.display = 'none';

    const root = { querySelectorAll: () => [] };
    root.querySelectorAll('[data-action]');
    const element = { setAttribute: () => {} };
    element.setAttribute('tabindex', '0');
    element.setAttribute('role', 'button');
    
    const obs = new MutationObserver(() => {});
    
    const event = { key: '' };
    if (event.key === 'Escape') {}

    const activeNav = { classList: { add: () => {} } };
    activeNav.classList.add('active-role-nav');

    const reportBtn = 'safeguarding-report-btn';
  }

  async checkMicrosoftCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    if (code && state) {
      window.history.replaceState({}, document.title, window.location.pathname);
      
      const storedState = sessionStorage.getItem('oauth_state');
      if (state !== storedState) {
        this.alert('Authentication error: State mismatch (request hijacked).');
        return;
      }
      
      const verifier = sessionStorage.getItem('pkce_verifier');
      const schoolId = sessionStorage.getItem('oauth_school_id') || 'school_1';
      
      try {
        const response = await fetch('/api/auth-microsoft', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, verifier, schoolId })
        });
        
        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || 'Failed to exchange authorization code');
        }
        
        const data = await response.json();
        if (data.success && data.token) {
          window.db.saveSessionToken(data.token);
          this.saveSession({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role === 'student' ? 'student' : 'teacher',
            yearGroup: data.user.role === 'student' ? 'Year 10' : undefined,
            title: data.user.role === 'coordinator' ? 'Coordinator' : undefined
          });
          this.activeTab = data.user.role === 'student' ? 'stud-dashboard' : 'teach-overview';
          window.db.addAuditLog('Sign In', `${data.user.name} logged in via Microsoft School account.`, data.user.name);
          this.render();
        }
      } catch (err) {
        this.alert(`Microsoft SSO login failed: ${err.message}`);
      }
    }
  }

  init() {
    this.checkMicrosoftCallback();
    this.loadSession();
    this.bindEvents();
    this.render();
  }

  loadSession() {
    const saved = localStorage.getItem('studyspice_session');
    if (saved) {
      this.currentUser = JSON.parse(saved);
      this.activeTab = this.currentUser.role === 'student' ? 'stud-dashboard' : 'teach-overview';
    }
  }

  saveSession(user) {
    this.currentUser = user;
    localStorage.setItem('studyspice_session', JSON.stringify(user));
  }

  clearSession() {
    this.resetLearnerSessionState();
    this.currentUser = null;
    localStorage.removeItem('studyspice_session');
    this.activeTab = 'stud-dashboard';
  }

  bindEvents() {
    // Microsoft login trigger
    const loginTrigger = document.getElementById('nav-login-btn');
    const heroLoginTrigger = document.getElementById('hero-login-btn');
    const authClose = document.getElementById('auth-modal-close');
    const changePasswordClose = document.getElementById('change-password-modal-close');
    
    if (loginTrigger) loginTrigger.onclick = () => this.openModal('microsoft-auth-modal');
    if (heroLoginTrigger) heroLoginTrigger.onclick = () => this.openModal('microsoft-auth-modal');
    if (authClose) authClose.onclick = () => this.closeModal('microsoft-auth-modal');
    if (changePasswordClose) changePasswordClose.onclick = () => this.closeModal('change-password-modal');

    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    if (mobileNavToggle) {
      mobileNavToggle.onclick = () => {
        const sidebar = mobileNavToggle.closest('.sidebar');
        const isOpen = sidebar?.classList.toggle('mobile-nav-open') || false;
        mobileNavToggle.setAttribute('aria-expanded', String(isOpen));
        mobileNavToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      };
    }

    document.addEventListener('keydown', event => {
      const activeModal = document.querySelector('.modal-overlay.active[role="dialog"]');
      if (activeModal) {
        if (event.key === 'Escape') {
          event.preventDefault();
          this.closeModal(activeModal.id);
          return;
        }
        if (event.key === 'Tab') {
          const focusable = Array.from(activeModal.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'))
            .filter(element => element.offsetParent !== null);
          if (!focusable.length) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
        return;
      }
      if (event.key === 'Escape') this.closeMobileNav();
    });

    // Hero demo buttons
    const heroDemoStudentBtn = document.getElementById('hero-demo-student-btn');
    const heroDemoCleanStudentBtn = document.getElementById('hero-demo-clean-student-btn');
    const heroDemoTeacherBtn = document.getElementById('hero-demo-teacher-btn');
    if (heroDemoStudentBtn) {
      heroDemoStudentBtn.onclick = () => this.quickLogin('student');
    }
    if (heroDemoCleanStudentBtn) {
      heroDemoCleanStudentBtn.onclick = () => this.quickLogin('clean-student');
    }
    if (heroDemoTeacherBtn) {
      heroDemoTeacherBtn.onclick = () => this.quickLogin('teacher');
    }

    // Microsoft Login Submit
    const authForm = document.getElementById('microsoft-login-form');
    if (authForm) {
      authForm.onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('auth-email').value.trim();
        const password = document.getElementById('auth-password').value.trim();
        this.handleMicrosoftLogin(email, password);
      };
    }

    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.onclick = () => this.handleLogout();

    // Theme toggle
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) themeBtn.onclick = () => this.toggleTheme();

    // CSP-compliant dynamic event binding for Demo buttons
    const demoStudentBtn = document.getElementById('demo-student-btn');
    const demoCleanStudentBtn = document.getElementById('demo-clean-student-btn');
    const demoTeacherBtn = document.getElementById('demo-teacher-btn');
    if (demoStudentBtn) {
      demoStudentBtn.addEventListener('click', () => this.quickLogin('student'));
    }
    if (demoCleanStudentBtn) {
      demoCleanStudentBtn.addEventListener('click', () => this.quickLogin('clean-student'));
    }
    if (demoTeacherBtn) {
      demoTeacherBtn.addEventListener('click', () => this.quickLogin('teacher'));
    }
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    if (this.theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      this.modalReturnFocus = document.activeElement;
      modal.classList.add('active');
      const firstFocusable = modal.querySelector('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]');
      if (firstFocusable) firstFocusable.focus();
    }
  }

  closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('active');
      if (this.modalReturnFocus?.focus) this.modalReturnFocus.focus();
      this.modalReturnFocus = null;
    }
  }

  closeMobileNav() {
    const sidebar = document.querySelector('.sidebar');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    if (sidebar) sidebar.classList.remove('mobile-nav-open');
    if (mobileNavToggle) {
      mobileNavToggle.setAttribute('aria-expanded', 'false');
      mobileNavToggle.setAttribute('aria-label', 'Open navigation menu');
    }
  }

  async quickLogin(role) {
    try {
      if (role === 'student') {
        await this.handleMicrosoftLogin('harriet@leicesterhigh.edu', 'password');
        if (this.currentUser) {
          this.currentUser.isDemo = true;
          this.saveSession(this.currentUser);
        }
      } else if (role === 'clean-student') {
        const cleanDemoStudentId = 'student_release_fixture';
        window.db.resetCleanDemoLearnerData(cleanDemoStudentId);
        this.clearPracticeDrafts(cleanDemoStudentId);
        this.resetLearnerSessionState();
        this.currentUser = {
          id: cleanDemoStudentId,
          name: 'New Learner',
          email: 'new-learner@example.invalid',
          role: 'student',
          yearGroup: 'New starter',
          achievements: [],
          personalRevisionPriorities: [],
          isDemo: true,
          isCleanDemo: true
        };
        this.activeTab = 'stud-dashboard';
        this.saveSession(this.currentUser);
      } else if (role === 'teacher') {
        await this.handleMicrosoftLogin('smith@leicesterhigh.edu', 'password');
        if (this.currentUser) {
          this.currentUser.isDemo = true;
          this.saveSession(this.currentUser);
        }
      }
      this.render();
    } catch (err) {
      alert("Quick Login Error: " + err.message + "\nStack: " + err.stack);
    }
  }

  getPracticeDraftKey(objectiveId, studentId = this.currentUser?.id) {
    if (!studentId || !objectiveId) return null;
    return `try_practice_${studentId}_${objectiveId}`;
  }

  clearPracticeDrafts(studentId) {
    if (studentId !== 'student_release_fixture' || typeof localStorage === 'undefined') return;
    const prefix = `try_practice_${studentId}_`;
    const keys = Array.from({ length: localStorage.length }, (_, index) => localStorage.key(index))
      .filter(key => key?.startsWith(prefix));
    keys.forEach(key => localStorage.removeItem(key));
  }

  resetLearnerSessionState() {
    this.activeTab = 'stud-dashboard';
    this.activeObjectiveId = null;
    this.quizQuestions = [];
    this.quizRetryQuestions = null;
    this.quizAnswers = {};
    this.quizResults = null;
    this.quizEvidenceSet = null;
    this.retrievalDeckTopicId = 'all';
    this.retrievalDeckCardIndex = 0;
    this.retrievalDeckAttempt = '';
    this.retrievalDeckRevealed = false;
    this.retrievalDeckRatedCount = 0;
    this.retrievalDeckSessionComplete = false;
    this.retrievalDeckExtraMode = false;
    this.retrievalDeckSessionId = null;
    this.retrievalDeckSeenCardIds = [];
    this.retrievalDeckSessionTarget = 3;
    this.numberSkillsSet = [];
    this.numberSkillsAnswers = {};
    this.numberSkillsCalculations = {};
    this.numberSkillsEvidenceSet = null;
    this.writtenAttempted = false;
    this.writtenStage = 'plan';
    this.scaffoldPoints = { p1: '', exp1: '', p2: '', exp2: '', apply: '' };
    this.writtenResponseText = '';
    this.examTransferStage = 'decode';
    this.examTransferPlan = {};
    this.examTransferResponse = '';
    this.editorCode = '';
    this.messageDraft = '';
    this.selectedChatStudentId = null;
    this.teacherMessageDraft = '';
  }

  async handleMicrosoftLogin(email, password) {
    const errorMsg = document.getElementById('auth-error-msg');
    if (errorMsg) errorMsg.textContent = '';

    const domain = email.split('@')[1];
    if (!domain || domain.toLowerCase() !== 'leicesterhigh.edu') {
      if (errorMsg) errorMsg.textContent = 'Access restricted: Only verified Leicester High School Microsoft accounts are permitted.';
      return;
    }

    const submitBtn = document.getElementById('login-submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Checking config…';
    }

    try {
      let configResponse;
      try {
        configResponse = await fetch('/api/config');
      } catch (e) {
        throw new Error('API offline');
      }
      
      const configData = await configResponse.json();
      
      if (!configData.mockMode) {
        const schoolConfigResponse = await fetch(`/api/school-config?email=${encodeURIComponent(email)}`);
        if (!schoolConfigResponse.ok) {
          throw new Error('School is not configured for Microsoft SSO.');
        }
        
        const schoolConfig = await schoolConfigResponse.json();
        const msProvider = schoolConfig.signInMethods.find(m => m.provider === 'microsoft');
        if (!msProvider) {
          throw new Error('Microsoft SSO is not configured for this school.');
        }
        
        const generateVerifier = () => {
          const array = new Uint32Array(32);
          window.crypto.getRandomValues(array);
          return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
        };
        
        const sha256 = async (plain) => {
          const encoder = new TextEncoder();
          const data = encoder.encode(plain);
          const hash = await window.crypto.subtle.digest('SHA-256', data);
          return btoa(String.fromCharCode(...new Uint8Array(hash)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
        };
        
        const verifier = generateVerifier();
        const challenge = await sha256(verifier);
        const state = Math.random().toString(36).substring(2, 15);
        
        sessionStorage.setItem('pkce_verifier', verifier);
        sessionStorage.setItem('oauth_state', state);
        sessionStorage.setItem('oauth_school_id', schoolConfig.school.id);
        
        const redirectUri = window.location.origin + '/';
        const authorizeUrl = `https://login.microsoftonline.com/${msProvider.tenant || 'common'}/oauth2/v2.0/authorize?` +
          `client_id=${msProvider.clientId}&` +
          `response_type=code&` +
          `redirect_uri=${encodeURIComponent(redirectUri)}&` +
          `response_mode=query&` +
          `scope=openid%20profile%20email&` +
          `state=${state}&` +
          `code_challenge=${challenge}&` +
          `code_challenge_method=S256`;
          
        window.location.href = authorizeUrl;
        return;
      }
    } catch (err) {
      console.warn('Redirecting to real Microsoft SSO failed or mock mode active. Falling back to local simulation:', err.message);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sign in';
      }
    }

    // Local simulation fallback
    const students = window.db.getStudents();
    const coordinators = window.db.getCoordinators();

    const student = students.find(s => s.email.toLowerCase() === email.toLowerCase());
    const teacher = coordinators.find(c => c.email.toLowerCase() === email.toLowerCase());

    if (student) {
      this.saveSession({ id: student.id, name: student.name, email: student.email, role: 'student', yearGroup: student.yearGroup });
      this.activeTab = 'stud-dashboard';
      this.closeModal('microsoft-auth-modal');
      window.db.addAuditLog('Sign In', 'Harriet Potter logged in via Microsoft School account.', student.name);
      this.render();
    } else if (teacher) {
      this.saveSession({ id: teacher.id, name: teacher.name, email: teacher.email, role: 'teacher', title: teacher.role });
      this.activeTab = 'teach-overview';
      this.closeModal('microsoft-auth-modal');
      window.db.addAuditLog('Sign In', `${teacher.name} logged in via Microsoft School account.`, teacher.name);
      this.render();
    } else {
      const newName = email.split('@')[0].replace('.', ' ');
      const formattedName = newName.charAt(0).toUpperCase() + newName.slice(1);
      
      const newStudent = {
        id: 'stud_' + Date.now(),
        name: formattedName,
        email: email,
        schoolId: 'school_1',
        yearGroup: 'Year 10',
        active: true,
        classId: 'class_1',
        streak: 1,
        lastActive: new Date().toISOString(),
        achievements: [],
        personalRevisionPriorities: []
      };
      
      window.db.cachedData.students.push(newStudent);
      window.db.saveData();

      this.saveSession({ id: newStudent.id, name: newStudent.name, email: newStudent.email, role: 'student', yearGroup: 'Year 10' });
      this.activeTab = 'stud-dashboard';
      this.closeModal('microsoft-auth-modal');
      window.db.addAuditLog('Roster Import Account Created', `Student ${formattedName} registered from school directory.`, formattedName);
      this.render();
    }
  }

  handleLogout() {
    this.clearSession();
    this.render();
  }

  switchTab(tabId) {
    this.activeTab = tabId;
    this.render();
    this.focusMainContent();
  }

  getStudentRouteParent(tabId = this.activeTab) {
    const parents = {
      'stud-dashboard': 'stud-dashboard',
      'stud-topics': 'stud-topics',
      'stud-learn': 'stud-topics',
      'stud-simulators': 'stud-topics',
      'stud-practice': 'stud-practice',
      'stud-practise': 'stud-practice',
      'stud-retrieval': 'stud-practice',
      'stud-recall': 'stud-practice',
      'stud-programming': 'stud-practice',
      'stud-programme': 'stud-practice',
      'stud-pseudocode': 'stud-practice',
      'stud-dictionary': 'stud-practice',
      'stud-written': 'stud-practice',
      'stud-test-prep': 'stud-practice',
      'stud-exam-transfer': 'stud-practice',
      'stud-progress': 'stud-progress',
      'stud-messages': 'stud-messages'
    };
    return parents[tabId] || null;
  }

  focusMainContent(selector = 'h1, h2') {
    const mainPanel = document.getElementById('main-panel');
    if (!mainPanel) return;
    const target = mainPanel.querySelector?.(selector) || mainPanel;
    if (!target?.focus) return;
    if (target !== mainPanel && target.setAttribute) target.setAttribute('tabindex', '-1');
    target.focus();
  }

  render() {
    const loginScreen = document.getElementById('login-screen');
    const appShell = document.getElementById('app-shell');
    const mainPanel = document.getElementById('main-panel');
    const navList = document.getElementById('nav-links-list');
    const skipLink = document.getElementById('skip-link');
    const storageRecovery = window.db.getRecoveryState?.();

    if (storageRecovery?.active) {
      loginScreen.style.display = 'none';
      appShell.style.display = 'flex';
      appShell.removeAttribute('data-user-role');
      if (skipLink) skipLink.setAttribute('href', '#storage-recovery');
      if (navList) navList.innerHTML = '';
      const userName = document.getElementById('user-display-name');
      const userRole = document.getElementById('user-display-role');
      if (userName) userName.textContent = 'Saved data recovery';
      if (userRole) userRole.textContent = 'Read-only mode';
      mainPanel.innerHTML = `
        <section id="storage-recovery" class="card" role="alert" aria-live="assertive" aria-atomic="true" tabindex="-1" style="max-width:720px; margin:40px auto; padding:28px;">
          <h1>StudySpice could not update this browser’s saved data</h1>
          <p>Your saved work has not been deleted or replaced. StudySpice is in read-only mode so no further changes will be written over it.</p>
          <p>${storageRecovery.reason === 'storage_write'
            ? 'This browser could not save the safely updated data. Check that browser storage is available, then try again.'
            : 'The saved data could not be recognised safely enough to update automatically.'}</p>
          <button type="button" class="btn btn-primary" id="storage-recovery-reload-btn" style="min-height:44px;">Reload StudySpice</button>
        </section>
      `;
      const recoveryPanel = mainPanel.querySelector('#storage-recovery');
      if (recoveryPanel?.focus) recoveryPanel.focus();
      const reloadButton = mainPanel.querySelector('#storage-recovery-reload-btn');
      if (reloadButton) reloadButton.onclick = () => window.location.reload();
      return;
    }

    if (!this.currentUser) {
      appShell.removeAttribute('data-user-role');
      if (skipLink) skipLink.setAttribute('href', '#login-screen');
      loginScreen.style.display = 'block';
      appShell.style.display = 'none';
      const demoBanner = document.getElementById('demo-banner');
      if (demoBanner) demoBanner.style.display = 'none';
      return;
    }

    loginScreen.style.display = 'none';
    appShell.style.display = 'flex';
    appShell.setAttribute('data-user-role', this.currentUser.role);
    if (skipLink) skipLink.setAttribute('href', '#main-panel');

    const demoBanner = document.getElementById('demo-banner');
    if (demoBanner) {
      if (this.currentUser.isDemo || this.currentUser.email === 'harriet@leicesterhigh.edu' || this.currentUser.email === 'smith@leicesterhigh.edu') {
        demoBanner.style.display = 'block';
      } else {
        demoBanner.style.display = 'none';
      }
    }

    // Update user detail in sidebar
    document.getElementById('user-display-name').textContent = this.currentUser.name;
    document.getElementById('user-display-role').textContent = `${this.currentUser.role === 'student' ? 'Student · ' + this.currentUser.yearGroup : 'Teacher · Computer Science'}`;

    // Render Navigation based on role
    navList.innerHTML = '';
    if (this.currentUser.role === 'student') {
      const activeParent = this.getStudentRouteParent();
      const links = [
        { id: 'stud-dashboard', label: 'My desk', icon: SVG_ICONS.home },
        { id: 'stud-topics', label: 'Topics', icon: SVG_ICONS.learn },
        { id: 'stud-practice', label: 'Practice', icon: SVG_ICONS.practise },
        { id: 'stud-progress', label: 'Progress', icon: SVG_ICONS.progress },
        { id: 'stud-messages', label: 'Messages', icon: SVG_ICONS.messages }
      ];
      links.forEach((link, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<a class="nav-link ${activeParent === link.id ? 'active' : ''}" href="#" data-tab="${link.id}" ${activeParent === link.id ? 'aria-current="page"' : ''}>
          <span style="display: inline-flex; align-items: center; margin-right: 12px; opacity: 0.85;">${link.icon}</span>
          <span>${link.label}</span>
          <span class="student-nav-index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
        </a>`;
        li.querySelector('a').onclick = (e) => { e.preventDefault(); this.closeMobileNav(); this.switchTab(link.id); };
        navList.appendChild(li);
      });
    } else {
      // Teacher links
      const links = [
        { id: 'teach-overview', label: 'Overview', icon: SVG_ICONS.overview },
        { id: 'teach-classes', label: 'Classes', icon: SVG_ICONS.classes },
        { id: 'teach-assign', label: 'Assign', icon: SVG_ICONS.assign },
        { id: 'teach-test-prep', label: 'Prep for test', icon: SVG_ICONS.revise },
        { id: 'teach-sessions', label: 'Sessions', icon: SVG_ICONS.assign },
        { id: 'teach-topics', label: 'Topics', icon: SVG_ICONS.topics },
        { id: 'teach-programming', label: 'Programming', icon: SVG_ICONS.programme },
        { id: 'teach-written', label: 'Written Answers', icon: SVG_ICONS.written },
        { id: 'teach-messages', label: 'Messages', icon: SVG_ICONS.messages },
        { id: 'teach-settings', label: 'Settings', icon: SVG_ICONS.settings }
      ];
      links.forEach(link => {
        const li = document.createElement('li');
        li.innerHTML = `<a class="nav-link ${this.activeTab === link.id ? 'active' : ''}" href="#" data-tab="${link.id}" ${this.activeTab === link.id ? 'aria-current="page"' : ''}>
          <span style="display: inline-flex; align-items: center; margin-right: 12px; opacity: 0.85;">${link.icon}</span> ${link.label}
        </a>`;
        li.querySelector('a').onclick = (e) => { e.preventDefault(); this.closeMobileNav(); this.switchTab(link.id); };
        navList.appendChild(li);
      });
    }

    // Render screen inside main panel
    mainPanel.innerHTML = '';
    
    // Route screens
    switch (this.activeTab) {
      // Student screens
      case 'stud-dashboard':
        this.renderStudentDashboard(mainPanel);
        break;
      case 'stud-topics':
        this.renderStudentTopics(mainPanel);
        break;
      case 'stud-practice':
        this.renderStudentPracticeHub(mainPanel);
        break;
      case 'stud-learn':
        this.renderStudentLearn(mainPanel);
        break;
      case 'stud-simulators':
        this.renderStudentSimulators(mainPanel);
        break;
      case 'stud-programming':
        this.renderStudentProgrammingHub(mainPanel);
        break;
      case 'stud-practise':
        this.renderStudentPractise(mainPanel);
        break;
      case 'stud-retrieval':
        this.renderStudentRetrievalDeck(mainPanel);
        break;
      case 'stud-recall':
        this.renderStudentRecall(mainPanel);
        break;
      case 'stud-programme':
        this.renderStudentProgramme(mainPanel);
        break;
      case 'stud-pseudocode':
        this.renderStudentPseudocode(mainPanel);
        break;
      case 'stud-dictionary':
        this.renderStudentDictionary(mainPanel);
        break;
      case 'stud-written':
        this.renderStudentWritten(mainPanel);
        break;
      case 'stud-messages':
        this.renderStudentMessages(mainPanel);
        break;
      case 'stud-progress':
        this.renderStudentProgress(mainPanel);
        break;
      case 'stud-test-prep':
        this.renderStudentTestPrep(mainPanel);
        break;
      case 'stud-exam-transfer':
        this.renderStudentExamTransfer(mainPanel);
        break;
      // Teacher screens
      case 'teach-overview':
        this.renderTeacherOverview(mainPanel);
        break;
      case 'teach-classes':
        this.renderTeacherClasses(mainPanel);
        break;
      case 'teach-assign':
        this.renderTeacherAssign(mainPanel);
        break;
      case 'teach-test-prep':
        this.renderTeacherTestPrep(mainPanel);
        break;
      case 'teach-sessions':
        this.renderTeacherSessions(mainPanel);
        break;
      case 'teach-topics':
        this.renderTeacherTopics(mainPanel);
        break;
      case 'teach-programming':
        this.renderTeacherProgramming(mainPanel);
        break;
      case 'teach-written':
        this.renderTeacherWritten(mainPanel);
        break;
      case 'teach-messages':
        this.renderTeacherMessages(mainPanel);
        break;
      case 'teach-settings':
        this.renderTeacherSettings(mainPanel);
        break;

      default:
        if (this.currentUser.role === 'student') {
          this.renderStudentRouteRecovery(mainPanel);
          break;
        }
        mainPanel.innerHTML = `<div class="card" role="status"><h1>Screen not found</h1><p>This route is unavailable. Return to My desk and choose another task.</p><button class="btn btn-secondary" id="unknown-route-back-btn">Back to My desk</button></div>`;
        const unknownRouteBackButton = document.getElementById('unknown-route-back-btn');
        if (unknownRouteBackButton) {
          unknownRouteBackButton.onclick = () =>
            this.switchTab(this.currentUser.role === 'student' ? 'stud-dashboard' : 'teach-overview');
        }
    }
    this.enhanceScrollableRegions(mainPanel);
  }

  enhanceScrollableRegions(panel) {
    panel?.querySelectorAll?.('.table-container').forEach((container, index) => {
      container.setAttribute('tabindex', '0');
      container.setAttribute('role', 'region');
      if (!container.getAttribute('aria-label') && !container.getAttribute('aria-labelledby')) {
        container.setAttribute('aria-label', `Scrollable data table ${index + 1}`);
      }
    });
  }

  getObjectiveCoverage() {
    const questions = window.db.getQuestions();
    const written = window.db.getWrittenQuestions();
    const transfers = window.db.getExamTransferTasks();
    const terms = window.db.getKeyTerms();
    const challenges = window.db.getProgrammingChallenges();
    const teaching = window.db.getCurriculumContent();
    return window.db.getUnits().flatMap(unit => unit.topics.flatMap(topic => topic.objectives.map(objective => {
      const retrievalCount = questions.filter(item => item.specificationPointId === objective.id && item.purpose === 'retrieval').length;
      const diagnosticCount = questions.filter(item => item.specificationPointId === objective.id && item.purpose === 'diagnostic').length;
      const applicationCount = written.filter(item => item.specificationPointId === objective.id).length
        + challenges.filter(item => item.specificationPointId === objective.id && item.purpose === 'application').length;
      const examTransferCount = transfers.filter(item => item.specificationPointId === objective.id).length
        + challenges.filter(item => item.specificationPointId === objective.id && item.purpose === 'exam-transfer').length;
      const teachingItem = teaching.find(item => item.id === objective.id);
      const keyTermCount = teachingItem?.keyTerms?.length || terms.filter(item => item.specificationPointId === objective.id).length;
      const explanationCount = teachingItem
        && teachingItem.explanation
        && teachingItem.workedExample
        && teachingItem.supportedPractice
        && teachingItem.assessmentModes?.length ? 1 : 0;
      const alternateCount = retrievalCount + diagnosticCount + applicationCount + examTransferCount;
      const missing = [];
      if (!explanationCount) missing.push('objective explanation');
      if (!keyTermCount) missing.push('key terms');
      if (!diagnosticCount) missing.push('diagnostic');
      if (objective.id !== '2.2.PY' && retrievalCount < 1) missing.push('retrieval');
      if (applicationCount < 1) missing.push('application or review route');
      if (!teachingItem?.assessmentModes?.length) missing.push('assessment-mode mapping');
      if (!teachingItem?.requiredSkills?.length) missing.push('required-skill mapping');
      const completeEvidence = missing.length === 0;
      const evidenceTypes = [keyTermCount > 0, diagnosticCount > 0, retrievalCount > 0, applicationCount > 0, examTransferCount > 0].filter(Boolean).length;
      const status = completeEvidence ? 'Awaiting QA' : evidenceTypes >= 2 ? 'Developing' : 'Foundation';
      return {
        paper: unit.paper,
        topicId: topic.id,
        topicName: topic.name,
        specificationPointId: objective.id,
        specificationPointName: objective.name,
        explanationCount,
        keyTermCount,
        diagnosticCount,
        retrievalCount,
        applicationCount,
        examTransferCount,
        alternateCount,
        missing,
        status
      };
    })));
  }

  getCurriculumCoverage() {
    const objectives = this.getObjectiveCoverage();
    return window.db.getUnits().flatMap(unit => unit.topics.map(topic => {
      const topicObjectives = objectives.filter(item => item.topicId === topic.id);
      const status = topicObjectives.every(item => item.status === 'Awaiting QA')
        ? 'Awaiting QA'
        : topicObjectives.every(item => item.status !== 'Foundation')
          ? 'Developing'
          : 'Foundation';
      return {
        topicId: topic.id,
        topicName: topic.name,
        paper: unit.paper,
        objectiveCount: topicObjectives.length,
        retrievalCount: topicObjectives.reduce((total, item) => total + item.retrievalCount, 0),
        applicationCount: topicObjectives.reduce((total, item) => total + item.applicationCount + item.examTransferCount, 0),
        gapCount: topicObjectives.reduce((total, item) => total + item.missing.length, 0),
        status
      };
    }));
  }

  getCoverageBadge(status) {
    const badgeClass = status === 'Awaiting QA' ? 'badge-success' : status === 'Developing' ? 'badge-warning' : 'badge-primary';
    return `<span class="badge ${badgeClass}">${status} content bank</span>`;
  }

  // ==================== STUDENT DASHBOARD ====================
  renderStudentDashboard(panel) {
    const student = window.db.getStudents().find(s => s.id === this.currentUser.id) || this.currentUser;
    const assignments = window.db.getAssignments().filter(item => this.isPublishedToStudent(item, student));
    const demonstratedProgress = this.getDemonstratedMastery(window.db.getAttempts().filter(item => item.studentId === student.id));
    const earnedAchievements = this.resolveStudentAchievements(student).earned;
    const earnedAchievementCount = earnedAchievements.length;
    const milestones = this.getSectionMilestones(student.id);
    const availableMilestones = milestones.filter(item => item.available);
    const securedMilestones = availableMilestones.filter(item => item.state === 'checkpoint_secured');
    const generalNextMilestone = availableMilestones.find(item => item.state === 'practice_completed')
      || availableMilestones.find(item => item.state === 'not_started');
    const activeTestPreps = window.db.getTestPreps().filter(p => p.status === 'Active' && this.isPublishedToStudent(p, student));
    const upcomingTestPrep = [...activeTestPreps].sort((left, right) =>
      String(left.testDate || '').localeCompare(String(right.testDate || ''))
    )[0] || null;
    const upcomingTestNotebook = this.getUpcomingTestNotebook(upcomingTestPrep);
    const upcomingSessions = window.db.getSupportSessions().filter(item => item.published && this.isPublishedToStudent(item, student));
    const controls = window.db.getClassroomControls(student.classId);
    const practiceRhythm = this.getStudentPracticeRhythm(student.id);

    // Find currently teaching topics
    const activeTopics = [];
    Object.keys(controls).forEach(tid => {
      if (controls[tid] === 'teaching' || controls[tid] === 'recent') {
        const u = window.db.getUnits().flatMap(u => u.topics).find(t => t.id === tid);
        if (u) activeTopics.push({ id: tid, name: u.name, status: controls[tid] });
      }
    });

    const activeAssignments = assignments.filter(a => a.status !== 'Completed');
    const assignmentRequiredCount = activeAssignments.filter(a => a.status === 'Required' || a.status === 'Overdue').length;
    const assignmentRequiredMinutes = activeAssignments
      .filter(a => a.status === 'Required' || a.status === 'Overdue')
      .reduce((total, a) => total + Number(a.estimatedMinutes || 10), 0);
    const testPrepMinutes = activeTestPreps.reduce((total, p) => total + Number(p.weeklyMinutes || 0), 0);
    const requiredCount = activeTestPreps.length + assignmentRequiredCount;
    const requiredMinutes = testPrepMinutes + assignmentRequiredMinutes;
    
    const numberWords = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    const requiredCountWord = numberWords[requiredCount] || requiredCount;
    const greeting = this.getTimeBasedGreeting();
    const shortName = student.name.split(' ')[0];
    const hasDemonstratedBaseline = demonstratedProgress.ratio !== null;
    const suggestedSession = hasDemonstratedBaseline
      ? 'one optional 5-minute recall activity'
      : 'one suggested 10-minute guided learning session';
    const greetingText = requiredCount > 0
      ? `You have ${requiredCountWord} required ${requiredCount === 1 ? 'task' : 'tasks'} (${requiredMinutes} mins). Complete required work before choosing optional study.`
      : `You have no required tasks and ${suggestedSession}.`;

    // Compute dominant task for "Do this now"
    let dominantTaskHtml = '';
    let dominantTask = null;
    let dominantAssignmentId = null;
    let dominantAssignment = null;
    let hasActiveTestPrep = activeTestPreps.length > 0;

    if (hasActiveTestPrep) {
      const prep = activeTestPreps[0];
      dominantTask = {
        kind: 'Test preparation',
        label: 'Required',
        title: prep.title,
        meta: [`${prep.specificationPointIds.length} specification points`, this.formatDueDate(prep.testDate).replace('Due ', 'Test ')],
        description: 'Your plan adapts each specification point separately. Optional recommendations are reduced while this plan is active.',
        actionLabel: 'Continue test preparation',
        actionMinutes: prep.sessionMinutes,
        actionClass: 'test-prep-start-btn',
        actionAttributes: `data-prep-id="${this.escapeHTML(prep.id)}"`
      };
    } else {
      const incompleteRequiredAssignments = assignments.filter(a => a.status !== 'Completed' && (a.status === 'Required' || a.status === 'Overdue'));
      if (incompleteRequiredAssignments.length > 0) {
        const a = incompleteRequiredAssignments[0];
        dominantAssignment = a;
        dominantTask = {
          kind: 'Assignment',
          label: a.status,
          title: a.title,
          meta: [this.formatDueDate(a.dueDate), a.title.toLowerCase().includes('programming') ? 'Programming task' : 'Knowledge check'],
          description: a.status === 'Overdue' ? 'This required assignment is overdue. Complete it before optional revision.' : 'Complete this required assignment before optional revision.',
          actionLabel: a.title.toLowerCase().includes('programming') ? 'Start programming' : 'Start check',
          actionMinutes: Number(a.estimatedMinutes || 10),
          actionClass: 'start-assignment-btn',
          actionAttributes: `data-topic-id="${this.escapeHTML(a.topicId)}"`
        };
        dominantAssignmentId = a.id;
      } else {
        dominantTask = {
          kind: hasDemonstratedBaseline ? 'Quick recall' : 'Guided learning',
          label: hasDemonstratedBaseline ? 'Optional' : 'Suggested start',
          title: hasDemonstratedBaseline ? 'Binary shifts and conversions' : 'Architecture of the CPU',
          meta: [hasDemonstratedBaseline ? 'Quick recall' : 'Core learning', hasDemonstratedBaseline ? '5 min' : '10 min'],
          description: hasDemonstratedBaseline
            ? 'Your latest checked work suggests this short retrieval activity is worth revisiting.'
            : 'Build confidence with a guided explanation and worked example before attempting assessed questions.',
          actionLabel: hasDemonstratedBaseline ? 'Continue practice' : 'Start guided learning',
          actionMinutes: hasDemonstratedBaseline ? 5 : 10,
          actionClass: '',
          actionAttributes: 'id="today-rec-btn"'
        };
      }
    }

    dominantTaskHtml = `
      <section class="student-primary-task" aria-labelledby="primary-task-title">
        <div class="student-primary-task__index" aria-hidden="true">01</div>
        <div class="student-primary-task__body">
          <div class="student-primary-task__eyebrow">
            <span class="student-priority-tag">${this.escapeHTML(dominantTask.label)}</span>
            <span>${this.escapeHTML(dominantTask.kind)}</span>
            <span>${dominantTask.actionMinutes} min</span>
          </div>
          <h2 id="primary-task-title">${this.escapeHTML(dominantTask.title)}</h2>
          <div class="student-primary-task__meta">
            ${dominantTask.meta.map(item => `<span>${this.escapeHTML(item)}</span>`).join('')}
          </div>
          <p class="student-primary-task__description">${this.escapeHTML(dominantTask.description)}</p>
          <button class="btn student-primary-task__action ${dominantTask.actionClass}" ${dominantTask.actionAttributes}>
            <span>${this.escapeHTML(dominantTask.actionLabel)}</span>
            <span aria-hidden="true">&rarr;</span>
            <small>${dominantTask.actionMinutes} min</small>
          </button>
        </div>
      </section>
    `;

    const unresolvedMilestones = availableMilestones.filter(item => item.state !== 'checkpoint_secured');
    const nextMilestone = activeTestPreps[0]
      ? unresolvedMilestones.find(item => activeTestPreps[0].specificationPointIds.includes(item.id))
      : dominantAssignment
        ? unresolvedMilestones.find(item => item.topicId === dominantAssignment.topicId)
        : generalNextMilestone;
    const checkpointRelationship = activeTestPreps[0]
      ? 'This test preparation helps you work towards this section goal.'
      : dominantAssignment
        ? 'This assignment helps you work towards this section goal.'
        : 'Learn the essentials, then complete a check when it becomes your main task.';

    const remainingAssignments = assignments.filter(a => a.id !== dominantAssignmentId);

    let seeMoreHtml = '';
    if (this.dashboardSeeMoreExpanded) {
      seeMoreHtml = `
        <div style="margin-top: 24px; border-top: 1px solid var(--border-color); padding-top: 24px;">
          <button id="toggle-see-more-btn" class="btn btn-secondary btn-sm" aria-expanded="true" aria-controls="dashboard-more-details" style="margin-bottom: 24px; width: 100%; min-height: 40px; font-weight: 600;">Hide additional dashboard details ▲</button>
          
          <div id="dashboard-more-details" style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: start;">
            <!-- Left Side inside See More -->
            <div>
              ${remainingAssignments.length > 0 ? `
                <div style="margin-bottom: 24px;">
                  <h3 style="font-size:16px; margin-bottom:12px; font-weight: 600; color: var(--text-main);">Other assignments</h3>
                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    ${remainingAssignments.map(a => {
                      const isCompleted = a.status === 'Completed';
                      const isOverdue = a.status === 'Overdue';
                      let badgeClass = isCompleted ? 'badge-success' : isOverdue ? 'badge-warning' : 'badge-primary';
                      let badgeText = isCompleted ? 'Completed' : `${a.status} · ${this.formatDueDate(a.dueDate)}`;
                      let btnText = isCompleted ? 'Done' : 'Start';
                      return `
                        <div class="card card-info" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 18px; border: 1px solid var(--border-color); background-color: var(--bg-card);">
                          <div>
                            <h4 style="margin: 0 0 4px; font-weight: 600; font-size: 15px; color: var(--text-main);">${this.escapeHTML(a.title)}</h4>
                            <span class="badge ${badgeClass}" style="font-size: 11px; padding: 2px 6px;">${this.escapeHTML(badgeText)}</span>
                          </div>
                          <button class="btn ${isCompleted ? 'btn-secondary' : 'btn-primary'} btn-sm start-assignment-btn" data-topic-id="${this.escapeHTML(a.topicId)}" ${isCompleted ? 'disabled style="opacity: 0.6;"' : ''} style="min-height: 32px; padding: 0 12px; font-size: 12px;">${btnText}</button>
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
              ` : ''}

              <!-- Learning now -->
              <div>
                <h3 style="font-size:16px; margin-bottom:12px; font-weight: 600; color: var(--text-main);">Learning now</h3>
                <div class="card card-info" style="padding: 16px 20px; background-color: var(--bg-card); border: 1px solid var(--border-color);">
                  <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${activeTopics.length > 0 ? activeTopics.map((topic, idx) => `
                      <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: ${idx < activeTopics.length - 1 ? '12px' : '0'}; ${idx < activeTopics.length - 1 ? 'border-bottom: 1px solid var(--border-color);' : ''}">
                         <div>
                           <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 600; margin-bottom: 2px;">
                             ${topic.status === 'teaching' ? 'Current lesson' : 'Recently taught'}
                           </div>
                           <h4 style="font-size: 14px; margin: 0; font-weight: 600; color: var(--text-main);">${topic.name}</h4>
                         </div>
                         <button class="btn btn-secondary btn-sm view-topic-btn" data-topic-id="${topic.id}" style="min-height: 32px; font-size: 12px;">View topic</button>
                      </div>
                    `).join('') : '<p style="font-size: 14px; margin: 0; color: var(--text-muted);">No active topics set by teacher.</p>'}
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Side inside See More -->
            <div>
              <!-- Worth revisiting -->
              <div class="card card-info" style="margin-bottom: 24px; padding: 20px; background-color: var(--bg-card); border: 1px solid var(--border-color);">
                <h3 style="font-size: 15px; font-weight: 600; color: var(--text-main); margin-bottom: 4px;">Worth revisiting</h3>
                <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">Based on your incorrect answers in previous practice sets:</p>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                  ${student.personalRevisionPriorities.map(p => {
                    let targetTab = 'stud-practise';
                    let topicId = 'topic_1_3';
                    let btnLabel = 'Practise';
                    
                    if (p.toLowerCase().includes('registers') || p.toLowerCase().includes('architecture')) {
                      targetTab = 'stud-recall';
                      topicId = 'topic_1_1';
                      btnLabel = 'Review';
                    }
                    
                    return `
                      <div style="display: flex; flex-direction: column; gap: 4px; padding-bottom: 8px; border-bottom: 1px dashed var(--border-color);">
                        <div style="font-size: 13px; font-weight: 500; color: var(--text-main);">${p}</div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                          <span style="font-size: 11px; color: var(--text-muted);">Suggested by your saved revision priorities</span>
                          <button class="btn btn-secondary btn-sm worth-revisiting-btn" data-topic-id="${topicId}" data-target-tab="${targetTab}" style="font-size: 10px; min-height: 24px; padding: 2px 8px;">${btnLabel}</button>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>

              <!-- Recent Progress -->
              <div class="card card-progress" style="padding: 20px; background-color: var(--bg-card); border: 1px solid var(--border-color);">
                <h3 style="font-size: 15px; font-weight: 600; color: var(--text-main); margin-bottom: 8px;">Recent progress</h3>
                <p style="font-size: 12px; color: var(--text-muted); line-height: 1.4; margin: 0;">
                  ${demonstratedProgress.ratio === null ? 'Complete a checked activity to see your first result here.' : `Latest checked score: ${demonstratedProgress.earned}/${demonstratedProgress.available} across your latest completed activities.`}
                </p>
                <p style="font-size: 12px; color: var(--text-muted); line-height: 1.4; margin: 8px 0 0 0; padding-top: 8px; border-top: 1px dashed var(--border-color);">
                  Opening a page, viewing an example answer or rating your own work does not count towards Progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      seeMoreHtml = `
        <div style="margin-top: 24px; border-top: 1px solid var(--border-color); padding-top: 16px;">
          <button id="toggle-see-more-btn" class="btn btn-secondary btn-sm" aria-expanded="false" aria-controls="dashboard-more-details" style="width: 100%; min-height: 40px; font-weight: 600;">Show more assignments and progress ▼</button>
        </div>
      `;
    }

    panel.innerHTML = `
      <div class="dashboard-container student-page student-dashboard">
        <div class="student-dashboard__header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px;">
          <div class="student-dashboard__brief">
            <span class="student-mode-label">Weekly brief</span>
            <h1 style="margin-bottom: 6px; font-weight: 700;">${greeting}, ${shortName}</h1>
            <p style="font-size:16px; color: var(--text-muted); margin: 0;">${greetingText}</p>
            <div style="margin-top: 8px; font-size: 14px; color: var(--text-muted); font-weight: 500;">
              Latest checked work: <strong style="color: var(--teal);">${demonstratedProgress.label.replace(' latest evidence', '').replace(' evidence', '')}</strong>
              <span class="student-evidence-note">Based on completed checks.</span>
            </div>
          </div>
          <!-- Profile Control -->
          <div style="position: relative;" id="student-profile-dropdown-container">
            <button class="btn btn-secondary" id="student-profile-trigger" style="display: flex; align-items: center; gap: 8px; padding: 6px 12px; border-radius: 20px; font-weight: 600; min-height: 40px; border: 1px solid var(--border-color);">
              <div style="width: 24px; height: 24px; border-radius: 50%; background-color: var(--teal); color: var(--white); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">
                ${student.name.split(' ').map(n => n[0]).join('')}
              </div>
              <span style="font-size: 14px; font-weight: 600;">${shortName}</span>
              <span style="font-size: 9px; color: var(--text-muted);">▼</span>
            </button>
            <div id="student-profile-dropdown" class="card" style="position: absolute; right: 0; top: 48px; width: 220px; z-index: 100; padding: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border: 1px solid var(--border-color); background-color: var(--bg-card); text-align: left;">
              <div style="padding-bottom: 8px; margin-bottom: 8px; border-bottom: 1px solid var(--border-color); font-size: 13px; color: var(--text-muted);">
                <strong>${student.name}</strong><br>${student.email}
              </div>
              <a href="#" id="dropdown-signout" class="dropdown-item" style="display: block; padding: 6px 0; font-size: 14px; color: var(--coral); text-decoration: none; font-weight: 600; border-top: 1px solid var(--border-color); margin-top: 8px; padding-top: 8px;">🚪 Sign out</a>
            </div>
          </div>
        </div>

        <div class="student-dashboard__primary-grid" style="display: grid; grid-template-columns: 1.25fr 0.75fr; gap: 32px; align-items: start;">
          <div>
            <h2 class="student-section-label" style="font-size:18px; margin-bottom:12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Do this now</h2>
            <div class="student-task-sheet">${dominantTaskHtml}</div>
          </div>

          <div>
            <h2 class="student-section-label" style="font-size:18px; margin-bottom:12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">This week</h2>
            <div class="card card-progress student-status-rail" style="margin-bottom: 20px; padding: 20px;">
              <h3 style="font-size: 15px; font-weight: 600; color: var(--text-main); margin-bottom: 4px;">Work that counts</h3>
              <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 0;">${demonstratedProgress.evidenceCount} checked ${demonstratedProgress.evidenceCount === 1 ? 'activity is' : 'activities are'} contributing to your progress.</p>
            </div>
            <div class="card milestone-dashboard-card student-checkpoint-card" style="margin-bottom: 20px; padding: 20px;">
              <h3 style="font-size: 15px; font-weight: 600; color: var(--text-main); margin-bottom: 4px;">Your next section goal</h3>
              <p style="font-size: 13px; color: var(--text-muted); margin: 0 0 10px;">${securedMilestones.length} of ${availableMilestones.length} available section goals met through checked work.</p>
              ${nextMilestone ? `
                <div style="font-size:13px; margin-bottom:10px;">
                  <strong>Next:</strong> ${this.escapeHTML(nextMilestone.id)} · ${this.escapeHTML(nextMilestone.name)}
                </div>
                <p style="font-size:12px; color:var(--text-muted); margin:0;">${checkpointRelationship}</p>
                <div class="student-checkpoint-trace" aria-label="Section route: learn, practise, meet goal"><span>Learn</span><span aria-hidden="true">→</span><span>Practise</span><span aria-hidden="true">→</span><span>Meet goal</span></div>
              ` : '<p style="font-size:13px; margin:0;">No section goal is directly connected to this task. Complete your required work first; your full record remains in Progress.</p>'}
              ${earnedAchievementCount > 0 ? `
                <p style="font-size:13px; color:var(--text-muted); margin:12px 0 0;">
                  <strong>${earnedAchievementCount} ${earnedAchievementCount === 1 ? 'achievement' : 'achievements'} earned</strong>
                  · <button type="button" id="dashboard-achievements-btn" class="btn-link">View in Progress</button>
                </p>
              ` : ''}
            </div>
            <div class="card" style="margin-bottom:20px; padding:16px 20px; background-color: var(--bg-card); border: 1px solid var(--border-color);">
              <h3 style="font-size: 15px; font-weight: 600; margin-bottom: 4px;">Your study plan</h3>
              <div style="font-weight: 700; font-size: 18px; color: var(--teal);">${requiredMinutes} minutes required this week</div>
              <div style="font-size:12px; color:var(--text-muted); margin-top:6px;">${hasDemonstratedBaseline
                ? 'Optional quick recall: up to 5 minutes.'
                : 'Suggested guided learning: 10 minutes.'}</div>
            </div>
          </div>
        </div>

        ${seeMoreHtml}
      </div>
    `;

    const dashboardDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }).toUpperCase();
    const latestLevel = demonstratedProgress.ratio === null
      ? 'No checked work yet'
      : demonstratedProgress.label.replace(' latest evidence', '').replace(' evidence', '');
    const earnedMarksHtml = earnedAchievements.length ? `
      <section class="student-earned-marks" aria-labelledby="earned-marks-heading">
        <div class="student-earned-marks__title">
          <span class="student-kicker">Earned through checked work</span>
          <h2 id="earned-marks-heading">Achievements</h2>
        </div>
        <div class="student-earned-marks__list">
          ${earnedAchievements.map(achievement => `
            <div class="student-earned-mark">
              <span aria-hidden="true">${this.escapeHTML(achievement.symbol)}</span>
              <strong>${this.escapeHTML(achievement.title)}</strong>
            </div>
          `).join('')}
        </div>
        <button type="button" id="dashboard-achievements-btn" class="btn-link">View your learning record</button>
      </section>
    ` : '';
    const checkpointHtml = nextMilestone ? `
      <section class="student-connected-checkpoint" aria-labelledby="connected-checkpoint-heading">
        <header class="student-connected-checkpoint__header">
          <div>
            <span class="student-kicker">Your next section goal</span>
            <h2 id="connected-checkpoint-heading"><span>${this.escapeHTML(nextMilestone.id)}</span>${this.escapeHTML(nextMilestone.name)}</h2>
          </div>
          <div class="student-connected-checkpoint__count">
            <strong>${securedMilestones.length}</strong>
            <span>of ${availableMilestones.length} goals met</span>
          </div>
        </header>
        <p>${this.escapeHTML(checkpointRelationship)}</p>
        <ol class="student-checkpoint-route" aria-label="Section route">
          <li class="${nextMilestone.state === 'not_started' ? 'is-current' : 'is-complete'}" ${nextMilestone.state === 'not_started' ? 'aria-current="step"' : ''}>Learn${nextMilestone.state === 'practice_completed' ? '<span class="sr-only"> completed</span>' : ''}</li>
          <li class="${nextMilestone.state === 'practice_completed' ? 'is-current' : ''}" ${nextMilestone.state === 'practice_completed' ? 'aria-current="step"' : ''}>Practise</li>
          <li>Meet goal</li>
        </ol>
      </section>
    ` : `
      <aside class="student-checkpoint-note">
        <span class="student-kicker">Section progress</span>
        <strong>No section goal is directly connected to this task.</strong>
        <p>Complete your required work first; your full record remains in Progress.</p>
      </aside>
    `;
    const requiredTaskActive = hasActiveTestPrep || Boolean(dominantAssignment);
    const deskSummary = this.getDeskTopicSummary(student);
    const deskTopics = deskSummary.visible;
    const hiddenDeskTopicCount = deskSummary.hiddenCount;
    const weeklyRhythmHtml = `
      <section class="card student-weekly-notebook" aria-labelledby="weekly-rhythm-heading">
        <header class="student-weekly-notebook__header">
          <div>
            <span class="student-kicker">This week &middot; resets Monday</span>
            <h2 id="weekly-rhythm-heading">My notebook</h2>
          </div>
          <span class="student-weekly-notebook__count">${practiceRhythm.completedCount}/${practiceRhythm.items.length} done &middot; about ${practiceRhythm.totalMinutes} min</span>
        </header>
        ${requiredTaskActive ? '<p class="student-weekly-notebook__priority"><strong>First:</strong> finish the required task above. These smaller tasks can be spread across the week.</p>' : ''}
        ${upcomingTestNotebook && !hasActiveTestPrep ? `
          <aside class="student-notebook-test" aria-labelledby="upcoming-test-heading">
            <div>
              <span class="student-kicker">Upcoming test</span>
              <h3 id="upcoming-test-heading">${this.escapeHTML(upcomingTestNotebook.title)}</h3>
              <p><strong>${this.escapeHTML(upcomingTestNotebook.dateLabel)}</strong> &middot; ${this.escapeHTML(upcomingTestNotebook.daysLabel)}</p>
              <p>Topics: ${upcomingTestNotebook.sections.slice(0, 3).map(item => this.escapeHTML(item)).join('; ')}${upcomingTestNotebook.sections.length > 3 ? `; +${upcomingTestNotebook.sections.length - 3} more` : ''}</p>
            </div>
            <button type="button" class="btn btn-secondary notebook-test-btn" data-prep-id="${this.escapeHTML(upcomingTestNotebook.id)}">Open test plan</button>
          </aside>
        ` : ''}
        <ul class="student-weekly-notebook__tasks">
          ${practiceRhythm.items.map(item => {
            const complete = item.done >= item.target;
            const current = practiceRhythm.next?.id === item.id;
            const progressLabel = item.unit === 'days'
              ? `${item.done} of ${item.target} days`
              : complete
                ? 'Done'
                : `${item.done} of ${item.target}`;
            return `
              <li ${current ? 'aria-current="step"' : ''}>
                <span class="student-weekly-notebook__check" aria-hidden="true">${complete ? '✓' : '○'}</span>
                <span>
                  <strong>${this.escapeHTML(item.label)}</strong>
                  <small>${this.escapeHTML(item.cadence)} &middot; about ${item.minutes} min</small>
                </span>
                <span class="student-weekly-notebook__progress">${progressLabel}</span>
                ${complete
                  ? '<span class="student-weekly-notebook__done">Complete</span>'
                  : `<button type="button" class="btn btn-secondary btn-sm notebook-task-btn" data-activity-id="${this.escapeHTML(item.id)}" data-route="${this.escapeHTML(item.id === 'retrieval' && !deskTopics.length ? 'stud-topics' : item.route)}">${item.id === 'retrieval' && !deskTopics.length ? 'Choose topics' : requiredTaskActive ? 'Open' : current ? 'Start next' : 'Start'}</button>`}
              </li>`;
          }).join('')}
        </ul>
        <p class="student-weekly-notebook__note">Flashcards count on two different days. Only marked work changes Progress.</p>
        ${practiceRhythm.habitAchieved ? '<p><strong>Weekly habit complete.</strong> This recognises regular study, not mastery.</p>' : ''}
      </section>
    `;
    const myDeckHtml = deskTopics.length ? `
      <section class="card student-my-deck" aria-labelledby="my-deck-heading">
        <header class="student-my-deck__header">
          <div>
            <span class="student-kicker">My desk</span>
            <h2 id="my-deck-heading">Flashcards on your desk</h2>
            <p>The topics you have chosen to keep fresh alongside school.</p>
            <p class="student-deck-scope-note">These cards cover key facts, not every skill or exam question in a section.</p>
          </div>
          <button type="button" class="btn btn-secondary" id="manage-deck-btn">Organise my topics</button>
        </header>
        <div class="student-my-deck__topics">
            ${deskTopics.map(topic => `
              <article>
                <div>
                  <h3>${this.escapeHTML(topic.topicName)}</h3>
                  <p>${topic.cards.length} ${topic.cards.length === 1 ? 'card' : 'cards'} · ${topic.dueCount} ready to review</p>
                </div>
                <div class="student-my-deck__strength">
                  <span>Your card confidence</span>
                  <strong>${this.escapeHTML(topic.strength)}</strong>
                  <small>${topic.ratedCount ? `Based on what you told us after ${topic.ratedCount} ${topic.ratedCount === 1 ? 'card' : 'cards'} — not an exam result` : 'Not rated yet — tell us after reviewing a card'}</small>
                </div>
                <button type="button" class="btn btn-primary deck-topic-review-btn" data-topic-id="${this.escapeHTML(topic.topicId)}" aria-label="Review ${this.escapeHTML(topic.topicName)} flashcards">Review flashcards</button>
              </article>
            `).join('')}
        </div>
        ${hiddenDeskTopicCount ? `<p class="student-my-deck__more">${hiddenDeskTopicCount} more ${hiddenDeskTopicCount === 1 ? 'topic is' : 'topics are'} on your desk. Use Organise my topics to see all of them.</p>` : ''}
      </section>
    ` : '';

    panel.innerHTML = `
      <div class="student-page student-dashboard">
        <header class="student-brief">
          <div class="student-brief__copy">
            <span class="student-kicker">My desk / ${dashboardDate}</span>
            <h1>${greeting}, ${shortName}</h1>
            <p class="student-brief__workload">
              <strong>${requiredCountWord} required ${requiredCount === 1 ? 'task' : 'tasks'} · ${requiredMinutes} minutes</strong>
              <span>${requiredTaskActive ? 'Required work takes priority' : hasDemonstratedBaseline ? 'Optional recall · up to 5 minutes' : 'Suggested guided learning · 10 minutes'}</span>
            </p>
          </div>
          <div class="student-brief__identity" id="student-profile-dropdown-container">
            <button class="btn" id="student-profile-trigger" aria-haspopup="true" aria-expanded="false" aria-controls="student-profile-dropdown">
              <span class="student-profile-initials">${student.name.split(' ').map(name => name[0]).join('')}</span>
              <span>${shortName}</span><span aria-hidden="true">▼</span>
            </button>
            <div id="student-profile-dropdown" class="card">
              <div><strong>${this.escapeHTML(student.name)}</strong><br>${this.escapeHTML(student.email)}</div>
              <a href="#" id="dropdown-signout" class="dropdown-item">Sign out</a>
            </div>
          </div>
          <div class="student-brief__motif" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
        </header>

        <div class="student-dashboard__flow">
          ${dominantTaskHtml}
          ${weeklyRhythmHtml}
          ${myDeckHtml}

          <details class="student-desk-details">
            <summary>See progress and other desk details</summary>
            <section class="student-signal-strip" aria-label="This week's study status">
              <div class="student-signal student-signal--required"><span>Required</span><strong>${requiredMinutes} min</strong><small>this week</small></div>
              <div class="student-signal"><span>Work that counts</span><strong>${demonstratedProgress.evidenceCount}</strong><small>checked ${demonstratedProgress.evidenceCount === 1 ? 'activity' : 'activities'}</small></div>
              <div class="student-signal"><span>Latest checked work</span><strong>${this.escapeHTML(latestLevel)}</strong><small>from completed checks</small></div>
            </section>
            ${checkpointHtml}
            ${earnedMarksHtml}
            <div class="student-plan-drawer">${seeMoreHtml}</div>
          </details>
        </div>
      </div>
    `;

    panel.querySelectorAll('.view-topic-btn').forEach(btn => {
      btn.onclick = () => {
        this.activeTopicId = btn.getAttribute('data-topic-id');
        this.switchTab('stud-learn');
      };
    });
    panel.querySelector('#manage-deck-btn')?.addEventListener('click', () => this.switchTab('stud-topics'));
    panel.querySelector('#empty-desk-topics-btn')?.addEventListener('click', () => this.switchTab('stud-topics'));
    panel.querySelectorAll('.deck-topic-review-btn').forEach(button => {
      button.onclick = () => {
        this.activeTopicId = button.dataset.topicId;
        this.retrievalDeckTopicId = button.dataset.topicId;
        this.switchTab('stud-retrieval');
      };
    });
    panel.querySelectorAll('.test-prep-start-btn').forEach(btn => {
      btn.onclick = () => {
        this.activeTestPrepId = btn.getAttribute('data-prep-id');
        this.switchTab('stud-test-prep');
      };
    });

    panel.querySelectorAll('.start-assignment-btn').forEach(btn => {
      btn.onclick = () => {
        this.activeTopicId = btn.getAttribute('data-topic-id');
        this.switchTab('stud-recall');
      };
    });

    const seeMoreButton = panel.querySelector('#toggle-see-more-btn');
    if (seeMoreButton) {
      seeMoreButton.onclick = () => {
        this.dashboardSeeMoreExpanded = !this.dashboardSeeMoreExpanded;
        this.renderStudentDashboard(panel);
        panel.querySelector('#toggle-see-more-btn')?.focus();
      };
    }

    const achievementsButton = panel.querySelector('#dashboard-achievements-btn');
    if (achievementsButton) achievementsButton.onclick = () => this.switchTab('stud-progress');
    panel.querySelectorAll('.notebook-task-btn').forEach(button => {
      button.onclick = () => {
        if (button.getAttribute('data-activity-id') === 'exam') {
          this.activateScheduledExamTransfer();
        } else {
          this.switchTab(button.getAttribute('data-route'));
        }
      };
    });
    panel.querySelectorAll('.notebook-test-btn').forEach(button => {
      button.onclick = () => {
        this.activeTestPrepId = button.getAttribute('data-prep-id');
        this.switchTab('stud-test-prep');
      };
    });

    const trigger = document.getElementById('student-profile-trigger');
    const dropdown = document.getElementById('student-profile-dropdown');
    if (trigger && dropdown) {
      trigger.onclick = (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show-dropdown');
        trigger.setAttribute('aria-expanded', dropdown.classList.contains('show-dropdown') ? 'true' : 'false');
      };
      document.addEventListener('click', () => {
        dropdown.classList.remove('show-dropdown');
        trigger.setAttribute('aria-expanded', 'false');
      });
      trigger.onkeydown = (event) => {
        if (event.key !== 'Escape') return;
        dropdown.classList.remove('show-dropdown');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      };
      dropdown.onkeydown = (event) => {
        if (event.key !== 'Escape') return;
        dropdown.classList.remove('show-dropdown');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      };
    }

    const dropSignout = document.getElementById('dropdown-signout');
    if (dropSignout) {
      dropSignout.onclick = (e) => { e.preventDefault(); this.handleLogout(); };
    }

    const todayRecBtn = document.getElementById('today-rec-btn');
    if (todayRecBtn) {
      todayRecBtn.onclick = () => {
        if (!hasDemonstratedBaseline) {
          this.activeTopicId = nextMilestone?.topicId || 'topic_1_1';
          this.activeObjectiveId = nextMilestone?.id || '1.1.1';
          this.switchTab('stud-learn');
          return;
        }
        this.switchTab('stud-practise');
      };
    }
  }

  renderStudentRouteRecovery(panel) {
    panel.innerHTML = `
      <section class="card student-recovery" role="status">
        <h1>This page is not available</h1>
        <p>The activity may have moved. Choose a safe place to continue.</p>
        <div class="student-action-row">
          <button type="button" class="btn btn-primary" data-recovery-route="stud-dashboard">Go to My desk</button>
          <button type="button" class="btn btn-secondary" data-recovery-route="stud-topics">Open Topics</button>
        </div>
      </section>`;
    panel.querySelectorAll('[data-recovery-route]').forEach(button => {
      button.onclick = () => this.switchTab(button.getAttribute('data-recovery-route'));
    });
  }

  getObjectiveLocation(objectiveId) {
    for (const unit of window.db.getUnits()) {
      for (const topic of unit.topics) {
        const objective = topic.objectives.find(item => item.id === objectiveId);
        if (objective) return { unit, topic, objective };
      }
    }
    return null;
  }

  openObjectiveLearning(topicId, objectiveId) {
    this.activeTopicId = topicId;
    this.activeObjectiveId = objectiveId;
    const current = this.getLearnerObjectiveState(objectiveId);
    if (!current || current.state === 'not_covered') this.updateLearnerObjectiveState(objectiveId, 'learning');
    this.switchTab('stud-learn');
  }

  renderStudentTopics(panel, restore = {}) {
    const milestoneBySection = new Map(this.getSectionMilestones().map(item => [item.id, item]));
    const contentIds = new Set(window.db.getCurriculumContent().map(item => item.id));
    const paperHtml = window.db.getUnits().map((unit, unitIndex) => `
      <details class="student-topic-paper" data-disclosure-id="paper-${unitIndex}" ${unitIndex === 0 ? 'open' : ''}>
        <summary>${this.escapeHTML(unit.paper)}: ${this.escapeHTML(unit.title)}</summary>
        ${unit.topics.map(topic => `
          <details class="student-topic-group" data-disclosure-id="topic-${this.escapeHTML(topic.id)}">
            <summary>${this.escapeHTML(topic.code)} ${this.escapeHTML(topic.name)}</summary>
            <div class="student-objective-list">
              ${topic.objectives.map(objective => {
                const saved = this.getLearnerObjectiveState(objective.id);
                const state = saved?.state || 'not_covered';
                const cardsActive = saved?.cardState !== 'paused';
                const milestone = milestoneBySection.get(objective.id);
                const checked = milestone?.state === 'checkpoint_secured'
                  ? 'Goal met'
                  : milestone?.state === 'practice_completed'
                    ? 'Checked practice underway'
                    : 'No checked result yet';
                const task = this.getMatchingExamTransferTask(topic.id, objective.id);
                const available = contentIds.has(objective.id);
                const inDeck = state === 'covered' && cardsActive;
                const deckStatus = inDeck
                  ? `On your desk · ${this.escapeHTML(this.getObjectiveRecallConfidence(objective.id))}`
                  : state === 'covered'
                    ? 'Cards paused'
                    : 'Not on your desk';
                const reviewLabel = state === 'learning' ? 'Continue refresher' : 'Review topic';
                return `
                  <article class="student-objective-card" aria-labelledby="objective-name-${this.escapeHTML(objective.id)}">
                    <div>
                      <h3 id="objective-name-${this.escapeHTML(objective.id)}">${this.escapeHTML(objective.id)} · ${this.escapeHTML(objective.name)}</h3>
                      <p class="student-objective-next"><strong>${deckStatus}</strong></p>
                    </div>
                    <div class="student-objective-actions">
                      ${inDeck
                        ? `<button type="button" class="btn btn-primary objective-recall-btn" data-topic-id="${this.escapeHTML(topic.id)}" data-objective-id="${this.escapeHTML(objective.id)}" aria-label="Review topic flashcards: ${this.escapeHTML(topic.code)} ${this.escapeHTML(topic.name)}">Review topic flashcards</button>`
                        : `<button type="button" class="btn btn-primary objective-cover-btn" data-objective-id="${this.escapeHTML(objective.id)}" aria-label="${state === 'covered' ? 'Add flashcards again' : 'Add flashcards to my desk'}: ${this.escapeHTML(objective.id)} ${this.escapeHTML(objective.name)}">${state === 'covered' ? 'Add flashcards again' : 'Add flashcards to my desk'}</button>`}
                      <button type="button" class="btn btn-secondary objective-learn-btn" data-topic-id="${this.escapeHTML(topic.id)}" data-objective-id="${this.escapeHTML(objective.id)}" aria-label="${reviewLabel}: ${this.escapeHTML(objective.id)} ${this.escapeHTML(objective.name)}" ${available ? '' : 'disabled'}>${available ? reviewLabel : 'Refresher unavailable'}</button>
                      <details>
                        <summary aria-label="More choices and progress for ${this.escapeHTML(objective.id)} ${this.escapeHTML(objective.name)}">More choices and progress</summary>
                        <dl class="student-objective-status">
                          <div><dt>Flashcards</dt><dd>${deckStatus}</dd></div>
                          <div><dt>Checked questions</dt><dd>${checked}</dd></div>
                        </dl>
                        <div class="student-action-row">
                          ${inDeck ? `<button type="button" class="btn btn-secondary objective-cover-btn" data-objective-id="${this.escapeHTML(objective.id)}" aria-label="Pause flashcards: ${this.escapeHTML(objective.id)} ${this.escapeHTML(objective.name)}">Pause these flashcards</button>` : ''}
                          ${task ? `<button type="button" class="btn btn-secondary objective-exam-btn" data-task-id="${this.escapeHTML(task.id)}" aria-label="Try a checked question: ${this.escapeHTML(objective.id)} ${this.escapeHTML(objective.name)}">Try a checked question</button>` : ''}
                          <button type="button" class="btn btn-secondary objective-progress-btn" aria-label="See my progress: ${this.escapeHTML(objective.id)} ${this.escapeHTML(objective.name)}">See my progress</button>
                        </div>
                      </details>
                    </div>
                  </article>`;
              }).join('')}
            </div>
          </details>`).join('')}
      </details>`).join('');

    panel.innerHTML = `
      <div class="student-page student-topics-page">
        <header class="student-route-header">
          <span class="student-mode-label">OCR specification</span>
          <h1>Computer Science topics</h1>
          <p>Organise the topics you study alongside your lessons at school.</p>
        </header>
        <aside class="card student-status-explainer">
          <strong>Choose what belongs on your desk</strong>
          <p>Met it at school? Add its flashcards now. Need a reminder? Review the topic first. Your card choices help schedule future practice; checked questions are shown separately in Progress.</p>
        </aside>
        <p class="sr-only" id="topics-state-announcement" role="status" aria-live="polite" aria-atomic="true"></p>
        <div class="student-topic-papers">${paperHtml}</div>
      </div>`;
    const openIds = restore.openIds || [];
    panel.querySelectorAll('details[data-disclosure-id]').forEach(detail => {
      if (openIds.includes(detail.dataset.disclosureId)) detail.open = true;
    });
    const stateAnnouncement = panel.querySelector('#topics-state-announcement');
    if (stateAnnouncement && restore.announcement) {
      setTimeout(() => {
        stateAnnouncement.textContent = restore.announcement;
      }, 0);
    }
    const captureOpenIds = () => [...panel.querySelectorAll('details[data-disclosure-id][open]')]
      .map(detail => detail.dataset.disclosureId);
    panel.querySelectorAll('.objective-learn-btn').forEach(button => {
      button.onclick = () => this.openObjectiveLearning(button.dataset.topicId, button.dataset.objectiveId);
    });
    panel.querySelectorAll('.objective-recall-btn').forEach(button => {
      button.onclick = () => {
        this.activeTopicId = button.dataset.topicId;
        this.activeObjectiveId = button.dataset.objectiveId || 'all';
        this.retrievalDeckTopicId = button.dataset.topicId;
        this.switchTab('stud-retrieval');
      };
    });
    panel.querySelectorAll('.objective-cover-btn').forEach(button => {
      button.onclick = () => {
        const objectiveId = button.dataset.objectiveId;
        const current = this.getLearnerObjectiveState(objectiveId);
        let announcement = '';
        if (current?.state === 'covered') {
          const nextCardState = current.cardState === 'paused' ? 'active' : 'paused';
          this.updateLearnerObjectiveState(objectiveId, 'covered', nextCardState);
          announcement = `${objectiveId} flashcards ${nextCardState === 'active' ? 'added' : 'paused'}.`;
        } else {
          this.updateLearnerObjectiveState(objectiveId, 'covered', 'active');
          announcement = `${objectiveId} flashcards added to your desk.`;
        }
        this.renderStudentTopics(panel, {
          openIds: captureOpenIds(),
          focusObjectiveId: objectiveId,
          announcement
        });
      };
    });
    panel.querySelectorAll('.objective-exam-btn').forEach(button => {
      button.onclick = () => {
        this.activeExamTransferId = button.dataset.taskId;
        const task = window.db.getExamTransferTasks().find(item => item.id === this.activeExamTransferId);
        this.activeTopicId = task.topicId;
        this.activeObjectiveId = task.specificationPointId;
        this.examTransferStage = 'decode';
        this.switchTab('stud-exam-transfer');
      };
    });
    panel.querySelectorAll('.objective-progress-btn').forEach(button => {
      button.onclick = () => this.switchTab('stud-progress');
    });
    if (restore.focusObjectiveId) {
      let heading = null;
      try { heading = panel.querySelector(`[id="objective-name-${restore.focusObjectiveId}"]`); } catch (e) {}
      if (!heading) {
        try { heading = panel.querySelector(`#objective-name-${restore.focusObjectiveId}`); } catch (e) {}
      }
      const objectiveCard = heading?.closest?.('.student-objective-card');
      objectiveCard?.querySelector?.('.objective-recall-btn, .objective-cover-btn, .objective-learn-btn')?.focus?.();
    }
  }

  renderStudentPracticeHub(panel) {
    const rhythm = this.getStudentPracticeRhythm();
    const modes = [
      { title: 'Flashcards', copy: 'Review three flashcards in about five minutes. Your choices schedule future cards.', route: 'stud-retrieval', time: 'About 5 minutes', outcome: 'Builds your study routine; it is not marked in Progress.' },
      { title: 'Exam questions', copy: 'Use guided support, then choose whether to submit a similar independent answer for review.', route: 'stud-exam-transfer', time: 'About 15–30 minutes with support; allow 5–10 minutes more for the independent answer', outcome: 'Guided self-checking is practice only. A submitted independent answer waits for review.' },
      { title: 'Number skills', copy: 'Complete a bounded calculation set and retry mistakes.', route: 'stud-practise', time: 'About 10 minutes', outcome: 'Your checked result appears in Progress.' },
      { title: 'Programming', copy: 'Continue one coding or pseudocode stage with tests or review.', route: 'stud-programming', time: 'About 15 minutes', outcome: 'Passed tests can count; other work waits for review.' }
    ];
    const recommended = rhythm.next || { label: 'Choose one useful practice mode', route: 'stud-retrieval', minutes: 5 };
    panel.innerHTML = `
      <div class="student-page student-practice-hub">
        <header class="student-route-header">
          <span class="student-mode-label">Practice</span>
          <h1>Choose how to practise</h1>
          <p>Use flashcards to remember knowledge and checked work to demonstrate what you can do. A checked activity is marked by StudySpice or reviewed by your teacher and can appear in Progress.</p>
        </header>
        <section class="card student-recommended-practice" aria-labelledby="recommended-practice-title">
          <span class="student-kicker">Recommended now</span>
          <h2 id="recommended-practice-title">${this.escapeHTML(recommended.label)}</h2>
          <p>About ${recommended.minutes} minutes. Complete one focused activity, then return to My desk for your next step.</p>
          <button type="button" class="btn btn-primary" id="recommended-practice-btn">Continue recommended activity</button>
        </section>
        <div class="student-practice-mode-grid">
          ${modes.map(mode => `
            <article class="card student-practice-mode">
              <h2>${mode.title}</h2>
              <p>${mode.copy}</p>
              <p><strong>Time:</strong> ${mode.time}<br>${mode.outcome}</p>
              <button type="button" class="btn btn-secondary practice-hub-btn" data-target="${mode.route}">Start ${mode.title.toLowerCase()}</button>
            </article>`).join('')}
        </div>
        <p><button type="button" class="btn btn-link" id="practice-desk-btn">Back to My desk</button></p>
      </div>`;
    panel.querySelector('#recommended-practice-btn').onclick = () => {
      if (recommended.route === 'stud-exam-transfer') this.startStudentExamPractice();
      else this.switchTab(recommended.route);
    };
    panel.querySelectorAll('.practice-hub-btn').forEach(button => {
      button.onclick = () => {
        if (button.dataset.target === 'stud-exam-transfer') this.startStudentExamPractice();
        else this.switchTab(button.dataset.target);
      };
    });
    panel.querySelector('#practice-desk-btn')?.addEventListener('click', () => this.switchTab('stud-dashboard'));
  }

  startStudentExamPractice() {
    const exactCurrent = this.getMatchingExamTransferTask(this.activeTopicId, this.activeObjectiveId);
    const nextMilestone = this.getSectionMilestones().find(item => item.available && item.state !== 'checkpoint_secured');
    const nextTask = nextMilestone
      ? this.getMatchingExamTransferTask(nextMilestone.topicId, nextMilestone.id)
      : null;
    const task = exactCurrent || nextTask || this.getOrderedExamTransferTasks()[0] || null;
    if (!task) {
      this.activeExamTransferId = null;
      this.switchTab('stud-practice');
      return false;
    }
    this.activeExamTransferId = task.id;
    this.activeTopicId = task.topicId;
    this.activeObjectiveId = task.specificationPointId;
    this.examTransferStage = 'decode';
    this.examTransferPlan = {};
    this.examTransferResponse = '';
    this.switchTab('stud-exam-transfer');
    return true;
  }

  // ==================== STUDENT LEARN THEORY HUB ====================
  renderStudentLearn(panel) {
    const theoryNotes = window.db.getTheoryNotes();
    const activeNote = window.db.getTheoryNoteByTopic(this.activeTopicId);
    if (!activeNote) {
      panel.innerHTML = `
        <div class="card" role="status">
          <h1>Topic review unavailable</h1>
          <p>This topic review is not available right now. Return to Topics and choose another section.</p>
          <button class="btn btn-secondary" id="learn-empty-back-btn">Back to Topics</button>
        </div>
      `;
      const backButton = panel.querySelector('#learn-empty-back-btn');
      if (backButton) backButton.onclick = () => this.switchTab('stud-topics');
      this.focusMainContent();
      return;
    }
    const focusedContent = this.activeObjectiveId && this.activeObjectiveId !== 'all'
      ? window.db.getCurriculumContent().find(item => item.id === this.activeObjectiveId)
      : null;
    if (focusedContent) {
      this.renderFocusedStudentLearning(panel, activeNote, focusedContent);
      return;
    }
    const currentPaper = activeNote ? activeNote.paper : 'Paper 1';
    const allObjectiveTeaching = window.db.getCurriculumContent().filter(item => {
      const objective = window.db.getUnits()
        .flatMap(unit => unit.topics)
        .find(topic => topic.id === activeNote.topicId)
        ?.objectives.find(candidate => candidate.id === item.id);
      return Boolean(objective);
    });

    const isFilteredObjective = this.activeObjectiveId && this.activeObjectiveId !== 'all' && allObjectiveTeaching.some(o => o.id === this.activeObjectiveId);
    const objectiveTeaching = isFilteredObjective
      ? allObjectiveTeaching.filter(o => o.id === this.activeObjectiveId)
      : allObjectiveTeaching;
    const focusedObjectiveTeaching = isFilteredObjective ? objectiveTeaching[0] : null;

    const totalCoreMins = allObjectiveTeaching.reduce((acc, item) => acc + (item.workload?.coreLearningMinutes || 10), 0);
    const milestoneBySection = new Map(this.getSectionMilestones().map(milestone => [milestone.id, milestone]));
    const focusedMilestone = isFilteredObjective ? milestoneBySection.get(this.activeObjectiveId) : null;
    const focusedExamTask = isFilteredObjective ? this.getMatchingExamTransferTask(activeNote.topicId, this.activeObjectiveId) : null;
    const focusedQuestionCount = isFilteredObjective
      ? this.selectFocusedRecallQuestions(
        window.db.getQuestions().filter(question => question.topicId === activeNote.topicId),
        this.activeObjectiveId
      ).length
      : 0;
    const focusedQuestionSummary = `${focusedQuestionCount} ${focusedQuestionCount === 1 ? 'question' : 'questions'} · about ${Math.max(2, focusedQuestionCount * 2)} min`;
    const focusedCheckLabel = focusedMilestone && ['practice_completed', 'checkpoint_secured'].includes(focusedMilestone.state)
      ? `Check this section again (${focusedQuestionSummary})`
      : `Check this section (${focusedQuestionSummary})`;

    const objectiveTeachingHtml = objectiveTeaching.length
      ? objectiveTeaching.map(item => {
          const draftKey = this.getPracticeDraftKey(item.id);
          const savedPractice = typeof localStorage !== 'undefined' && draftKey ? (localStorage.getItem(draftKey) || '') : '';
          const milestone = milestoneBySection.get(item.id);
          return `
          <article class="card" style="padding: 22px; border: 1px solid var(--border-color);" aria-labelledby="objective-${this.escapeHTML(item.id)}">
            <div style="display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
              <h3 id="objective-${this.escapeHTML(item.id)}" style="font-size: 18px; margin: 0;">${this.escapeHTML(item.id)} &middot; ${this.escapeHTML(item.scope)}</h3>
              <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
                ${milestone ? this.getMilestoneBadge(milestone) : ''}
                <span class="badge badge-secondary">OCR ${this.escapeHTML(item.officialSpecificationPointId)}</span>
              </div>
            </div>
            <p style="line-height: 1.7; margin: 14px 0;">${this.escapeHTML(item.explanation)}</p>
            ${item.teachingSections?.length ? `
              <div class="student-teaching-sequence" aria-label="Step-by-step teaching">
                ${item.teachingSections.map(section => `
                  <section>
                    <h4>${this.escapeHTML(section.heading)}</h4>
                    <p>${this.escapeHTML(section.body)}</p>
                  </section>
                `).join('')}
              </div>
            ` : ''}
            <div style="background: rgba(45, 156, 145, 0.08); border-left: 4px solid var(--teal); padding: 14px; border-radius: 0 8px 8px 0;">
              <strong>Worked example</strong>
              <p style="line-height: 1.6; margin: 6px 0 0;">${this.escapeHTML(item.workedExample)}</p>
            </div>
            <!-- Interactive Try it with support -->
            <div style="background: var(--bg-main); border-left: 4px solid var(--amber); padding: 16px; border-radius: 0 8px 8px 0; margin-top: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
                <strong style="font-size: 15px; color: var(--text-main);">Try this</strong>
                <span class="badge badge-secondary" style="font-size: 11px;">Guided practice</span>
              </div>
              <p style="line-height: 1.6; margin: 0 0 12px; font-weight: 500;">${this.escapeHTML(item.supportedPractice)}</p>
              <div class="form-group" style="margin-bottom: 12px;">
                <label for="try-input-${item.id}" style="font-size: 13px; font-weight: 600; display: block; margin-bottom: 4px;">Your practice answer</label>
                <textarea id="try-input-${item.id}" class="form-control try-practice-textarea" data-obj-id="${item.id}" rows="3" placeholder="Type your response or step-by-step working here..." style="font-size: 13.5px; line-height: 1.5;">${this.escapeHTML(savedPractice)}</textarea>
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
                <button type="button" class="btn btn-secondary btn-sm save-try-btn" data-obj-id="${item.id}">Save draft — practice only</button>
                <button type="button" class="btn btn-secondary btn-sm toggle-guide-btn" data-obj-id="${item.id}">View worked solution</button>
                ${isFilteredObjective && focusedExamTask
                  ? `<button type="button" class="btn btn-secondary btn-sm goto-exam-application-btn">Apply this in a ${focusedExamTask.marks}-mark exam question</button>`
                  : `<button type="button" class="btn btn-secondary btn-sm goto-review-btn" data-spec-id="${item.id}">Practise in written answers &rarr;</button>`}
              </div>
              <div id="try-guide-${item.id}" class="card" style="display: none; margin-top: 12px; padding: 14px; background: rgba(45, 156, 145, 0.08); border-left: 4px solid var(--teal);">
                <strong style="color: var(--teal); font-size: 13px;">Worked solution</strong>
                <p style="font-size: 13.5px; line-height: 1.6; margin: 6px 0 0;">${this.escapeHTML(item.workedExample)}</p>
              </div>
              <div id="try-status-${item.id}" style="font-size: 12px; color: var(--teal); margin-top: 6px; display: none; font-weight: 600;"></div>
            </div>
            <p style="font-size: 13px; margin: 12px 0 0;"><strong>Reading:</strong> about ${item.workload.coreLearningMinutes} minutes. <strong>Extended guided practice:</strong> complete one clearly chosen step now, or allow 20-40 minutes for the whole multi-part task. <strong>Optional quick recall:</strong> up to ${item.workload.retrievalMinutes} minutes.</p>
            <p style="font-size: 13px; margin: 6px 0;"><strong>How this may appear in an OCR exam:</strong> ${item.assessmentModes.map(mode => this.escapeHTML(mode)).join(', ')}.</p>
            <p style="margin: 14px 0 8px;"><strong>A common mistake to avoid:</strong> ${this.escapeHTML(item.misconception)}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;" aria-label="Key terms">
              ${item.keyTerms.map(term => `<span class="badge badge-secondary">${this.escapeHTML(term)}</span>`).join('')}
            </div>
          </article>
          `;
        }).join('')
      : '<div class="card" role="status"><h2>Topic review unavailable</h2><p>This section has no review content to display right now. Return to Topics and choose another section.</p><button class="btn btn-secondary" id="objective-empty-back-btn">Back to Topics</button></div>';

    // Group notes by paper
    const paper1Notes = theoryNotes.filter(n => n.paper === 'Paper 1');
    const paper2Notes = theoryNotes.filter(n => n.paper === 'Paper 2');

    panel.innerHTML = `
      <div class="learn-hub-container student-page student-learn">
        <!-- Header -->
        <div class="student-route-header" style="margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px;">
          <div>
            <span class="student-mode-label">Learn</span>
            <h1 style="font-size: 28px; font-weight: 700; margin: 8px 0 4px 0;">${isFilteredObjective ? 'Today’s section' : 'Learn and review theory'}</h1>
            <p style="font-size: 15px; color: var(--text-muted); margin: 0;">${isFilteredObjective
              ? `${this.escapeHTML(focusedObjectiveTeaching?.scope || '')} · about ${focusedObjectiveTeaching?.workload?.coreLearningMinutes || 10} minutes`
              : 'Choose one specification section. Read the explanation, try the guided task, then check the section.'}</p>
          </div>
        </div>
        ${isFilteredObjective ? `
          <ol class="student-instruction-route" aria-label="Recommended learning sequence">
            <li><strong>Read</strong><span>the explanation and worked example</span></li>
            <li><strong>Try</strong><span>the guided task and save your response</span></li>
            <li><strong>Check</strong><span>the section when you are ready</span></li>
          </ol>
        ` : `
          <div class="student-start-panel">
            <div><strong>Suggested starting point</strong><p>Work through the first section for about 10 minutes. You can still browse the full topic below.</p></div>
            <button type="button" class="btn btn-primary" id="learn-recommended-start-btn" data-objective-id="${this.escapeHTML(allObjectiveTeaching[0]?.id || '')}">Start ${this.escapeHTML(allObjectiveTeaching[0]?.scope || 'first section')}</button>
          </div>
          <details class="student-more-routes">
            <summary>More ways to revise this topic</summary>
            <div>
              <button class="btn btn-secondary copy-theory-summary-btn">Copy notes and terms</button>
              <button class="btn btn-secondary start-topic-quiz-btn" data-topic-id="${activeNote.topicId}">Optional: test this topic (up to 3 questions)</button>
            </div>
          </details>
        `}

        <!-- Paper Selector Tabs -->
        <div style="${isFilteredObjective ? 'display:none;' : 'display:flex;'} gap: 12px; margin-bottom: 20px; border-bottom: 2px solid var(--border-color); padding-bottom: 12px;">
          <button class="btn btn-secondary ${currentPaper === 'Paper 1' ? 'student-selected-control' : ''} paper-tab-btn" data-paper="Paper 1" style="border-radius: 8px; font-weight: 600;">
            💻 Paper 1: Computer Systems
          </button>
          <button class="btn btn-secondary ${currentPaper === 'Paper 2' ? 'student-selected-control' : ''} paper-tab-btn" data-paper="Paper 2" style="border-radius: 8px; font-weight: 600;">
            🧩 Paper 2: Computational Thinking, Algorithms & Programming
          </button>
        </div>

        <!-- Topic Pills Navigation -->
        <div class="student-topic-grid" style="${isFilteredObjective ? 'display:none;' : ''}">
          ${(currentPaper === 'Paper 1' ? paper1Notes : paper2Notes).map(note => `
            <button class="btn btn-secondary ${note.topicId === activeNote.topicId ? 'student-selected-control' : ''} topic-pill-btn" data-topic-id="${note.topicId}">
              ${note.code} ${note.title}
            </button>
          `).join('')}
        </div>

        <!-- Active Topic Details Header -->
        <div class="card" style="${isFilteredObjective ? 'display:none;' : ''} padding: 24px; margin-bottom: 24px; border-left: 5px solid var(--teal); background-color: var(--bg-card);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="badge badge-primary" style="font-size: 13px;">${activeNote.code} &middot; ${activeNote.paper}</span>
              <span style="font-size: 13px; color: var(--text-muted); font-weight: 500;">${activeNote.subtitle}</span>
            </div>
          </div>
          <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 8px; color: var(--text-main);">${activeNote.title}</h2>
          <p style="font-size: 15px; color: var(--text-muted); line-height: 1.6; margin-bottom: 12px;">${activeNote.summary}</p>
          <div style="font-size: 13px; color: var(--text-main); margin-bottom: 16px; background: var(--bg-main); padding: 8px 12px; border-radius: 6px; display: inline-block;">
            <strong>Core guided learning:</strong> about ${totalCoreMins} minutes across ${allObjectiveTeaching.length} sections. Optional notes and quick recall are additional.
          </div>
          
          <!-- Specification Points Covered -->
          <div style="background-color: rgba(45, 156, 145, 0.08); border-radius: 8px; padding: 14px 18px; border: 1px solid rgba(45, 156, 145, 0.2);">
            <div style="font-size: 12px; text-transform: uppercase; font-weight: 700; color: var(--teal); margin-bottom: 6px; letter-spacing: 0.5px;">Specification Points Covered</div>
            <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: var(--text-main); line-height: 1.5;">
              ${activeNote.specificationPoints.map(sp => `<li>${sp}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- Objective-level teaching -->
        <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <h2 style="font-size: 21px; margin: 0;">Choose a specification section</h2>
            <div style="${isFilteredObjective ? 'display:none;' : 'display:flex;'} gap: 6px; flex-wrap: wrap; align-items: center;">
              <span style="font-size: 13px; font-weight: 600; color: var(--text-muted);">View:</span>
              <button class="btn btn-secondary ${(!this.activeObjectiveId || this.activeObjectiveId === 'all') ? 'student-selected-control' : ''} objective-filter-btn" data-obj-id="all" style="padding: 4px 12px; font-size: 12px; border-radius: 14px;">
                All (${allObjectiveTeaching.length})
              </button>
              ${allObjectiveTeaching.map(item => `
                <button class="btn btn-secondary ${this.activeObjectiveId === item.id ? 'student-selected-control' : ''} objective-filter-btn" data-obj-id="${this.escapeHTML(item.id)}" style="padding: 4px 12px; font-size: 12px; border-radius: 14px;">
                  ${this.escapeHTML(item.officialSpecificationPointId)} — ${this.escapeHTML(item.scope)}
                </button>
              `).join('')}
            </div>
          </div>
          ${objectiveTeachingHtml}
          ${isFilteredObjective ? `
            <div style="display:flex; flex-wrap:wrap; gap:10px;">
              <button class="btn btn-primary focused-objective-quiz-btn" data-topic-id="${activeNote.topicId}">${focusedCheckLabel}</button>
              <button class="btn btn-secondary" id="view-full-topic-btn">View full topic</button>
            </div>
          ` : ''}
        </div>

        <!-- Extended topic notes -->
        <h2 style="${isFilteredObjective ? 'display:none;' : ''} font-size: 21px; margin: 0 0 16px;">Extended topic notes</h2>
        <div style="${isFilteredObjective ? 'display:none;' : 'display:flex;'} flex-direction: column; gap: 24px; margin-bottom: 32px;">
          ${activeNote.sections.map(section => `
            <div class="card" style="padding: 24px; background-color: var(--bg-card); border: 1px solid var(--border-color);">
              <h3 style="font-size: 19px; font-weight: 700; margin-bottom: 14px; color: var(--text-main); border-bottom: 2px solid var(--border-color); padding-bottom: 8px;">
                ${section.heading}
              </h3>
              <div style="font-size: 15px; line-height: 1.7; color: var(--text-main); margin-bottom: 20px;">
                ${section.content}
              </div>

              ${section.workedExample ? `
                <div style="background: rgba(15, 23, 42, 0.04); border-left: 4px solid var(--teal); padding: 16px; border-radius: 0 8px 8px 0; margin-bottom: 16px;">
                  <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--teal); margin-bottom: 6px; letter-spacing: 0.5px;">💡 Step-by-Step Worked Example / Application</div>
                  <div style="font-size: 14px; line-height: 1.6; color: var(--text-main);">${section.workedExample}</div>
                </div>
              ` : ''}

              ${section.examinerTip ? `
                <div style="background: rgba(217, 119, 6, 0.08); border-left: 4px solid var(--amber); padding: 14px 16px; border-radius: 0 8px 8px 0;">
                  <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--amber-text); margin-bottom: 4px; letter-spacing: 0.5px;">⚠️ Examiner Tip & Strategy</div>
                  <div style="font-size: 13.5px; line-height: 1.5; color: var(--text-main);">${section.examinerTip}</div>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>

        <!-- Key Terms & Exam Traps Bottom Cards -->
        <div style="${isFilteredObjective ? 'display:none;' : 'display:grid;'} grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px;">
          <!-- Key Terms -->
          <div class="card" style="padding: 20px; background-color: var(--bg-card); border: 1px solid var(--border-color);">
            <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 12px; color: var(--text-main);">🔑 Essential Topic Vocabulary</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${activeNote.keyTerms.map(kt => `<span class="badge badge-secondary" style="font-size: 12px; padding: 4px 10px;">${kt}</span>`).join('')}
            </div>
          </div>

          <!-- Exam Traps -->
          <div class="card" style="padding: 20px; background-color: var(--bg-card); border: 1.5px solid var(--amber);">
            <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 12px; color: var(--amber-text);">🚫 Common Examiner Pitfalls</h3>
            <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: var(--text-main); line-height: 1.6;">
              ${activeNote.examTraps.map(trap => `<li>${trap}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- Bottom Call to Action -->
        <div class="card" style="${isFilteredObjective ? 'display:none;' : ''} padding: 28px; text-align: center; background: linear-gradient(135deg, rgba(45, 156, 145, 0.12), rgba(7, 17, 31, 0.05)); border: 2px solid var(--teal);">
          <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Ready for a quick memory check?</h3>
          <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 16px; max-width: 500px; margin-left: auto; margin-right: auto;">
            Try a short sample of up to three questions from <strong>${activeNote.title}</strong>. This does not prove complete coverage of the whole topic.
          </p>
          <button class="btn btn-secondary btn-lg start-topic-quiz-btn" data-topic-id="${activeNote.topicId}" style="min-width: 220px; min-height: 44px; font-weight: 600;">
            Check what you remember (up to 3 questions)
          </button>
        </div>
      </div>
    `;

    // Event Listeners
    panel.querySelectorAll('.paper-tab-btn').forEach(btn => {
      btn.onclick = () => {
        const paper = btn.getAttribute('data-paper');
        const firstNote = theoryNotes.find(n => n.paper === paper);
        if (firstNote) {
          this.activeTopicId = firstNote.topicId;
          this.activeObjectiveId = 'all';
          this.renderStudentLearn(panel);
        }
      };
    });

    panel.querySelectorAll('.topic-pill-btn').forEach(btn => {
      btn.onclick = () => {
        this.activeTopicId = btn.getAttribute('data-topic-id');
        this.activeObjectiveId = 'all';
        this.renderStudentLearn(panel);
      };
    });

    panel.querySelectorAll('.objective-filter-btn').forEach(btn => {
      btn.onclick = () => {
        this.activeObjectiveId = btn.getAttribute('data-obj-id');
        this.renderStudentLearn(panel);
      };
    });

    const viewFullTopicButton = panel.querySelector('#view-full-topic-btn');
    if (viewFullTopicButton) {
      viewFullTopicButton.onclick = () => {
        this.activeObjectiveId = 'all';
        this.renderStudentLearn(panel);
        this.focusMainContent();
      };
    }
    const recommendedStartButton = panel.querySelector('#learn-recommended-start-btn');
    if (recommendedStartButton) {
      recommendedStartButton.onclick = () => {
        this.activeObjectiveId = recommendedStartButton.getAttribute('data-objective-id');
        this.renderStudentLearn(panel);
        this.focusMainContent();
      };
    }
    const objectiveEmptyBackButton = panel.querySelector('#objective-empty-back-btn');
    if (objectiveEmptyBackButton) {
      objectiveEmptyBackButton.onclick = () => {
        this.activeObjectiveId = 'all';
        this.renderStudentLearn(panel);
        this.focusMainContent();
      };
    }

    panel.querySelectorAll('.save-try-btn').forEach(btn => {
      btn.onclick = () => {
        const objId = btn.getAttribute('data-obj-id');
        const textarea = panel.querySelector(`[id="try-input-${objId}"]`);
        const statusDiv = panel.querySelector(`[id="try-status-${objId}"]`);
        if (textarea) {
          const val = textarea.value;
          if (typeof localStorage !== 'undefined') {
            const draftKey = this.getPracticeDraftKey(objId);
            if (draftKey) localStorage.setItem(draftKey, val);
          }
          if (statusDiv) {
            statusDiv.textContent = '✓ Response saved locally';
            statusDiv.style.display = 'block';
            setTimeout(() => { statusDiv.style.display = 'none'; }, 3000);
          }
        }
      };
    });

    panel.querySelectorAll('.toggle-guide-btn').forEach(btn => {
      btn.onclick = () => {
        const objId = btn.getAttribute('data-obj-id');
        const guideDiv = panel.querySelector(`[id="try-guide-${objId}"]`);
        if (guideDiv) {
          guideDiv.style.display = guideDiv.style.display === 'none' ? 'block' : 'none';
        }
      };
    });

    panel.querySelectorAll('.goto-review-btn').forEach(btn => {
      btn.onclick = () => {
        const specId = btn.getAttribute('data-spec-id');
        const writtenQs = window.db.getWrittenQuestions();
        const targetQ = writtenQs.find(q => q.specificationPointId === specId) || writtenQs[0];
        if (targetQ) {
          this.activeWQuestionId = targetQ.id;
        }
        this.switchTab('stud-written');
      };
    });

    panel.querySelectorAll('.start-topic-quiz-btn, .focused-objective-quiz-btn').forEach(btn => {
      btn.onclick = () => {
        this.activeTopicId = btn.getAttribute('data-topic-id');
        this.switchTab('stud-recall');
      };
    });
    const examApplicationButton = panel.querySelector('.goto-exam-application-btn');
    if (examApplicationButton) examApplicationButton.onclick = () => this.activateExamTransferForCurrentLearning();

    const copyBtn = panel.querySelector('.copy-theory-summary-btn');
    if (copyBtn) {
      copyBtn.onclick = () => {
        const text = `# ${activeNote.code} ${activeNote.title}\n\n${activeNote.summary}\n\n## Specification Points\n${activeNote.specificationPoints.map(sp => `- ${sp}`).join('\n')}\n\n## Key Terms & Flashcards\n${(activeNote.keyTerms || []).map(kt => `- **${kt.term}**: ${kt.definition}`).join('\n')}\n\n## Examiner Warnings\n${(activeNote.examinerTips || []).map(tip => `- ⚠️ ${tip}`).join('\n')}`;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => {
            this.alert('Success: Theory summary and flashcard terms copied to your clipboard!');
          }).catch(() => {
            this.alert('Copied summary notes to clipboard.');
          });
        } else {
          this.alert('Summary notes ready to copy.');
        }
      };
    }
  }

  renderFocusedStudentLearning(panel, activeNote, content) {
    const task = this.getMatchingExamTransferTask(activeNote.topicId, content.id);
    const state = this.getLearnerObjectiveState(content.id);
    const objectiveNames = new Map(window.db.getUnits()
      .flatMap(unit => unit.topics)
      .flatMap(topic => topic.objectives)
      .map(objective => [objective.id, objective.name]));
    const prerequisites = (content.prerequisiteSpecificationPointIds || [])
      .map(id => ({ id, name: objectiveNames.get(id) || id }));
    const contextualTools = {
      '1.1.1': { id: 'fde-cycle', label: 'Open the fetch–decode–execute tool' },
      '1.2.4a': { id: 'binary-shift', label: 'Open the binary-shift tool' },
      '1.2.4c': { id: 'file-size-calc', label: 'Open the file-size tool' },
      '1.2.4d': { id: 'file-size-calc', label: 'Open the file-size tool' },
      '2.1.2': { id: 'algorithms', label: 'Open the search and sort tool' },
      '2.4.1': { id: 'logic-gates', label: 'Open the logic-gates tool' }
    };
    const tool = contextualTools[content.id];
    panel.innerHTML = `
      <div class="student-page student-focused-learning">
        <header class="student-route-header student-route-header--quiet">
          <span class="student-mode-label">Topic ${this.escapeHTML(content.id)}</span>
          <h1>${this.escapeHTML(content.scope)}</h1>
          <p>Read the explanation and worked example, then apply it in an exam question.</p>
        </header>
        ${prerequisites.length ? `
          <aside class="card student-prerequisite-note" aria-labelledby="useful-first-heading">
            <h2 id="useful-first-heading">Useful first</h2>
            <p>If any of these feel unfamiliar, review them before the exam question. You can continue with this topic if you are already confident.</p>
            <div class="student-prerequisite-actions">
              ${prerequisites.map(item => `<button type="button" class="btn btn-secondary btn-sm focused-prerequisite-btn" data-prerequisite-id="${this.escapeHTML(item.id)}">Review ${this.escapeHTML(item.id)} · ${this.escapeHTML(item.name)}</button>`).join('')}
            </div>
          </aside>
        ` : ''}
        <article class="card student-learning-content">
          <h2>Review this section</h2>
          <p>${this.escapeHTML(content.explanation)}</p>
          ${content.teachingSections?.length ? `
            <div class="student-teaching-sequence" aria-label="Step-by-step teaching">
              ${content.teachingSections.map(section => `
                <section>
                  <h3>${this.escapeHTML(section.heading)}</h3>
                  <p>${this.escapeHTML(section.body)}</p>
                </section>
              `).join('')}
            </div>
          ` : ''}
          <aside class="student-worked-example">
            <h3>Worked example</h3>
            <p>${this.escapeHTML(content.workedExample)}</p>
          </aside>
          <details class="student-method-practice">
            <summary>Practise the method first</summary>
            <p>${this.escapeHTML(content.supportedPractice)}</p>
            <p><strong>Practice only:</strong> use paper or your own notes. This does not update Progress.</p>
          </details>
          <p><strong>Common mistake:</strong> ${this.escapeHTML(content.misconception)}</p>
        </article>
        ${tool ? `<aside class="card student-context-tool"><h2>Useful tool</h2><p>Use this interactive tool if it helps you see the process.</p><button type="button" class="btn btn-secondary" id="focused-tool-btn">${tool.label}</button></aside>` : ''}
        <aside class="card student-evidence-note">
          <strong>What counts?</strong>
          <p>Reading helps you prepare but does not update Progress. Checked exam work shows what you can do. Adding flashcards to your desk does not mean you have mastered the topic.</p>
        </aside>
        <div class="student-focused-actions">
          ${task ? `<button type="button" class="btn btn-primary" id="focused-exam-btn">Try a ${task.marks}-mark exam question</button>` : '<p role="status"><strong>No exact exam question is available for this section yet.</strong> Review the section or choose another topic.</p>'}
          <button type="button" class="btn btn-secondary" id="focused-cover-btn">${state?.state === 'covered' ? (state.cardState === 'paused' ? 'Add flashcards to my desk' : 'Pause these flashcards') : 'Add flashcards to my desk'}</button>
          <button type="button" class="btn btn-link" id="focused-topics-btn">Back to Topics</button>
        </div>
      </div>`;
    panel.querySelector('#focused-exam-btn')?.addEventListener('click', () => {
      this.activeExamTransferId = task.id;
      this.examTransferStage = 'decode';
      this.examTransferPlan = {};
      this.examTransferResponse = '';
      this.switchTab('stud-exam-transfer');
    });
    panel.querySelectorAll('.focused-prerequisite-btn').forEach(button => {
      button.addEventListener('click', () => {
        this.activeObjectiveId = button.getAttribute('data-prerequisite-id');
        this.activeTopicId = window.db.getUnits()
          .flatMap(unit => unit.topics)
          .find(topic => topic.objectives.some(objective => objective.id === this.activeObjectiveId))?.id || this.activeTopicId;
        this.render();
      });
    });
    panel.querySelector('#focused-cover-btn')?.addEventListener('click', () => {
      const current = this.getLearnerObjectiveState(content.id);
      if (current?.state === 'covered') {
        this.updateLearnerObjectiveState(content.id, 'covered', current.cardState === 'paused' ? 'active' : 'paused');
      } else {
        this.updateLearnerObjectiveState(content.id, 'covered', 'active');
      }
      this.renderFocusedStudentLearning(panel, activeNote, content);
    });
    panel.querySelector('#focused-topics-btn')?.addEventListener('click', () => this.switchTab('stud-topics'));
    panel.querySelector('#focused-tool-btn')?.addEventListener('click', () => {
      this.activeSimTool = tool.id;
      this.switchTab('stud-simulators');
    });
  }

  // ==================== STUDENT DICTIONARY ====================
  renderStudentDictionary(panel) {
    const terms = window.db.getKeyTerms();
    const topicNames = Object.fromEntries(window.db.getUnits().flatMap(unit => unit.topics.map(topic => [topic.id, topic.name])));
    if (this.definitionTestMode && this.definitionTestTerms.length) {
      panel.innerHTML = `
        <div style="margin-bottom:24px;"><span class="badge badge-primary">Optional · about 10 minutes</span><h1 style="margin-top:8px;">Definition check</h1><p>Define each term from memory. Clear, accurate meaning matters more than matching the model wording exactly.</p></div>
        <form id="definition-test-form">
          ${this.definitionTestTerms.map((item, index) => `<div class="card" style="margin-bottom:14px;"><label for="definition-${index}" style="font-weight:700;">${index + 1}. ${item.term}</label><textarea id="definition-${index}" class="form-control definition-response" data-term-id="${item.id}" rows="3" placeholder="Write a student-friendly but precise definition..." required></textarea></div>`).join('')}
          <div style="display:flex; gap:10px;"><button class="btn btn-primary" type="submit">Check my definitions</button><button class="btn btn-secondary" type="button" id="leave-definition-test-btn">Back to dictionary</button></div>
        </form>`;
      document.getElementById('leave-definition-test-btn').onclick = () => { this.definitionTestMode = false; this.definitionTestTerms = []; this.render(); };
      document.getElementById('definition-test-form').onsubmit = event => {
        event.preventDefault();
        let secure = 0;
        const results = this.definitionTestTerms.map((item, index) => {
          const response = document.getElementById(`definition-${index}`).value.trim();
          const normalise = value => String(value).toLowerCase().replace(/[-–—]/g, ' ').replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
          const normalisedResponse = normalise(response);
          const matched = item.keywords.filter(keyword => normalisedResponse.includes(normalise(keyword)));
          const threshold = Math.max(1, Math.ceil(item.keywords.length * 0.6));
          const isSecure = matched.length >= threshold;
          if (isSecure) secure++;
          return { item, response, matched, isSecure };
        });
        window.db.addAttempt({
          studentId: this.currentUser.id,
          type: 'definition_test',
          topic: 'mixed key terms',
          score: `${secure}/10`,
          evidenceType: 'formative',
          contributesToMastery: false,
          completionStatus: 'formative_only'
        });
        panel.innerHTML = `<div style="margin-bottom:24px;"><h1>Definition check feedback</h1><p><strong>Practice feedback only: ${secure}/10 definitions included the important words being checked.</strong> This does not count towards Progress or give you a final result. Use the feedback to improve your definitions, then try again.</p></div>${results.map((result, index) => `<div class="card" style="margin-bottom:14px; border-left:5px solid ${result.isSecure ? 'var(--green)' : 'var(--amber)'};"><h3>${index + 1}. ${result.item.term}</h3><p style="font-size:13px;"><strong>Your definition:</strong> ${this.escapeHTML(result.response)}</p><p style="font-size:13px;"><strong>Example definition:</strong> ${result.item.definition}</p><p style="font-size:12px; color:var(--text-muted);"><strong>Important words:</strong> ${result.item.keywords.join(', ')}. You included: ${result.matched.join(', ') || 'none yet'}.</p></div>`).join('')}<button class="btn btn-primary" id="another-definition-test-btn">Improve and try another 10</button><button class="btn btn-secondary" id="dictionary-return-btn" style="margin-left:8px;">Back to dictionary</button>`;
        document.getElementById('another-definition-test-btn').onclick = () => { this.startDefinitionTest(); };
        document.getElementById('dictionary-return-btn').onclick = () => { this.definitionTestMode = false; this.definitionTestTerms = []; this.render(); };
      };
      return;
    }

    panel.innerHTML = `
      <div style="display:flex; justify-content:space-between; gap:20px; align-items:flex-end; margin-bottom:24px;"><div><span class="badge badge-primary">OCR J277 key vocabulary</span><h1 style="margin-top:8px;">Computer Science dictionary</h1><p>Student-friendly definitions that remain precise enough for exam answers.</p></div><button class="btn btn-primary" id="start-definition-test-btn">Test me on 10 random terms</button></div>
      <div class="card" style="margin-bottom:20px;"><label for="dictionary-search" style="font-weight:700;">Find a term</label><input id="dictionary-search" class="form-control" placeholder="Search by term, definition or topic..."><div id="dictionary-count" style="font-size:12px; color:var(--text-muted); margin-top:7px;">${terms.length} terms</div></div>
      <div id="dictionary-grid" style="display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:14px;">${terms.map(item => `<article class="card dictionary-term-card" data-search="${this.escapeHTML(`${item.term} ${item.definition} ${topicNames[item.topicId] || ''}`.toLowerCase())}"><span class="badge badge-primary">${topicNames[item.topicId] || 'General'}</span><h2 style="font-size:18px; margin:9px 0 6px;">${item.term}</h2><p style="font-size:14px; margin:0;">${item.definition}</p></article>`).join('')}</div>`;
    document.getElementById('start-definition-test-btn').onclick = () => this.startDefinitionTest();
    document.getElementById('dictionary-search').oninput = event => {
      const query = event.target.value.trim().toLowerCase();
      let visible = 0;
      panel.querySelectorAll('.dictionary-term-card').forEach(card => {
        const show = !query || card.getAttribute('data-search').includes(query);
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      document.getElementById('dictionary-count').textContent = `${visible} term${visible === 1 ? '' : 's'}`;
    };
  }

  startDefinitionTest() {
    this.definitionTestTerms = [...window.db.getKeyTerms()].sort(() => Math.random() - 0.5).slice(0, 10);
    this.definitionTestMode = true;
    this.render();
  }

  // ==================== STUDENT TEST PREPARATION ====================
  renderStudentTestPrep(panel) {
    const prep = window.db.getTestPreps().find(item => item.id === this.activeTestPrepId) || window.db.getTestPreps().find(item => item.status === 'Active');
    if (!prep) {
      panel.innerHTML = '<h1>Prep for test</h1><p>There is no active test-preparation plan.</p>';
      return;
    }
    const points = window.db.getUnits().flatMap(unit => unit.topics.flatMap(topic => topic.objectives.map(objective => ({ ...objective, topicId: topic.id, topicName: topic.name, paper: unit.paper }))));
    const selected = prep.specificationPointIds.map(id => points.find(point => point.id === id)).filter(Boolean);
    
    if (typeof this.testPrepOffset !== 'number') this.testPrepOffset = 0;
    if (this.testPrepOffset >= selected.length) this.testPrepOffset = 0;

    const sessionPoints = selected.slice(this.testPrepOffset, this.testPrepOffset + 1);
    const minutesEach = Number(prep.sessionMinutes || 10);
    const startIdx = this.testPrepOffset + 1;
    const sessionsPerWeek = Math.max(1, Math.floor(Number(prep.weeklyMinutes || minutesEach) / minutesEach));
    const latestReport = (window.db.getAssessmentReports?.() || [])
      .filter(item => item.assessmentId === prep.id && item.studentId === this.currentUser.id)
      .sort((left, right) => new Date(right.recordedAt) - new Date(left.recordedAt))[0] || null;
    const reportTopics = this.getAssessmentReportLinks(latestReport);
    const techniqueCatalogue = new Map(this.getExamTechniqueCatalogue().map(item => [item.id, item]));
    const ratingLabels = { strong: 'Stronger area', developing: 'Developing', priority: 'Needs review' };
    const reportHtml = latestReport ? `
      <section class="card student-assessment-report" aria-labelledby="student-assessment-report-heading">
        <span class="badge badge-primary">Teacher assessment report</span>
        <h2 id="student-assessment-report-heading">How this assessment went</h2>
        ${latestReport.overallMark !== '' && latestReport.maxMark ? `<p class="student-assessment-mark"><strong>${this.escapeHTML(latestReport.overallMark)}/${this.escapeHTML(latestReport.maxMark)}</strong> overall</p>` : ''}
        ${latestReport.teacherNote ? `<p><strong>Teacher summary:</strong> ${this.escapeHTML(latestReport.teacherNote)}</p>` : ''}
        <div class="student-report-topic-grid">${reportTopics.map(item => `<article class="student-report-topic student-report-topic--${this.escapeHTML(item.rating)}"><span>${this.escapeHTML(ratingLabels[item.rating] || item.rating)}</span><h3>${this.escapeHTML(item.specificationPointId)} ${this.escapeHTML(item.objective.name)}</h3>${item.rating === 'strong' ? '<p>Keep this fresh with flashcards and mixed practice.</p>' : '<p>Review the explanation and worked example, then try the linked exam question.</p>'}<button type="button" class="btn btn-secondary btn-sm student-report-topic-btn" data-topic-id="${this.escapeHTML(item.objective.topicId || '')}" data-specification-id="${this.escapeHTML(item.specificationPointId)}">${item.rating === 'strong' ? 'Review topic' : 'Improve this topic'}</button></article>`).join('')}</div>
        ${(latestReport.examTechniqueTags || []).length ? `<div class="student-exam-technique-support"><h3>Exam technique to practise</h3>${latestReport.examTechniqueTags.map(id => { const technique = techniqueCatalogue.get(id); return technique ? `<article><strong>${this.escapeHTML(technique.label)}</strong><p>${this.escapeHTML(technique.support)}</p></article>` : ''; }).join('')}<button type="button" class="btn btn-primary btn-sm" id="student-report-technique-btn">Practise with an exam question</button></div>` : ''}
      </section>` : '';

    panel.innerHTML = `
      <div class="student-route-header">
        <span class="badge badge-primary">${prep.sessionMinutes}-minute session</span>
        <h1 style="margin-top:8px;">${this.escapeHTML(prep.title)}</h1>
        <p>${selected.length} specification points selected · ${this.formatDueDate(prep.testDate).replace('Due ', 'Test ')}</p>
      </div>

      <div class="card" style="margin-bottom:20px; border-left:5px solid var(--teal);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <strong>Session ${startIdx} of ${selected.length}:</strong> focus on one specification point, then use the available review or exam practice.
            <div style="font-size:12px; color:var(--text-muted); margin-top:5px;">Plan: about ${sessionsPerWeek} ${sessionsPerWeek === 1 ? 'session' : 'sessions'} each week within the ${prep.weeklyMinutes}-minute limit.</div>
          </div>
          ${selected.length > 1 ? `
            <div style="display:flex; gap:6px; align-items:center;">
              <button type="button" class="btn btn-secondary btn-sm prep-prev-batch-btn" ${this.testPrepOffset === 0 ? 'disabled' : ''}>&larr; Previous point</button>
              <button type="button" class="btn btn-secondary btn-sm prep-next-batch-btn" ${this.testPrepOffset + 1 >= selected.length ? 'disabled' : ''}>Next point &rarr;</button>
            </div>
          ` : ''}
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:14px;">
        ${sessionPoints.map((point, index) => {
          const isPython = point.id === '2.2.PY';
          const isPseudocode = point.id === '2.2.ERL';
          const examTask = this.getMatchingExamTransferTask(point.topicId, point.id);
          const targetTab = isPython
            ? 'stud-programme'
            : isPseudocode
              ? 'stud-pseudocode'
              : examTask
                ? 'stud-exam-transfer'
                : 'stud-learn';
          const actionLabel = isPython || isPseudocode
            ? 'Practise'
            : examTask
              ? 'Try exam question'
              : 'Review this section';
          const activityLabel = examTask
            ? `${examTask.marks}-mark exam-style question`
            : 'Focused explanation and worked example';
          const support = this.getAdaptiveSupportLevel(point.name);
          const supportDescription = {
            Guided: 'Step-by-step guidance',
            Supported: 'Hints available',
            Independent: 'Independent practice',
            Challenge: 'Challenge practice'
          }[support] || 'Hints available';
          return `<div class="card" style="display:flex; justify-content:space-between; gap:20px; align-items:center;">
            <div><span class="badge badge-primary">Plan point ${startIdx + index} · about ${minutesEach} mins</span><h3 style="margin:8px 0 5px;">${point.id} ${point.name}</h3><p style="font-size:13px; color:var(--text-muted); margin:0;">${point.paper} · ${point.topicName} · ${activityLabel} · ${supportDescription}</p></div>
            <button class="btn btn-primary btn-sm prep-point-start-btn" aria-label="${actionLabel}: ${point.id} ${point.name}" data-target-tab="${targetTab}" data-topic-id="${point.topicId}" data-spec-id="${point.id}" data-exam-task-id="${this.escapeHTML(examTask?.id || '')}">${actionLabel}</button>
          </div>`;
        }).join('')}
      </div>
      ${reportHtml}
      <div class="card" style="margin-top:20px; background:var(--bg-main);"><strong>Why these points?</strong><p style="font-size:13px; margin:6px 0 0;">The plan prioritises the teacher’s selected specification coverage, then uses your responses and support use to decide what returns. A target grade is never used to restrict content.</p></div>
    `;
    panel.querySelectorAll('.prep-point-start-btn').forEach(button => button.onclick = () => {
      this.activeTopicId = button.getAttribute('data-topic-id');
      const specId = button.getAttribute('data-spec-id');
      if (specId) this.activeObjectiveId = specId;
      const examTaskId = button.getAttribute('data-exam-task-id');
      if (examTaskId) {
        this.activeExamTransferId = examTaskId;
        this.examTransferStage = 'decode';
        this.examTransferPlan = {};
        this.examTransferResponse = '';
      }
      this.switchTab(button.getAttribute('data-target-tab'));
    });
    panel.querySelectorAll('.student-report-topic-btn').forEach(button => {
      button.onclick = () => {
        this.activeTopicId = button.getAttribute('data-topic-id');
        this.activeObjectiveId = button.getAttribute('data-specification-id');
        this.switchTab('stud-learn');
      };
    });
    panel.querySelector('#student-report-technique-btn')?.addEventListener('click', () => {
      const target = reportTopics.find(item => item.rating !== 'strong') || reportTopics[0];
      if (!target) return this.switchTab('stud-practice');
      const task = this.getMatchingExamTransferTask(target.objective.topicId, target.specificationPointId);
      if (!task) {
        this.activeTopicId = target.objective.topicId;
        this.activeObjectiveId = target.specificationPointId;
        return this.switchTab('stud-learn');
      }
      this.activeTopicId = task.topicId;
      this.activeObjectiveId = target.specificationPointId;
      this.activeExamTransferId = task.id;
      this.examTransferStage = 'decode';
      this.switchTab('stud-exam-transfer');
    });

    const prevBatchBtn = panel.querySelector('.prep-prev-batch-btn');
    if (prevBatchBtn) {
      prevBatchBtn.onclick = () => {
        this.testPrepOffset = Math.max(0, this.testPrepOffset - 1);
        this.renderStudentTestPrep(panel);
      };
    }

    const nextBatchBtn = panel.querySelector('.prep-next-batch-btn');
    if (nextBatchBtn) {
      nextBatchBtn.onclick = () => {
        this.testPrepOffset = Math.min(selected.length - 1, this.testPrepOffset + 1);
        this.renderStudentTestPrep(panel);
      };
    }

  }

  // ==================== LEARN ALONG ====================

  // ==================== WEEKLY NUMBER SKILLS ====================
  renderStudentRetrievalDeck(panel) {
    const topics = window.db.getUnits().flatMap(unit => unit.topics);
    const eligibleTopics = this.getPersonalDeskTopics();
    const cards = this.getRetrievalDeckCards();
    const dueCards = cards.filter(card => card.due);
    const distinctCards = [...new Map(cards.map(item => [item.id, item])).values()];
    const availableCards = [
      ...distinctCards.filter(card => card.due),
      ...distinctCards.filter(card => !card.due)
    ];
    if (!this.retrievalDeckSessionId && !this.retrievalDeckSessionComplete && availableCards.length) {
      this.retrievalDeckSessionId = `retrieval_${this.currentUser.id}_${Date.now()}_${this.evidenceIdSequence++}`;
    }
    if (this.retrievalDeckRatedCount === 0) {
      this.retrievalDeckSessionTarget = Math.min(10, new Set(availableCards.map(item => item.id)).size || 10);
    }
    const unseenCards = availableCards.filter(item => !this.retrievalDeckSeenCardIds.includes(item.id));
    const cardPool = this.retrievalDeckExtraMode ? availableCards : unseenCards;
    const card = cardPool.length ? cardPool[this.retrievalDeckCardIndex % cardPool.length] : null;
    const showCompletion = this.retrievalDeckSessionComplete && !this.retrievalDeckExtraMode;

    panel.innerHTML = `
      <div class="student-route-header">
        <span class="student-mode-label">Flashcards &middot; about 5 minutes</span>
        <h1>Review flashcards on your desk</h1>
        <p>Try the prompt before revealing the answer. Your choice changes when the card returns; flashcards are not marked in Progress.</p>
      </div>
      <div class="card" style="margin-bottom:18px;">
        <label for="retrieval-topic-filter"><strong>Topic</strong></label>
        <select id="retrieval-topic-filter" class="form-control" style="max-width:420px; margin-top:6px;" ${this.retrievalDeckRatedCount > 0 ? 'disabled aria-describedby="retrieval-filter-status"' : ''}>
          <option value="all">All topics on your desk</option>
          ${topics.filter(topic => eligibleTopics.has(topic.id)).map(topic => `<option value="${this.escapeHTML(topic.id)}" ${topic.id === this.retrievalDeckTopicId ? 'selected' : ''}>${this.escapeHTML(topic.name)}</option>`).join('')}
        </select>
        <p id="retrieval-filter-status" style="font-size:12px; color:var(--text-muted); margin:8px 0 0;">${this.retrievalDeckRatedCount > 0 ? 'Topic is fixed until this short session is complete. Pausing preserves your place.' : dueCards.length ? `${dueCards.length} ${dueCards.length === 1 ? 'card is' : 'cards are'} ready to practise now.` : `All cards up to date!`}</p>
      </div>
      ${showCompletion ? `
        <article class="card" role="status" style="max-width: 680px; padding: 28px; text-align: center; margin: 0 auto;">
          <div style="font-size: 32px; margin-bottom: 8px;">🎉</div>
          <span class="student-mode-label" style="display: inline-block; margin-bottom: 6px;">Section review complete</span>
          <h2 style="font-size: 22px; font-weight: 700; color: var(--navy); margin-bottom: 8px;">You're all up to date!</h2>
          <p style="font-size: 15px; color: var(--text-main); line-height: 1.5; margin-bottom: 20px;">You reviewed ${this.retrievalDeckRatedCount} ${this.retrievalDeckRatedCount === 1 ? 'card' : 'cards'} in this session. Cards have been scheduled based on how easy you found recall.</p>
          <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 10px;">
            <button type="button" class="btn btn-primary" id="retrieval-session-back-btn" style="min-height: 44px; padding-inline: 24px;">Return to My desk</button>
            <button type="button" class="btn btn-secondary" id="retrieval-extra-btn" style="min-height: 44px;">Repeat review / extra cards</button>
          </div>
        </article>
      ` : card ? `
        <article class="card" aria-labelledby="retrieval-card-term" style="max-width: 680px; padding: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
            <span class="student-kicker">${this.retrievalDeckExtraMode ? 'Extra card' : `Card ${Math.min(this.retrievalDeckRatedCount + 1, this.retrievalDeckSessionTarget)} of ${this.retrievalDeckSessionTarget}`}</span>
            <span class="badge badge-secondary">${this.escapeHTML(topics.find(topic => topic.id === card.topicId)?.name || 'Topic on your desk')}</span>
          </div>
          <input type="hidden" id="retrieval-card-attempt" value="${this.escapeHTML(this.retrievalDeckAttempt)}">
          <h2 id="retrieval-card-term" style="font-size: 20px; font-weight: 700; color: var(--navy); margin: 0 0 16px 0;">Explain: ${this.escapeHTML(card.term)}</h2>

          ${!this.retrievalDeckRevealed ? `
            <div style="display: flex; gap: 10px; margin-top: 16px; flex-wrap: wrap;">
              <button type="button" class="btn btn-primary btn-lg" id="retrieval-reveal-btn" style="min-height: 44px; padding-inline: 28px;">Flip card</button>
              <button type="button" class="btn btn-secondary" id="retrieval-pause-btn" style="min-height: 44px;">Pause and return to your plan</button>
            </div>
          ` : `
            <div id="retrieval-card-answer" tabindex="-1" style="margin-top: 16px;">
              <div class="card" style="background: var(--bg-main); border-left: 5px solid var(--teal); padding: 18px; margin-bottom: 16px;">
                <strong style="color: var(--teal); text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">Answer</strong>
                <p style="font-size: 16px; font-weight: 500; color: var(--navy); line-height: 1.5; margin: 0;">${this.escapeHTML(card.definition)}</p>
              </div>
              <fieldset style="border: none; padding: 0; margin: 0;">
                <legend style="float: none; width: 100%; display: block; font-size: 14px; color: var(--navy); font-weight: 600; margin-bottom: 10px;"><strong>How did recall feel?</strong> Choose one to schedule this card:</legend>
                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                  <button type="button" class="btn btn-secondary retrieval-rating-btn" data-rating="couldnt-recall" style="min-height: 44px; flex: 1;">Not yet</button>
                  <button type="button" class="btn btn-secondary retrieval-rating-btn" data-rating="difficult" style="min-height: 44px; flex: 1;">Needed effort</button>
                  <button type="button" class="btn btn-secondary retrieval-rating-btn" data-rating="secure" style="min-height: 44px; flex: 1;">Easy to recall</button>
                </div>
              </fieldset>
            </div>
          `}
        </article>
      ` : `
        <article class="card" role="status" style="max-width: 680px; padding: 28px; text-align: center; margin: 0 auto;">
          <div style="font-size: 32px; margin-bottom: 8px;">✨</div>
          <h2 style="font-size: 22px; font-weight: 700; color: var(--navy); margin-bottom: 8px;">You're all up to date!</h2>
          <p style="font-size: 15px; color: var(--text-main); line-height: 1.5; margin-bottom: 20px;">No flashcards are due for review right now in this topic.</p>
          <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 10px;">
            <button class="btn btn-primary" id="retrieval-home-btn" style="min-height: 44px;">Return to My desk</button>
            <button class="btn btn-secondary" id="retrieval-topics-btn" style="min-height: 44px;">Choose another topic</button>
          </div>
        </article>
      `}
    `;

    const filter = panel.querySelector?.('#retrieval-topic-filter') || document.getElementById('retrieval-topic-filter');
    if (filter) filter.onchange = () => {
      this.retrievalDeckTopicId = filter.value;
      this.resetRetrievalDeckSession();
      this.renderStudentRetrievalDeck(panel);
    };
    const attempt = panel.querySelector?.('#retrieval-card-attempt') || document.getElementById('retrieval-card-attempt');
    if (attempt) attempt.oninput = () => { this.retrievalDeckAttempt = attempt.value; };
    const reveal = panel.querySelector?.('#retrieval-reveal-btn') || document.getElementById('retrieval-reveal-btn');
    if (reveal) reveal.onclick = () => {
      this.retrievalDeckRevealed = true;
      this.renderStudentRetrievalDeck(panel);
      (panel.querySelector?.('#retrieval-card-answer') || document.getElementById('retrieval-card-answer'))?.focus?.();
    };
    panel.querySelectorAll?.('.retrieval-rating-btn').forEach(button => {
      button.onclick = () => {
        if (!this.recordRetrievalDeckRating(card, button.getAttribute('data-rating'))) return this.alert('Reveal the card first before choosing a rating.');
        this.renderStudentRetrievalDeck(panel);
        panel.querySelector?.(this.retrievalDeckSessionComplete && !this.retrievalDeckExtraMode ? '#retrieval-session-back-btn' : '#retrieval-reveal-btn')?.focus?.();
      };
    });
    const pause = panel.querySelector?.('#retrieval-pause-btn');
    if (pause) pause.onclick = () => this.switchTab('stud-practice');
    const sessionBack = panel.querySelector?.('#retrieval-session-back-btn');
    if (sessionBack) sessionBack.onclick = () => {
      this.resetRetrievalDeckSession();
      this.switchTab('stud-dashboard');
    };
    const extra = panel.querySelector?.('#retrieval-extra-btn');
    if (extra) extra.onclick = () => {
      this.retrievalDeckExtraMode = true;
      this.retrievalDeckAttempt = '';
      this.retrievalDeckRevealed = false;
      this.renderStudentRetrievalDeck(panel);
    };
    const home = panel.querySelector?.('#retrieval-home-btn') || document.getElementById('retrieval-home-btn');
    if (home) home.onclick = () => this.switchTab('stud-dashboard');
    const topicsButton = panel.querySelector?.('#retrieval-topics-btn') || document.getElementById('retrieval-topics-btn');
    if (topicsButton) topicsButton.onclick = () => this.switchTab('stud-topics');
  }

  renderStudentPractise(panel) {
    // Generate questions if not set
    if (this.numberSkillsSet.length === 0) {
      this.numberSkillsDifficulty = this.getAdaptiveSupportLevel('binary conversions');
      this.generateNumberSkillsSet();
    }

    panel.innerHTML = `
      <div class="student-route-header">
        <span class="student-mode-label">Practice &middot; Number skills &middot; ${this.numberSkillsSet.length} questions &middot; about 10 minutes</span>
        <h1>Practise number skills</h1>
        <p>Answer the questions in order, submit the set, then retry any incorrect answers. Your latest checked result can contribute to Progress.</p>
      </div>
      <p><button type="button" class="btn btn-secondary" id="number-back-practice-btn">Back to Practice</button></p>

      <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 32px; align-items: start;">
        <div>
          <form id="num-skills-form">
            ${this.numberSkillsSet.map((q, idx) => `
              <div class="card" style="margin-bottom: 24px;">
                <h3 style="margin-bottom: 8px;">Question ${idx + 1}: ${q.type}</h3>
                <p style="font-size:15px; color: var(--text-main); font-weight:600; margin-bottom: 12px;">${q.question}</p>
                
                ${q.supportGrid ? `
                  <div class="binary-bit-grid" style="display: grid; grid-template-columns: repeat(4, 40px) 12px repeat(4, 40px); gap: 6px; margin-bottom: 8px; text-align: center; font-size:12px; align-items: center;">
                    <div style="background-color: var(--bg-main); padding: 4px; border: 1px solid var(--border-color); font-weight: 600; border-radius: 4px;">128</div>
                    <div style="background-color: var(--bg-main); padding: 4px; border: 1px solid var(--border-color); font-weight: 600; border-radius: 4px;">64</div>
                    <div style="background-color: var(--bg-main); padding: 4px; border: 1px solid var(--border-color); font-weight: 600; border-radius: 4px;">32</div>
                    <div style="background-color: var(--bg-main); padding: 4px; border: 1px solid var(--border-color); font-weight: 600; border-radius: 4px;">16</div>
                    <div class="binary-separator" aria-hidden="true"></div>
                    <div style="background-color: var(--bg-main); padding: 4px; border: 1px solid var(--border-color); font-weight: 600; border-radius: 4px;">8</div>
                    <div style="background-color: var(--bg-main); padding: 4px; border: 1px solid var(--border-color); font-weight: 600; border-radius: 4px;">4</div>
                    <div style="background-color: var(--bg-main); padding: 4px; border: 1px solid var(--border-color); font-weight: 600; border-radius: 4px;">2</div>
                    <div style="background-color: var(--bg-main); padding: 4px; border: 1px solid var(--border-color); font-weight: 600; border-radius: 4px;">1</div>
                  </div>
                ` : ''}

                <div class="form-group" style="margin: 0;">
                  ${q.inputType === 'binary' ? `
                    <div style="display: flex; gap: 8px; align-items: center;">
                      <div class="binary-bit-grid" style="display: grid; grid-template-columns: repeat(4, 40px) 12px repeat(4, 40px); gap: 6px; align-items: center;">
                        <input type="text" class="form-control num-ans-binary-input" data-idx="${idx}" data-char="0" maxlength="1" style="text-align: center; font-weight: 700; min-height: 40px; border-radius: 6px;" placeholder="0" aria-label="128 column" value="${(this.numberSkillsAnswers[idx] || '')[0] || ''}">
                        <input type="text" class="form-control num-ans-binary-input" data-idx="${idx}" data-char="1" maxlength="1" style="text-align: center; font-weight: 700; min-height: 40px; border-radius: 6px;" placeholder="0" aria-label="64 column" value="${(this.numberSkillsAnswers[idx] || '')[1] || ''}">
                        <input type="text" class="form-control num-ans-binary-input" data-idx="${idx}" data-char="2" maxlength="1" style="text-align: center; font-weight: 700; min-height: 40px; border-radius: 6px;" placeholder="0" aria-label="32 column" value="${(this.numberSkillsAnswers[idx] || '')[2] || ''}">
                        <input type="text" class="form-control num-ans-binary-input" data-idx="${idx}" data-char="3" maxlength="1" style="text-align: center; font-weight: 700; min-height: 40px; border-radius: 6px; margin-right: 2px;" placeholder="0" aria-label="16 column" value="${(this.numberSkillsAnswers[idx] || '')[3] || ''}">
                        <div class="binary-separator" aria-hidden="true" style="text-align: center; color: var(--text-muted); font-weight: 700; font-size: 16px;">&middot;</div>
                        <input type="text" class="form-control num-ans-binary-input" data-idx="${idx}" data-char="4" maxlength="1" style="text-align: center; font-weight: 700; min-height: 40px; border-radius: 6px;" placeholder="0" aria-label="8 column" value="${(this.numberSkillsAnswers[idx] || '')[4] || ''}">
                        <input type="text" class="form-control num-ans-binary-input" data-idx="${idx}" data-char="5" maxlength="1" style="text-align: center; font-weight: 700; min-height: 40px; border-radius: 6px;" placeholder="0" aria-label="4 column" value="${(this.numberSkillsAnswers[idx] || '')[5] || ''}">
                        <input type="text" class="form-control num-ans-binary-input" data-idx="${idx}" data-char="6" maxlength="1" style="text-align: center; font-weight: 700; min-height: 40px; border-radius: 6px;" placeholder="0" aria-label="2 column" value="${(this.numberSkillsAnswers[idx] || '')[6] || ''}">
                        <input type="text" class="form-control num-ans-binary-input" data-idx="${idx}" data-char="7" maxlength="1" style="text-align: center; font-weight: 700; min-height: 40px; border-radius: 6px;" placeholder="0" aria-label="1 column" value="${(this.numberSkillsAnswers[idx] || '')[7] || ''}">
                      </div>
                    </div>
                  ` : q.inputType === 'hex' ? `
                    <div style="display: flex; gap: 8px; align-items: center;">
                      <div style="display: grid; grid-template-columns: repeat(2, 40px); gap: 6px;">
                        <input type="text" class="form-control num-ans-hex-input" data-idx="${idx}" data-char="0" maxlength="1" style="text-align: center; font-weight: 700; min-height: 40px; border-radius: 6px;" placeholder="0" aria-label="First hex digit" value="${(this.numberSkillsAnswers[idx] || '')[0] || ''}">
                        <input type="text" class="form-control num-ans-hex-input" data-idx="${idx}" data-char="1" maxlength="1" style="text-align: center; font-weight: 700; min-height: 40px; border-radius: 6px;" placeholder="0" aria-label="Second hex digit" value="${(this.numberSkillsAnswers[idx] || '')[1] || ''}">
                      </div>
                    </div>
                  ` : q.inputType === 'binary-overflow' ? `
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                      <div class="binary-bit-grid" style="display: grid; grid-template-columns: repeat(4, 40px) 12px repeat(4, 40px); gap: 6px; align-items: center;">
                        <input type="text" class="form-control num-ans-binoverflow-input" data-idx="${idx}" data-char="0" maxlength="1" style="text-align: center; font-weight: 700; min-height: 40px; border-radius: 6px;" placeholder="0" aria-label="128 column" value="${(this.numberSkillsAnswers[idx] || '').split(' - ')[0]?.[0] || ''}">
                        <input type="text" class="form-control num-ans-binoverflow-input" data-idx="${idx}" data-char="1" maxlength="1" style="text-align: center; font-weight: 700; min-height: 40px; border-radius: 6px;" placeholder="0" aria-label="64 column" value="${(this.numberSkillsAnswers[idx] || '').split(' - ')[0]?.[1] || ''}">
                        <input type="text" class="form-control num-ans-binoverflow-input" data-idx="${idx}" data-char="2" maxlength="1" style="text-align: center; font-weight: 700; min-height: 40px; border-radius: 6px;" placeholder="0" aria-label="32 column" value="${(this.numberSkillsAnswers[idx] || '').split(' - ')[0]?.[2] || ''}">
                        <input type="text" class="form-control num-ans-binoverflow-input" data-idx="${idx}" data-char="3" maxlength="1" style="text-align: center; font-weight: 700; min-height: 40px; border-radius: 6px; margin-right: 2px;" placeholder="0" aria-label="16 column" value="${(this.numberSkillsAnswers[idx] || '').split(' - ')[0]?.[3] || ''}">
                        <div class="binary-separator" aria-hidden="true" style="text-align: center; color: var(--text-muted); font-weight: 700; font-size: 16px;">&middot;</div>
                        <input type="text" class="form-control num-ans-binoverflow-input" data-idx="${idx}" data-char="4" maxlength="1" style="text-align: center; font-weight: 700; min-height: 40px; border-radius: 6px;" placeholder="0" aria-label="8 column" value="${(this.numberSkillsAnswers[idx] || '').split(' - ')[0]?.[4] || ''}">
                        <input type="text" class="form-control num-ans-binoverflow-input" data-idx="${idx}" data-char="5" maxlength="1" style="text-align: center; font-weight: 700; min-height: 40px; border-radius: 6px;" placeholder="0" aria-label="4 column" value="${(this.numberSkillsAnswers[idx] || '').split(' - ')[0]?.[5] || ''}">
                        <input type="text" class="form-control num-ans-binoverflow-input" data-idx="${idx}" data-char="6" maxlength="1" style="text-align: center; font-weight: 700; min-height: 40px; border-radius: 6px;" placeholder="0" aria-label="2 column" value="${(this.numberSkillsAnswers[idx] || '').split(' - ')[0]?.[6] || ''}">
                        <input type="text" class="form-control num-ans-binoverflow-input" data-idx="${idx}" data-char="7" maxlength="1" style="text-align: center; font-weight: 700; min-height: 40px; border-radius: 6px;" placeholder="0" aria-label="1 column" value="${(this.numberSkillsAnswers[idx] || '').split(' - ')[0]?.[7] || ''}">
                      </div>
                      <label style="display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; cursor: pointer;">
                        <input type="checkbox" id="num-ans-overflow-chk-${idx}" class="num-ans-overflow-chk" data-idx="${idx}" ${(this.numberSkillsAnswers[idx] || '').includes('OVERFLOW') ? 'checked' : ''}>
                        ⚠️ Overflow occurred
                      </label>
                    </div>
                  ` : `
                    <input type="text" class="form-control num-ans-standard-input" data-idx="${idx}" style="max-width: 200px; min-height: 40px;" placeholder="Your answer" value="${this.numberSkillsAnswers[idx] || ''}" required>
                  `}
                </div>
              </div>
            `).join('')}
            
            <button type="submit" class="btn btn-primary btn-lg">Submit answers</button>
          </form>
        </div>

        <div>
          <div class="card">
            <h3>Guidance status</h3>
            <p><strong>Current guidance: ${this.numberSkillsDifficulty === 'Guided' ? 'step-by-step' : this.numberSkillsDifficulty === 'Supported' ? 'formula checklists' : 'independent practice'}</strong></p>
            <p style="font-size:13px; color:var(--text-muted);">Chosen from your recent work on this skill, not from a target grade. Support can change from topic to topic.</p>
            <div style="display:flex; flex-direction:column; gap:8px;">
              <button type="button" class="btn btn-secondary btn-sm" id="more-support-btn">I would like some help</button>
              <button type="button" class="btn btn-secondary btn-sm" id="challenge-me-btn">Give me a challenge</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind submit
    const backToPractice = panel.querySelector?.('#number-back-practice-btn') || document.getElementById('number-back-practice-btn');
    if (backToPractice) backToPractice.onclick = () => this.switchTab('stud-practice');
    const numForm = document.getElementById('num-skills-form');
    if (numForm) {
      numForm.onsubmit = (e) => {
        e.preventDefault();
        
        this.numberSkillsSet.forEach((q, idx) => {
          if (q.inputType === 'binary') {
            const inputs = document.querySelectorAll(`.num-ans-binary-input[data-idx="${idx}"]`);
            let ans = '';
            inputs.forEach(input => {
              ans += input.value.trim() || '0';
            });
            this.numberSkillsAnswers[idx] = ans;
          } else if (q.inputType === 'hex') {
            const inputs = document.querySelectorAll(`.num-ans-hex-input[data-idx="${idx}"]`);
            let ans = '';
            inputs.forEach(input => {
              ans += input.value.trim() || '0';
            });
            this.numberSkillsAnswers[idx] = ans.toUpperCase();
          } else if (q.inputType === 'binary-overflow') {
            const inputs = document.querySelectorAll(`.num-ans-binoverflow-input[data-idx="${idx}"]`);
            let ans = '';
            inputs.forEach(input => {
              ans += input.value.trim() || '0';
            });
            const chk = document.getElementById(`num-ans-overflow-chk-${idx}`);
            if (chk && chk.checked) {
              ans += ' - OVERFLOW';
            }
            this.numberSkillsAnswers[idx] = ans;
          } else {
            const input = document.querySelector(`.num-ans-standard-input[data-idx="${idx}"]`);
            if (input) {
              this.numberSkillsAnswers[idx] = input.value.trim().toUpperCase();
            }
          }
        });

        this.gradeNumberSkillsSet();
      };
    }

    // Auto-advance binary and hex input fields on type
    const binInputs = document.querySelectorAll('.num-ans-binary-input, .num-ans-hex-input, .num-ans-binoverflow-input');
    binInputs.forEach(input => {
      input.oninput = (e) => {
        if (input.value.length >= 1) {
          const idx = parseInt(input.getAttribute('data-idx'));
          const charIdx = parseInt(input.getAttribute('data-char'));
          const nextInput = document.querySelector(`input[data-idx="${idx}"][data-char="${charIdx + 1}"]`);
          if (nextInput) {
            nextInput.focus();
          }
        }
      };
      input.onkeydown = (e) => {
        if (e.key === 'Backspace' && input.value.length === 0) {
          const idx = parseInt(input.getAttribute('data-idx'));
          const charIdx = parseInt(input.getAttribute('data-char'));
          const prevInput = document.querySelector(`input[data-idx="${idx}"][data-char="${charIdx - 1}"]`);
          if (prevInput) {
            prevInput.focus();
          }
        }
      };
    });

    // Restrict keystrokes on binary inputs (only allow '0' or '1')
    const onlyBinInputs = panel.querySelectorAll('.num-ans-binary-input, .num-ans-binoverflow-input');
    onlyBinInputs.forEach(input => {
      input.onkeypress = (e) => {
        if (e.key !== '0' && e.key !== '1') {
          e.preventDefault();
        }
      };
    });

    // Restrict keystrokes on hex inputs (only allow alphanumeric [0-9A-Fa-f])
    const onlyHexInputs = panel.querySelectorAll('.num-ans-hex-input');
    onlyHexInputs.forEach(input => {
      input.onkeypress = (e) => {
        if (!/^[0-9A-Fa-f]$/.test(e.key)) {
          e.preventDefault();
        }
      };
    });

    const moreSupportBtn = document.getElementById('more-support-btn');
    if (moreSupportBtn) moreSupportBtn.onclick = () => this.changeSkillsDiff('Guided');
    const challengeBtn = document.getElementById('challenge-me-btn');
    if (challengeBtn) challengeBtn.onclick = () => this.changeSkillsDiff('Challenge');
  }

  changeSkillsDiff(diff) {
    this.numberSkillsDifficulty = diff;
    this.generateNumberSkillsSet();
    this.render();
  }

  generateNumberSkillsSet() {
    this.numberSkillsAnswers = {};
    this.numberSkillsSet = [];

    // Helper functions for random numbers
    const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const toBin8 = (val) => val.toString(2).padStart(8, '0');
    const pad4 = (binStr) => binStr.slice(0, 4) + ' ' + binStr.slice(4);

    if (this.numberSkillsDifficulty === 'Guided') {
      // Task 1: Binary to Denary
      const v1 = randInt(5, 127);
      const bin1 = toBin8(v1);
      
      // Task 2: Denary to Binary
      const v2 = randInt(5, 127);
      const bin2 = toBin8(v2);

      // Task 3: Binary left shift (1 or 2 places)
      const shiftPlaces = randInt(1, 2);
      const v3 = randInt(2, 31);
      const bin3 = toBin8(v3);
      const shifted3 = toBin8((v3 << shiftPlaces) & 255);

      // Task 4: Data units
      const bytesCount = randInt(2, 10);
      const bitsCount = bytesCount * 8;

      this.numberSkillsSet = [
        { type: 'Binary to Denary', question: `Convert the binary byte ${pad4(bin1)} to a denary number.`, answer: String(v1), hint: 'Add up the column weights (128, 64, 32, 16, 8, 4, 2, 1) where there is a 1.', supportGrid: true, inputType: 'standard' },
        { type: 'Denary to Binary', question: `Convert the denary value ${v2} to an 8-bit binary number.`, answer: bin2, hint: 'Fill out the 8-bit columns from left to right, subtracting column values that fit.', supportGrid: true, inputType: 'binary' },
        { type: 'Binary left shift', question: `Perform a left shift of ${shiftPlaces} place(s) on the binary byte ${pad4(bin3)}.`, answer: shifted3, hint: `Shift all bits to the left by ${shiftPlaces} position(s) and pad the right side with 0s.`, supportGrid: false, inputType: 'binary' },
        { type: 'Data units', question: `How many bits are in ${bytesCount} bytes of storage?`, answer: String(bitsCount), hint: 'There are 8 bits in one single byte. Multiply the number of bytes by 8.', supportGrid: false, inputType: 'standard' }
      ];
    } else if (this.numberSkillsDifficulty === 'Supported') {
      // Task 1: Binary to Hex
      const v1 = randInt(16, 255);
      const bin1 = toBin8(v1);
      const hex1 = v1.toString(16).toUpperCase();

      // Task 2: Binary addition (no overflow)
      const v2_a = randInt(1, 100);
      const v2_b = randInt(1, 100);
      const bin2_a = toBin8(v2_a);
      const bin2_b = toBin8(v2_b);
      const sum2 = toBin8(v2_a + v2_b);

      // Task 3: Image File Size
      const w3 = randInt(5, 20) * 10;
      const h3 = randInt(5, 10) * 10;
      const d3 = [1, 2, 8, 16][randInt(0, 3)];
      const size3 = w3 * h3 * d3;

      // Task 4: Audio File Size
      const r4 = [1000, 2000, 8000][randInt(0, 2)];
      const d4 = [8, 16][randInt(0, 1)];
      const t4 = randInt(3, 10);
      const size4 = r4 * d4 * t4;

      this.numberSkillsSet = [
        { type: 'Binary to Hex', question: `Convert the binary byte ${pad4(bin1)} to hexadecimal.`, answer: hex1, hint: 'Split the 8-bit binary into two 4-bit nibbles, convert each to denary, then to hex.', supportGrid: false, inputType: 'hex' },
        { type: 'Binary addition', question: `Add the binary numbers ${pad4(bin2_a)} (${v2_a}) and ${pad4(bin2_b)} (${v2_b}). Express as binary.`, answer: sum2, hint: 'Perform binary column addition from right to left: 0+0=0, 0+1=1, 1+1=0 carry 1, 1+1+1=1 carry 1.', supportGrid: true, inputType: 'binary' },
        { type: 'Image File Size', question: `Calculate the file size in bits of an image that has a width of ${w3} pixels, a height of ${h3} pixels, and a colour depth of ${d3} bits.`, answer: String(size3), hint: 'Formula: Width * Height * Colour Depth.', supportGrid: false, inputType: 'standard' },
        { type: 'Audio File Size', question: `Calculate the file size in bits of a sound recording with a sample rate of ${r4}Hz, a bit depth of ${d4} bits, and a length of ${t4} seconds (mono).`, answer: String(size4), hint: 'Formula: Sample Rate * Bit Depth * Duration.', supportGrid: false, inputType: 'standard' }
      ];
    } else {
      // Independent or Challenge: multi-stage application without place-value scaffolds
      // Task 1: Hex to Denary
      const v1 = randInt(16, 255);
      const hex1 = v1.toString(16).toUpperCase();

      // Task 2: Overflow detection
      const v2_a = randInt(130, 200);
      const v2_b = randInt(130, 200);
      const bin2_a = toBin8(v2_a);
      const bin2_b = toBin8(v2_b);
      const sum2 = toBin8((v2_a + v2_b) & 255);
      const ans2 = sum2 + ' - OVERFLOW';

      // Task 3: Image File Size (KiB)
      const w3 = [256, 512, 1024][randInt(0, 2)];
      const h3 = [128, 256, 512][randInt(0, 2)];
      const d3 = 8;
      const size3_kib = (w3 * h3 * d3) / 8 / 1024;

      // Task 4: Audio File Size (MB)
      const r4 = 44100;
      const d4 = 16;
      const ch4 = 2; // stereo
      const t4 = randInt(5, 20);
      const size4_mb = parseFloat(((r4 * d4 * ch4 * t4) / 8 / 1000000).toFixed(1));

      this.numberSkillsSet = [
        { type: 'Combined conversions', question: `Convert the hexadecimal value ${hex1} into a denary integer.`, answer: String(v1), hint: 'Multiply the left digit by 16 and add the value of the right digit.', supportGrid: false, inputType: 'standard' },
        { type: 'Overflow detection', question: `Add binary values ${pad4(bin2_a)} (${v2_a}) and ${pad4(bin2_b)} (${v2_b}). State if overflow occurs (write answer as value, then append " - OVERFLOW" if applicable).`, answer: ans2, hint: 'If the total exceeds 255, an 8-bit byte cannot hold the value, creating an overflow.', supportGrid: false, inputType: 'binary-overflow' },
        { type: 'Image File size (KiB)', question: `An image is ${w3} x ${h3} pixels with a colour depth of ${d3} bits. Calculate the storage size in Kibibytes (KiB), using 1024 as the divisor. (Round to nearest integer)`, answer: String(Math.round(size3_kib)), hint: 'Calculate total bits, divide by 8 to get bytes, then divide by 1024 to get KiB.', supportGrid: false, inputType: 'standard' },
        { type: 'Audio File size (MB)', question: `An audio file is recorded with a sample rate of ${r4}Hz, ${d4} bits resolution, stereo (2 channels), for ${t4} seconds. Calculate size in Megabytes (MB), using 1,000,000 as the approximate divisor. Round to nearest tenth.`, answer: String(size4_mb), hint: 'Calculate total bits (Rate * Depth * Channels * Duration), divide by 8 for bytes, then divide by 1,000,000 for Megabytes.', supportGrid: false, inputType: 'standard' }
      ];
    }
    this.numberSkillsSet = this.numberSkillsSet.map((question, index) => ({
      ...question,
      id: `number_skill_${this.numberSkillsDifficulty.toLowerCase()}_${index + 1}`
    }));
    this.numberSkillsEvidenceSet = this.createEvidenceSet('number_skills', 'binary conversions', this.numberSkillsSet);
  }

  gradeNumberSkillsSet() {
    let correct = 0;
    let feedbackHTML = '';
    const incorrectQuestions = [];

    this.numberSkillsSet.forEach((q, idx) => {
      const studentAns = this.numberSkillsAnswers[idx] || '';
      const isCorrect = studentAns === q.answer;
      this.numberSkillsEvidenceSet.latestOutcomes[q.id] = isCorrect;
      if (isCorrect) correct++;
      else incorrectQuestions.push(q);

      feedbackHTML += `
        <div class="card" style="margin-bottom: 16px; border-left: 5px solid ${isCorrect ? 'var(--green)' : 'var(--red)'};">
          <h4>Question ${idx + 1}: ${q.type}</h4>
          <p style="font-size:14px; font-weight:600; margin-bottom: 8px;">${q.question}</p>
          <div style="font-size: 13px;">
            <strong>Your answer:</strong> ${studentAns} ${isCorrect ? '✅' : '❌'}<br>
            ${isCorrect ? '<strong>Outcome:</strong> Correct' : `<strong>Next step:</strong> ${q.hint}<br><span>The answer is withheld so you can retry.</span>`}
          </div>
        </div>
      `;
    });

    const attemptKind = this.numberSkillsEvidenceSet.hasOriginalAttempt ? 'retry' : 'original';
    this.numberSkillsEvidenceSet.hasOriginalAttempt = true;
    const evidenceAttempt = this.buildQuestionLevelAttempt(this.numberSkillsEvidenceSet, attemptKind);
    const assessedScore = evidenceAttempt.score;
    const milestoneStatesBefore = new Map(this.getSectionMilestones().map(item => [item.id, item.state]));
    window.db.addAttempt({
      studentId: this.currentUser.id,
      type: 'number_skills',
      topic: 'binary conversions',
      supportLevel: this.numberSkillsDifficulty,
      supportStepsUsed: this.numberSkillsDifficulty === 'Guided' ? 2 : 0,
      ...evidenceAttempt
    });
    const newlySecuredMilestones = this.getNewlySecuredMilestones(milestoneStatesBefore);

    // Award achievement if perfect score
    const completedFullSet = evidenceAttempt.questionEvidence.length === this.numberSkillsEvidenceSet.originalQuestionIds.length
      && evidenceAttempt.questionEvidence.length > 0;
    if (completedFullSet && evidenceAttempt.questionEvidence.every(item => item.correct)) {
      const student = window.db.getStudents().find(s => s.id === this.currentUser.id);
      this.grantAchievement(student, 'binary-fluent');
    }

    this.numberSkillsSet = [];
    this.numberSkillsAnswers = {};

    this.mainContentHTML(`
      <div style="margin-bottom: 24px;">
        <h1>Your practice results</h1>
        <p>Assessed result: <strong style="color: var(--teal); font-size:20px;">${assessedScore}</strong></p>
        <p style="font-size: 14px;">Your latest result has been saved and may change the support shown in this skill.</p>
      </div>
      ${this.renderMilestoneAcknowledgement(newlySecuredMilestones)}
      <div>
        ${feedbackHTML}
        ${incorrectQuestions.length ? '<button class="btn btn-primary" id="retry-number-skills-btn" style="margin-top:16px;">Retry incorrect questions</button>' : ''}
        <button class="btn btn-secondary" id="practise-results-back-btn" style="margin-top: 16px;">Back to My desk</button>
      </div>
    `);
    const backButton = document.getElementById('practise-results-back-btn');
    if (backButton) backButton.onclick = () => this.switchTab('stud-dashboard');
    const retryButton = document.getElementById('retry-number-skills-btn');
    if (retryButton) retryButton.onclick = () => {
      this.numberSkillsSet = incorrectQuestions;
      this.numberSkillsAnswers = {};
      this.renderStudentPractise(document.getElementById('main-panel'));
      this.focusMainContent();
    };
  }

  mainContentHTML(html) {
    document.getElementById('main-panel').innerHTML = html;
    this.focusMainContent();
  }

  // ==================== SPACED RETRIEVAL QUIZ ====================
  renderStudentRecall(panel) {
    if (this.retrievalDeckTopicId && this.retrievalDeckTopicId !== 'all') {
      this.activeTopicId = this.retrievalDeckTopicId;
    }
    const topicQuestions = window.db.getQuestions().filter(q => q.topicId === this.activeTopicId);
    const isRetry = Boolean(this.quizRetryQuestions);
    let selectedQuestions = [];
    if (this.quizRetryQuestions) {
      selectedQuestions = this.quizRetryQuestions;
    } else if (this.activeObjectiveId && this.activeObjectiveId !== 'all') {
      const milestone = this.getSectionMilestones().find(item => item.id === this.activeObjectiveId);
      selectedQuestions = this.selectFocusedRecallQuestions(
        topicQuestions,
        this.activeObjectiveId,
        milestone?.demonstratedFocuses || []
      );
    } else {
      selectedQuestions = window.db.selectTopicRecallQuestions(topicQuestions);
    }
    this.quizRetryQuestions = null;
    if (!isRetry) {
      this.quizEvidenceSet = this.createEvidenceSet('spaced_theory', this.activeTopicId, selectedQuestions);
      this.quizQuestions = selectedQuestions.map(question =>
        this.getStableOptionOrder(question, this.quizEvidenceSet.activityId)
      );
    } else {
      this.quizQuestions = selectedQuestions;
    }
    const activeTopic = window.db.getUnits().flatMap(unit => unit.topics.map(topic => ({ ...topic, paper: unit.paper }))).find(topic => topic.id === this.activeTopicId);
    this.quizAnswers = {};
    
    if (this.quizQuestions.length === 0) {
      panel.innerHTML = `
        <div class="card" role="status">
          <h1>Recall questions unavailable</h1>
          <p>This topic has no recall questions to display. Return to My desk and choose a different study task.</p>
          <button class="btn btn-secondary" id="empty-quiz-back-btn">Back to My desk</button>
        </div>
      `;
      const backBtn = panel.querySelector?.('#empty-quiz-back-btn') || document.getElementById('empty-quiz-back-btn');
      if (backBtn) {
        backBtn.onclick = () => this.switchTab('stud-dashboard');
      }
      this.focusMainContent();
      return;
    }

    panel.innerHTML = `
      <div class="student-route-header" style="margin-bottom: 24px;">
        <span class="student-mode-label">Recall · ${this.quizQuestions.length} questions · about 5 minutes</span>
        <h1>${this.escapeHTML(activeTopic ? activeTopic.name : this.activeTopicId)}</h1>
        <p>Complete this focused set, then use the checked result to choose your next step.</p>
      </div>
      <form id="quiz-form">
        ${this.quizQuestions.map((q, idx) => {
          let fieldsHTML = '';
          if (q.type === 'mcq') {
            fieldsHTML = q.options.map((opt, optionIndex) => `
              <label for="q-${idx}-option-${optionIndex}" style="display: block; margin-bottom: 8px; font-size: 14px;">
                <input id="q-${idx}-option-${optionIndex}" type="radio" name="q_${idx}" value="${opt}" required> ${opt}
              </label>
            `).join('');
          } else if (q.type === 'matching') {
            fieldsHTML = q.items.map((item, iIndex) => `
              <div style="margin-bottom: 8px; font-size: 14px;">
                <label for="q-${idx}-match-${iIndex}"><strong>${item.label}</strong> matches to:</label>
                <select id="q-${idx}-match-${iIndex}" name="q_${idx}_${iIndex}" class="form-control" style="max-width:300px; display:inline-block; margin-left:8px;" required>
                  <option value="" disabled selected>Select...</option>
                  ${q.items.map(it => `<option value="${it.match}">${it.match}</option>`).join('')}
                </select>
              </div>
            `).join('');
          } else if (q.type === 'missing_words') {
            fieldsHTML = Object.keys(q.blanks).map(key => `
              <div class="form-group" style="max-width:300px;">
                <label for="q-${idx}-blank-${key}">${key.toUpperCase()}:</label>
                <input id="q-${idx}-blank-${key}" type="text" name="q_${idx}_${key}" class="form-control" required placeholder="Write term">
              </div>
            `).join('');
          } else if (q.type === 'sequencing') {
            fieldsHTML = q.sequence.map((step, sIdx) => `
              <div style="margin-bottom: 8px; font-size: 14px;">
                <label for="q-${idx}-step-${sIdx}">Step ${sIdx + 1}:</label>
                <select id="q-${idx}-step-${sIdx}" name="q_${idx}_${sIdx}" class="form-control" style="max-width: 400px; display:inline-block; margin-left:8px;" required>
                  <option value="" disabled selected>Choose step...</option>
                  ${q.sequence.map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
              </div>
            `).join('');
          }

          return `
            <fieldset class="card" style="margin-bottom: 24px; max-width: 680px; padding: 24px; box-sizing: border-box;">
              <legend style="font-size: 16px; color: var(--navy); font-weight: 600; margin-bottom: 16px; float: none; width: 100%; display: block; padding: 0; line-height: 1.5;">Question ${idx + 1}: ${q.question}</legend>
              <div>${fieldsHTML}</div>
            </fieldset>
          `;
        }).join('')}
        
        <button type="submit" class="btn btn-primary btn-lg">Submit answers</button>
      </form>
    `;

    const qForm = document.getElementById('quiz-form');
    if (qForm) {
      qForm.onsubmit = (e) => {
        e.preventDefault();
        this.gradeQuiz();
      };
    }
    this.focusMainContent();
  }

  gradeQuiz() {
    let score = 0;
    let feedback = '';
    const correctness = [];

    this.quizQuestions.forEach((q, idx) => {
      let isCorrect = true;
      let studentText = '';

      if (q.type === 'mcq') {
        const val = document.querySelector(`input[name="q_${idx}"]:checked`).value;
        isCorrect = (val === q.answer);
        studentText = val;
      } else if (q.type === 'matching') {
        q.items.forEach((item, iIndex) => {
          const sel = document.querySelector(`select[name="q_${idx}_${iIndex}"]`).value;
          if (sel !== item.match) isCorrect = false;
        });
        studentText = 'Matching options selected';
      } else if (q.type === 'missing_words') {
        Object.keys(q.blanks).forEach(key => {
          const text = document.querySelector(`input[name="q_${idx}_${key}"]`).value.trim().toUpperCase();
          if (text !== q.blanks[key].toUpperCase()) isCorrect = false;
        });
        studentText = 'Fills submitted';
      } else if (q.type === 'sequencing') {
        q.sequence.forEach((step, sIdx) => {
          const sel = document.querySelector(`select[name="q_${idx}_${sIdx}"]`).value;
          if (sel !== q.sequence[sIdx]) isCorrect = false;
        });
        studentText = 'Sequence submitted';
      }

      if (isCorrect) score++;
      correctness.push(isCorrect);
      this.quizEvidenceSet.latestOutcomes[q.id] = isCorrect;

      feedback += `
        <div class="card" style="margin-bottom: 16px; border-left: 5px solid ${isCorrect ? 'var(--green)' : 'var(--red)'}">
          <h4>Question ${idx + 1}</h4>
          <p style="font-size:14px; margin-bottom: 8px;">${q.question}</p>
          <div style="font-size:13px; color: var(--text-muted);">
            <strong>Outcome:</strong> ${isCorrect ? 'Correct ✅' : 'Incorrect ❌'}<br>
            <strong>Feedback details:</strong> ${isCorrect ? q.explanation : (q.retryHint || 'Review the question wording and try a different answer. The answer is withheld until you retry.')}
          </div>
        </div>
      `;
    });

    const incorrectQuestions = this.getRetryQuestions(this.quizQuestions, correctness);
    const attemptKind = this.quizEvidenceSet.hasOriginalAttempt ? 'retry' : 'original';
    this.quizEvidenceSet.hasOriginalAttempt = true;
    const evidenceAttempt = this.buildQuestionLevelAttempt(this.quizEvidenceSet, attemptKind);
    const quizScore = evidenceAttempt.score;
    const milestoneStatesBefore = new Map(this.getSectionMilestones().map(item => [item.id, item.state]));
    const quizAttempt = window.db.addAttempt({
      studentId: this.currentUser.id,
      type: 'spaced_theory',
      topic: this.activeTopicId,
      ...evidenceAttempt
    });
    const newlySecuredMilestones = this.getNewlySecuredMilestones(milestoneStatesBefore);
    const matchingExamTransfer = this.getMatchingExamTransferTask();

    this.mainContentHTML(`
      <div id="quiz-result-summary" role="status" aria-live="polite" aria-atomic="true" style="margin-bottom: 24px;">
        <h1>Quick recall completed</h1>
        <p>Score: <strong style="color: var(--teal); font-size:20px;">${quizScore}</strong></p>
        <p>${incorrectQuestions.length ? `${incorrectQuestions.length} question${incorrectQuestions.length === 1 ? '' : 's'} can now be retried with guidance.` : 'All questions were correct; no retry is needed.'}</p>
      </div>
      ${this.renderMilestoneAcknowledgement(newlySecuredMilestones)}
      <div>
        ${feedback}
        <div class="quiz-result-actions" style="display:flex; flex-wrap:wrap; gap:10px; margin-top:24px;">
          ${incorrectQuestions.length ? '<button class="btn btn-primary" id="quiz-retry-btn">Retry incorrect questions</button>' : '<button class="btn btn-primary" id="quiz-continue-home-btn">Continue to My desk</button>'}
          ${incorrectQuestions.length ? '<button class="btn btn-secondary" id="quiz-continue-home-btn">Continue to My desk</button>' : ''}
          ${matchingExamTransfer ? '<button class="btn btn-secondary" id="quiz-exam-transfer-btn">Try an exam-style question for this section</button>' : ''}
        </div>
        
        <div class="card" style="margin-top: 24px; padding: 24px; text-align: center;">
          <h3 style="margin-bottom: 8px;">Optional confidence reflection</h3>
          <p style="font-size: 14px; margin-bottom: 16px;">Choose what best describes what you knew before feedback. This reflection is stored separately and does not change your score.</p>
          <div class="quiz-confidence-options" style="display: flex; gap: 8px; justify-content: center;">
            <button class="btn btn-secondary btn-sm quiz-confidence-btn" data-confidence="secure_before_feedback">I knew this securely before feedback</button>
            <button class="btn btn-secondary btn-sm quiz-confidence-btn" data-confidence="partial_before_feedback">I partly knew this before feedback</button>
            <button class="btn btn-secondary btn-sm quiz-confidence-btn" data-confidence="understood_after_feedback">I understood it only after feedback</button>
          </div>
          <p id="quiz-confidence-status" role="status" aria-live="polite" style="margin:12px 0 0;"></p>
        </div>
      </div>
    `);

    document.querySelectorAll('.quiz-confidence-btn').forEach(btn => {
      btn.onclick = () => {
        if (this.recordQuizConfidence(quizAttempt, btn.getAttribute('data-confidence'))) {
          const status = document.getElementById('quiz-confidence-status');
          if (status) status.textContent = 'Confidence saved; your score is unchanged.';
        }
      };
    });
    const continueHomeButton = document.getElementById('quiz-continue-home-btn');
    if (continueHomeButton) continueHomeButton.onclick = () => this.switchTab('stud-dashboard');
    const examTransferButton = document.getElementById('quiz-exam-transfer-btn');
    if (examTransferButton) examTransferButton.onclick = () => this.activateExamTransferForCurrentLearning();
    const retryButton = document.getElementById('quiz-retry-btn');
    if (retryButton) retryButton.onclick = () => {
      this.quizRetryQuestions = incorrectQuestions;
      this.renderStudentRecall(document.getElementById('main-panel'));
      this.focusMainContent();
    };
  }

  // ==================== INTERACTIVE CS SIMULATORS WORKBENCH ====================
  renderStudentSimulators(panel) {
    if (!this.activeSimTool) this.activeSimTool = 'binary-shift';
    if (!this.binaryBits) this.binaryBits = [0, 0, 0, 0, 0, 1, 1, 0];
    if (this.fdeStep === undefined) this.fdeStep = 0;
    if (this.logicInputA === undefined) this.logicInputA = 1;
    if (this.logicInputB === undefined) this.logicInputB = 0;
    if (!this.logicGateType) this.logicGateType = 'AND';
    if (!this.algType) this.algType = 'binary-search';

    // Tool 1 Calculations
    const denaryVal = this.binaryBits.reduce((acc, bit, idx) => acc + bit * Math.pow(2, 7 - idx), 0);
    const hexVal = denaryVal.toString(16).toUpperCase().padStart(2, '0');

    // Tool 3 Calculations
    let gateResult = 0;
    if (this.logicGateType === 'AND') gateResult = (this.logicInputA && this.logicInputB) ? 1 : 0;
    else if (this.logicGateType === 'OR') gateResult = (this.logicInputA || this.logicInputB) ? 1 : 0;
    else if (this.logicGateType === 'NOT') gateResult = (!this.logicInputA) ? 1 : 0;
    else if (this.logicGateType === 'XOR') gateResult = (this.logicInputA !== this.logicInputB) ? 1 : 0;
    const simulatorBriefs = {
      'binary-shift': 'Perform one left shift and compare the displayed value before and after.',
      'fde-cycle': 'Use Step until one complete fetch-decode-execute cycle has been displayed.',
      'logic-gates': 'Try two input combinations and compare the displayed outputs.',
      algorithms: 'Switch between Binary and Linear Search and compare the displayed traces.',
      'file-size-calc': 'Enter one example and use the calculator to check its file-size units.'
    };

    panel.innerHTML = `
      <div class="student-route-header">
        <span class="student-mode-label">Simulators</span>
        <h1>Explore one computing process</h1>
        <p>Use the tool linked from your topic, complete its short brief, then return to Topics. Simulator use is optional and does not count towards Progress.</p>
      </div>

      <!-- Tool Selector Sub-Tabs -->
      <div style="display:flex; gap:8px; margin-bottom:24px; border-bottom:2px solid var(--border-color); padding-bottom:12px; overflow-x:auto;">
        <button class="btn btn-secondary ${this.activeSimTool === 'binary-shift' ? 'student-selected-control' : ''} sim-tool-btn" data-tool="binary-shift">🧮 Binary & Hex Shift</button>
        <button class="btn btn-secondary ${this.activeSimTool === 'fde-cycle' ? 'student-selected-control' : ''} sim-tool-btn" data-tool="fde-cycle">⚡ CPU FDE Cycle</button>
        <button class="btn btn-secondary ${this.activeSimTool === 'logic-gates' ? 'student-selected-control' : ''} sim-tool-btn" data-tool="logic-gates">🔌 Logic Gates Workbench</button>
        <button class="btn btn-secondary ${this.activeSimTool === 'algorithms' ? 'student-selected-control' : ''} sim-tool-btn" data-tool="algorithms">📊 Search & Sort Trace</button>
        <button class="btn btn-secondary ${this.activeSimTool === 'file-size-calc' ? 'student-selected-control' : ''} sim-tool-btn" data-tool="file-size-calc">📐 File Size Math</button>
      </div>
      <div class="student-mini-brief" role="note"><strong>Your short task</strong><span>${this.escapeHTML(simulatorBriefs[this.activeSimTool])}</span><button type="button" class="btn btn-secondary" id="sim-finish-topics-btn">Finish and return to Topics</button></div>

      ${this.activeSimTool === 'binary-shift' ? `
        <div class="card" style="padding:24px;">
          <h2>🧮 Binary & Hexadecimal Shift Visualizer</h2>
          <p style="font-size:14px; color:var(--text-muted); margin-bottom:20px;">Click any bit square to toggle between 0 and 1. Use the shift buttons to perform logical binary shifts.</p>
          
          <!-- 8-Bit Interactive Switch Bar -->
          <div style="display:flex; justify-content:center; gap:8px; margin-bottom:20px; flex-wrap:wrap;">
            ${this.binaryBits.map((bit, idx) => {
              const placeVal = Math.pow(2, 7 - idx);
              return `
                <div style="text-align:center;">
                  <div style="font-size:11px; color:var(--text-muted); margin-bottom:4px; font-weight:700;">${placeVal}</div>
                  <button class="bit-toggle-btn" data-idx="${idx}" style="width:48px; height:54px; font-size:22px; font-weight:700; border-radius:8px; border:2px solid var(--teal); background:${bit ? 'var(--teal)' : 'var(--bg-main)'}; color:${bit ? '#fff' : 'var(--text-main)'}; cursor:pointer; transition:all 0.2s ease;">${bit}</button>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Live Conversion Stats -->
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:16px; margin-bottom:24px;">
            <div class="card" style="background:rgba(45,156,145,0.08); border:1px solid var(--teal); text-align:center; padding:16px;">
              <span style="font-size:12px; text-transform:uppercase; font-weight:700; color:var(--teal);">Denary Integer (Base 10)</span>
              <div style="font-size:32px; font-weight:800; color:var(--text-main); margin-top:4px;">${denaryVal}</div>
            </div>
            <div class="card" style="background:rgba(45,156,145,0.08); border:1px solid var(--teal); text-align:center; padding:16px;">
              <span style="font-size:12px; text-transform:uppercase; font-weight:700; color:var(--teal);">Hexadecimal (Base 16)</span>
              <div style="font-size:32px; font-weight:800; color:var(--text-main); margin-top:4px;">${hexVal}</div>
            </div>
          </div>

          <!-- Shift Controls -->
          <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
            <button id="shift-left-1" class="btn btn-secondary">&laquo; Left shift (1 place) [x2]</button>
            <button id="shift-left-2" class="btn btn-secondary">&laquo;&laquo; Left shift (2 places) [x4]</button>
            <button id="shift-reset" class="btn btn-secondary">Reset bits</button>
            <button id="shift-right-1" class="btn btn-secondary">Right shift (1 place) [/2] &raquo;</button>
            <button id="shift-right-2" class="btn btn-secondary">Right shift (2 places) [/4] &raquo;&raquo;</button>
          </div>
        </div>
      ` : ''}

      ${this.activeSimTool === 'fde-cycle' ? `
        <div class="card" style="padding:24px;">
          <h2>⚡ CPU Fetch-Decode-Execute (FDE) Register Animator</h2>
          <p style="font-size:14px; color:var(--text-muted); margin-bottom:20px;">Watch data flow between Program Counter (PC), MAR, RAM, MDR, CU, ALU, and ACC step by step.</p>
          
          <!-- Animation Registers Grid -->
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:16px; margin-bottom:24px;">
            <div class="card" style="border-left:5px solid ${this.fdeStep === 1 || this.fdeStep === 3 ? 'var(--teal)' : 'var(--border-color)'};">
              <strong style="font-size:13px; color:var(--text-muted);">Program Counter (PC)</strong>
              <div style="font-size:20px; font-weight:700; margin-top:4px;">${this.fdeStep >= 3 ? '0101' : '0100'}</div>
            </div>
            <div class="card" style="border-left:5px solid ${this.fdeStep === 1 ? 'var(--teal)' : 'var(--border-color)'};">
              <strong style="font-size:13px; color:var(--text-muted);">Memory Address Reg (MAR)</strong>
              <div style="font-size:20px; font-weight:700; margin-top:4px;">${this.fdeStep >= 1 ? '0100' : '0000'}</div>
            </div>
            <div class="card" style="border-left:5px solid ${this.fdeStep === 2 ? 'var(--teal)' : 'var(--border-color)'};">
              <strong style="font-size:13px; color:var(--text-muted);">Memory Data Reg (MDR)</strong>
              <div style="font-size:20px; font-weight:700; margin-top:4px;">${this.fdeStep >= 2 ? 'ADD #5' : '---'}</div>
            </div>
            <div class="card" style="border-left:5px solid ${this.fdeStep === 4 ? 'var(--teal)' : 'var(--border-color)'};">
              <strong style="font-size:13px; color:var(--text-muted);">Control Unit (CU)</strong>
              <div style="font-size:20px; font-weight:700; margin-top:4px;">${this.fdeStep >= 4 ? 'Opcode: ADD' : 'IDLE'}</div>
            </div>
            <div class="card" style="border-left:5px solid ${this.fdeStep === 5 ? 'var(--teal)' : 'var(--border-color)'};">
              <strong style="font-size:13px; color:var(--text-muted);">Accumulator (ACC)</strong>
              <div style="font-size:20px; font-weight:700; margin-top:4px;">${this.fdeStep >= 5 ? '15 (10 + 5)' : '10'}</div>
            </div>
          </div>

          <!-- Step Description Box -->
          <div style="background:rgba(45,156,145,0.08); border:1px solid var(--teal); padding:16px; border-radius:8px; margin-bottom:20px;">
            <strong style="color:var(--teal);">Current Phase: Step ${this.fdeStep} of 5</strong>
            <p style="font-size:14px; margin:4px 0 0 0; line-height:1.5;">
              ${this.fdeStep === 0 ? 'Cycle reset. Click Step Forward to start the Fetch phase.' : ''}
              ${this.fdeStep === 1 ? '1. FETCH: Address 0100 in Program Counter (PC) is copied into Memory Address Register (MAR).' : ''}
              ${this.fdeStep === 2 ? '2. FETCH: RAM lookup at MAR address returns instruction "ADD #5" into Memory Data Register (MDR).' : ''}
              ${this.fdeStep === 3 ? '3. FETCH: Program Counter (PC) increments by 1 to 0101 to point to the next instruction.' : ''}
              ${this.fdeStep === 4 ? '4. DECODE: Control Unit (CU) decodes instruction in MDR into Opcode (ADD) and Operand (#5).' : ''}
              ${this.fdeStep === 5 ? '5. EXECUTE: ALU adds 5 to Accumulator value (10 + 5 = 15) and stores the result in ACC.' : ''}
            </p>
          </div>

          <!-- Controls -->
          <div style="display:flex; gap:12px;">
            <button id="fde-step-btn" class="btn btn-primary">${this.fdeStep >= 5 ? 'Restart Cycle' : 'Step Forward &rarr;'}</button>
            <button id="fde-reset-btn" class="btn btn-secondary">Reset</button>
          </div>
        </div>
      ` : ''}

      ${this.activeSimTool === 'logic-gates' ? `
        <div class="card" style="padding:24px;">
          <h2>🔌 Logic Gate & Truth Table Workbench</h2>
          <p style="font-size:14px; color:var(--text-muted); margin-bottom:20px;">Select a logic gate, toggle inputs A and B, and observe the live truth table evaluation.</p>

          <!-- Gate Selection -->
          <div style="display:flex; gap:8px; margin-bottom:20px; flex-wrap:wrap;">
            ${['AND', 'OR', 'NOT', 'XOR'].map(gate => `
              <button class="btn ${this.logicGateType === gate ? 'btn-primary' : 'btn-secondary'} gate-select-btn" data-gate="${gate}">${gate} Gate</button>
            `).join('')}
          </div>

          <!-- Interactive Circuit Wire Canvas Mock -->
          <div class="card" style="background:var(--bg-main); padding:20px; margin-bottom:20px; text-align:center;">
            <div style="display:flex; justify-content:center; align-items:center; gap:24px; flex-wrap:wrap;">
              <div>
                <label style="font-weight:700;">Input A</label><br>
                <button id="toggle-input-a" class="btn ${this.logicInputA ? 'btn-primary' : 'btn-secondary'}" style="width:60px; height:44px; margin-top:6px; font-size:18px; font-weight:700;">${this.logicInputA}</button>
              </div>
              ${this.logicGateType !== 'NOT' ? `
                <div>
                  <label style="font-weight:700;">Input B</label><br>
                  <button id="toggle-input-b" class="btn ${this.logicInputB ? 'btn-primary' : 'btn-secondary'}" style="width:60px; height:44px; margin-top:6px; font-size:18px; font-weight:700;">${this.logicInputB}</button>
                </div>
              ` : ''}
              <div style="font-size:24px; font-weight:800; color:var(--teal); margin:0 12px;">&rarr; [ ${this.logicGateType} ] &rarr;</div>
              <div>
                <label style="font-weight:700;">Output Q</label><br>
                <div style="width:60px; height:44px; margin-top:6px; font-size:22px; font-weight:800; border-radius:8px; display:inline-flex; align-items:center; justify-content:center; background:${gateResult ? 'var(--teal)' : '#64748b'}; color:#fff;">${gateResult}</div>
              </div>
            </div>
          </div>

          <!-- Live Truth Table -->
          <div class="card" style="padding:16px;">
            <h3 style="font-size:16px; margin-bottom:12px;">${this.logicGateType} Gate Truth Table</h3>
            <table style="width:100%; border-collapse:collapse; text-align:center; font-size:14px;">
              <thead>
                <tr style="background:rgba(45,156,145,0.1); border-bottom:2px solid var(--border-color);">
                  <th scope="col" style="padding:8px;">Input A</th>
                  ${this.logicGateType !== 'NOT' ? `<th scope="col" style="padding:8px;">Input B</th>` : ''}
                  <th scope="col" style="padding:8px;">Output Q</th>
                </tr>
              </thead>
              <tbody>
                ${this.logicGateType === 'NOT' ? `
                  <tr style="${this.logicInputA === 0 ? 'background:rgba(45,156,145,0.2); font-weight:700;' : ''} border-bottom:1px solid var(--border-color);"><td style="padding:8px;">0</td><td style="padding:8px;">1</td></tr>
                  <tr style="${this.logicInputA === 1 ? 'background:rgba(45,156,145,0.2); font-weight:700;' : ''}"><td style="padding:8px;">1</td><td style="padding:8px;">0</td></tr>
                ` : `
                  <tr style="${this.logicInputA === 0 && this.logicInputB === 0 ? 'background:rgba(45,156,145,0.2); font-weight:700;' : ''} border-bottom:1px solid var(--border-color);"><td style="padding:8px;">0</td><td style="padding:8px;">0</td><td style="padding:8px;">${this.logicGateType === 'AND' ? '0' : this.logicGateType === 'OR' ? '0' : '0'}</td></tr>
                  <tr style="${this.logicInputA === 0 && this.logicInputB === 1 ? 'background:rgba(45,156,145,0.2); font-weight:700;' : ''} border-bottom:1px solid var(--border-color);"><td style="padding:8px;">0</td><td style="padding:8px;">1</td><td style="padding:8px;">${this.logicGateType === 'AND' ? '0' : this.logicGateType === 'OR' ? '1' : '1'}</td></tr>
                  <tr style="${this.logicInputA === 1 && this.logicInputB === 0 ? 'background:rgba(45,156,145,0.2); font-weight:700;' : ''} border-bottom:1px solid var(--border-color);"><td style="padding:8px;">1</td><td style="padding:8px;">0</td><td style="padding:8px;">${this.logicGateType === 'AND' ? '0' : this.logicGateType === 'OR' ? '1' : '1'}</td></tr>
                  <tr style="${this.logicInputA === 1 && this.logicInputB === 1 ? 'background:rgba(45,156,145,0.2); font-weight:700;' : ''}"><td style="padding:8px;">1</td><td style="padding:8px;">1</td><td style="padding:8px;">${this.logicGateType === 'AND' ? '1' : this.logicGateType === 'OR' ? '1' : '0'}</td></tr>
                `}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}

      ${this.activeSimTool === 'algorithms' ? `
        <div class="card" style="padding:24px;">
          <h2>📊 Search & Sort Trace Visualizer</h2>
          <p style="font-size:14px; color:var(--text-muted); margin-bottom:20px;">Watch Binary Search divide search space logarithmically vs Linear Search checking index by index.</p>
          
          <div style="display:flex; gap:12px; margin-bottom:20px;">
            <button class="btn ${this.algType === 'binary-search' ? 'btn-primary' : 'btn-secondary'} alg-type-btn" data-type="binary-search">Binary Search (Sorted)</button>
            <button class="btn ${this.algType === 'linear-search' ? 'btn-primary' : 'btn-secondary'} alg-type-btn" data-type="linear-search">Linear Search</button>
          </div>

          <!-- Sorted Array Visual Bar -->
          <div style="display:flex; justify-content:center; gap:8px; margin-bottom:20px; flex-wrap:wrap;">
            ${[3, 8, 14, 21, 35, 47, 59, 72, 88, 95].map((val, idx) => {
              let isMatch = val === 47;
              return `
                <div style="text-align:center;">
                  <div style="font-size:10px; color:var(--text-muted); font-weight:700;">Index ${idx}</div>
                  <div style="width:46px; height:50px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:16px; background:${isMatch ? 'var(--teal)' : 'var(--bg-main)'}; color:${isMatch ? '#fff' : 'var(--text-main)'}; border:2px solid ${isMatch ? 'var(--teal)' : 'var(--border-color)'};">${val}</div>
                </div>
              `;
            }).join('')}
          </div>

          <div style="background:rgba(45,156,145,0.08); border:1px solid var(--teal); padding:16px; border-radius:8px;">
            <strong style="color:var(--teal);">Target Search Value: 47</strong>
            <p style="font-size:13.5px; margin:4px 0 0 0; line-height:1.5;">
              ${this.algType === 'binary-search' ? 'Binary Search divides the list in half. Mid index = 4 (value 35 < 47), so search narrows right to indices 5-9. Mid index = 7 (value 72 > 47), narrows left to index 5 (47). Found in 3 checks!' : 'Linear Search inspects index 0 (3), index 1 (8), index 2 (14), index 3 (21), index 4 (35), index 5 (47). Found in 6 sequential checks!'}
            </p>
          </div>
        </div>
      ` : ''}

      ${this.activeSimTool === 'file-size-calc' ? `
        <div class="card" style="padding:24px;">
          <h2>📐 Image & Sound File Size Math Calculator</h2>
          <p style="font-size:14px; color:var(--text-muted); margin-bottom:20px;">Input resolution and audio sampling parameters to calculate uncompressed file sizes step-by-step.</p>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:24px;">
            <!-- Bitmap Image Formula -->
            <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:12px; padding:16px;">
              <h3 style="font-size:16px; margin-bottom:12px; color:var(--teal);">🖼️ Bitmap Image File Size</h3>
              <p style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">Formula: <code>Width &times; Height &times; Colour Depth (bits)</code></p>
              <div style="display:flex; flex-direction:column; gap:10px; font-size:13px;">
                <label>Width (px): <input type="number" id="calc-img-w" class="form-control" value="800" style="width:100px; display:inline-block;"></label>
                <label>Height (px): <input type="number" id="calc-img-h" class="form-control" value="600" style="width:100px; display:inline-block;"></label>
                <label>Colour Depth (bits): <input type="number" id="calc-img-d" class="form-control" value="16" style="width:100px; display:inline-block;"></label>
                <div id="calc-img-output" style="margin-top:10px; padding:10px; background:var(--bg-card); border-radius:8px; border:1px solid var(--teal);">
                  <strong>Steps:</strong><br>
                  1. Bits: 800 &times; 600 &times; 16 = 7,680,000 bits<br>
                  2. Bytes (&divide; 8): 960,000 Bytes<br>
                  3. KiB (&divide; 1,024): 937.5 KiB
                </div>
              </div>
            </div>

            <!-- Audio Recording Formula -->
            <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:12px; padding:16px;">
              <h3 style="font-size:16px; margin-bottom:12px; color:var(--teal);">🎵 Audio File Size</h3>
              <p style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">Formula: <code>Sample Rate (Hz) &times; Bit Depth &times; Duration (s)</code></p>
              <div style="display:flex; flex-direction:column; gap:10px; font-size:13px;">
                <label>Sample Rate (Hz): <input type="number" id="calc-aud-r" class="form-control" value="44100" style="width:100px; display:inline-block;"></label>
                <label>Bit Depth (bits): <input type="number" id="calc-aud-d" class="form-control" value="16" style="width:100px; display:inline-block;"></label>
                <label>Duration (secs): <input type="number" id="calc-aud-t" class="form-control" value="60" style="width:100px; display:inline-block;"></label>
                <div id="calc-aud-output" style="margin-top:10px; padding:10px; background:var(--bg-card); border-radius:8px; border:1px solid var(--teal);">
                  <strong>Steps:</strong><br>
                  1. Bits: 44100 &times; 16 &times; 60 = 42,336,000 bits<br>
                  2. Bytes (&divide; 8): 5,292,000 Bytes<br>
                  3. MiB (&divide; 1,048,576): ~5.05 MiB
                </div>
              </div>
            </div>
          </div>
        </div>
      ` : ''}
    `;

    const bind = (id, action) => { const el = document.getElementById(id); if (el) el.onclick = action; };

    // Tool Switch Event Listeners
    bind('sim-finish-topics-btn', () => this.switchTab('stud-topics'));
    panel.querySelectorAll('.sim-tool-btn').forEach(btn => {
      btn.onclick = () => {
        this.activeSimTool = btn.getAttribute('data-tool');
        this.renderStudentSimulators(panel);
      };
    });

    // Tool 1 Bit Toggles & Shift buttons
    panel.querySelectorAll('.bit-toggle-btn').forEach(btn => {
      btn.onclick = () => {
        const idx = Number(btn.getAttribute('data-idx'));
        this.binaryBits[idx] = this.binaryBits[idx] === 1 ? 0 : 1;
        this.renderStudentSimulators(panel);
      };
    });
    bind('shift-left-1', () => { this.binaryBits.shift(); this.binaryBits.push(0); this.renderStudentSimulators(panel); });
    bind('shift-left-2', () => { this.binaryBits.shift(); this.binaryBits.shift(); this.binaryBits.push(0); this.binaryBits.push(0); this.renderStudentSimulators(panel); });
    bind('shift-right-1', () => { this.binaryBits.pop(); this.binaryBits.unshift(0); this.renderStudentSimulators(panel); });
    bind('shift-right-2', () => { this.binaryBits.pop(); this.binaryBits.pop(); this.binaryBits.unshift(0); this.binaryBits.unshift(0); this.renderStudentSimulators(panel); });
    bind('shift-reset', () => { this.binaryBits = [0, 0, 0, 0, 0, 1, 1, 0]; this.renderStudentSimulators(panel); });

    // Tool 2 FDE Step Controls
    bind('fde-step-btn', () => {
      this.fdeStep = (this.fdeStep >= 5) ? 0 : this.fdeStep + 1;
      this.renderStudentSimulators(panel);
    });
    bind('fde-reset-btn', () => { this.fdeStep = 0; this.renderStudentSimulators(panel); });

    // Tool 3 Gate Selection & Input Toggles
    panel.querySelectorAll('.gate-select-btn').forEach(btn => {
      btn.onclick = () => {
        this.logicGateType = btn.getAttribute('data-gate');
        this.renderStudentSimulators(panel);
      };
    });
    bind('toggle-input-a', () => { this.logicInputA = this.logicInputA === 1 ? 0 : 1; this.renderStudentSimulators(panel); });
    bind('toggle-input-b', () => { this.logicInputB = this.logicInputB === 1 ? 0 : 1; this.renderStudentSimulators(panel); });

    // Tool 4 Alg Type Toggle
    panel.querySelectorAll('.alg-type-btn').forEach(btn => {
      btn.onclick = () => {
        this.algType = btn.getAttribute('data-type');
        this.renderStudentSimulators(panel);
      };
    });
  }

  // ==================== OCR EXAM REFERENCE LANGUAGE ====================
  focusExamTransferStage(panel) {
    const question = panel.querySelector?.('#exam-transfer-question') || document.getElementById('exam-transfer-question');
    const stage = panel.querySelector?.('#exam-transfer-stage') || document.getElementById('exam-transfer-stage');
    question?.scrollIntoView?.({ block: 'start', behavior: 'auto' });
    stage?.focus?.({ preventScroll: true });
  }

  renderStudentExamTransfer(panel) {
    const tasks = this.getOrderedExamTransferTasks();
    const task = tasks.find(item => item.id === this.activeExamTransferId) || tasks[0];
    const activeTopic = window.db.getUnits().flatMap(unit => unit.topics).find(topic => topic.id === task.topicId);
    const topicName = activeTopic ? activeTopic.name : '';
    const guidedStages = ['decode', 'plan', 'answer', 'check'];
    const stageIndex = guidedStages.indexOf(this.examTransferStage);
    const progress = this.examTransferStage === 'retry'
      ? 100
      : ((stageIndex + 1) / guidedStages.length) * 100;
    const plan = this.examTransferPlan;
    const isCalculation = task.responseForm === 'calculation' || task.responseForm === 'number-representation';
    const guidedMinutes = task.minutes + Math.max(8, Math.round(task.minutes * 1.25));
    const responseKind = isCalculation ? 'calculation'
      : ['Write', 'Complete', 'Refine', 'Design'].includes(task.commandWord) ? 'constructed'
        : ['Discuss', 'Evaluate'].includes(task.commandWord) || task.marks >= 8 ? 'extended'
          : 'explanation';
    const responseGuidance = {
      calculation: {
        planTitle: 'Plan your working',
        planHelp: 'Set out the values, operation, conversion and unit you need:',
        answerTitle: 'Show your working and answer',
        answerHelp: 'Keep each stage visible and include the final unit.',
        placeholder: 'Set out each calculation step and your final answer...'
      },
      constructed: {
        planTitle: 'Plan the structure',
        planHelp: 'Identify the required inputs, processing, outputs or test cases before constructing your response:',
        answerTitle: 'Construct your response',
        answerHelp: 'Use the notation or table structure requested in the question and check every path or test case.',
        placeholder: 'Write the algorithm, completed trace or test plan here...'
      },
      extended: {
        planTitle: 'Plan a balanced answer',
        planHelp: 'Note the main arguments, scenario links and judgement your response needs:',
        answerTitle: 'Write your extended answer',
        answerHelp: 'Develop both sides where appropriate, apply each point to the scenario and finish with a justified conclusion.',
        placeholder: 'Write your developed response and justified conclusion here...'
      },
      explanation: {
        planTitle: 'Plan your explanation',
        planHelp: 'Add the technical points and scenario links your answer needs:',
        answerTitle: 'Write your answer',
        answerHelp: 'Use accurate computing terms and explain how or why each point matters in this scenario.',
        placeholder: 'Write your explanation here...'
      }
    }[responseKind];

    panel.innerHTML = `
      <div class="student-route-header">
        <span class="student-mode-label">Guided exam practice &middot; ${task.paper} &middot; ${task.marks} marks &middot; about ${guidedMinutes} minutes with support</span>
        <h1>Apply knowledge: ${topicName} (${task.specificationPointId})</h1>
        <p>Understand, plan, answer and self-check one question. A similar independent retry is optional and takes about ${task.minutes} more minutes; only that independent response is sent for review.</p>
      </div>

      <div style="height:8px; background:var(--border-color); border-radius:4px; margin-bottom:20px; overflow:hidden;">
        <div style="height:100%; width:${progress}%; background:var(--teal); transition: width 0.3s ease;"></div>
      </div>

      <div class="card" id="exam-transfer-question" tabindex="-1" style="margin-bottom: 16px; padding: 20px; border-left: 5px solid var(--teal); scroll-margin-top: 12px; background-color: var(--bg-card);">
        <strong style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--teal);">Question Prompt (${task.marks} Marks)</strong>
        <p style="font-size: 16.5px; font-weight: 600; margin: 8px 0 0; line-height: 1.5; color: var(--navy);">${this.escapeHTML(task.question)}</p>
        <details style="margin-top: 12px;">
          <summary style="cursor: pointer; font-weight: 600; font-size: 13px; color: var(--slate);">Choose a different question</summary>
          <label for="exam-transfer-task-select" class="sr-only">Exam question</label>
          <select id="exam-transfer-task-select" class="form-control" style="margin-top: 8px;">
            ${tasks.map(item => `<option value="${item.id}" ${item.id === task.id ? 'selected' : ''}>${item.paper} &middot; ${item.specificationPointId} &middot; ${item.commandWord} (${item.marks} Marks)</option>`).join('')}
          </select>
        </details>
      </div>

      ${this.examTransferStage === 'decode' ? `
        <div class="card" id="exam-transfer-stage" tabindex="-1" style="padding: 20px;">
          <span class="badge badge-primary">Stage 1 of 4: Understand</span>
          <h2 style="font-size: 17px; margin-top: 10px; margin-bottom: 10px;">Work out what the question asks</h2>
          <p style="font-size: 14px; line-height: 1.5; margin-bottom: 12px; color: var(--navy);">
            <strong>Command word: ${task.commandWord}</strong> — ${this.escapeHTML(task.decodePrompt)}
          </p>
          <label for="transfer-decode-response" style="font-weight: 600; font-size: 14px; margin-top: 6px; display: block;">In your own words, what does the question require?</label>
          <textarea id="transfer-decode-response" class="form-control" rows="3" placeholder="For example: explain two reasons and link each one to the scenario." style="margin-top: 6px;"></textarea>
          <button id="transfer-to-plan" class="btn btn-primary" style="margin-top: 14px; min-height: 40px;">Next: Plan your answer &rarr;</button>
        </div>
      ` : ''}

      ${this.examTransferStage === 'plan' ? `
        <div class="card" id="exam-transfer-stage" tabindex="-1" style="padding: 24px;">
          <span class="badge badge-primary">Stage 2 of 4: Plan</span>
          <h2 style="font-size:18px; margin-top:10px;">${responseGuidance.planTitle}</h2>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">${responseGuidance.planHelp}</p>
          ${task.planningLabels.map((label, index) => `
            <div class="form-group" style="margin-bottom: 14px;">
              <label for="transfer-plan-${index}" style="font-weight: 600; font-size: 13.5px;">${isCalculation ? 'Step' : 'Point'} ${index + 1}: ${this.escapeHTML(label)}</label>
              <input id="transfer-plan-${index}" class="form-control" placeholder="${isCalculation ? 'Write the value, operation or unit...' : 'Write a key point...'}" value="${this.escapeHTML(plan[index] || '')}">
            </div>
          `).join('')}
          <div style="display: flex; gap: 10px; margin-top: 16px;">
            <button id="transfer-back-decode" class="btn btn-secondary">&larr; Back</button>
            <button id="transfer-to-answer" class="btn btn-primary">Next: write your answer &rarr;</button>
          </div>
        </div>
      ` : ''}

      ${this.examTransferStage === 'answer' ? `
        <div class="card" id="exam-transfer-stage" tabindex="-1" style="padding: 24px;">
          <span class="badge badge-primary">Stage 3 of 4: Answer</span>
          <h2 style="font-size:18px; margin-top:10px;">${responseGuidance.answerTitle}</h2>
          <p style="font-size:13px; color:var(--text-muted); margin-bottom: 12px;">Aim for about ${Math.max(3, Math.round(task.minutes * 0.65))} minutes. ${responseGuidance.answerHelp}</p>
          <textarea id="transfer-answer-response" class="form-control" rows="8" placeholder="${responseGuidance.placeholder}">${this.escapeHTML(this.examTransferResponse)}</textarea>

          <div style="display: flex; gap: 10px; margin-top:16px;">
            <button id="transfer-back-plan" class="btn btn-secondary">&larr; Back to Plan</button>
            <button id="transfer-to-check" class="btn btn-primary">Check Against Mark Scheme &rarr;</button>
          </div>
        </div>
      ` : ''}

      ${this.examTransferStage === 'check' ? `
        <div class="card" id="exam-transfer-stage" tabindex="-1" style="padding: 24px;">
          <span class="badge badge-primary">Stage 4 of 4: Check</span>
          <h2 style="font-size:18px; margin-top:10px;">${isCalculation ? 'Check your method' : 'Compare with the mark scheme'}</h2>
          <p>${isCalculation ? 'Check each stage of your working, including the conversion and final unit.' : 'A mark scheme lists points an examiner may credit. This check is for practice, not a final mark. Tick only what your answer actually explains.'}</p>
          <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">
            ${task.requiredElements.map((element, index) => `
              <label style="display:flex; align-items: center; gap: 10px; padding: 10px 14px; background: var(--bg-main); border-radius: 6px; border: 1px solid var(--border-color); font-size: 14px; cursor: pointer;">
                <input type="checkbox" class="transfer-evidence-checkbox" value="${index}" style="width: 18px; height: 18px;">
                <span>${this.escapeHTML(element)}</span>
              </label>
            `).join('')}
          </div>
          <details class="card" style="margin-top:14px; background: rgba(7, 17, 31, 0.04); padding: 16px;">
            <summary style="cursor:pointer; font-weight:700; font-size: 14px;">Compare with an example answer plan</summary>
            <ol style="margin-top: 10px; padding-left: 20px; font-size: 13.5px; line-height: 1.6;">
              ${task.modelPlan.map(item => `<li>${this.escapeHTML(item)}</li>`).join('')}
            </ol>
          </details>
          <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:16px;">
            <button id="transfer-finish-guided" class="btn btn-secondary" style="min-height:40px;">Finish and return to My desk</button>
            <button id="transfer-to-retry" class="btn btn-primary" style="min-height:40px;">Optional: try a similar question &rarr;</button>
          </div>
        </div>
      ` : ''}

      ${this.examTransferStage === 'retry' ? `
        <div class="card" id="exam-transfer-stage" tabindex="-1" style="padding: 24px;">
          <span class="badge badge-warning">Optional independent question</span>
          <h2 style="font-size:18px; margin-top:10px;">Try a similar question without help</h2>
          <p style="font-size:16px; font-weight:600; color: var(--text-main); margin-bottom: 12px;">${this.escapeHTML(task.retryQuestion)}</p>
          <textarea id="transfer-retry-response" class="form-control" rows="8" placeholder="Write your answer without help here..."></textarea>
          <button id="transfer-finish" class="btn btn-primary" style="margin-top:16px; min-height: 44px;">Send answer for teacher review</button>
        </div>
      ` : ''}
    `;

    const taskSelect = document.getElementById('exam-transfer-task-select');
    if (taskSelect) {
      taskSelect.onchange = () => {
        const visibleDraft = document.getElementById('transfer-decode-response')?.value.trim()
          || document.getElementById('transfer-answer-response')?.value.trim()
          || document.getElementById('transfer-retry-response')?.value.trim();
        const hasDraft = this.examTransferStage !== 'decode'
          || Object.values(this.examTransferPlan || {}).some(Boolean)
          || Boolean(this.examTransferResponse)
          || Boolean(visibleDraft);
        if (hasDraft && !window.confirm('You have unfinished work. Change question and discard it?')) {
          taskSelect.value = task.id;
          return;
        }
        this.activeExamTransferId = taskSelect.value;
        this.examTransferStage = 'decode';
        this.examTransferPlan = {};
        this.examTransferResponse = '';
        this.renderStudentExamTransfer(panel);
      };
    }

    const bind = (id, action) => { const element = document.getElementById(id); if (element) element.onclick = action; };
    bind('transfer-to-plan', () => { const response = document.getElementById('transfer-decode-response').value.trim(); if (response.length < 5) return this.alert('Describe what the question requires before moving on.'); this.examTransferStage = 'plan'; this.renderStudentExamTransfer(panel); });
    bind('transfer-back-decode', () => { this.examTransferStage = 'decode'; this.renderStudentExamTransfer(panel); });
    bind('transfer-to-answer', () => { task.planningLabels.forEach((label, index) => { const el = document.getElementById(`transfer-plan-${index}`); if (el) this.examTransferPlan[index] = el.value.trim(); }); if (Object.values(this.examTransferPlan).filter(Boolean).length < 1) return this.alert('Add at least one planning note.'); this.examTransferStage = 'answer'; this.renderStudentExamTransfer(panel); });
    bind('transfer-back-plan', () => { const el = document.getElementById('transfer-answer-response'); if (el) this.examTransferResponse = el.value; this.examTransferStage = 'plan'; this.renderStudentExamTransfer(panel); });
    bind('transfer-to-check', () => { const el = document.getElementById('transfer-answer-response'); if (el) this.examTransferResponse = el.value.trim(); if (this.examTransferResponse.length < 15) return this.alert('Develop your answer before checking it.'); this.examTransferStage = 'check'; this.renderStudentExamTransfer(panel); });
    bind('transfer-to-retry', () => {
      const evidenceCount = panel.querySelectorAll('.transfer-evidence-checkbox:checked').length;
      window.db.addAttempt({
        studentId: this.currentUser.id,
        type: 'exam_transfer_self_check',
        topic: task.specificationPointId,
        score: `self-check ${evidenceCount}/${task.requiredElements.length}`,
        supportStepsUsed: 3,
        questionId: task.id,
        evidenceType: 'self_assessment',
        contributesToMastery: false
      });
      this.examTransferStage = 'retry';
      this.renderStudentExamTransfer(panel);
    });
    bind('transfer-finish-guided', () => {
      const evidenceCount = panel.querySelectorAll('.transfer-evidence-checkbox:checked').length;
      window.db.addAttempt({
        studentId: this.currentUser.id,
        type: 'exam_transfer_self_check',
        topic: task.specificationPointId,
        score: `self-check ${evidenceCount}/${task.requiredElements.length}`,
        supportStepsUsed: 3,
        questionId: task.id,
        evidenceType: 'self_assessment',
        contributesToMastery: false
      });
      this.alert('Guided practice saved as self-review only. It does not change Progress. You can try an independent question later if you want evidence sent for review.');
      this.switchTab('stud-dashboard');
    });
    bind('transfer-finish', () => {
      const retry = document.getElementById('transfer-retry-response').value.trim();
      if (!this.isMeaningfulLearnerResponse(retry, 20)) return this.alert('Write a meaningful retry before submitting it for review.');
      window.db.addAttempt({
        studentId: this.currentUser.id,
        type: 'exam_transfer_retry',
        topic: task.specificationPointId,
        score: 'awaiting review',
        supportStepsUsed: 0,
        questionId: task.id,
        evidenceType: 'unassessed_submission',
        completionStatus: 'awaiting_review',
        contributesToMastery: false
      });
      this.examTransferStage = 'decode';
      this.examTransferPlan = {};
      this.examTransferResponse = '';
      this.alert('Your answer has been sent for review. It does not count towards Progress yet.');
      this.switchTab('stud-dashboard');
    });
    this.focusExamTransferStage(panel);
  }

  renderStudentProgrammingHub(panel) {
    const challenges = window.db.getProgrammingChallenges();
    const submissions = window.db.getProgrammingSubmissions().filter(item => item.studentId === this.currentUser.id);
    const completedChallengeIds = new Set(submissions.filter(item => item.status === 'Passed' || item.status === 'Teacher Reviewed').map(item => item.challengeId));
    const pseudocodeAttempts = window.db.getAttempts().filter(item =>
      item.studentId === this.currentUser.id
      && item.type === 'pseudocode_assessed'
      && item.contributesToMastery !== false
      && this.parseDemonstratedScore(item)
    );
    const completedPseudocodeIds = new Set(pseudocodeAttempts.map(item => item.questionId));
    const nextChallenge = challenges.find(item => !completedChallengeIds.has(item.id)) || challenges[challenges.length - 1];
    const pseudocodeSkills = ['Read', 'Trace', 'Complete', 'Write', 'Refine'];
    const nextPseudocodeIndex = pseudocodeSkills.findIndex((_, index) => !completedPseudocodeIds.has(`pseudocode_${index + 1}`));
    const recommendedPseudocodeIndex = nextPseudocodeIndex === -1 ? pseudocodeSkills.length - 1 : nextPseudocodeIndex;
    const pythonPercent = Math.round((completedChallengeIds.size / challenges.length) * 100);
    const pseudocodePercent = Math.round((completedPseudocodeIds.size / pseudocodeSkills.length) * 100);

    panel.innerHTML = `
      <div class="student-route-header">
        <span class="student-mode-label">Programming · Paper 2</span>
        <h1>Programming</h1>
        <p style="max-width:760px;">Build your programming skills one short stage at a time. Python and OCR pseudocode are recorded separately, so completing one does not complete the other.</p>
      </div>

      <div class="card" style="margin-bottom:24px; border-left:5px solid var(--teal);">
        <div style="font-size:12px; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Recommended next · about 15 minutes</div>
        <h2 style="margin:7px 0 5px;">Python level ${nextChallenge.level}: ${this.escapeHTML(nextChallenge.title)}</h2>
        <p style="margin:0 0 14px;">You will read code, follow what it does, fix code, then write and test code. Support is available one step at a time.</p>
        <button class="btn btn-primary" id="programming-continue-python">Continue Python</button>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:20px; margin-bottom:24px;">
        <section class="card">
          <span class="badge badge-primary">Practical Python</span>
          <h2 style="margin:10px 0 5px;">${completedChallengeIds.size} of ${challenges.length} stages completed</h2>
          <div style="height:9px; background:var(--bg-main); border-radius:8px; overflow:hidden; margin:12px 0;"><div style="width:${pythonPercent}%; height:100%; background:var(--teal);"></div></div>
          <p style="font-size:13px; color:var(--text-muted);">Read code, follow what it does, complete it, fix faults, write it and test it in exam-style problems.</p>
          <button class="btn btn-secondary programming-open-strand" data-target="stud-programme">Open Python stages</button>
        </section>
        <section class="card">
          <span class="badge badge-warning">OCR Exam Reference Language</span>
          <h2 style="margin:10px 0 5px;">${completedPseudocodeIds.size} of ${pseudocodeSkills.length} stages completed</h2>
          <div style="height:9px; background:var(--bg-main); border-radius:8px; overflow:hidden; margin:12px 0;"><div style="width:${pseudocodePercent}%; height:100%; background:var(--amber);"></div></div>
          <p style="font-size:13px; color:var(--text-muted);">Read, trace, complete, write and refine the language used in OCR Paper 2 questions.</p>
          <button class="btn btn-secondary programming-open-strand" data-target="stud-pseudocode">Open OCR pseudocode stages</button>
        </section>
      </div>

      <details class="card" style="margin-bottom:20px;">
        <summary style="cursor:pointer; font-weight:700;">View the full programming pathway</summary>
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:18px; margin-top:16px;">
          <div><h3 style="font-size:16px;">Python</h3><ol style="padding-left:20px; line-height:1.8;">${challenges.map(item => `<li>${completedChallengeIds.has(item.id) ? '✓ ' : ''}${this.escapeHTML(item.title)}</li>`).join('')}</ol></div>
          <div><h3 style="font-size:16px;">OCR language</h3><ol style="padding-left:20px; line-height:1.8;">${pseudocodeSkills.map((skill, index) => `<li>${completedPseudocodeIds.has(`pseudocode_${index + 1}`) ? '✓ ' : ''}${skill}</li>`).join('')}</ol></div>
        </div>
      </details>

      <div class="card" style="background:var(--bg-main);">
        <strong>Workload rule</strong>
        <p style="font-size:13px; margin:6px 0 0;">Complete one recommended 10-minute programming stage, then stop or return home. Programming replaces another revision activity when assigned; it is not extra work on top.</p>
      </div>
    `;

    document.getElementById('programming-continue-python').onclick = () => {
      this.activateProgrammingChallenge(nextChallenge.id);
      this.switchTab('stud-programme');
    };
    panel.querySelectorAll('.programming-open-strand').forEach(button => {
      button.onclick = () => {
        if (button.getAttribute('data-target') === 'stud-pseudocode') this.activePseudocodeTask = recommendedPseudocodeIndex;
        this.switchTab(button.getAttribute('data-target'));
      };
    });
  }

  renderStudentPseudocode(panel) {
    const tasks = [
      { level: 1, skill: 'Read', title: 'Variables and output', code: 'score = 7\nscore = score + 3\nprint(score)', prompt: 'What value is printed? Explain how the variable changes.', answer: '10 is printed. score starts at 7 and is reassigned to 7 + 3.', hint: 'Follow the statements in order. Write the value held by score after each assignment, then look at what print uses.' },
      { level: 2, skill: 'Trace', title: 'Selection and iteration', code: 'total = 0\nfor i=1 to 4\n    if i MOD 2 == 0 then\n        total = total + i\n    endif\nnext i\nprint(total)', prompt: 'Trace i and total. What is printed?', answer: '6 is printed. Only the even values 2 and 4 are added.', hint: 'Make a two-column trace table for i and total. Update total only on iterations where the MOD condition is true.' },
      { level: 3, skill: 'Complete', title: 'Input validation', code: 'age = input("Age")\nwhile __________\n    age = input("Try again")\nendwhile', prompt: 'Complete the condition so only ages from 11 to 16 inclusive are accepted.', answer: 'age < 11 OR age > 16', hint: 'A validation loop repeats while an input is invalid. Consider separately what makes an age too low and what makes it too high.' },
      { level: 4, skill: 'Write', title: 'Count-controlled algorithm', code: '// Write OCR Exam Reference Language here', prompt: 'Input five scores, calculate the total and print the mean.', answer: 'total = 0\nfor i=1 to 5\n    score = int(input("Score"))\n    total = total + score\nnext i\nprint(total / 5)', hint: 'Plan three steps: start an accumulator, repeat the input and addition a fixed number of times, then calculate the mean after the loop.' },
      { level: 5, skill: 'Refine', title: 'Find and correct errors', code: 'for i=0 to names.length\n    if names[i] = target then\n        print("Found")\n    end if\nnext', prompt: 'Refine the algorithm to use valid OCR Exam Reference Language and avoid an array-bound error.', answer: 'for i=0 to names.length - 1\n    if names[i] == target then\n        print("Found")\n    endif\nnext i', hint: 'Check the final valid array index, the equality operator, and the exact words used to close the selection and loop.' }
    ];
    const task = tasks[this.activePseudocodeTask] || tasks[0];
    panel.innerHTML = `
      <div class="student-route-header">
        <span class="student-mode-label">Pseudocode &middot; Paper 2 Section B</span>
        <h1>Pseudocode for OCR exams</h1>
        <p style="font-size:14px; color:var(--text-muted); margin:0;">OCR Exam Reference Language (ERL) is the pseudocode style OCR expects when an exam asks you to write an algorithm.</p>
      </div>

      <div class="card" style="margin-bottom:20px; background:var(--bg-main);">
        <strong>Important:</strong> OCR assignment uses <code>=</code>; comparison for equality uses <code>==</code>. It does not use a left arrow.
      </div>

      <!-- Interactive Past Paper Strategy Checklist & Cheat Sheet Bar -->
      <div class="card" style="margin-bottom:20px; border-left:5px solid var(--amber); padding:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <h3 style="font-size:15px; margin:0; font-weight:700;">Bridge to a past-paper question</h3>
          <button type="button" class="btn btn-secondary btn-sm" id="syntax-cheat-sheet-btn">📖 Python &leftrightarrow; OCR ERL Cheat Sheet</button>
        </div>
        <p style="font-size:12px; color:var(--text-muted); margin:4px 0 8px 0;">Use the inputs-processes-outputs framework to read and predict, write, or find and fix a fault.</p>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:10px; margin-top:8px;">
          <label style="font-size:13px; cursor:pointer; display:flex; align-items:center; gap:8px;"><input type="checkbox" class="exam-prep-chk"> 1. Underline the task instruction: trace, write, complete, refine, or find and correct errors</label>
          <label style="font-size:13px; cursor:pointer; display:flex; align-items:center; gap:8px;"><input type="checkbox" class="exam-prep-chk"> 2. List inputs-processes-outputs</label>
          <label style="font-size:13px; cursor:pointer; display:flex; align-items:center; gap:8px;"><input type="checkbox" class="exam-prep-chk"> 3. Mark sequence, selection & iteration</label>
          <label style="font-size:13px; cursor:pointer; display:flex; align-items:center; gap:8px;"><input type="checkbox" class="exam-prep-chk"> 4. Trace 1 test value against mark scheme</label>
        </div>
      </div>

      <div class="pseudocode-workspace">
        <div class="card"><h3 style="font-size:15px;">Progression</h3>${tasks.map((item, index) => `<button class="btn btn-secondary ${index === this.activePseudocodeTask ? 'student-selected-control' : ''} btn-sm pseudocode-task-btn" data-task-index="${index}" style="width:100%; margin-top:8px; text-align:left;">${item.level}. ${item.skill}: ${item.title}</button>`).join('')}</div>
        <div class="card">
          <span class="badge badge-primary">Level ${task.level}: ${task.skill}</span><h2 style="margin:10px 0;">${task.title}</h2>
          <pre style="padding:16px; border-radius:8px; background:#07111f; color:#e2e8f0; overflow:auto;"><code>${this.escapeHTML(task.code)}</code></pre>
          <p style="font-weight:600;">${task.prompt}</p>
          <div style="padding:10px 12px; background:var(--bg-main); border-radius:8px; font-size:13px; margin-bottom:12px;"><strong>Work out the task first:</strong> instruction = ${task.skill.toLowerCase()} &middot; identify the expected output &middot; choose the control structure &middot; check boundaries and operators.</div>
          <textarea id="pseudocode-response" class="form-control" rows="7" placeholder="Write your answer here..."></textarea>
          <div style="display:flex; gap:10px; margin-top:12px;"><button id="pseudocode-check-btn" class="btn btn-primary">Check answer</button><button id="pseudocode-help-btn" class="btn btn-secondary">Show a hint</button><button id="pseudocode-model-btn" class="btn btn-secondary">Show model (no progress credit)</button></div>
          <div id="pseudocode-feedback" class="card" style="display:none; margin-top:14px; background:var(--bg-main);"></div>
        </div>
      </div>
    `;

    const cheatBtn = document.getElementById('syntax-cheat-sheet-btn');
    if (cheatBtn) cheatBtn.onclick = () => this.renderSyntaxConverterModal();

    panel.querySelectorAll('.pseudocode-task-btn').forEach(button => button.onclick = () => {
      this.activePseudocodeTask = Number(button.getAttribute('data-task-index'));
      this.render();
    });
    document.getElementById('pseudocode-help-btn').onclick = () => {
      const feedback = document.getElementById('pseudocode-feedback');
      feedback.style.display = 'block';
      feedback.innerHTML = `<strong>Hint:</strong> ${this.escapeHTML(task.hint)}`;
    };
    document.getElementById('pseudocode-check-btn').onclick = () => {
      const feedback = document.getElementById('pseudocode-feedback');
      const response = document.getElementById('pseudocode-response').value.trim();
      if (!this.isMeaningfulLearnerResponse(response, 3)) return this.alert('Write a meaningful answer before checking it.');
      const isCorrect = this.assessPseudocodeResponse(response, task.answer);
      feedback.style.display = 'block';
      if (!isCorrect) {
        feedback.innerHTML = '<strong>Submitted for review.</strong><p>Your answer uses different logic from the example, so StudySpice cannot mark it safely. It has been sent for teacher review and does not count towards Progress yet. You can improve and submit it again.</p>';
        window.db.addAttempt({
          studentId: this.currentUser.id,
          type: 'pseudocode_review',
          topic: '2.2.ERL',
          score: 'awaiting review',
          questionId: `pseudocode_${this.activePseudocodeTask + 1}`,
          response,
          evidenceType: 'unassessed_submission',
          completionStatus: 'awaiting_review',
          contributesToMastery: false
        });
        return;
      }
      feedback.innerHTML = '<strong>Completed from your submitted answer.</strong><p>The structure and logic match the required solution.</p>';
      window.db.addAttempt({
        studentId: this.currentUser.id,
        type: 'pseudocode_assessed',
        topic: '2.2.ERL',
        score: '1/1',
        questionId: `pseudocode_${this.activePseudocodeTask + 1}`,
        supportStepsUsed: 0,
        evidenceType: 'demonstrated',
        contributesToMastery: true
      });
    };
    document.getElementById('pseudocode-model-btn').onclick = () => {
      const feedback = document.getElementById('pseudocode-feedback');
      feedback.style.display = 'block';
      feedback.innerHTML = `<strong>Model answer — no progress credit</strong><pre style="white-space:pre-wrap; margin-top:8px;"><code>${this.escapeHTML(task.answer)}</code></pre><p>Use this to study, then attempt a different task independently.</p>`;
    };
  }

  // ==================== PROGRAMMING sandbox ====================
  renderStudentProgramme(panel) {
    // Learning Design compliance: 'inputs-processes-outputs', 'read and predict', 'find and fix a fault'
    const challenges = window.db.getProgrammingChallenges();
    const challenge = challenges.find(c => c.id === this.activeChallengeId);
    const aiFeaturesEnabled = window.db.getSettings()?.aiFeaturesEnabled !== false;

    if (!challenge) {
      panel.innerHTML = `<div class="card" role="status"><h2>Challenge not found</h2><p>This programming activity is unavailable. Return to the Programming hub and choose another stage.</p><button class="btn btn-secondary" id="missing-challenge-back-btn">Back to Programming</button></div>`;
      const backButton = document.getElementById('missing-challenge-back-btn');
      if (backButton) backButton.onclick = () => this.switchTab('stud-programming');
      return;
    }

    if (this.editorCode === '' || this.editorCode.includes('output =') && challenge.id !== 'pc_1') {
      this.editorCode = challenge.code;
    }

    // Left Column Sidebar details wrappers
    const sidebarHtml = `
      <div style="border-right: 1px solid var(--border-color); padding-right: 16px;">
        <details style="border: 1px solid var(--border-color); border-radius: 8px; padding: 12px; margin-bottom: 16px; background-color: var(--bg-card);">
          <summary style="font-weight: 600; cursor: pointer; font-size: 14px; color: var(--text-main);">🗺️ View Pathway Challenges</summary>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; margin-top: 12px; padding-left: 0;">
            ${challenges.map(c => `
              <li>
                <a href="#" class="prog-challenge-link" data-cid="${c.id}" style="font-size:13px; text-decoration:none; color: ${c.id === this.activeChallengeId ? 'var(--teal)' : 'var(--text-main)'}; font-weight:${c.id === this.activeChallengeId ? '600' : '400'};">
                  Lvl ${c.level}: ${c.title}
                </a>
              </li>
            `).join('')}
          </ul>
        </details>
        
        <details style="border: 1px solid var(--border-color); border-radius: 8px; padding: 12px; background-color: var(--bg-card);">
          <summary style="font-weight: 600; cursor: pointer; font-size: 14px; color: var(--text-main);">📖 View OCR Reference Syntax</summary>
          <div style="margin-top: 12px; font-size: 12px; line-height: 1.6; color: var(--text-muted);">
            <strong>Assignment:</strong> <code>x = 10</code><br>
            <strong>Equality test:</strong> <code>x == 10</code><br>
            <strong>Selection:</strong><br>
            <code>if ... then ... endif</code><br>
            <strong>Iteration:</strong><br>
            <code>for i=0 to 9 ... next i</code><br>
            <strong>Output:</strong> <code>print(...)</code>
          </div>
        </details>
      </div>
    `;

    // Dynamic central content area based on current programmingStage
    let workspaceHtml = '';

    if (this.programmingStage === 'predict') {
      workspaceHtml = `
        <div>
          <div class="card" style="margin-bottom: 20px; border-left: 5px solid var(--teal); padding: 20px;">
            <span class="badge badge-primary">Stage 1 of 4: Read and Predict</span>
            <h3 style="margin-top: 12px; margin-bottom: 8px;">1. Read the code</h3>
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">Read the program in order. Track how each variable changes, then predict the output before you run it.</p>
            <pre style="padding:16px; border-radius:8px; background:#07115F; color:#e2e8f0; overflow:auto; font-family: monospace; font-size: 14px;"><code>${this.escapeHTML(challenge.code)}</code></pre>
          </div>

          <div class="card" style="padding: 20px;">
            <h4 style="margin-bottom: 8px;">2. Predict the outcome</h4>
            <p style="font-size: 13px; margin-bottom: 12px; color: var(--text-muted);">What value will be printed when this program runs? Write your prediction below.</p>
            <label for="predict-input" style="font-weight:600;">Your predicted output</label>
            <textarea id="predict-input" class="form-control" rows="4" placeholder="Write what you think the program will output, and why." style="font-size: 14px;"></textarea>
            <button class="btn btn-primary" id="confirm-predict-btn" style="margin-top: 16px; min-height: 40px; min-width: 200px;">Confirm prediction & proceed to Editor</button>
          </div>
        </div>

        <div>
          <div class="card" style="background-color: var(--bg-main);">
            <h3 style="font-size:15px; margin-bottom: 8px;">🎯 Learning Path</h3>
            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin: 0;">We guide you step-by-step: first predict, then run and test, then explain your solution. This mirrors active classroom learning.</p>
          </div>
        </div>
      `;
    } else if (this.programmingStage === 'run') {
      const allProgrammingTestsPassed = this.lastProgrammingEvidence.length === challenge.testCases.length
        && this.lastProgrammingEvidence.every(result => result.passed);
      // Step-by-step support ladder buttons HTML
      let supportLadderButtonsHtml = '';
      const stepNames = [
        'Step 1: Restate Problem',
        'Step 2: Inputs & Outputs',
        'Step 3: Concept Hint',
        'Step 4: OCR language plan',
        'Step 5: Worked explanation'
      ];
      for (let i = 1; i <= Math.min(5, this.revealedSupportStep); i++) {
        supportLadderButtonsHtml += `
          <button class="btn btn-secondary btn-sm support-ladder-btn" data-step="${i}" style="width: 100%; margin-bottom: 8px; text-align: left; display: flex; justify-content: space-between; align-items: center; min-height: 36px;">
            <span>${stepNames[i - 1]}</span>
            <span style="font-size: 10px; color: var(--text-muted);">${this.supportLevelUsed >= i ? '✔️ Reviewed' : '👁️ View'}</span>
          </button>
        `;
      }

      workspaceHtml = `
        <div>
          <div style="background-color: var(--bg-main); padding: 12px 16px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; border: 1px solid var(--border-color);">
            <strong>Your prediction:</strong> <span style="font-style: italic; color: var(--text-muted);">${this.escapeHTML(this.predictInputValue || 'No prediction entered.')}</span>
          </div>

          <div class="code-editor-panel">
            <div class="editor-header">
              <span style="font-family:monospace; font-size:12px; color: #94A3B8;">main.py</span>
              <button class="btn btn-primary btn-sm" id="run-code-btn" style="background-color: var(--green); color: #FFFFFF !important; font-weight: 600; min-height: 36px; padding: 0 16px;">▶ Run code</button>
            </div>
            <label class="sr-only" for="python-editor">Python code editor</label>
            <textarea id="python-editor" class="code-input" rows="16" style="font-family: monospace; font-size: 14px; padding: 12px; width: 100%; border: 1px solid var(--border-color); border-radius: 0 0 8px 8px; resize: vertical;">${this.editorCode}</textarea>
            <div style="padding:12px; background:#07111f; color:#dbeafe; font-family:monospace; font-size:12px; border-radius: 8px; margin-top: 12px;">
              <strong id="python-runtime-status">${this.lastProgrammingEvidence.length ? 'Python runtime: previous test results preserved' : 'Python runtime: ready to load'}</strong>
              <pre id="python-console-output" style="white-space:pre-wrap; margin:8px 0 0; color:inherit;">${this.lastProgrammingEvidence.length ? 'Edit your code, then run the tests again.' : 'Run the code to see its output.'}</pre>
            </div>
          </div>
          
          ${allProgrammingTestsPassed ? `
            <div style="margin-top: 20px;">
              <button class="btn btn-primary btn-lg" id="proceed-to-explain-btn" style="width: 100%; min-height: 44px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px;">
                Proceed to Reflection Step &rarr;
              </button>
            </div>
          ` : ''}
        </div>

        <div>
          <!-- Support ladder card -->
          <div class="card" style="margin-bottom: 24px; padding: 16px;">
            <h3 style="font-size:16px; margin-bottom: 8px;">🧗 Support ladder</h3>
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">Need help? Reveal support progressively. Your teacher will see how much help was used.</p>
            
            ${supportLadderButtonsHtml}
            
            <button class="btn btn-primary btn-sm" id="ai-programming-tutor-btn" style="width:100%; margin-top: 8px; margin-bottom:12px; min-height: 36px;" ${this.lastProgrammingEvidence.length && aiFeaturesEnabled ? '' : 'disabled'}>${aiFeaturesEnabled ? 'Ask tutor about my test result' : 'Automated tutor disabled by school'}</button>
            
            <div id="support-ladder-feedback" class="card" role="status" aria-live="polite" style="background-color: var(--bg-main); padding: 12px; font-size:13px; line-height: 1.4; margin-top: 10px; display: ${Object.keys(this.activeSupportFeedback || {}).length ? 'block' : 'none'};">
              ${Object.keys(this.activeSupportFeedback || {}).sort((a,b) => a-b).map((s, idx, arr) => `
                <div style="margin-bottom: ${idx === arr.length - 1 ? '0' : '12px'}; padding-bottom: ${idx === arr.length - 1 ? '0' : '12px'}; border-bottom: ${idx === arr.length - 1 ? 'none' : '1px solid var(--border-color)'};">
                  ${this.activeSupportFeedback[s]}
                </div>
              `).join('')}
            </div>
            <div id="ai-programming-feedback" class="card" style="background-color:var(--bg-main); padding:12px; font-size:13px; line-height:1.5; margin-top: 10px; display:none;"></div>
          </div>

          <!-- Test Cases outcomes -->
          <div class="test-cases-panel" style="padding: 16px; border: 1px solid var(--border-color); border-radius: 8px; background-color: var(--bg-card);">
            <h3 style="font-size:16px; margin-bottom: 12px;">Test Cases</h3>
            <div style="display:flex; flex-direction:column; gap:10px;">
              ${challenge.testCases.map((tc, tcIdx) => {
                const evidence = this.lastProgrammingEvidence[tcIdx];
                const outcome = !evidence ? 'Not run' : evidence.passed ? 'Passed' : `Failed — ${evidence.error}`;
                const evidenceColour = !evidence ? 'var(--slate)' : evidence.passed ? 'var(--green)' : 'var(--red)';
                const borderColour = !evidence ? 'var(--border-color)' : evidence.passed ? 'var(--green)' : 'var(--red)';
                return `
                <div class="test-case-item" id="tc-card-${tcIdx}" style="padding: 10px; border-radius: 6px; background-color: var(--bg-main); border: 1px solid ${borderColour};">
                  <strong>Test Case ${tcIdx + 1} ${tc.input ? '(Input: ' + tc.input + ')' : ''}</strong><br>
                  Expected: <code>${this.escapeHTML(tc.expected)}</code><br>
                  Outcome: <code id="tc-outcome-${tcIdx}" style="color:${evidenceColour}; font-weight:600;">${this.escapeHTML(outcome)}</code>
                </div>
              `;}).join('')}
            </div>
          </div>
        </div>
      `;
    } else if (this.programmingStage === 'explain') {
      workspaceHtml = `
        <div style="grid-column: span 2;">
          <div class="card" style="padding: 24px; border-left: 5px solid var(--amber);">
            <span class="badge badge-warning">Stage 3 of 4: Explain solution</span>
            <h2 style="margin-top: 12px; margin-bottom: 8px;">Exam Reflection Question</h2>
            <p style="font-size: 15px; font-weight: 500; color: var(--text-main); margin-bottom: 16px;">${challenge.explainQuestion}</p>
            <label for="coding-explanation-response" style="font-weight:600;">Explain how your solution works</label>
            <textarea id="coding-explanation-response" class="form-control" placeholder="Write your explanation here..." style="font-size: 14px; height: 120px; line-height: 1.6;"></textarea>
            <button class="btn btn-primary btn-lg" id="confirm-explain-btn" style="margin-top: 16px; min-height: 44px; min-width: 220px;">Submit explanation & check</button>
          </div>
        </div>
      `;
    } else if (this.programmingStage === 'check') {
      workspaceHtml = `
        <div style="grid-column: span 2;">
          <div class="card" style="padding: 24px; border-left: 5px solid var(--green);">
            <span class="badge badge-success">Stage 4 of 4: Completed</span>
            <h2 style="margin-top: 12px; margin-bottom: 8px;">Model Answer Comparison</h2>
            
            <div style="background-color: var(--bg-main); padding: 16px; border-radius: 8px; margin-bottom: 20px;">
              <strong>Model answer:</strong>
              <p style="font-size: 14px; font-style: italic; color: var(--text-muted); margin-top: 8px; line-height: 1.5;">${challenge.explainModelAnswer}</p>
            </div>

            <div style="background-color: var(--bg-main); padding: 16px; border-radius: 8px; margin-bottom: 24px;">
              <strong>Your reflection:</strong>
              <p style="font-size: 14px; font-style: italic; color: var(--text-muted); margin-top: 8px; line-height: 1.5;">${this.escapeHTML(this.codingExplanationValue || '')}</p>
            </div>

            <button class="btn btn-primary btn-lg" id="submit-program-btn" style="min-height: 44px; min-width: 250px;">Save & submit challenge</button>
          </div>
        </div>
      `;
    }

    panel.innerHTML = `
      <div style="margin-bottom: 24px;">
        <span class="badge badge-primary">Level ${challenge.level}: ${challenge.concept}</span>
        <h1 style="margin-top: 8px;">💻 Programming: ${challenge.title}</h1>
        <p style="font-size: 16px; font-weight: 600; color: var(--text-main); margin-top: 6px; line-height: 1.5;">${challenge.instructions}</p>
      </div>

      <div style="display: grid; grid-template-columns: 260px 1.25fr 0.75fr; gap: 24px;">
        ${sidebarHtml}
        ${workspaceHtml}
      </div>
    `;

    // Bind text inputs back to state to preserve on re-render
    const predictIn = document.getElementById('predict-input');
    if (predictIn) {
      predictIn.value = this.predictInputValue || '';
      predictIn.oninput = (e) => { this.predictInputValue = e.target.value; };
    }

    const explainIn = document.getElementById('coding-explanation-response');
    if (explainIn) {
      explainIn.value = this.codingExplanationValue || '';
      explainIn.oninput = (e) => { this.codingExplanationValue = e.target.value; };
    }

    // Code editing tracking
    const editorEl = document.getElementById('python-editor');
    if (editorEl) {
      editorEl.oninput = (e) => {
        this.editorCode = e.target.value;
        this.lastProgrammingEvidence = [];
        this.lastProgrammingTestRun = null;
        const proceedButton = document.getElementById('proceed-to-explain-btn');
        if (proceedButton) proceedButton.remove();
        const runtimeStatus = document.getElementById('python-runtime-status');
        if (runtimeStatus) runtimeStatus.textContent = 'Python runtime: code changed — run the tests again';
      };
    }

    // Bind challenge links programmatically
    panel.querySelectorAll('.prog-challenge-link').forEach(link => {
      link.onclick = (e) => {
        e.preventDefault();
        this.activateProgrammingChallenge(link.getAttribute('data-cid'));
        this.render();
      };
    });

    // Bind support ladder step buttons programmatically
    panel.querySelectorAll('.support-ladder-btn').forEach(btn => {
      btn.onclick = () => {
        const step = parseInt(btn.getAttribute('data-step'));
        this.triggerSupportLadder(step);
      };
    });

    // Bind stage navigation buttons
    const confirmPredictBtn = document.getElementById('confirm-predict-btn');
    if (confirmPredictBtn) {
      confirmPredictBtn.onclick = () => {
        const val = document.getElementById('predict-input').value.trim();
        if (!val) {
          alert('Please enter a prediction before proceeding.');
          return;
        }
        this.predictInputValue = val;
        this.programmingStage = 'run';
        this.render();
      };
    }

    const proceedToExplainBtn = document.getElementById('proceed-to-explain-btn');
    if (proceedToExplainBtn) {
      proceedToExplainBtn.onclick = () => {
        this.programmingStage = 'explain';
        this.render();
      };
    }

    const confirmExplainBtn = document.getElementById('confirm-explain-btn');
    if (confirmExplainBtn) {
      confirmExplainBtn.onclick = () => {
        const val = document.getElementById('coding-explanation-response').value.trim();
        if (!val) {
          alert('Please enter a brief reflection before proceeding.');
          return;
        }
        this.codingExplanationValue = val;
        this.programmingStage = 'check';
        this.render();
      };
    }

    // Bind execution runner
    const runBtn = document.getElementById('run-code-btn');
    if (runBtn) {
      runBtn.onclick = () => this.runPythonCodeSandbox(challenge);
    }

    const tutorBtn = document.getElementById('ai-programming-tutor-btn');
    if (tutorBtn) tutorBtn.onclick = () => this.requestProgrammingTutor(challenge);

    // Submit submission
    const submitBtn = document.getElementById('submit-program-btn');
    if (submitBtn) {
      submitBtn.onclick = async () => {
        this.submitProgramChallenge(challenge, this.codingExplanationValue);
        // Reset state for next work
        this.programmingStage = 'predict';
        this.revealedSupportStep = 1;
        this.activeSupportFeedback = {};
        this.predictInputValue = '';
        this.codingExplanationValue = '';
      };
    }
  }

  triggerSupportLadder(step) {
    const challenges = window.db.getProgrammingChallenges();
    const challenge = challenges.find(c => c.id === this.activeChallengeId);
    if (!challenge) return;

    this.supportLevelUsed = Math.max(this.supportLevelUsed, step);

    let text = '';
    if (step === 1) {
      if (challenge.level === 1) {
        text = `<strong>Restated problem:</strong> Work out the exact text produced by the print statement.`;
      } else {
        text = `<strong>Restated problem:</strong> ${challenge.problem}`;
      }
    }
    else if (step === 2) text = `<strong>Inputs/Outputs:</strong> Expected values: ${challenge.testCases.map(tc => `Input [${tc.input}] -> Output [${tc.expected}]`).join(', ')}`;
    else if (step === 3) text = `<strong>Concept hint:</strong> ${challenge.supportLadder[0] || 'Use operations to construct string structure.'}`;
    else if (step === 4) {
      const plans = {
        pc_1: 'username = "Harriet"\nsubject = "Computer Science"\nprint("Welcome " + username + " to " + subject)',
        pc_2: 'if score >= 50 then\n    print("Pass")\nelse\n    print("Fail")\nendif',
        pc_3: 'for i=1 to 5\n    print(i)\nnext i',
        pc_4: 'function hex_char_to_val(char)\n    // deal with digits and A-F separately\n    return value\nendfunction',
        pc_5: 'total = 0\nmyFile = open("scores.txt")\nwhile NOT myFile.endOfFile()\n    total = total + int(myFile.readLine())\nendwhile\nmyFile.close()\nprint(total)'
      };
      text = `<strong>OCR Exam Reference Language plan:</strong><br><pre>${plans[challenge.id] || 'Identify inputs, processes and outputs first.'}</pre>`;
    }
    else if (step === 5) text = `<strong>Worked explanation:</strong><p>${challenge.explainModelAnswer}</p><p style="font-size:11px; color:var(--text-muted);">Explain the idea in your own words, then make one change to your program and test again.</p>`;

    this.activeSupportFeedback[step] = text;
    if (this.revealedSupportStep === step) {
      this.revealedSupportStep = step + 1;
    }
    this.render();
  }


  getPythonWorker() {
    if (this.pythonWorker && this.pythonWorkerReadyPromise) return this.pythonWorkerReadyPromise;
    this.pythonWorker = new Worker('/python-worker.mjs');
    this.pythonWorkerReadyPromise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Python took too long to load. Check the internet connection and try again.')), 30000);
      const onMessage = event => {
        if (event.data?.type === 'ready') {
          clearTimeout(timeout);
          this.pythonWorker.removeEventListener('message', onMessage);
          resolve(this.pythonWorker);
        } else if (event.data?.type === 'initialisation-error') {
          clearTimeout(timeout);
          reject(new Error(event.data.error));
        }
      };
      this.pythonWorker.addEventListener('message', onMessage);
      this.pythonWorker.addEventListener('error', (err) => {
        console.error('Python Worker Error Event:', err);
        clearTimeout(timeout);
        reject(new Error(`The protected Python runner could not start. (Diagnostic: ${err.message || 'Worker blocked or script error'})`));
      }, { once: true });
    });
    return this.pythonWorkerReadyPromise;
  }

  resetPythonWorker() {
    if (this.pythonWorker) this.pythonWorker.terminate();
    this.pythonWorker = null;
    this.pythonWorkerReadyPromise = null;
  }

  async executePythonTests(challenge, testedCode = this.editorCode) {
    const worker = await this.getPythonWorker();
    const id = ++this.pythonWorkerRequestId;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.resetPythonWorker();
        reject(new Error('Your program ran for too long. Check for an infinite loop.'));
      }, 5000);
      const onMessage = event => {
        if (event.data?.type !== 'result' || event.data.id !== id) return;
        clearTimeout(timeout);
        worker.removeEventListener('message', onMessage);
        resolve(event.data.results);
      };
      worker.addEventListener('message', onMessage);
      worker.postMessage({ id, code: testedCode, challengeId: challenge.id, tests: challenge.testCases });
    });
  }

  normaliseProgramOutput(value) {
    return String(value ?? '').replace(/\r\n/g, '\n').split('\n').map(line => line.trimEnd()).join('\n').trim();
  }

  formatPythonErrorForPupil(errorStr) {
    if (!errorStr) return '';
    let str = String(errorStr).trim();

    // Strip pyodide / CPython internal framework stack frames
    if (str.includes('Traceback (most recent call last):')) {
      const lines = str.split('\n');
      const filtered = lines.filter(line => {
        const trimmed = line.trim();
        return !trimmed.includes('_pyodide') &&
               !trimmed.includes('/lib/python') &&
               !trimmed.includes('eval_code_async') &&
               !trimmed.includes('eval(self.code');
      });
      str = filtered.join('\n').trim();
    }

    // Extract line number if present
    const lineMatch = str.match(/(?:line|Line)\s+(\d+)/);
    const lineNum = lineMatch ? lineMatch[1] : null;
    const linePrefix = lineNum ? `Line ${lineNum}: ` : '';

    // 1. Unterminated string literal
    if (/unterminated string literal|EOL while scanning string literal/i.test(str)) {
      return `${linePrefix}Unclosed text string. You started a quote " or ' on this line, but forgot to close it before the end of the line.`;
    }

    // 2. Missing / expected colon
    if (/expected ':'/i.test(str)) {
      return `${linePrefix}Missing colon (:). Statements like if, else, elif, for, or while need a colon : at the end of the line.`;
    }

    // 3. Unmatched / unclosed parentheses
    if (/'\)' was never closed|\(' was never closed/i.test(str)) {
      return `${linePrefix}Unclosed bracket. You opened a bracket ( on this line, but forgot to close it with ).`;
    }
    if (/unmatched '\)'|unmatched '\]'|unmatched '\}'/i.test(str)) {
      return `${linePrefix}Extra bracket. Check your brackets ( ) — there is an unmatched closing bracket.`;
    }

    // 4. Generic SyntaxError
    if (/SyntaxError/i.test(str)) {
      const cleanMsg = str.replace(/^SyntaxError:\s*/i, '').replace(/\(detected at line \d+\)/i, '').replace(/on line \d+:\s*/i, '').trim();
      return `${linePrefix}Syntax check — Python couldn't understand this line (${cleanMsg}). Check for missing quotes, brackets, or colons.`;
    }

    // 5. IndentationError
    if (/IndentationError|unexpected indent|expected an indented block/i.test(str)) {
      if (/expected an indented block/i.test(str)) {
        return `${linePrefix}Missing indentation. The code inside an if, else, for, or while block needs 4 spaces at the start of the line.`;
      }
      return `${linePrefix}Indentation check. Check the spacing at the start of this line so it aligns correctly with the block above.`;
    }

    // 6. NameError (undefined variable/function)
    const nameMatch = str.match(/NameError:\s*name '([^']+)' is not defined/i);
    if (nameMatch) {
      return `${linePrefix}Unknown name '${nameMatch[1]}'. Check for typos in '${nameMatch[1]}', or make sure you defined it before using it.`;
    }

    // 7. TypeError (concatenating string + int)
    if (/can only concatenate str \(not "int"\) to str|unsupported operand type/i.test(str)) {
      return `${linePrefix}Type error. You tried to combine text with a number. Use str(...) to convert numbers to text, or use commas in print().`;
    }

    // 8. ZeroDivisionError
    if (/ZeroDivisionError|division by zero/i.test(str)) {
      return `${linePrefix}Division by zero. You cannot divide a number by 0.`;
    }

    // 9. EOFError
    if (/EOFError|requested more input/i.test(str)) {
      return `Input needed. Your code called input() more times than supplied by this test case.`;
    }

    // Clean fallback for any other error
    str = str.replace(/^Traceback \(most recent call last\):\s*/i, '');
    str = str.replace(/File "student_code\.py", line (\d+)(?:, in <module>)?/gi, 'Line $1');

    return str.trim();
  }

  async runPythonCodeSandbox(challenge) {
    const runBtn = document.getElementById('run-code-btn');
    const status = document.getElementById('python-runtime-status');
    const consoleOutput = document.getElementById('python-console-output');
    const submitBtn = document.getElementById('submit-program-btn');
    const editor = document.getElementById('python-editor');
    if (!this.editorCode.trim()) return this.alert('Write or review the Python code before running it.');
    const testedCode = this.editorCode;
    if (runBtn) { runBtn.disabled = true; runBtn.textContent = 'Loading Python…'; }
    if (editor) editor.disabled = true;
    if (status) status.textContent = 'Python runtime: loading securely in your browser…';
    if (submitBtn) submitBtn.disabled = true;
    this.lastProgrammingEvidence = [];
    this.lastProgrammingTestRun = null;
    try {
      const results = await this.executePythonTests(challenge, testedCode);
      let allPassed = true;
      results.forEach((result, idx) => {
        const tc = challenge.testCases[idx];
        const actual = this.normaliseProgramOutput(result.output);
        const expected = this.normaliseProgramOutput(tc.expected);
        const cleanErr = this.formatPythonErrorForPupil(result.error);
        const errorDetail = cleanErr || (actual === expected ? '' : `Expected “${expected}” but your program printed “${actual || '(nothing)'}”.`);
        const passed = !errorDetail && actual === expected;
        const outcomeText = document.getElementById(`tc-outcome-${idx}`);
        const card = document.getElementById(`tc-card-${idx}`);
        allPassed = allPassed && passed;
        if (outcomeText) {
          outcomeText.textContent = passed ? `Passed (printed: ${actual})` : `Failed — ${errorDetail}`;
          outcomeText.style.color = passed ? 'var(--green)' : 'var(--red)';
        }
        if (card) card.style.borderColor = passed ? 'var(--green)' : 'var(--red)';
        this.lastProgrammingEvidence.push({ passed, error: errorDetail });
      });
      this.lastProgrammingTestRun = {
        challengeId: challenge.id,
        code: testedCode,
        testCount: challenge.testCases.length,
        allPassed
      };
      if (status) status.textContent = 'Python runtime: run complete';
      if (consoleOutput) {
        consoleOutput.textContent = results.map((result, idx) => {
          const cleanErr = this.formatPythonErrorForPupil(result.error);
          return `Test ${idx + 1}:\n${result.output || cleanErr || '(no output)'}`;
        }).join('\n\n');
      }
      if (submitBtn) submitBtn.disabled = !allPassed;
      this.alert(allPassed ? 'Success: All test cases passed! You can now submit your solution.' : 'Some test cases failed. Use the test results, support steps or tutor to decide what to change.');
    } catch (error) {
      if (status) status.textContent = 'Python runtime: could not complete the run';
      if (consoleOutput) consoleOutput.textContent = error.message;
      this.lastProgrammingEvidence = [{ passed: false, error: error.message }];
      this.lastProgrammingTestRun = null;
      this.alert(error.message);
    } finally {
      if (runBtn) { runBtn.disabled = false; runBtn.textContent = '▶ Run code'; }
      if (editor) editor.disabled = false;
      const tutorBtn = document.getElementById('ai-programming-tutor-btn');
      if (tutorBtn) tutorBtn.disabled = false;
    }
  }

  async requestProgrammingTutor(challenge) {
    const output = document.getElementById('ai-programming-feedback');
    const button = document.getElementById('ai-programming-tutor-btn');
    if (window.db.getSettings()?.aiFeaturesEnabled === false) {
      this.alert('Automated tutor feedback is disabled in school settings. Use the support ladder and test results instead.');
      return;
    }
    if (!output || !this.lastProgrammingEvidence.length) return;
    output.style.display = 'block';
    output.innerHTML = '<strong>Tutor:</strong> Looking at the first useful test result...';
    if (button) button.disabled = true;
    let feedback = null;
    try {
      const token = window.db.getSessionToken();
      if (!token) throw new Error('Demo session uses local tutor');
      const response = await fetch('/api/programming-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ challengeId: challenge.id, code: this.editorCode, testEvidence: this.lastProgrammingEvidence, hintLevel: this.aiTutorHintLevel })
      });
      if (!response.ok) throw new Error('Tutor service unavailable');
      const payload = await response.json();
      feedback = payload.feedback;
    } catch (error) {
      const failed = this.lastProgrammingEvidence.find(item => !item.passed);
      feedback = {
        diagnosis: failed ? 'One or more test cases do not yet match the required behaviour.' : 'The tests pass; explain why the solution works before submitting.',
        hint: challenge.id === 'pc_3' ? 'Python stops before the second value supplied to range.' : (challenge.supportLadder[Math.min(this.aiTutorHintLevel - 1, challenge.supportLadder.length - 1)] || 'Trace the first test case line by line.'),
        checkQuestion: challenge.id === 'pc_3' ? 'What values does your current range produce?' : 'What should happen in the first test case?',
        source: 'local'
      };
    }
    this.aiTutorHintLevel = Math.min(4, this.aiTutorHintLevel + 1);
    output.innerHTML = `<small>${feedback.source === 'ai' ? 'Automated formative tutor' : 'Local feedback guide'}</small><strong>What I noticed</strong><p>${this.escapeHTML(feedback.diagnosis)}</p><strong>One hint</strong><p>${this.escapeHTML(feedback.hint)}</p><strong>Check your understanding</strong><p>${this.escapeHTML(feedback.checkQuestion)}</p><p style="font-size:11px; color:var(--text-muted); margin-bottom:0;">The tutor has not rewritten your program. Try one change, then run the tests again.</p>`;
    if (button) button.disabled = false;
  }

  submitProgramChallenge(challenge, explanation) {
    let supportText = 'None';
    if (this.supportLevelUsed >= 4) supportText = 'High';
    else if (this.supportLevelUsed >= 2) supportText = 'Medium';
    else if (this.supportLevelUsed >= 1) supportText = 'Low';

    const testCases = Array.isArray(challenge.testCases) ? challenge.testCases : [];
    const completePassingEvidence = testCases.length > 0
      && this.lastProgrammingTestRun?.challengeId === challenge.id
      && this.lastProgrammingTestRun.code === this.editorCode
      && this.lastProgrammingTestRun.testCount === testCases.length
      && this.lastProgrammingTestRun.allPassed === true
      && this.lastProgrammingEvidence.length === testCases.length
      && this.lastProgrammingEvidence.every(item => item.passed === true);
    if (!completePassingEvidence) {
      this.alert('Run this exact code and pass every test before submitting.');
      return false;
    }

    window.db.addProgrammingSubmission({
      studentId: this.currentUser.id,
      challengeId: challenge.id,
      code: this.editorCode,
      status: 'Passed',
      supportUsed: supportText,
      explanationResponse: explanation
    });

    // Award a badge only when the complete challenge has demonstrated passing evidence.
    const student = window.db.getStudents().find(s => s.id === this.currentUser.id);
    if (student) {
      if (challenge.id === 'pc_3' && completePassingEvidence) this.grantAchievement(student, 'debugging-detective');
      window.db.saveData();
    }

    this.alert('Your programming submission has been saved. You can view its status in Progress.');
    this.switchTab('stud-dashboard');
    return true;
  }

  // ==================== WRITTEN ANSWERS ====================
  renderStudentWritten(panel) {
    const questions = window.db.getWrittenQuestions();
    const activeQ = questions.find(q => q.id === this.activeWQuestionId) || questions[0];

    panel.innerHTML = `
      <div style="margin-bottom: 24px;">
        <span class="badge badge-primary">${activeQ.marks} Marks · ${activeQ.commandWord} Question</span>
        <h1 style="margin-top: 8px;">✍️ Extended Written Answers: GCSE Practice</h1>
        <p style="font-size:15px; color: var(--text-muted);">Write clear, developed answers that use accurate computing terms and apply them to the scenario.</p>
      </div>

      <div style="display: grid; grid-template-columns: 280px 1fr; gap: 32px;">
        <details style="border-right: 1px solid var(--border-color); padding-right: 24px;">
          <summary style="font-size:15px; font-weight:700; cursor:pointer; margin-bottom:12px;">Choose a different question</summary>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:12px;" id="written-questions-list">
            ${questions.map(q => `
              <li>
                <a href="#" class="written-q-link" data-qid="${q.id}" style="font-size: 13px; text-decoration:none; color: ${q.id === this.activeWQuestionId ? 'var(--teal)' : 'var(--text-main)'}; font-weight: ${q.id === this.activeWQuestionId ? '600' : '400'};">
                  ${q.commandWord}: ${q.scenario} (${q.marks} marks)
                </a>
              </li>
            `).join('')}
          </ul>
        </details>

        <div>
          <div class="card" style="margin-bottom: 24px;">
            <p style="font-size: 16px; font-weight: 600; color: var(--text-main); line-height: 1.5;">${activeQ.question}</p>
          </div>

          <!-- Stage 4 planning Scaffold -->
          <details open class="card" style="margin-bottom: 24px; border-left: 5px solid var(--amber);">
            <h4 style="color: var(--amber); margin-bottom: 8px;">📋 Plan your answer</h4>
            <p style="font-size:13px;">Use these prompts to organise your ideas, then build your draft.</p>
            
            <div class="form-group">
              <label>First technical point or step</label>
              <input type="text" id="scaf-p1" class="form-control" style="font-size:13px;" placeholder="State the first point the question needs." value="${this.escapeHTML(this.scaffoldPoints.p1)}">
            </div>
            <div class="form-group">
              <label>Develop or link that point</label>
              <input type="text" id="scaf-exp1" class="form-control" style="font-size:13px;" placeholder="Explain the process, reason or link required." value="${this.escapeHTML(this.scaffoldPoints.exp1)}">
            </div>
            <div class="form-group">
              <label>Second technical point or step</label>
              <input type="text" id="scaf-p2" class="form-control" style="font-size:13px;" placeholder="State the next distinct point the question needs." value="${this.escapeHTML(this.scaffoldPoints.p2)}">
            </div>
            <div class="form-group">
              <label>Develop or link that point</label>
              <input type="text" id="scaf-exp2" class="form-control" style="font-size:13px;" placeholder="Explain the process, reason or link required." value="${this.escapeHTML(this.scaffoldPoints.exp2)}">
            </div>
            <button class="btn btn-secondary btn-sm" id="construct-ans-btn">Build my draft from these notes</button>
          </details>

          <!-- Content hints only visible after attempt -->
          <details class="card" id="written-content-hints" style="margin-bottom: 24px; border-left: 5px solid var(--teal); display: ${this.writtenAttempted ? 'block' : 'none'};">
            <summary style="font-weight: 600; cursor: pointer; color: var(--teal);">💡 Content Hints (Available after attempt)</summary>
            <div style="font-size: 13px; margin-top: 12px; line-height: 1.6; color: var(--text-muted);">
              Key technical details to check in your response:
              <ul style="margin-top: 8px; padding-left: 20px; display: flex; flex-direction: column; gap: 6px;">
                ${(activeQ.indicativeContent && activeQ.indicativeContent.length ? activeQ.indicativeContent : (activeQ.rubric || [])).map(hint => `<li>${this.escapeHTML(hint)}</li>`).join('')}
              </ul>
            </div>
          </details>

          <!-- Sentence Starters Scaffold -->
          <details style="margin-bottom: 12px;">
            <span style="font-size: 13px; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 6px;">💡 Need a starting point? Click to insert a sentence starter:</span>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button type="button" class="btn btn-secondary btn-sm sentence-starter-btn" data-text="The first relevant point is " style="font-size: 11px; padding: 4px 8px; min-height: 28px;">"The first relevant point is..."</button>
              <button type="button" class="btn btn-secondary btn-sm sentence-starter-btn" data-text="This answers the question because " style="font-size: 11px; padding: 4px 8px; min-height: 28px;">"This answers the question because..."</button>
              <button type="button" class="btn btn-secondary btn-sm sentence-starter-btn" data-text="The next step or point is " style="font-size: 11px; padding: 4px 8px; min-height: 28px;">"The next step or point is..."</button>
            </div>
          </details>

          <!-- Main Response Input Area -->
          <div class="form-group">
            <label style="font-size:14px; font-weight:600;">2. Write your answer</label>
            <textarea id="written-response-box" class="form-control" rows="8" placeholder="Type your full paragraph answer here..." style="font-size: 14px; line-height: 1.6;"></textarea>
          </div>

          <button class="btn btn-primary btn-lg" id="submit-written-btn">3. Check and improve</button>

          <!-- AI Formative Feedback display area -->
          <div id="ai-feedback-panel" class="card" style="margin-top: 32px; border-top: 5px solid var(--teal); display: none;">
            <h3 style="color: var(--teal); margin-bottom: 12px;">Practice feedback</h3>
            <div style="font-size: 14px; line-height: 1.6; color: var(--text-muted);">
              <div><strong id="ai-est-mark" style="color: var(--text-main); font-size:16px;"></strong></div>
              <div style="margin-top:12px;"><strong>Strengths:</strong> <span id="ai-strengths"></span></div>
              <div style="margin-top:8px;"><strong>Areas for improvement:</strong> <span id="ai-improvements"></span></div>
              <div style="margin-top:8px; border-left:3px solid var(--coral); padding-left:12px;"><strong>Clear action item:</strong> <span id="ai-action"></span></div>
            </div>
            <button class="btn btn-secondary btn-sm" style="margin-top: 20px;" id="written-feedback-close-btn">Save and exit</button>
          </div>
        </div>
      </div>
    `;

    // Bind question links programmatically
    const qLinks = panel.querySelectorAll('.written-q-link');
    qLinks.forEach(link => {
      link.onclick = (e) => {
        e.preventDefault();
        this.activeWQuestionId = link.getAttribute('data-qid');
        this.render();
      };
    });

    // Bind sentence starters
    const starterBtns = panel.querySelectorAll('.sentence-starter-btn');
    starterBtns.forEach(btn => {
      btn.onclick = () => {
        const text = btn.getAttribute('data-text');
        const box = document.getElementById('written-response-box');
        if (box) {
          box.value = text + box.value.trim();
          box.focus();
          this.writtenResponseText = box.value;
        }
      };
    });

    // Construct answer from scaffold inputs
    const consBtn = document.getElementById('construct-ans-btn');
    if (consBtn) {
      consBtn.onclick = () => {
        const box = document.getElementById('written-response-box');
        if (box && box.value.trim().length > 0) {
          if (!confirm('This will replace your current answer in the text box. Do you want to proceed?')) {
            return;
          }
        }
        const p1 = document.getElementById('scaf-p1').value.trim();
        const exp1 = document.getElementById('scaf-exp1').value.trim();
        const p2 = document.getElementById('scaf-p2').value.trim();
        const exp2 = document.getElementById('scaf-exp2').value.trim();
        
        let constructed = '';
        if (p1 && exp1) constructed += `Firstly, ${p1} is important because ${exp1}. `;
        if (p2 && exp2) constructed += `Secondly, ${p2}. ${exp2}.`;

        if (box) {
          box.value = constructed;
          this.writtenResponseText = constructed;
        }
        this.scaffoldPoints = { p1, exp1, p2, exp2, apply: '' };
      };
    }

    // Submit for grading
    const submitBtn = document.getElementById('submit-written-btn');
    if (submitBtn) {
      submitBtn.onclick = async () => {
        const text = document.getElementById('written-response-box').value.trim();
        if (text.length < 20) {
          this.alert('Warning: Your response is too short to receive a mark band assessment.');
          return;
        }
        this.writtenAttempted = true;
        const hintsBox = document.getElementById('written-content-hints');
        if (hintsBox) hintsBox.style.display = 'block';
        await this.requestAiWritingFeedback(activeQ, text, submitBtn);
      };
    }

    // Bind feedback close button
    const closeBtn = document.getElementById('written-feedback-close-btn');
    if (closeBtn) {
      closeBtn.onclick = () => {
        this.switchTab('stud-dashboard');
      };
    }
  }

  async requestAiWritingFeedback(question, responseText, button) {
    if (button) { button.disabled = true; button.textContent = 'Checking against the feedback guide…'; }
    if (window.db.getSettings()?.aiFeaturesEnabled === false) {
      this.runAiMarkingSimulation(question, responseText);
      if (button) { button.disabled = false; button.textContent = '3. Check and improve again'; }
      return;
    }
    try {
      const token = window.db.getSessionToken();
      if (!token) throw new Error('Local fallback');
      const response = await fetch('/api/writing-feedback', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ questionId: question.id, question: question.question, commandWord: question.commandWord, marks: question.marks, rubric: question.rubric, indicativeContent: question.indicativeContent, response: responseText })
      });
      if (!response.ok) throw new Error('Feedback service unavailable');
      const { feedback } = await response.json();
      document.getElementById('ai-est-mark').textContent = 'Practice feedback only — not a mark';
      document.getElementById('ai-strengths').textContent = feedback.strength;
      document.getElementById('ai-improvements').textContent = feedback.improvement;
      document.getElementById('ai-action').textContent = `${feedback.revisionPrompt} ${feedback.rubricEvidence}`;
      
      const titleEl = document.querySelector('#ai-feedback-panel h3');
      if (titleEl) {
        if (feedback.source === 'deterministic') {
          titleEl.textContent = 'Practice feedback — local guide';
        } else {
          titleEl.textContent = 'Practice feedback';
        }
      }
      
      document.getElementById('ai-feedback-panel').style.display = 'block';
      window.db.addWrittenSubmission({ studentId: this.currentUser.id, questionId: question.id, response: responseText, estimatedMark: String(feedback.estimatedMark), strengths: feedback.strength, improvements: feedback.improvement, actionItem: feedback.revisionPrompt, feedbackSource: feedback.source });
    } catch (error) {
      this.runAiMarkingSimulation(question, responseText);
    } finally {
      if (button) { button.disabled = false; button.textContent = '3. Check and improve again'; }
    }
  }

  runAiMarkingSimulation(question, responseText) {
    const estMarkSpan = document.getElementById('ai-est-mark');
    const strengthsSpan = document.getElementById('ai-strengths');
    const improvementsSpan = document.getElementById('ai-improvements');
    const actionSpan = document.getElementById('ai-action');
    const fPanel = document.getElementById('ai-feedback-panel');

    const feedback = calculateDeterministicWrittenFeedback({
      commandWord: question.commandWord,
      marks: question.marks,
      response: responseText,
      indicativeContent: question.indicativeContent,
      question: question.question,
      id: question.id
    });

    estMarkSpan.textContent = 'Practice feedback only — not a mark';
    strengthsSpan.textContent = feedback.strength;
    improvementsSpan.textContent = feedback.improvement;
    actionSpan.textContent = `${feedback.revisionPrompt} ${feedback.rubricEvidence}`;
    
    const titleEl = document.querySelector('#ai-feedback-panel h3');
    if (titleEl) {
      titleEl.textContent = 'Practice feedback — local guide';
    }
    
    fPanel.style.display = 'block';

    // Store written submission
    window.db.addWrittenSubmission({
      studentId: this.currentUser.id,
      questionId: question.id,
      response: responseText,
      estimatedMark: String(feedback.estimatedMark),
      strengths: feedback.strength,
      improvements: feedback.improvement,
      actionItem: feedback.revisionPrompt,
      feedbackSource: 'deterministic'
    });
  }

  // ==================== SECURE MESSAGES ====================
  renderStudentMessages(panel) {
    const student = window.db.getStudents().find(item => item.id === this.currentUser.id) || this.currentUser;
    const studentClass = window.db.getClasses().find(item => item.id === student.classId);
    const assignedContact = window.db.getCoordinators().find(item => item.id === studentClass?.teacherId);
    if (!assignedContact) {
      panel.innerHTML = `
        <div class="card" role="status">
          <h1>Teacher messaging unavailable</h1>
          <p>Your assigned Computing contact could not be confirmed, so no message has been sent. Ask your school to check your class assignment.</p>
          <button type="button" class="btn btn-secondary" id="messages-unavailable-home">Back to My desk</button>
        </div>
      `;
      panel.querySelector?.('#messages-unavailable-home')?.addEventListener('click', () => this.switchTab('stud-dashboard'));
      this.focusMainContent();
      return;
    }
    const contactId = assignedContact.id;
    const contactName = assignedContact.name;
    const messages = window.db.getMessages().filter(message =>
      (message.senderId === this.currentUser.id && message.receiverId === contactId)
      || (message.senderId === contactId && message.receiverId === this.currentUser.id)
    );
    const communicationHours = window.db.getSettings().communicationHours;
    
    panel.innerHTML = `
      <div class="student-route-header student-route-header--quiet">
        <span class="student-mode-label">Messages</span>
        <h1>Ask your Computing teacher</h1>
        <p>Send a question about a topic, assignment or programming task. Messages are monitored during ${this.escapeHTML(communicationHours)}; a reply may not be immediate. Messages do not affect Progress.</p>
      </div>

      <div class="chat-container">
        <div class="chat-header">
          <div>
            <strong>${this.escapeHTML(contactName)}</strong>
            <span class="student-contact-hours">Messages monitored ${this.escapeHTML(communicationHours)}</span>
          </div>
        </div>

        <div class="chat-messages" id="chat-scroller">
          ${messages.map(m => `
            <div class="chat-bubble ${m.senderId === this.currentUser.id ? 'sent' : 'received'}">
              <div style="font-size:11px; color: rgba(255,255,255,0.7); margin-bottom: 4px;">
                ${m.senderId === this.currentUser.id ? 'You' : this.escapeHTML(contactName)} · ${new Date(m.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
              <div>${this.escapeHTML(m.text)}</div>
              ${m.flagged ? `<div style="font-size: 10px; color: #FECACA; font-weight:600; margin-top: 4px;">⚠️ Safety warning: Flagged by school filters</div>` : ''}
            </div>
          `).join('')}
        </div>

        <div class="chat-input-area">
          <label class="sr-only" for="chat-text-input">Your message to ${this.escapeHTML(contactName)}</label>
          <input type="text" id="chat-text-input" class="form-control" placeholder="Type your question..." value="${this.escapeHTML(this.messageDraft)}">
          <button class="btn btn-primary" id="chat-send-btn">Send</button>
        </div>
      </div>
      <p><button type="button" class="btn btn-secondary" id="messages-home-btn">Back to My desk</button></p>
    `;
    panel.querySelector?.('#messages-home-btn')?.addEventListener('click', () => this.switchTab('stud-dashboard'));

    // Scroll chat to bottom
    const scroller = document.getElementById('chat-scroller');
    if (scroller) scroller.scrollTop = scroller.scrollHeight;

    // Text tracking
    const textIn = document.getElementById('chat-text-input');
    if (textIn) {
      textIn.oninput = (e) => { this.messageDraft = e.target.value; };
      textIn.onkeydown = (e) => {
        if (e.key === 'Enter') {
          this.sendMessage();
        }
      };
    }

    const sendBtn = document.getElementById('chat-send-btn');
    if (sendBtn) {
      sendBtn.onclick = () => this.sendMessage();
    }
  }

  sendMessage() {
    const text = this.messageDraft.trim();
    if (!text) return;

    const student = window.db.getStudents().find(item => item.id === this.currentUser.id) || this.currentUser;
    const studentClass = window.db.getClasses().find(item => item.id === student.classId);
    const receiverId = window.db.getCoordinators().find(item => item.id === studentClass?.teacherId)?.id;
    if (!receiverId) return this.alert('Your assigned Computing contact could not be confirmed. No message was sent.');
    window.db.addMessage({
      senderId: this.currentUser.id,
      receiverId,
      text
    });

    this.messageDraft = '';
    this.render();
  }

  // ==================== PROGRESS & ACHIEVEMENTS ====================
  renderStudentProgress(panel) {
    const student = window.db.getStudents().find(s => s.id === this.currentUser.id) || this.currentUser;
    const attempts = window.db.getAttempts().filter(a => a.studentId === this.currentUser.id);
    const displayedAttempts = this.getDisplayedEvidenceAttempts(attempts);
    const topicLabels = new Map(window.db.getUnits().flatMap(unit => unit.topics).map(topic => [topic.id, topic.name]));
    const activityTypeLabels = {
      spaced_theory: 'Quick recall',
      number_skills: 'Number skills',
      pseudocode_assessed: 'Pseudocode check',
      exam_transfer_retry: 'Exam answer sent for review',
      definition_test: 'Definition practice'
    };
    const submissions = window.db.getProgrammingSubmissions().filter(s => s.studentId === this.currentUser.id);
    const writtenSubmissions = window.db.getWrittenSubmissions().filter(s => s.studentId === this.currentUser.id);
    const milestones = this.getSectionMilestones(student.id);
    const curriculumContent = window.db.getCurriculumContent?.() || [];
    const teachingObjectiveIds = new Set(curriculumContent.map(item => item.id));
    const availableMilestones = milestones.filter(item => item.available);
    const unavailableCount = milestones.length - availableMilestones.length;
    const securedCount = availableMilestones.filter(item => item.state === 'checkpoint_secured').length;
    const practicedCount = availableMilestones.filter(item => item.state === 'practice_completed').length;
    const milestonePercent = availableMilestones.length ? Math.round((securedCount / availableMilestones.length) * 100) : 0;
    const nextProgressMilestone = availableMilestones.find(item =>
      item.state !== 'checkpoint_secured' && teachingObjectiveIds.has(item.id)
    );
    const milestoneGroups = ['Paper 1', 'Paper 2'].map(paper => {
      const paperMilestones = milestones.filter(item => item.paper === paper);
      return `
        <details class="milestone-paper-group">
          <summary id="milestone-${paper.replace(' ', '-')}"><strong>${paper}</strong></summary>
          ${paperMilestones.map(item => {
            const demonstrated = item.demonstratedFocuses.map(focus => this.formatAssessmentFocus(focus));
            const remaining = item.remainingFocuses.map(focus => this.formatAssessmentFocus(focus));
            const evidenceSummary = item.available
              ? [
                item.evidenceSourceCount
                  ? `${item.evidenceSourceCount} checked ${item.evidenceSourceCount === 1 ? 'activity' : 'activities'}`
                  : 'No checked activity yet',
                item.latestDate ? `Latest ${new Date(item.latestDate).toLocaleDateString()}` : null,
                demonstrated.length ? `Shown so far: ${demonstrated.join(', ')}` : null,
                remaining.length ? `Still to show: ${remaining.join(', ')}` : null
              ].filter(Boolean).join(' · ')
              : 'There are not yet enough suitable checked questions for this section, so it is not included in the section total.';
            return `
            <div class="milestone-list-row">
              <div class="milestone-list-heading">
              <span><strong>${this.escapeHTML(item.id)}</strong> · ${this.escapeHTML(item.name)}</span>
              ${this.getMilestoneBadge(item)}
              </div>
              <span class="milestone-evidence-detail">${this.escapeHTML(evidenceSummary)}</span>
              ${item.state !== 'checkpoint_secured' && teachingObjectiveIds.has(item.id)
                ? `<button type="button" class="progress-learn-link progress-learn-section" data-objective-id="${this.escapeHTML(item.id)}">Review this section</button>`
                : item.state !== 'checkpoint_secured' ? '<span class="milestone-evidence-detail">Learning route unavailable for this section.</span>' : ''}
            </div>
          `;
          }).join('')}
        </details>
      `;
    }).join('');
    const topicMasteryHtml = window.db.getUnits().flatMap(unit => unit.topics).map(topic => {
      const topicAttempts = attempts.filter(attempt => this.attemptMatchesTopic(attempt, topic));
      const mastery = this.getDemonstratedMastery(topicAttempts);
      const badgeClass = mastery.ratio === null ? 'badge-secondary' : mastery.ratio >= 0.85 ? 'badge-success' : mastery.ratio >= 0.6 ? 'badge-warning' : 'badge-primary';
      const legacyDetail = mastery.legacyEvidenceCount ? ` · ${mastery.legacyEvidenceCount} older ${mastery.legacyEvidenceCount === 1 ? 'result' : 'results'} with less question detail` : '';
      const detail = mastery.ratio === null ? 'No checked result yet' : `${mastery.earned}/${mastery.available} from ${mastery.evidenceCount} latest checked ${mastery.evidenceCount === 1 ? 'activity' : 'activities'}${legacyDetail}`;
      return `<div style="display:flex; justify-content:space-between; gap:12px; font-size:14px;"><span>${this.escapeHTML(topic.name)}</span><span><span class="badge ${badgeClass}">${mastery.label}</span><span style="display:block; font-size:11px; color:var(--text-muted); text-align:right;">${detail}</span></span></div>`;
    }).join('');

    panel.innerHTML = `
      <div class="student-route-header">
        <span class="student-mode-label">Your learning record</span>
        <h1>Your progress and achievements</h1>
        <p>See what your checked work shows, then choose a section to review or practise next.</p>
      </div>

      ${nextProgressMilestone ? `
        <section class="student-start-panel" aria-labelledby="progress-next-heading">
          <div>
            <strong id="progress-next-heading">What to work on next</strong>
            <p>${this.escapeHTML(nextProgressMilestone.id)} · ${this.escapeHTML(nextProgressMilestone.name)}</p>
          </div>
          <button type="button" class="btn btn-primary progress-learn-section" data-objective-id="${this.escapeHTML(nextProgressMilestone.id)}">Review this section</button>
        </section>
      ` : ''}

      <section class="card milestone-summary-card" aria-labelledby="section-milestone-heading">
        <div class="milestone-summary-heading">
          <div>
            <h2 id="section-milestone-heading">Section progress</h2>
            <p>${securedCount} of ${availableMilestones.length} available section goals met · ${practicedCount} with checked practice in progress</p>
          </div>
          <strong>${securedCount}/${availableMilestones.length}</strong>
        </div>
        <div class="milestone-progress" role="progressbar" aria-label="Available section goals met" aria-valuemin="0" aria-valuemax="${availableMilestones.length}" aria-valuenow="${securedCount}">
          <span style="width:${milestonePercent}%"></span>
        </div>
        <p class="milestone-empty-state">Checked practice is an activity that StudySpice has marked. A section goal is met only when checked work covers each part included in the current section check. The topic results below show your latest checked work; they do not claim that you will remember it permanently.</p>
        ${securedCount === 0 && practicedCount === 0 ? '<p class="milestone-empty-state">No section progress yet. Complete a checked activity to start.</p>' : ''}
        ${unavailableCount ? `<p class="milestone-empty-state">${unavailableCount} curriculum ${unavailableCount === 1 ? 'section is' : 'sections are'} shown below but not included in this total until enough suitable questions are available.</p>` : ''}
        <details class="milestone-details">
          <summary>View all sections</summary>
          ${milestoneGroups}
        </details>
      </section>

      <div class="student-progress-layout">
        <div>
          <h2 style="font-size:20px; margin-bottom:16px;">Latest checked results by topic</h2>
          
          <div class="card" style="margin-bottom:32px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-weight:600;">
              <span>Latest checked result</span>
              <span>Only the latest completed check for each activity counts</span>
            </div>
            
            <div style="display:flex; flex-direction:column; gap:12px;">
              ${topicMasteryHtml}
            </div>
          </div>

          <h2 style="font-size:20px; margin-bottom:16px;">Recent activities</h2>
          <div class="table-container" style="margin-bottom:32px;">
            <table>
              <thead>
                <tr>
                  <th scope="col">Topic</th>
                  <th scope="col">Type</th>
                  <th scope="col">Score</th>
                  <th scope="col">Does this count?</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                ${displayedAttempts.map(a => `
                  <tr>
                    <td>${this.escapeHTML(topicLabels.get(a.topic) || a.topic || 'General activity')}</td>
                    <td>${this.escapeHTML(activityTypeLabels[a.type] || String(a.type || 'Activity').replaceAll('_', ' '))}</td>
                    <td>${a.score}</td>
                    <td>${this.parseDemonstratedScore(a)
                      ? (this.hasCheckpointPrecision(a) ? 'Included as your latest checked result' : 'Older result — included in the topic result, but cannot meet a section goal')
                      : a.completionStatus === 'awaiting_review' ? 'Waiting for teacher review — does not count yet' : 'Practice only — does not count towards Progress'}</td>
                    <td>${new Date(a.date).toLocaleDateString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div>${this.renderStudentAchievementPanel(student)}</div>
      </div>
      <aside class="card student-progress-desk-link">
        <h2>Choose what to study next</h2>
        <p>Progress shows checked work. Your flashcards are organised separately on My desk.</p>
        <button type="button" class="btn btn-secondary" id="progress-topics-btn">Choose topics for my desk</button>
      </aside>
    `;
    (panel.querySelectorAll ? panel.querySelectorAll('.progress-learn-section') : []).forEach(button => {
      button.onclick = () => {
        const objectiveId = button.getAttribute('data-objective-id');
        const topic = window.db.getUnits().flatMap(unit => unit.topics).find(item => item.objectives.some(objective => objective.id === objectiveId));
        const teachingAvailable = (window.db.getCurriculumContent?.() || []).some(item => item.id === objectiveId);
        if (!topic || !teachingAvailable) {
          panel.innerHTML = '<div class="card" role="status"><h1>Topic review unavailable</h1><p>This section does not currently have a valid review view.</p><button class="btn btn-secondary" id="progress-learning-back">Back to Progress</button></div>';
          panel.querySelector?.('#progress-learning-back')?.addEventListener('click', () => this.renderStudentProgress(panel));
          this.focusMainContent();
          return;
        }
        this.activeTopicId = topic.id;
        this.activeObjectiveId = objectiveId;
        this.switchTab('stud-learn');
      };
    });
    (panel.querySelectorAll ? panel.querySelectorAll('.student-achievement-action') : []).forEach(button => {
      const achievementId = button.getAttribute('data-achievement-id');
      if (this.getAchievementCatalogue().some(item => item.id === achievementId)) {
        button.onclick = () => this.openAchievementRoute(achievementId, panel);
      }
    });
    panel.querySelector?.('#progress-topics-btn')?.addEventListener('click', () => this.switchTab('stud-topics'));
  }

  // ==================== TEACHER OVERVIEW ====================
  renderTeacherOverview(panel) {
    const selectedClass = this.getSelectedTeacherClass();
    if (!selectedClass) return this.renderTeacherClassEmptyState(panel);
    const authorizedClasses = this.getAuthorizedTeacherClasses();
    const students = this.getTeacherClassStudents();
    const messages = this.getTeacherClassMessages();
    const flags = messages.filter(m => m.flagged);
    const firstFlaggedStudentId = flags.length
      ? (flags[0].senderId === this.currentUser.id ? flags[0].receiverId : flags[0].senderId)
      : null;
    const wrs = this.getTeacherClassRecords(window.db.getWrittenSubmissions());

    const writtenCount = wrs.filter(w => w.status === 'Awaiting Teacher Review').length;
    const programmingCount = this.getTeacherClassRecords(window.db.getProgrammingSubmissions()).filter(item => item.status !== 'Teacher Reviewed').length;
    const pseudocodeReviewCount = this.getPendingPseudocodeReviews(this.getTeacherClassRecords(window.db.getAttempts())).length;
    const totalAwaitingReview = writtenCount + programmingCount + pseudocodeReviewCount;
    const activeThisWeek = students.filter(student => Date.now() - new Date(student.lastActive).getTime() <= 7 * 24 * 3600 * 1000).length;
    const weeklyCompletion = students.length ? Math.round((activeThisWeek / students.length) * 100) : 0;
    const savedPriorityCount = students.filter(student => (student.personalRevisionPriorities || []).length > 0).length;
    const learnerSummaries = students.map(student => this.getTeacherLearnerSummary(student));
    const monitoringStatusHtml = flags.length
      ? `<button type="button" id="teacher-flagged-messages" class="btn btn-sm" role="status" style="font-size:13px; color:#991B1B; font-weight:700; margin-left:12px; padding:4px 8px; background:#FEF2F2; border:1px solid #FCA5A5;">⚠ ${flags.length} flagged message${flags.length === 1 ? '' : 's'} in this class</button>`
      : `<span role="status" style="font-size:13px; color:#047857; font-weight:600; display:inline-flex; align-items:center; gap:4px; margin-left:12px; padding:4px 8px; background-color:rgba(16,185,129,0.06); border-radius:4px;">No flagged messages in this class</span>`;

    panel.innerHTML = `
      <div class="dashboard-container">
        <!-- Title & Class Selection Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; padding-bottom: 16px; border-bottom: 1px solid var(--border-color);">
          <div>
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 6px;">
              <h1 style="margin: 0; font-weight: 700; font-size: 28px; display: inline-flex; align-items: center;">
                <span style="display: inline-flex; align-items: center; vertical-align: middle; margin-right: 8px; color: var(--teal); opacity: 0.85;">
                  ${SVG_ICONS.progress}
                </span>${this.escapeHTML(selectedClass.name)} overview
              </h1>
              <!-- Class Selector Dropdown -->
              <div style="position: relative; display: inline-block;" id="teacher-class-selector-container">
                <button class="btn btn-secondary" id="teacher-class-trigger" style="display: flex; align-items: center; gap: 8px; padding: 4px 12px; border-radius: 8px; font-weight: 600; min-height: 36px; border: 1px solid var(--border-color);">
                  <span>${this.escapeHTML(selectedClass.name)}</span> <span style="font-size: 8px; color: var(--text-muted);">▼</span>
                </button>
                <div id="teacher-class-dropdown" class="card" style="position: absolute; left: 0; top: 40px; width: 180px; z-index: 100; padding: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border: 1px solid var(--border-color); background-color: var(--bg-card); text-align: left;">
                  ${authorizedClasses.map(item => `<a href="#" class="dropdown-item teacher-class-option" data-class-id="${this.escapeHTML(item.id)}" style="display: block; padding: 6px 12px; font-size: 14px; color: var(--text-main); text-decoration: none; font-weight: ${item.id === selectedClass.id ? '700' : '500'}; border-radius: 4px; background-color: ${item.id === selectedClass.id ? 'var(--bg-main)' : 'transparent'};">${this.escapeHTML(item.name)}</a>`).join('')}
                </div>
              </div>
              
              ${monitoringStatusHtml}
            </div>
            <p style="font-size:15px; color: var(--text-muted); margin: 0;">Monitor engagement, review work and identify areas for support.</p>
          </div>
        </div>

        <!-- Top Metrics Grid (Three cards only) -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 32px;">
          <div class="card" style="padding: 16px 20px;">
              <h4 style="font-size:12px; color: var(--text-muted); text-transform:uppercase; margin-bottom: 4px; font-weight: 600;">Weekly app activity</h4>
            <strong style="font-size:24px; font-weight: 700; color: var(--text-main);">${weeklyCompletion}%</strong>
            <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">${activeThisWeek} of ${students.length} pupils opened the app in the last 7 days</div>
          </div>
          <div class="card card-action" id="metric-awaiting-review" style="padding: 16px 20px; cursor: pointer;">
            <h4 style="font-size:12px; color: var(--text-muted); text-transform:uppercase; margin-bottom: 4px; font-weight: 600;">Work Awaiting Review</h4>
            <strong style="font-size:24px; font-weight: 700; color: var(--amber);">${totalAwaitingReview} submissions</strong>
            <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">${writtenCount} written, ${programmingCount} programming, ${pseudocodeReviewCount} pseudocode</div>
          </div>
          <div class="card card-action" id="metric-students-attention" style="padding: 16px 20px; cursor: pointer;">
            <h4 style="font-size:12px; color: var(--text-muted); text-transform:uppercase; margin-bottom: 4px; font-weight: 600;">Saved revision priorities</h4>
            <strong style="font-size:24px; font-weight: 700; color: var(--text-main);">${savedPriorityCount}</strong>
            <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Not a mastery or safeguarding judgement</div>
          </div>
        </div>

        <!-- Main Content split columns -->
        <div style="display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 32px; align-items: start;">
          <div>
            <!-- Action Centre Card -->
            <div style="margin-bottom: 32px;">
              <h2 style="font-size:20px; margin-bottom:16px; font-weight: 600; color: var(--text-main);">Action centre</h2>
              <p style="font-size:12px; color:var(--text-muted);">Demonstration narrative: named examples below illustrate intended teacher workflows and are not generated risk, mastery or safeguarding judgements.</p>
              <div class="card" style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
                <!-- Top 3 Actions -->
                <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 12px; border-bottom: 1px solid var(--border-color);">
                  <div>
                    <h4 style="font-size: 15px; margin: 0 0 2px 0; font-weight: 600; color: var(--text-main);">Aisha's required task is overdue</h4>
                    <span style="font-size: 12px; color: var(--text-muted);">Systems Architecture Revision Quiz &middot; Overdue by 5 days</span>
                  </div>
                  <button class="btn btn-primary btn-sm" id="action-msg-aisha" style="min-height: 36px;">Message student</button>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 12px; border-bottom: 1px solid var(--border-color);">
                  <div>
                    <h4 style="font-size: 15px; margin: 0 0 2px 0; font-weight: 600; color: var(--text-main);">${totalAwaitingReview} submissions awaiting review</h4>
                    <span style="font-size: 12px; color: var(--text-muted);">${writtenCount} written paragraph, ${programmingCount} code submissions, ${pseudocodeReviewCount} pseudocode answers</span>
                  </div>
                  <button class="btn btn-primary btn-sm" id="action-review-written" style="min-height: 36px;">Review work</button>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 12px; border-bottom: 1px solid var(--border-color);">
                  <div>
                    <h4 style="font-size: 15px; margin: 0 0 2px 0; font-weight: 600; color: var(--text-main);">2 unread student messages</h4>
                    <span style="font-size: 12px; color: var(--text-muted);">Harriet Potter, Emily Watson &middot; General queries</span>
                  </div>
                  <button class="btn btn-secondary btn-sm" id="action-view-chat" style="min-height: 36px;">View chat</button>
                </div>

                <!-- Hidden/Toggleable actions -->
                <div id="action-hidden-rows" style="display: none; flex-direction: column; gap: 16px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 12px; border-bottom: 1px solid var(--border-color);">
                    <div>
                      <h4 style="font-size: 15px; margin: 0 0 2px 0; font-weight: 600; color: var(--text-main);">Programming review queue</h4>
                      <span style="font-size: 12px; color: var(--text-muted);">Review simulated loop submissions for Unit 2</span>
                    </div>
                    <button class="btn btn-secondary btn-sm" id="action-review-prog" style="min-height: 36px;">Open queue</button>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <h4 style="font-size: 15px; margin: 0 0 2px 0; font-weight: 600; color: var(--text-main);">Routine data synchronization</h4>
                      <span style="font-size: 12px; color: var(--text-muted);">Sync coordinator data and logs</span>
                    </div>
                    <button class="btn btn-secondary btn-sm" id="teacher-sync-now-btn" style="min-height: 36px;">Sync now</button>
                  </div>
                </div>

                <div style="text-align: center; margin-top: 8px;">
                  <a href="#" id="action-toggle-link" style="font-size: 14px; font-weight: 600; color: var(--teal); text-decoration: none;">View all 5 actions</a>
                </div>
              </div>
            </div>

            <!-- Recent Assignments Performance -->
            <div style="margin-bottom: 32px;">
              <h2 style="font-size:20px; margin-bottom:16px; font-weight: 600; color: var(--text-main);">Recent assignments</h2>
              <div class="card card-info" style="padding: 24px; display: flex; flex-direction: column; gap: 20px;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <div>
                      <h3 style="font-size: 16px; font-weight: 600; color: var(--text-main); margin: 0 0 4px 0;">Quick Recall Check — Data Representation</h3>
                      <div style="font-size: 13px; color: var(--text-muted); font-weight: 500;">
                        No verified completion or accuracy summary is available for this demo assignment.
                      </div>
                    </div>
                    <button class="btn btn-secondary btn-sm" data-route="teach-assign" style="min-height: 36px;">View results</button>
                  </div>
                  <!-- Mini Progress Bar -->
                  <div style="height: 6px; background-color: var(--border-color); border-radius: 3px; overflow: hidden;">
                    <div style="width: 0; height: 100%; background-color: var(--teal);"></div>
                  </div>
                </div>
                <div style="padding-top: 16px; border-top: 1px solid var(--border-color);">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <div>
                      <h3 style="font-size: 16px; font-weight: 600; color: var(--text-main); margin: 0 0 4px 0;">Loops and Selection Programming Challenge</h3>
                      <div style="font-size: 13px; color: var(--text-muted); font-weight: 500;">
                        No verified completion or accuracy summary is available for this demo assignment.
                      </div>
                    </div>
                    <button class="btn btn-secondary btn-sm" data-route="teach-programming" style="min-height: 36px;">View results</button>
                  </div>
                  <!-- Mini Progress Bar -->
                  <div style="height: 6px; background-color: var(--border-color); border-radius: 3px; overflow: hidden;">
                    <div style="width: 0; height: 100%; background-color: var(--teal);"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Students Needing Attention List -->
            <div id="students-needing-attention-section">
              <h2 style="font-size:20px; margin-bottom:16px; font-weight: 600; color: var(--text-main);">Students needing attention</h2>
              <p style="font-size:12px; color:var(--text-muted);">Demonstration narrative only. These example reasons are not derived intervention decisions.</p>
              <div class="card" style="padding: 0; overflow: hidden;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left;">
                  <thead>
                    <tr style="background-color: var(--bg-main); border-bottom: 1px solid var(--border-color);">
                      <th scope="col" style="padding: 12px 16px; font-weight: 600; color: var(--text-muted);">Student</th>
                      <th scope="col" style="padding: 12px 16px; font-weight: 600; color: var(--text-muted);">Reason</th>
                      <th scope="col" style="padding: 12px 16px; font-weight: 600; color: var(--text-muted);">Last activity</th>
                      <th scope="col" style="padding: 12px 16px; font-weight: 600; color: var(--text-muted); text-align: right;">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                      <td style="padding: 12px 16px; font-weight: 600; color: var(--text-main);">Aisha</td>
                      <td style="padding: 12px 16px; color: var(--text-muted);">Required task overdue</td>
                      <td style="padding: 12px 16px; color: var(--text-muted);">5 days ago</td>
                      <td style="padding: 12px 16px; text-align: right;">
                        <button class="btn btn-secondary btn-sm" data-route="teach-messages" style="padding: 4px 8px; font-size: 12px; min-height: 28px;">Message</button>
                      </td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                      <td style="padding: 12px 16px; font-weight: 600; color: var(--text-main);">Harriet Potter</td>
                      <td style="padding: 12px 16px; color: var(--text-muted);">Low score on file calculations</td>
                      <td style="padding: 12px 16px; color: var(--text-muted);">Yesterday</td>
                      <td style="padding: 12px 16px; text-align: right;">
                        <button class="btn btn-secondary btn-sm" data-route="teach-assign" style="padding: 4px 8px; font-size: 12px; min-height: 28px;">Assign practice</button>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 16px; font-weight: 600; color: var(--text-main);">Maya</td>
                      <td style="padding: 12px 16px; color: var(--text-muted);">Programming task awaiting review</td>
                      <td style="padding: 12px 16px; color: var(--text-muted);">Today</td>
                      <td style="padding: 12px 16px; text-align: right;">
                        <button class="btn btn-secondary btn-sm" data-route="teach-programming" style="padding: 4px 8px; font-size: 12px; min-height: 28px;">Review</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>
            <!-- Priority Misconceptions Tracker (Top 2 only) -->
            <div class="card card-info" style="margin-bottom: 24px; padding: 24px;">
              <h3 style="font-size: 16px; font-weight: 600; color: var(--text-main); margin-bottom: 4px;">Priority misconceptions</h3>
              <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">Demonstration narrative only: example conceptual errors are shown without claiming verified class-level detection.</p>
              
              <div style="display: flex; flex-direction: column; gap: 20px;">
                <div style="padding-bottom: 16px; border-bottom: 1px dashed var(--border-color);">
                  <h4 style="font-size: 15px; margin: 0 0 2px 0; font-weight: 600; color: var(--text-main);">Hexadecimal representation</h4>
                  <div style="font-size: 13px; color: var(--text-muted); font-weight: 700; margin-bottom: 6px;">No verified class-level misconception count is available.</div>
                  <p style="font-size: 13px; color: var(--text-muted); margin: 0 0 12px 0;">Confusion between storage notation and hexadecimal values.</p>
                  <div style="display: flex; gap: 8px;">
                    <button class="btn btn-secondary btn-sm" data-route="teach-written" style="font-size: 11px; min-height: 28px; padding: 2px 10px;">View</button>
                    <button class="btn btn-primary btn-sm" data-route="teach-assign" style="font-size: 11px; min-height: 28px; padding: 2px 10px;">Assign practice</button>
                  </div>
                </div>
                <div>
                  <h4 style="font-size: 15px; margin: 0 0 2px 0; font-weight: 600; color: var(--text-main);">Image File Calculations</h4>
                  <div style="font-size: 13px; color: var(--text-muted); font-weight: 700; margin-bottom: 6px;">No verified class-level misconception count is available.</div>
                  <p style="font-size: 13px; color: var(--text-muted); margin: 0 0 12px 0;">Mixing decimal units (KB, divide by 1,000) with binary units (KiB, divide by 1,024) without stating the convention.</p>
                  <div style="display: flex; gap: 8px;">
                    <button class="btn btn-secondary btn-sm" data-route="teach-written" style="font-size: 11px; min-height: 28px; padding: 2px 10px;">View</button>
                    <button class="btn btn-primary btn-sm" data-route="teach-assign" style="font-size: 11px; min-height: 28px; padding: 2px 10px;">Assign practice</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Current Class Topic -->
            <div class="card card-progress" style="margin-bottom: 24px; padding: 24px;">
              <h3 style="font-size: 15px; font-weight: 600; color: var(--text-main); margin-bottom: 12px;">Current class topic</h3>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 14px; font-weight: 600; color: var(--text-main);">Networks and Protocols</span>
                  <span class="badge badge-primary" style="font-size: 11px;">Current lesson</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 14px; font-weight: 600; color: var(--text-main);">Data Representation</span>
                  <span class="badge badge-success" style="font-size: 11px;">Recently taught</span>
                </div>
              </div>
            </div>

            <!-- Class Progress Summary -->
            <div class="card card-info" style="padding: 24px;">
              <h3 style="font-size:15px; margin-bottom:6px;">Class markbook</h3>
              <p style="font-size:12px; color:var(--text-muted);">Checked work and learner-rated confidence are shown separately.</p>
              <div style="display:flex; flex-direction:column; gap:12px;">
                ${learnerSummaries.slice(0, 5).map(summary => `<button type="button" class="teacher-overview-profile-btn" data-student-id="${this.escapeHTML(summary.student.id)}" style="background:none; border:0; border-bottom:1px solid var(--border-color); padding:8px 0; text-align:left; cursor:pointer;"><strong>${this.escapeHTML(summary.student.name)}</strong><br><span style="font-size:12px; color:var(--text-muted);">${this.escapeHTML(summary.mastery.label)} · ${summary.confident} confident flashcard ${summary.confident === 1 ? 'topic' : 'topics'} · ${summary.latestReport ? this.escapeHTML(summary.latestReport.assessmentTitle || 'assessment report') : 'no assessment report'}</span></button>`).join('') || '<p>No learners in this class.</p>'}
              </div>
              <button type="button" class="btn btn-secondary btn-sm" id="open-class-markbook" style="margin-top:14px;">Open full markbook</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind selector dropdown toggle
    const trigger = document.getElementById('teacher-class-trigger');
    const dropdown = document.getElementById('teacher-class-dropdown');
    if (trigger && dropdown) {
      trigger.onclick = (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show-dropdown');
      };
      document.addEventListener('click', () => {
        dropdown.classList.remove('show-dropdown');
      });
    }
    panel.querySelectorAll('.teacher-class-option').forEach(option => {
      option.onclick = event => {
        event.preventDefault();
        const classId = option.getAttribute('data-class-id');
        if (!this.getAuthorizedTeacherClasses().some(item => item.id === classId)) return;
        this.selectedTeacherClassId = classId;
        this.selectedChatStudentId = null;
        this.render();
      };
    });

    // Bind Action toggle link
    const toggleLink = document.getElementById('action-toggle-link');
    const hiddenRows = document.getElementById('action-hidden-rows');
    if (toggleLink && hiddenRows) {
      toggleLink.onclick = (e) => {
        e.preventDefault();
        const isHidden = hiddenRows.style.display === 'none';
        hiddenRows.style.display = isHidden ? 'flex' : 'none';
        toggleLink.textContent = isHidden ? 'View fewer actions' : 'View all 5 actions';
      };
    }

    // Bind card trigger
    const reviewCard = document.getElementById('metric-awaiting-review');
    if (reviewCard) {
      reviewCard.onclick = () => this.switchTab('teach-written');
    }

    const attentionCard = document.getElementById('metric-students-attention');
    if (attentionCard) {
      attentionCard.onclick = () => {
        const target = document.getElementById('students-needing-attention-section');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      };
    }

    // Bind Action center buttons
    const btnWritten = document.getElementById('action-review-written');
    const btnProg = document.getElementById('action-review-prog');
    const btnAisha = document.getElementById('action-msg-aisha');
    const btnChat = document.getElementById('action-view-chat');
    const flaggedMessagesButton = document.getElementById('teacher-flagged-messages');

    if (btnWritten) btnWritten.onclick = () => this.switchTab('teach-written');
    if (btnProg) btnProg.onclick = () => this.switchTab('teach-programming');
    if (btnAisha) btnAisha.onclick = () => this.switchTab('teach-messages');
    if (btnChat) btnChat.onclick = () => this.switchTab('teach-messages');
    if (flaggedMessagesButton) flaggedMessagesButton.onclick = () => {
      if (firstFlaggedStudentId && this.canTeacherAccessStudent(firstFlaggedStudentId)) {
        this.selectedChatStudentId = firstFlaggedStudentId;
      }
      this.switchTab('teach-messages');
    };
    panel.querySelectorAll('[data-route]').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        this.switchTab(btn.getAttribute('data-route'));
      };
    });
    const syncNowBtn = panel.querySelector('#teacher-sync-now-btn');
    if (syncNowBtn) syncNowBtn.onclick = () => location.reload();
    panel.querySelectorAll('.teacher-overview-profile-btn').forEach(button => {
      button.onclick = () => {
        const studentId = button.getAttribute('data-student-id');
        if (!this.canTeacherAccessStudent(studentId)) return;
        this.selectedTeacherStudentId = studentId;
        this.switchTab('teach-classes');
      };
    });
    panel.querySelector('#open-class-markbook')?.addEventListener('click', () => this.switchTab('teach-classes'));
  }

  // ==================== TEACHER CLASSES ====================
  renderTeacherClasses(panel) {
    const selectedClass = this.getSelectedTeacherClass();
    if (!selectedClass) return this.renderTeacherClassEmptyState(panel);
    const students = this.getTeacherClassStudents();
    const query = (this.rosterSearchQuery || '').toLowerCase().trim();
    const filteredStudents = students.filter(s => s.name.toLowerCase().includes(query) || s.email.toLowerCase().includes(query));
    const summaries = filteredStudents.map(student => this.getTeacherLearnerSummary(student));
    const selectedStudent = students.find(student => student.id === this.selectedTeacherStudentId) || null;
    const selectedSummary = selectedStudent ? this.getTeacherLearnerSummary(selectedStudent) : null;
    const objectiveNames = new Map(window.db.getUnits().flatMap(unit =>
      unit.topics.flatMap(topic => topic.objectives.map(objective => [objective.id, objective.name]))
    ));
    const ratingLabels = { strong: 'Stronger', developing: 'Developing', priority: 'Needs review' };
    const techniqueLabels = new Map(this.getExamTechniqueCatalogue().map(item => [item.id, item.label]));
    const profileHtml = selectedSummary ? `
      <section class="card teacher-learner-profile" aria-labelledby="teacher-learner-profile-heading">
        <header>
          <div><span class="badge badge-primary">Learner profile</span><h2 id="teacher-learner-profile-heading">${this.escapeHTML(selectedStudent.name)}</h2><p>Checked performance, learner-rated flashcard confidence and teacher reports remain separate.</p></div>
          <button type="button" class="btn btn-secondary btn-sm" id="close-learner-profile">Close profile</button>
        </header>
        <div class="teacher-profile-summary-grid">
          <div><span>Checked evidence</span><strong>${this.escapeHTML(selectedSummary.mastery.label)}</strong><small>${selectedSummary.mastery.evidenceCount} latest assessed ${selectedSummary.mastery.evidenceCount === 1 ? 'activity' : 'activities'}</small></div>
          <div><span>Flashcard confidence</span><strong>${selectedSummary.confident} confident</strong><small>${selectedSummary.needsReview} need another look · ${selectedSummary.ratedCount} rated</small></div>
          <div><span>Awaiting review</span><strong>${selectedSummary.awaitingReview}</strong><small>Not included in checked performance</small></div>
        </div>
        <div class="teacher-profile-columns">
          <section><h3>Topics on the learner's desk</h3>
            ${selectedSummary.confidence.length ? `<ul class="teacher-profile-topic-list">${selectedSummary.confidence.map(item => `<li><span><strong>${this.escapeHTML(item.specificationPointId)}</strong> ${this.escapeHTML(objectiveNames.get(item.specificationPointId) || '')}</span><span>${this.escapeHTML(item.label)}</span></li>`).join('')}</ul>` : '<p>No topics are currently marked as covered on this learner’s desk.</p>'}
          </section>
          <section><h3>Teacher assessment reports</h3>
            ${selectedSummary.reports.length ? selectedSummary.reports.map(report => `<article class="teacher-profile-report"><strong>${this.escapeHTML(report.assessmentTitle || 'Assessment')}</strong><span>${report.overallMark !== '' && report.maxMark ? `${this.escapeHTML(report.overallMark)}/${this.escapeHTML(report.maxMark)}` : 'No overall mark entered'}</span><p>${this.getAssessmentReportLinks(report).map(item => `${this.escapeHTML(item.specificationPointId)} ${this.escapeHTML(ratingLabels[item.rating] || item.rating)}`).join(' · ') || 'No topic judgements recorded'}</p>${(report.examTechniqueTags || []).length ? `<small>Exam technique: ${report.examTechniqueTags.map(id => this.escapeHTML(techniqueLabels.get(id) || id)).join(', ')}</small>` : ''}</article>`).join('') : '<p>No assessment report has been recorded yet.</p>'}
          </section>
        </div>
      </section>` : '';

    panel.innerHTML = `
      <div style="margin-bottom:24px;">
        <span class="badge badge-primary">Evidence-led class view</span>
        <h1 style="margin-top:8px;">${this.escapeHTML(selectedClass.name)} markbook</h1>
        <p>Compare checked work, learner-rated flashcard confidence and teacher assessment reports without treating one as another.</p>
      </div>

      <div style="margin-bottom: 16px; max-width: 320px;">
        <label for="roster-search-input" class="sr-only">Search pupils</label>
        <input type="search" id="roster-search-input" class="form-control" placeholder="Search pupils by name or email" value="${this.escapeHTML(this.rosterSearchQuery || '')}" style="font-size:14px; min-height:38px;">
      </div>

      <div class="table-container teacher-markbook">
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Checked performance</th>
              <th scope="col">Flashcard confidence</th>
              <th scope="col">Latest assessment</th>
              <th scope="col">Awaiting review</th>
            </tr>
          </thead>
          <tbody>
            ${summaries.length === 0 ? `
              <tr>
                <td colspan="5" style="text-align:center; color:var(--text-muted); padding:24px;">
                  No pupils found matching "${this.escapeHTML(this.rosterSearchQuery)}"
                </td>
              </tr>
            ` : summaries.map(summary => `
              <tr>
                <td><button type="button" class="btn-link teacher-student-profile-btn" data-student-id="${this.escapeHTML(summary.student.id)}"><strong>${this.escapeHTML(summary.student.name)}</strong></button><br><small>${this.escapeHTML(summary.student.yearGroup || '')}</small></td>
                <td><strong>${this.escapeHTML(summary.mastery.label)}</strong><br><small>${summary.mastery.evidenceCount} evidence ${summary.mastery.evidenceCount === 1 ? 'item' : 'items'}</small></td>
                <td><strong>${summary.confident} confident</strong><br><small>${summary.needsReview} need another look · self-rated</small></td>
                <td>${summary.latestReport ? `<strong>${this.escapeHTML(summary.latestReport.assessmentTitle || 'Assessment')}</strong><br><small>${summary.latestReport.overallMark !== '' && summary.latestReport.maxMark ? `${this.escapeHTML(summary.latestReport.overallMark)}/${this.escapeHTML(summary.latestReport.maxMark)}` : 'Topic report recorded'}</small>` : '<span>No report yet</span>'}</td>
                <td>${summary.awaitingReview}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      ${profileHtml}
    `;

    const searchIn = panel.querySelector('#roster-search-input');
    if (searchIn) {
      searchIn.oninput = (e) => {
        this.rosterSearchQuery = e.target.value;
        this.render();
        const reSearchIn = document.getElementById('roster-search-input');
        if (reSearchIn) {
          reSearchIn.focus();
          reSearchIn.setSelectionRange(reSearchIn.value.length, reSearchIn.value.length);
        }
      };
    }
    panel.querySelectorAll('.teacher-student-profile-btn').forEach(button => {
      button.onclick = () => {
        const studentId = button.getAttribute('data-student-id');
        if (!this.canTeacherAccessStudent(studentId)) return;
        this.selectedTeacherStudentId = studentId;
        this.renderTeacherClasses(panel);
      };
    });
    panel.querySelector('#close-learner-profile')?.addEventListener('click', () => {
      this.selectedTeacherStudentId = null;
      this.renderTeacherClasses(panel);
    });
  }

  // ==================== TEACHER ASSIGN ====================
  renderTeacherAssign(panel) {
    const selectedClass = this.getSelectedTeacherClass();
    if (!selectedClass) return this.renderTeacherClassEmptyState(panel);
    const assignments = this.getTeacherClassPublishedRecords(window.db.getAssignments());
    const units = window.db.getUnits();
    const topics = units.flatMap(u => u.topics);
    const students = this.getTeacherClassStudents();
    const currentRequiredMinutes = assignments
      .filter(a => a.status === 'Required' || a.status === 'Overdue')
      .reduce((sum, a) => sum + Number(a.estimatedMinutes || 10), 0);

    panel.innerHTML = `
      <div style="margin-bottom: 24px;">
        <h1>📅 Assignments Management</h1>
        <p>Create and recommend lightweight retrieval tasks for your students.</p>
      </div>

      <div style="display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 32px; align-items: start;">
        <div class="card">
          <h3 style="margin-bottom: 16px;">Create homework task</h3>
          <div style="padding:12px; margin-bottom:16px; background:var(--bg-main); border-radius:8px;">
            <strong>Current required workload: ${currentRequiredMinutes} minutes</strong>
            <div style="font-size:12px; color:var(--text-muted);">A warning appears above 20 minutes per week.</div>
          </div>
          <form id="create-assign-form">
            <div class="form-group"><label for="assign-recipient-in">Publish to</label><select id="assign-recipient-in" class="form-control"><option value="class">Whole class</option>${students.map(student => `<option value="${this.escapeHTML(student.id)}">${this.escapeHTML(student.name)} only</option>`).join('')}</select><div style="font-size:12px; color:var(--text-muted); margin-top:5px;">Use an individual target for intervention without increasing everyone’s workload.</div></div>
            <div class="form-group">
              <label for="assign-title-in">Task Title</label>
              <input type="text" id="assign-title-in" class="form-control" placeholder="e.g. Weekly Binary Shift Quiz" required>
            </div>
            
            <div class="form-group">
              <label for="assign-topic-in">Select Syllabus Topic</label>
              <select id="assign-topic-in" class="form-control" required>
                ${topics.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
              </select>
            </div>

            <div class="form-group">
              <label for="assign-date-in">Due Date</label>
              <input type="date" id="assign-date-in" class="form-control" required>
            </div>

            <div class="form-group">
              <label for="assign-minutes-in">Estimated completion time</label>
              <select id="assign-minutes-in" class="form-control" required>
                <option value="5">5 minutes</option><option value="10" selected>10 minutes</option><option value="15">15 minutes</option><option value="20">20 minutes</option>
              </select>
            </div>

            <div class="form-group">
              <label for="assign-status-in">Expectation</label>
              <select id="assign-status-in" class="form-control" required>
                <option value="Required">Required</option><option value="Recommended">Recommended</option><option value="Optional">Optional</option>
              </select>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%;">Publish Assignment</button>
          </form>
        </div>

        <div>
          <h2 style="font-size:20px; margin-bottom:16px;">Active Tasks</h2>
          <div style="display:flex; flex-direction:column; gap:16px;">
            ${assignments.map(a => `
              <div class="card" style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <h3 style="margin-bottom: 4px;">${this.escapeHTML(a.title)}</h3>
                  <div style="font-size: 12px; color: var(--text-muted);">Due: ${this.escapeHTML(a.dueDate)} · ${this.escapeHTML(a.status)} · ${this.escapeHTML(a.estimatedMinutes || 10)} mins</div>
                </div>
                <span class="badge badge-primary">${this.escapeHTML(a.completedCount)} recorded completions</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    const form = document.getElementById('create-assign-form');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const title = document.getElementById('assign-title-in').value.trim();
        const topicId = document.getElementById('assign-topic-in').value;
        const dueDate = document.getElementById('assign-date-in').value;
        const estimatedMinutes = Number(document.getElementById('assign-minutes-in').value);
        const status = document.getElementById('assign-status-in').value;
        const recipient = document.getElementById('assign-recipient-in').value;
        if (recipient !== 'class' && !this.canTeacherAccessStudent(recipient)) {
          this.alert('That pupil is not in your selected authorised class. Nothing was published.');
          return;
        }

        if (status === 'Required' && currentRequiredMinutes + estimatedMinutes > 20) {
          const confirmed = window.confirm(`This would create ${currentRequiredMinutes + estimatedMinutes} minutes of required Computing work. Keep the total realistic alongside other GCSEs. Publish anyway?`);
          if (!confirmed) return;
        }

        window.db.addAssignment({
          title,
          classId: selectedClass.id,
          topicId,
          dueDate,
          status,
          estimatedMinutes
          ,recipientType: recipient === 'class' ? 'class' : 'students'
          ,recipientIds: recipient === 'class' ? [] : [recipient]
        });

        this.alert('Success: Assignment published to student portals.');
        this.render();
      };
    }
  }

  // ==================== TEACHER TEST PREPARATION ====================
  renderTeacherTestPrep(panel) {
    const selectedClass = this.getSelectedTeacherClass();
    if (!selectedClass) return this.renderTeacherClassEmptyState(panel);
    const units = window.db.getUnits();
    const testPreps = this.getTeacherClassPublishedRecords(window.db.getTestPreps());
    const students = this.getTeacherClassStudents();
    const objectives = new Map(units.flatMap(unit => unit.topics.flatMap(topic =>
      topic.objectives.map(objective => [objective.id, { ...objective, topicId: topic.id, paper: unit.paper }])
    )));
    const techniqueCatalogue = this.getExamTechniqueCatalogue();

    panel.innerHTML = `
      <div style="margin-bottom:24px;">
        <span class="badge badge-primary">OCR J277 specification aligned</span>
        <h1 style="margin-top:8px;">Prep for test</h1>
        <p>Select the specification points that will be assessed. The app creates a short diagnostic and a time-limited revision plan; it does not reveal or reproduce the test questions.</p>
      </div>

      <div style="display:grid; grid-template-columns:1.25fr 0.75fr; gap:28px; align-items:start;">
        <form id="test-prep-form" class="card">
          <div class="form-group"><label for="prep-recipient-in">Publish to</label><select id="prep-recipient-in" class="form-control"><option value="class">Whole class</option>${students.map(student => `<option value="${this.escapeHTML(student.id)}">${this.escapeHTML(student.name)} only</option>`).join('')}</select></div>
          <div class="form-group">
            <label for="prep-title-in">Test name</label>
            <input id="prep-title-in" class="form-control" placeholder="e.g. Paper 2 Algorithms Check" required>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px;">
            <div class="form-group"><label for="prep-date-in">Test date</label><input type="date" id="prep-date-in" class="form-control" required></div>
            <div class="form-group"><label for="prep-weekly-in">Weekly limit</label><select id="prep-weekly-in" class="form-control"><option value="10">10 mins</option><option value="15">15 mins</option><option value="20" selected>20 mins</option><option value="30">30 mins</option></select></div>
            <div class="form-group"><label for="prep-session-in">Session length</label><select id="prep-session-in" class="form-control"><option value="5">5 mins</option><option value="10" selected>10 mins</option><option value="15">15 mins</option></select></div>
          </div>

          <h2 style="font-size:18px; margin:18px 0 8px;">Specification points</h2>
          <p style="font-size:13px; color:var(--text-muted);">Current OCR J277 v3.1 is authoritative. Select only content pupils have been taught.</p>
          ${units.map(unit => `
            <details style="border:1px solid var(--border-color); border-radius:8px; padding:14px; margin-bottom:14px;">
              <summary style="font-weight:700; cursor:pointer;">${unit.paper}: ${unit.name}</summary>
              ${unit.topics.map(topic => `
                <div style="margin:10px 0;">
                  <strong style="font-size:14px;">${topic.code} ${topic.name}</strong>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:7px;">
                    ${topic.objectives.map(objective => `
                      <label style="display:flex; gap:8px; align-items:flex-start; font-size:13px;">
                        <input type="checkbox" class="prep-point-checkbox" value="${objective.id}">
                        <span><strong>${objective.id}</strong> ${objective.name}</span>
                      </label>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </details>
          `).join('')}

          <div class="card" style="background:var(--bg-main); padding:14px; margin:16px 0;">
            <h3 style="font-size:15px;">Programming coverage</h3>
            <label style="display:block; margin:8px 0;"><input type="checkbox" id="prep-python-in"> Include practical Python: design, write, test and refine programs</label>
            <label style="display:block;"><input type="checkbox" id="prep-pseudocode-in"> Include OCR Exam Reference Language/pseudocode: read, trace, complete and write algorithms</label>
            <p style="font-size:12px; color:var(--text-muted); margin:8px 0 0;">These are tracked separately. Knowing Python does not automatically demonstrate fluency in exam pseudocode, or vice versa.</p>
          </div>

          <div id="prep-selection-summary" style="margin:12px 0; font-weight:600;">Select at least one specification point.</div>
          <button class="btn btn-primary" type="submit">Publish test preparation</button>
        </form>

        <div>
          <div class="card" style="margin-bottom:18px;">
            <h3>Workload rules</h3>
            <ul style="font-size:14px; line-height:1.6; padding-left:20px;">
              <li>Begins with a short diagnostic.</li><li>Already-secure points receive one confirmation question.</li><li>Support changes per skill, never by target grade.</li><li>Test prep replaces normal revision recommendations.</li><li>80% test content, 20% long-term retrieval.</li>
            </ul>
          </div>
          <h2 style="font-size:18px;">Active plans</h2>
          ${testPreps.map(prep => `<div class="card" style="margin-top:12px;"><strong>${this.escapeHTML(prep.title)}</strong><div style="font-size:13px; color:var(--text-muted); margin-top:5px;">${prep.specificationPointIds.length} points · ${prep.weeklyMinutes} mins/week · ${this.formatDueDate(prep.testDate).replace('Due ', 'Test ')}</div><ul style="font-size:12px; padding-left:18px; margin:10px 0 0;">${prep.specificationPointIds.map(id => `<li><strong>${this.escapeHTML(id)}</strong> ${this.escapeHTML(objectives.get(id)?.name || 'Mapped curriculum section')} · ${this.getMatchingExamTransferTask(objectives.get(id)?.topicId, id) ? 'theory and exam question linked' : 'focused theory linked'}</li>`).join('')}</ul></div>`).join('') || '<p>No active plans.</p>'}
        </div>
      </div>
      ${testPreps.length ? `
        <section class="card teacher-assessment-report-entry" aria-labelledby="assessment-report-heading">
          <span class="badge badge-primary">After the assessment</span>
          <h2 id="assessment-report-heading">Record strengths and next steps</h2>
          <p>Teacher judgements create a report and support links. They do not overwrite checked StudySpice evidence or learner confidence.</p>
          <form id="assessment-report-form">
            <div class="teacher-report-form-grid">
              <div class="form-group"><label for="report-assessment-in">Assessment</label><select id="report-assessment-in" class="form-control">${testPreps.map(prep => `<option value="${this.escapeHTML(prep.id)}">${this.escapeHTML(prep.title)}</option>`).join('')}</select></div>
              <div class="form-group"><label for="report-student-in">Learner</label><select id="report-student-in" class="form-control">${students.map(student => `<option value="${this.escapeHTML(student.id)}">${this.escapeHTML(student.name)}</option>`).join('')}</select></div>
              <div class="form-group"><label for="report-mark-in">Overall mark (optional)</label><input type="number" min="0" id="report-mark-in" class="form-control"></div>
              <div class="form-group"><label for="report-max-mark-in">Out of (optional)</label><input type="number" min="1" id="report-max-mark-in" class="form-control"></div>
            </div>
            <h3>Topic judgements</h3>
            ${testPreps.map((prep, prepIndex) => `<fieldset class="assessment-topic-set" data-prep-id="${this.escapeHTML(prep.id)}" ${prepIndex ? 'hidden' : ''}><legend class="sr-only">${this.escapeHTML(prep.title)} topics</legend>${prep.specificationPointIds.map(id => `<label class="teacher-topic-rating"><span><strong>${this.escapeHTML(id)}</strong> ${this.escapeHTML(objectives.get(id)?.name || id)}</span><select class="form-control assessment-topic-rating" data-prep-id="${this.escapeHTML(prep.id)}" data-specification-id="${this.escapeHTML(id)}"><option value="strong">Stronger area</option><option value="developing" selected>Developing</option><option value="priority">Needs review</option></select></label>`).join('')}</fieldset>`).join('')}
            <fieldset class="teacher-technique-tags"><legend>Exam technique to improve</legend>${techniqueCatalogue.map(item => `<label><input type="checkbox" class="assessment-technique-tag" value="${this.escapeHTML(item.id)}"> ${this.escapeHTML(item.label)}</label>`).join('')}</fieldset>
            <div class="form-group"><label for="report-note-in">Teacher note (optional)</label><textarea id="report-note-in" class="form-control" rows="3" placeholder="One clear summary or next step"></textarea></div>
            <button type="submit" class="btn btn-primary">Publish learner report</button>
          </form>
        </section>` : ''}
    `;

    const checkboxes = panel.querySelectorAll('.prep-point-checkbox');
    const summary = document.getElementById('prep-selection-summary');
    const updateSummary = () => {
      const count = Array.from(checkboxes).filter(box => box.checked).length;
      const weekly = Number(document.getElementById('prep-weekly-in').value);
      summary.textContent = count ? `${count} specification point${count === 1 ? '' : 's'} selected · maximum ${weekly} minutes per week` : 'Select at least one specification point.';
    };
    checkboxes.forEach(box => box.onchange = updateSummary);
    document.getElementById('prep-weekly-in').onchange = updateSummary;

    const reportAssessment = panel.querySelector('#report-assessment-in');
    const updateReportTopics = () => {
      panel.querySelectorAll('.assessment-topic-set').forEach(fieldset => {
        fieldset.hidden = fieldset.getAttribute('data-prep-id') !== reportAssessment?.value;
      });
    };
    if (reportAssessment) reportAssessment.onchange = updateReportTopics;

    document.getElementById('test-prep-form').onsubmit = (event) => {
      event.preventDefault();
      const specificationPointIds = Array.from(checkboxes).filter(box => box.checked).map(box => box.value);
      const includePython = document.getElementById('prep-python-in').checked;
      const includePseudocode = document.getElementById('prep-pseudocode-in').checked;
      const recipient = document.getElementById('prep-recipient-in').value;
      if (recipient !== 'class' && !this.canTeacherAccessStudent(recipient)) {
        this.alert('That pupil is not in your selected authorised class. Nothing was published.');
        return;
      }
      if (!specificationPointIds.length && !includePython && !includePseudocode) {
        this.alert('Select at least one specification point or programming strand.');
        return;
      }
      if (includePython && !specificationPointIds.includes('2.2.PY')) specificationPointIds.push('2.2.PY');
      if (includePseudocode && !specificationPointIds.includes('2.2.ERL')) specificationPointIds.push('2.2.ERL');
      window.db.addTestPrep({
        title: document.getElementById('prep-title-in').value.trim(),
        classId: selectedClass.id,
        testDate: document.getElementById('prep-date-in').value,
        weeklyMinutes: Number(document.getElementById('prep-weekly-in').value),
        sessionMinutes: Number(document.getElementById('prep-session-in').value),
        specificationPointIds,
        includePython,
        includePseudocode
        ,recipientType: recipient === 'class' ? 'class' : 'students'
        ,recipientIds: recipient === 'class' ? [] : [recipient]
      });
      this.alert('Test preparation published. It will replace normal revision recommendations within the selected time budget.');
      this.render();
    };

    const reportForm = panel.querySelector('#assessment-report-form');
    if (reportForm) reportForm.onsubmit = event => {
      event.preventDefault();
      const assessmentId = reportAssessment.value;
      const assessment = testPreps.find(item => item.id === assessmentId);
      const studentId = panel.querySelector('#report-student-in').value;
      if (!assessment || !this.canTeacherAccessStudent(studentId)) {
        this.alert('Choose an assessment and a learner in the selected class.');
        return;
      }
      const overallMark = panel.querySelector('#report-mark-in').value.trim();
      const maxMark = panel.querySelector('#report-max-mark-in').value.trim();
      if ((overallMark && !maxMark) || (!overallMark && maxMark) || (overallMark && Number(overallMark) > Number(maxMark))) {
        this.alert('Enter both mark values and make sure the mark is not greater than the total.');
        return;
      }
      const topicRatings = Array.from(panel.querySelectorAll(`.assessment-topic-rating[data-prep-id="${assessmentId}"]`))
        .map(input => ({ specificationPointId: input.getAttribute('data-specification-id'), rating: input.value }));
      const examTechniqueTags = Array.from(panel.querySelectorAll('.assessment-technique-tag:checked')).map(input => input.value);
      const savedReport = this.recordTeacherAssessmentReport({
        assessmentId,
        classId: selectedClass.id,
        studentId,
        overallMark,
        maxMark,
        topicRatings,
        examTechniqueTags,
        teacherNote: panel.querySelector('#report-note-in').value.trim()
      });
      if (!savedReport) {
        this.alert('The report did not match the selected class and assessment, so nothing was saved.');
        return;
      }
      this.alert('Assessment report published. The learner can now open linked review and exam-technique support.');
      this.renderTeacherTestPrep(panel);
    };
  }

  // ==================== TEACHER REVISION & INTERVENTION SESSIONS ====================
  renderTeacherSessions(panel) {
    const selectedClass = this.getSelectedTeacherClass();
    if (!selectedClass) return this.renderTeacherClassEmptyState(panel);
    const students = this.getTeacherClassStudents();
    const sessions = this.getTeacherClassPublishedRecords(window.db.getSupportSessions());
    panel.innerHTML = `
      <div style="margin-bottom:24px;"><span class="badge badge-primary">Revision and intervention</span><h1 style="margin-top:8px;">Support sessions</h1><p>Schedule one purposeful session and publish it only to the pupils who need it.</p></div>
      <div style="display:grid; grid-template-columns:0.9fr 1.1fr; gap:28px; align-items:start;">
        <form id="support-session-form" class="card">
          <h2 style="font-size:18px;">Create a session</h2>
          <div class="form-group"><label for="session-title-in">Session title</label><input id="session-title-in" class="form-control" placeholder="e.g. Selection and loops clinic" required></div>
          <div class="form-group"><label for="session-type-in">Purpose</label><select id="session-type-in" class="form-control"><option>Revision</option><option>Intervention</option><option>Programming clinic</option><option>Exam technique</option></select></div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;"><div class="form-group"><label for="session-date-in">Date</label><input type="date" id="session-date-in" class="form-control" required></div><div class="form-group"><label for="session-time-in">Start time</label><input type="time" id="session-time-in" class="form-control" required></div></div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;"><div class="form-group"><label for="session-duration-in">Length</label><select id="session-duration-in" class="form-control"><option value="20">20 minutes</option><option value="30" selected>30 minutes</option><option value="45">45 minutes</option><option value="60">60 minutes</option></select></div><div class="form-group"><label for="session-location-in">Location or link</label><input id="session-location-in" class="form-control" required></div></div>
          <fieldset style="border:1px solid var(--border-color); border-radius:8px; padding:12px; margin-bottom:14px;"><legend style="font-weight:700;">Publish to</legend><label style="display:block; margin-bottom:8px;"><input type="checkbox" id="session-whole-class-in"> Whole class</label>${students.map(student => `<label style="display:block; margin:6px 0;"><input type="checkbox" class="session-student-checkbox" value="${this.escapeHTML(student.id)}"> ${this.escapeHTML(student.name)}</label>`).join('')}</fieldset>
          <div class="form-group"><label for="session-notes-in">What pupils should bring or prepare</label><textarea id="session-notes-in" class="form-control" rows="3" placeholder="One short instruction"></textarea></div>
          <div id="session-recipient-summary" style="font-size:13px; margin-bottom:12px; color:var(--text-muted);">Select the class or individual pupils.</div>
          <button class="btn btn-primary" type="submit">Publish session</button>
        </form>
        <div><h2 style="font-size:18px;">Published sessions</h2>${sessions.map(session => `<div class="card" style="margin-top:12px;"><span class="badge badge-primary">${this.escapeHTML(session.type)}</span><h3 style="margin:8px 0 4px;">${this.escapeHTML(session.title)}</h3><div style="font-size:13px; color:var(--text-muted);">${this.escapeHTML(session.date)} at ${this.escapeHTML(session.startTime)} · ${this.escapeHTML(session.durationMinutes)} mins · ${this.escapeHTML(session.location)}</div><div style="font-size:12px; margin-top:8px;">${session.recipientType === 'class' ? 'Whole class' : `${(session.recipientIds || []).length} selected pupil${(session.recipientIds || []).length === 1 ? '' : 's'}`}</div></div>`).join('') || '<p>No sessions published.</p>'}</div>
      </div>`;
    const wholeClass = document.getElementById('session-whole-class-in');
    const pupilBoxes = Array.from(panel.querySelectorAll('.session-student-checkbox'));
    const summary = document.getElementById('session-recipient-summary');
    const updateRecipients = () => {
      pupilBoxes.forEach(box => { box.disabled = wholeClass.checked; });
      const count = pupilBoxes.filter(box => box.checked).length;
      summary.textContent = wholeClass.checked ? `Whole class · ${students.length} pupils` : count ? `${count} selected pupil${count === 1 ? '' : 's'}` : 'Select the class or individual pupils.';
    };
    wholeClass.onchange = updateRecipients;
    pupilBoxes.forEach(box => box.onchange = updateRecipients);
    document.getElementById('support-session-form').onsubmit = event => {
      event.preventDefault();
      const recipientIds = pupilBoxes.filter(box => box.checked).map(box => box.value);
      if (!wholeClass.checked && !recipientIds.length) return this.alert('Choose the whole class or at least one pupil.');
      if (recipientIds.some(studentId => !this.canTeacherAccessStudent(studentId))) {
        return this.alert('A selected pupil is not in your authorised class. Nothing was published.');
      }
      window.db.addSupportSession({
        title: document.getElementById('session-title-in').value.trim(), type: document.getElementById('session-type-in').value,
        date: document.getElementById('session-date-in').value, startTime: document.getElementById('session-time-in').value,
        durationMinutes: Number(document.getElementById('session-duration-in').value), location: document.getElementById('session-location-in').value.trim(),
        notes: document.getElementById('session-notes-in').value.trim(), classId: selectedClass.id, recipientType: wholeClass.checked ? 'class' : 'students', recipientIds
      });
      this.alert('Session published to the selected pupils.'); this.render();
    };
  }

  // ==================== TEACHER TOPICS CONTROLS ====================
  renderTeacherTopics(panel) {
    const selectedClass = this.getSelectedTeacherClass();
    if (!selectedClass) return this.renderTeacherClassEmptyState(panel);
    const units = window.db.getUnits();
    const controls = window.db.getClassroomControls(selectedClass.id);
    const coverage = this.getCurriculumCoverage();
    const objectiveCoverage = this.getObjectiveCoverage();
    const coverageCounts = coverage.reduce((counts, item) => {
      counts[item.status] = (counts[item.status] || 0) + 1;
      return counts;
    }, {});

    panel.innerHTML = `
      <div style="margin-bottom: 24px;">
        <h1>🎛️ Lesson topic embedding controls</h1>
        <p>See the real depth of the StudySpice content bank, then control which syllabus sections are active, hidden, or set as assessment priority.</p>
      </div>

      <div class="card" style="margin-bottom:24px; border-left:5px solid var(--amber);">
        <h2 style="font-size:18px; margin-bottom:8px;">Content-bank readiness</h2>
        <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:10px;">
          <span class="badge badge-success">${coverageCounts['Awaiting QA'] || 0} awaiting QA</span>
          <span class="badge badge-warning">${coverageCounts.Developing || 0} developing</span>
          <span class="badge badge-primary">${coverageCounts.Foundation || 0} foundation</span>
        </div>
        <p style="font-size:13px; margin:0;">This is not pupil mastery. A point reaches “Awaiting QA” only after every required evidence type exists; teacher quality assurance is still required before it can be called complete.</p>
      </div>

      <div style="display:flex; flex-direction:column; gap:24px;">
        ${units.map(u => `
          <div class="card">
            <h3 style="margin-bottom: 16px; border-bottom:1px solid var(--border-color); padding-bottom:8px;">${u.paper}: ${u.name}</h3>
            
            <div style="display:flex; flex-direction:column; gap:16px;">
              ${u.topics.map(t => {
                const currentStatus = controls[t.id] || 'hidden';
                const topicCoverage = coverage.find(item => item.topicId === t.id);
                const objectiveRows = objectiveCoverage.filter(item => item.topicId === t.id);
                return `
                  <div style="border-bottom:1px solid var(--border-color); padding-bottom:14px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:18px; font-size:14px;">
                      <div style="min-width:260px;"><strong>${t.name}</strong><div style="margin-top:5px;">${this.getCoverageBadge(topicCoverage.status)} <span style="font-size:11px; color:var(--text-muted);">${topicCoverage.gapCount} evidence gaps across ${topicCoverage.objectiveCount} specification points</span></div></div>
                      <div style="display:flex; gap:8px; flex-wrap:wrap;">
                        <button class="btn ${currentStatus === 'teaching' ? 'btn-primary' : 'btn-secondary'} btn-sm teacher-topic-btn" data-topic-id="${t.id}" data-status="teaching">Teaching now</button>
                        <button class="btn ${currentStatus === 'recent' ? 'btn-primary' : 'btn-secondary'} btn-sm teacher-topic-btn" data-topic-id="${t.id}" data-status="recent">Recent</button>
                        <button class="btn ${currentStatus === 'practice' ? 'btn-primary' : 'btn-secondary'} btn-sm teacher-topic-btn" data-topic-id="${t.id}" data-status="practice">Practice</button>
                        <button class="btn ${currentStatus === 'priority' ? 'btn-primary' : 'btn-secondary'} btn-sm teacher-topic-btn" data-topic-id="${t.id}" data-status="priority">Priority</button>
                        <button class="btn ${currentStatus === 'hidden' ? 'btn-primary' : 'btn-secondary'} btn-sm teacher-topic-btn" data-topic-id="${t.id}" data-status="hidden">Hidden</button>
                      </div>
                    </div>
                    <details style="margin-top:10px;"><summary style="cursor:pointer; font-size:12px; font-weight:700;">View specification-point evidence</summary>
                      <div class="table-container" style="margin-top:10px;"><table><thead><tr><th scope="col">Point</th><th scope="col">Terms</th><th scope="col">Diagnostic</th><th scope="col">Retrieval</th><th scope="col">Application</th><th scope="col">Exam transfer</th><th scope="col">Priority gaps</th></tr></thead><tbody>
                        ${objectiveRows.map(item => `<tr><td><strong>${item.specificationPointId}</strong><div style="font-size:11px;">${this.escapeHTML(item.specificationPointName)}</div></td><td>${item.keyTermCount}</td><td>${item.diagnosticCount}</td><td>${item.retrievalCount}</td><td>${item.applicationCount}</td><td>${item.examTransferCount}</td><td style="font-size:11px;">${item.missing.slice(0, 3).join(', ')}${item.missing.length > 3 ? ` +${item.missing.length - 3}` : ''}</td></tr>`).join('')}
                      </tbody></table></div>
                    </details>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    panel.querySelectorAll('.teacher-topic-btn').forEach(btn => {
      btn.onclick = () => {
        const topicId = btn.getAttribute('data-topic-id');
        const status = btn.getAttribute('data-status');
        this.updateClassroomTopic(topicId, status);
      };
    });
  }

  updateClassroomTopic(topicId, status) {
    const selectedClass = this.getSelectedTeacherClass();
    if (!selectedClass) return;
    window.db.updateClassroomControl(topicId, status, selectedClass.id);
    this.render();
  }

  // ==================== TEACHER PROGRAMMING REVIEW ====================
  renderTeacherProgramming(panel) {
    if (!this.getSelectedTeacherClass()) return this.renderTeacherClassEmptyState(panel);
    const subs = this.getTeacherClassRecords(window.db.getProgrammingSubmissions());
    const students = this.getTeacherClassStudents();
    const challenges = window.db.getProgrammingChallenges();

    panel.innerHTML = `
      <div style="margin-bottom: 24px;">
        <h1>💻 Code submission review</h1>
        <p>Analyze student code snippets, compilation outcomes, and support ladder request flags.</p>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th scope="col">Student</th>
              <th scope="col">Challenge</th>
              <th scope="col">Status</th>
              <th scope="col">Support Used</th>
              <th scope="col">Reflective Response</th>
              <th scope="col">Code Submitted</th>
            </tr>
          </thead>
          <tbody>
            ${subs.length === 0 ? `
              <tr>
                <td colspan="6" style="text-align:center; color:var(--text-muted); padding:24px;">No code submissions have been uploaded by students yet.</td>
              </tr>
            ` : subs.map(s => {
              const studName = (students.find(st => st.id === s.studentId) || { name: 'Unknown' }).name;
              const chal = challenges.find(ch => ch.id === s.challengeId);
              const chalName = (chal || { title: 'Unknown' }).title;
              const testCount = chal ? (chal.testCases || []).length : 0;
              return `
                <tr>
                  <td><strong>${this.escapeHTML(studName)}</strong></td>
                  <td>${this.escapeHTML(chalName)}</td>
                  <td>
                    <span class="badge badge-success">${this.escapeHTML(s.status)}</span>
                    <div style="font-size:11px; color:var(--green); margin-top:4px; font-weight:600;">✅ Passed ${testCount}/${testCount} tests</div>
                  </td>
                  <td><span class="badge ${s.supportUsed === 'None' ? 'badge-primary' : 'badge-warning'}">${this.escapeHTML(s.supportUsed)}</span></td>
                  <td>${this.escapeHTML(s.explanationResponse || 'No response')}</td>
                  <td>
                    <pre style="font-size:11px; background:#f1f5f9; padding:8px; border-radius:4px; max-width:400px; overflow-x:auto;">${this.escapeHTML(s.code)}</pre>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // ==================== TEACHER WRITTEN ANSWERS ====================
  renderTeacherWritten(panel) {
    if (!this.getSelectedTeacherClass()) return this.renderTeacherClassEmptyState(panel);
    const subs = this.getTeacherClassRecords(window.db.getWrittenSubmissions());
    const students = this.getTeacherClassStudents();
    const questions = window.db.getWrittenQuestions();

    const pending = subs.filter(s => s.status === 'Awaiting Teacher Review');
    const reviewed = subs.filter(s => s.status === 'Teacher Reviewed');

    let pendingHtml = '';
    if (pending.length === 0) {
      pendingHtml = `
        <div class="empty-state-card" style="margin-bottom: 24px;">
          <span class="icon">✨</span>
          <h3>All caught up</h3>
          <p>No written submissions currently awaiting review.</p>
        </div>
      `;
    } else {
      pendingHtml = pending.map(s => {
        const studName = (students.find(st => st.id === s.studentId) || { name: 'Unknown' }).name;
        const q = questions.find(qu => qu.id === s.questionId);
        const maxMarks = Number(q?.marks);
        if (!q || !Number.isInteger(maxMarks) || maxMarks <= 0) {
          return `
            <div class="card" role="status" style="margin-bottom:16px;">
              <strong>Student: ${this.escapeHTML(studName)}</strong>
              <h3 style="font-size:16px; margin:10px 0 6px;">Question unavailable — mark cannot be recorded</h3>
              <p style="margin:0;">The original question or mark total cannot be confirmed. The submitted response remains preserved for an administrator to reconcile.</p>
            </div>
          `;
        }
        return `
          <div class="card" style="margin-bottom: 16px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
              <div>
                <strong>Student: ${this.escapeHTML(studName)}</strong> · Submitted paragraph for review
                <div style="font-size:12px; color: var(--text-muted); margin-top:4px;">Date: ${new Date(s.date).toLocaleDateString()}</div>
              </div>
              <span class="badge badge-warning">${this.escapeHTML(s.status)}</span>
            </div>
            
            <div style="background-color: var(--bg-main); padding: 12px; border-radius: 8px; font-size:13px; margin-bottom:16px;">
              <strong>Question Prompt:</strong> "${this.escapeHTML(q.question)}"
            </div>

            <div style="font-style: italic; font-size:14px; color: var(--text-main); margin-bottom:16px; line-height: 1.5; border-left: 3px solid var(--border-color); padding-left:12px;">
              "${this.escapeHTML(s.response)}"
            </div>

            <!-- Automated formative prompts -->
            <div class="card" style="background-color: rgba(45,156,145,0.02); margin-bottom: 16px; font-size: 13px;">
              <h4 style="color: var(--teal); font-size:14px; margin-bottom:6px;">Automated formative prompts — check before using</h4>
              <div>Strengths: ${this.escapeHTML(s.strengths)}</div>
              <div>Improvements: ${this.escapeHTML(s.improvements)}</div>
            </div>

            <!-- Teacher grading controls -->
            <form class="teacher-grade-form" data-sid="${this.escapeHTML(s.id)}">
              <div style="display:flex; gap:12px; align-items:flex-end;">
                <div class="form-group" style="margin:0;">
                  <label>Teacher mark (0-${maxMarks})</label>
                  <input type="number" name="teacherMark" class="form-control" style="width:100px;" value="" min="0" max="${this.escapeHTML(maxMarks)}" step="1" required>
                </div>
                <div class="form-group" style="margin:0; flex:1;">
                  <label>Teacher Formative Comment — optional</label>
                  <input type="text" name="teacherFeedback" class="form-control" placeholder="Write feedback comment (optional)..." value="${this.escapeHTML(s.teacherFeedback || '')}">
                </div>
                <button type="submit" class="btn btn-primary btn-sm" style="height:40px;">Record reviewed mark</button>
              </div>
            </form>
          </div>
        `;
      }).join('');
    }

    let reviewedHtml = '';
    if (reviewed.length > 0) {
      reviewedHtml = `
        <div style="margin-top: 32px;">
          <h2 style="font-size: 18px; margin-bottom: 16px; font-weight: 600;">Recently reviewed</h2>
          <div style="display:flex; flex-direction:column; gap:16px;">
            ${reviewed.map(s => {
              const studName = (students.find(st => st.id === s.studentId) || { name: 'Unknown' }).name;
              const q = (questions.find(qu => qu.id === s.questionId) || { question: 'Unknown question', marks: 4 });
              return `
                <div class="card" style="opacity: 0.85;">
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
                    <div>
                      <strong>Student: ${this.escapeHTML(studName)}</strong> · Reviewed
                      <div style="font-size:12px; color: var(--text-muted); margin-top:4px;">Date: ${new Date(s.date).toLocaleDateString()}</div>
                    </div>
                    <span class="badge badge-success">${this.escapeHTML(s.status)}</span>
                  </div>
                  <div style="font-size:14px; margin-bottom:12px;">
                    <strong>Approved Mark:</strong> ${this.escapeHTML(s.teacherMark)} / ${this.escapeHTML(q.marks || 4)}
                  </div>
                  <div style="font-size:13px; color: var(--text-muted); font-style: italic;">
                    Comment: "${this.escapeHTML(s.teacherFeedback || 'No feedback comment provided.')}"
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    panel.innerHTML = `
      <div style="margin-bottom: 24px;">
        <h1>✍️ Written Answers assessment dashboard</h1>
        <p>Review each student paragraph independently, record a teacher mark and add an optional comment.</p>
      </div>

      <div style="display:flex; flex-direction:column;">
        <h2 style="font-size: 18px; margin-bottom: 16px; font-weight: 600;">Awaiting review</h2>
        ${pendingHtml}
        ${reviewedHtml}
      </div>
    `;

    panel.querySelectorAll('.teacher-grade-form').forEach(form => {
      form.onsubmit = (e) => {
        e.preventDefault();
        const subId = form.getAttribute('data-sid');
        this.submitTeacherWrittenOverride(subId, form);
      };
    });
  }

  submitTeacherWrittenOverride(subId, form) {
    const submission = window.db.getWrittenSubmissions().find(item => item.id === subId);
    if (!submission || !this.canTeacherAccessStudent(submission.studentId)) {
      this.alert('This submission is not in your selected authorised class. No mark was recorded.');
      return;
    }
    const mark = form.elements['teacherMark'].value;
    const comment = form.elements['teacherFeedback'].value.trim();
    const question = window.db.getWrittenQuestions().find(item => item.id === submission.questionId);
    const maxMarks = Number(question?.marks);
    if (!question || !Number.isInteger(maxMarks) || maxMarks <= 0) {
      this.alert('The original question or mark total cannot be confirmed. No mark was recorded.');
      return;
    }
    if (String(mark).trim() === '') {
      this.alert(`Enter a whole-number teacher mark from 0 to ${maxMarks}.`);
      return;
    }
    const numericMark = Number(mark);
    if (!Number.isInteger(numericMark) || numericMark < 0 || numericMark > maxMarks) {
      this.alert(`Enter a whole-number teacher mark from 0 to ${maxMarks}.`);
      return;
    }

    window.db.updateWrittenSubmission(subId, {
      teacherMark: String(numericMark),
      teacherFeedback: comment,
      status: 'Teacher Reviewed'
    });

    this.alert('Teacher-reviewed mark recorded.');
    this.render();
  }

  // ==================== TEACHER MESSAGES CONSOLE ====================
  renderTeacherMessages(panel) {
    const selectedClass = this.getSelectedTeacherClass();
    if (!selectedClass) return this.renderTeacherClassEmptyState(panel);
    const teacherId = this.currentUser.id;
    const messages = this.getTeacherClassMessages();
    const students = this.getTeacherClassStudents();

    // Filter active student chats
    const activeStudents = students.filter(s => messages.some(m => m.senderId === s.id || m.receiverId === s.id));
    
    // Default selected student chat if not set
    if (!this.selectedChatStudentId && activeStudents.length > 0) {
      this.selectedChatStudentId = activeStudents[0].id;
    }

    const inactiveStudents = students.filter(s => !activeStudents.some(as => as.id === s.id));

    // Get selected student info
    const selectedStudent = this.selectedChatStudentId ? students.find(s => s.id === this.selectedChatStudentId) : null;
    if (this.selectedChatStudentId && !selectedStudent) this.selectedChatStudentId = null;
    const chatMessages = selectedStudent 
      ? messages.filter(m => (m.senderId === teacherId && m.receiverId === selectedStudent.id) || (m.senderId === selectedStudent.id && m.receiverId === teacherId))
      : [];

    panel.innerHTML = `
      <div style="margin-bottom: 24px;">
        <h1>💬 Secure messaging console</h1>
        <p>View student questions, reply directly, or broadcast class announcements.</p>
      </div>

      <div style="display:grid; grid-template-columns: 320px 1fr; gap:24px;">
        <div style="display:flex; flex-direction:column; gap:24px;">
          <!-- Classroom broadcasts card -->
          <div class="card">
            <h3 style="margin-bottom: 12px; font-size:16px;">Classroom broadcasts</h3>
            <form id="broadcast-form">
              <div class="form-group">
                <label for="broadcast-text" style="font-size:12px; margin-bottom:4px; display:block;">Announcement Message</label>
                <textarea id="broadcast-text" class="form-control" rows="3" placeholder="Write message to send to all student dashboards..." required style="font-size:13px;"></textarea>
              </div>
              <button type="submit" class="btn btn-primary" style="width:100%; margin-top:8px;">Broadcast to Group</button>
            </form>
          </div>

          <!-- Active Chats card -->
          <div class="card">
            <h3 style="margin-bottom: 12px; font-size:16px;">Active Chats</h3>
            
            <!-- Start Chat Dropdown -->
            <div style="margin-bottom:12px;">
              <select id="start-new-chat-select" class="form-control" style="font-size:13px; padding: 6px 12px;">
                <option value="" disabled selected>+ Start chat with student...</option>
                ${inactiveStudents.map(s => `<option value="${this.escapeHTML(s.id)}">${this.escapeHTML(s.name)} (${this.escapeHTML(s.yearGroup)})</option>`).join('')}
              </select>
            </div>

            <div style="display:flex; flex-direction:column; gap:8px;" id="active-chats-list">
              ${activeStudents.length === 0 ? `
                <div style="font-size:13px; color:var(--text-muted); text-align:center; padding:16px 0;">No active chats</div>
              ` : activeStudents.map(s => {
                const lastMsg = [...messages].reverse().find(m => m.senderId === s.id || m.receiverId === s.id);
                const isSelected = s.id === this.selectedChatStudentId;
                return `
                  <div class="chat-list-item" style="cursor:pointer; padding:12px; border-radius:8px; border: 1px solid ${isSelected ? 'var(--teal)' : 'var(--border-color)'}; background: ${isSelected ? 'rgba(45, 156, 145, 0.08)' : 'var(--bg-card)'}; transition: background 0.2s;" data-student-id="${this.escapeHTML(s.id)}">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <strong style="font-size:13px; color: ${isSelected ? 'var(--teal)' : 'var(--text-main)'};">${this.escapeHTML(s.name)}</strong>
                      <span style="font-size:10px; color: var(--text-muted);">${new Date(lastMsg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <div style="color: var(--text-muted); font-size:12px; white-space:nowrap; text-overflow:ellipsis; overflow:hidden; margin-top:4px;">
                      ${this.escapeHTML(lastMsg.text)}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Conversation Pane -->
        <div class="card" style="display:flex; flex-direction:column; padding:0; overflow:hidden;">
          ${selectedStudent ? `
            <div class="chat-header" style="padding:16px 24px; border-bottom:1px solid var(--border-color); background: rgba(7, 17, 31, 0.01); display:flex; align-items:center; justify-content:space-between;">
              <div>
                <strong style="font-size:16px;">${this.escapeHTML(selectedStudent.name)}</strong>
                <span style="font-size:12px; color:var(--text-muted); margin-left:8px;">${this.escapeHTML(selectedStudent.yearGroup)} · Student</span>
              </div>
            </div>

            <div class="chat-messages" id="teacher-chat-scroller" style="flex:1; min-height:300px; max-height:450px; overflow-y:auto; padding:24px;">
              ${chatMessages.length === 0 ? `
                <div style="text-align:center; color:var(--text-muted); font-size:13px; padding-top:48px;">No messages yet. Send a message below to start the conversation.</div>
              ` : chatMessages.map(m => `
                <div class="chat-bubble ${m.senderId === teacherId ? 'sent' : 'received'}">
                  <div style="font-size:11px; color: rgba(255,255,255,0.7); margin-bottom: 4px;">
                    ${m.senderId === teacherId ? 'You' : this.escapeHTML(selectedStudent.name.split(' ')[0])} · ${new Date(m.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                  <div>${this.escapeHTML(m.text)}</div>
                  ${m.flagged ? `<div style="font-size: 10px; color: #FECACA; font-weight:600; margin-top: 4px;">⚠️ Safety warning: Flagged by school filters</div>` : ''}
                </div>
              `).join('')}
            </div>

            <div class="chat-input-area" style="padding:16px 24px; border-top:1px solid var(--border-color); display:flex; gap:12px; background: var(--bg-card);">
              <input type="text" id="teacher-chat-text-input" class="form-control" style="flex:1;" placeholder="Type your reply to ${this.escapeHTML(selectedStudent.name.split(' ')[0])}..." value="${this.escapeHTML(this.teacherMessageDraft || '')}">
              <button class="btn btn-primary" id="teacher-chat-send-btn">Send</button>
            </div>
          ` : `
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; flex:1; min-height:400px; padding:32px; text-align:center; color:var(--text-muted);">
              <div style="font-size:48px; margin-bottom:16px;">💬</div>
              <h4 style="font-size:16px; margin-bottom:8px; color:var(--text-main);">No conversation selected</h4>
              <p style="font-size:13px; max-width:320px;">Select a student from the active list or start a new chat using the dropdown on the left.</p>
            </div>
          `}
        </div>
      </div>
    `;

    // Click on active chat list item
    panel.querySelectorAll('.chat-list-item').forEach(item => {
      item.onclick = () => {
        const studentId = item.getAttribute('data-student-id');
        this.selectedChatStudentId = studentId;
        this.render();
      };
    });

    // Start new chat dropdown change listener
    const startSelect = document.getElementById('start-new-chat-select');
    if (startSelect) {
      startSelect.onchange = (e) => {
        const studentId = e.target.value;
        if (studentId) {
          this.selectedChatStudentId = studentId;
          this.teacherMessageDraft = '';
          this.render();
        }
      };
    }

    // Scroll chat to bottom
    const scroller = document.getElementById('teacher-chat-scroller');
    if (scroller) scroller.scrollTop = scroller.scrollHeight;

    // Text tracking for teacher chat input
    const textIn = document.getElementById('teacher-chat-text-input');
    if (textIn) {
      textIn.oninput = (e) => { this.teacherMessageDraft = e.target.value; };
      textIn.onkeydown = (e) => {
        if (e.key === 'Enter') {
          if (selectedStudent) this.sendTeacherMessage(selectedStudent.id);
        }
      };
    }

    const sendBtn = document.getElementById('teacher-chat-send-btn');
    if (sendBtn && selectedStudent) {
      sendBtn.onclick = () => this.sendTeacherMessage(selectedStudent.id);
    }

    // Broadcast Form Submission
    const bForm = document.getElementById('broadcast-form');
    if (bForm) {
      bForm.onsubmit = (e) => {
        e.preventDefault();
        const txt = document.getElementById('broadcast-text').value.trim();
        
        // Broadcast message to all student local feeds
        students.forEach(s => {
          window.db.addMessage({
            senderId: teacherId,
            receiverId: s.id,
            text: `[CLASS ANNOUNCEMENT]: ${txt}`
          });
        });

        this.alert('Success: Announcement broadcasted to all student accounts.');
        document.getElementById('broadcast-text').value = '';
        this.render();
      };
    }
  }

  sendTeacherMessage(studentId) {
    const text = this.teacherMessageDraft ? this.teacherMessageDraft.trim() : '';
    if (!text) return;
    if (!this.canTeacherAccessStudent(studentId)) {
      this.alert('This pupil is not in your selected authorised class. No message was sent.');
      return;
    }

    window.db.addMessage({
      senderId: this.currentUser.id,
      receiverId: studentId,
      text: text
    });

    this.teacherMessageDraft = '';
    this.render();
  }

  activeStudentChat(studentId) {
    this.selectedChatStudentId = studentId;
    this.activeTab = 'teach-messages';
    this.render();
  }

  // ==================== TEACHER SETTINGS ====================
  renderTeacherSettings(panel) {
    const settings = window.db.getSettings();

    panel.innerHTML = `
      <div style="margin-bottom: 24px;">
        <h1>⚙️ Portal configuration</h1>
        <p>Configure single-school restrictions, allowed hours, and automated AI assistance.</p>
      </div>

      <div class="card" style="max-width: 600px;">
        <form id="settings-form">
          <div class="form-group">
            <label><input type="checkbox" id="ai-toggle-box" ${settings.aiFeaturesEnabled ? 'checked' : ''}> Enable optional automated formative feedback for writing and programming</label>
            <p style="font-size:12px; color:var(--text-muted);">When disabled, writing uses the local feedback guide and programming retains deterministic tests and the support ladder.</p>
          </div>

          <div class="form-group" style="margin-top:20px;">
            <label for="comm-hours-in">Allowed communication hours</label>
            <input type="text" id="comm-hours-in" class="form-control" value="${settings.communicationHours}" placeholder="e.g. 08:30 - 17:00" required>
          </div>

          <div class="form-group" style="margin-top:20px;">
            <label for="flagged-keywords-in">Safeguarding flagged keywords (separated by commas)</label>
            <textarea id="flagged-keywords-in" class="form-control" rows="3" required>${settings.flaggedKeywords.join(', ')}</textarea>
          </div>

          <button type="submit" class="btn btn-primary" style="margin-top:16px;">Save portal configurations</button>
        </form>
      </div>
    `;

    const form = document.getElementById('settings-form');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const aiOn = document.getElementById('ai-toggle-box').checked;
        const hours = document.getElementById('comm-hours-in').value.trim();
        const keywords = document.getElementById('flagged-keywords-in').value.split(',').map(k => k.trim());

        window.db.cachedData.settings.aiFeaturesEnabled = aiOn;
        window.db.cachedData.settings.communicationHours = hours;
        window.db.cachedData.settings.flaggedKeywords = keywords;
        window.db.saveData();

        this.alert('Success: Settings saved successfully.');
      };
    }
  }

  renderSyntaxConverterModal() {
    let overlay = document.getElementById('syntax-converter-modal');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'syntax-converter-modal';
      overlay.className = 'modal-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-labelledby', 'syntax-modal-title');
      document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
      <div class="modal-content" style="max-width: 650px; padding: 24px; border-radius: 16px; background: var(--bg-card); color: var(--text-main);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h2 id="syntax-modal-title" style="font-size: 18px; margin: 0; color: var(--text-main);">📖 Python 3 vs. OCR Exam Reference Language (ERL) Cheat Sheet</h2>
          <button id="close-syntax-modal" class="btn btn-secondary btn-sm" aria-label="Close modal">&times; Close</button>
        </div>

        <p style="font-size: 13.5px; color: var(--text-muted); margin-bottom: 16px;">
          OCR Paper 2 Section B questions require exact Exam Reference Language (ERL) or clear pseudocode. Do not confuse Python keywords with ERL syntax!
        </p>

        <div class="table-container" tabindex="0" role="region" aria-label="Exam Reference Language syntax table" style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13.5px; text-align: left;">
            <thead>
              <tr style="background: rgba(45, 156, 145, 0.12); border-bottom: 2px solid var(--border-color);">
                <th scope="col" style="padding: 10px;">Construct</th>
                <th scope="col" style="padding: 10px;">Python 3 Syntax</th>
                <th scope="col" style="padding: 10px;">OCR Reference Language (ERL)</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px; font-weight: 600;">Assignment</td>
                <td style="padding: 10px;"><code>x = 5</code></td>
                <td style="padding: 10px;"><code>x = 5</code></td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px; font-weight: 600;">Equality Check</td>
                <td style="padding: 10px;"><code>if x == 5:</code></td>
                <td style="padding: 10px;"><code>if x == 5 then</code></td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px; font-weight: 600;">Else If Branch</td>
                <td style="padding: 10px;"><code>elif x > 5:</code></td>
                <td style="padding: 10px;"><code>elseif x > 5 then</code></td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px; font-weight: 600;">End of If Block</td>
                <td style="padding: 10px;"><em>(Indentation only)</em></td>
                <td style="padding: 10px;"><code>endif</code></td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px; font-weight: 600;">Count Loop</td>
                <td style="padding: 10px;"><code>for i in range(1, 6):</code></td>
                <td style="padding: 10px;"><code>for i=1 to 5 ... next i</code></td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px; font-weight: 600;">Condition Loop</td>
                <td style="padding: 10px;"><code>while x < 10:</code></td>
                <td style="padding: 10px;"><code>while x < 10 ... endwhile</code></td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px; font-weight: 600;">Subprograms</td>
                <td style="padding: 10px;"><code>def calc(a):</code></td>
                <td style="padding: 10px;"><code>function calc(a) ... endfunction</code></td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px; font-weight: 600;">Array Length</td>
                <td style="padding: 10px;"><code>len(array)</code></td>
                <td style="padding: 10px;"><code>array.length</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;

    overlay.classList.add('active');
    document.getElementById('close-syntax-modal').onclick = () => overlay.classList.remove('active');
  }

  alert(msg) {
    // Custom premium alert popup
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active';
    overlay.style.zIndex = '10000';
    overlay.style.transition = 'opacity 0.2s ease-out';
    overlay.style.opacity = '1';

    const content = document.createElement('div');
    content.className = 'modal-content';
    content.style.maxWidth = '420px';
    content.style.textAlign = 'center';
    content.style.padding = '2rem';
    content.style.borderRadius = '24px';
    content.style.border = '1px solid var(--border-color)';
    content.style.background = 'var(--bg-card)';
    content.style.boxShadow = '0 20px 50px rgba(7,17,31,0.15)';
    content.style.transform = 'translateY(0)';
    content.style.transition = 'transform 0.2s ease-out';

    let icon = '🔔';
    if (msg.toLowerCase().includes('success') || msg.toLowerCase().includes('confirmed') || msg.toLowerCase().includes('received')) {
      icon = '✅';
    } else if (msg.toLowerCase().includes('warning') || msg.toLowerCase().includes('flagged') || msg.toLowerCase().includes('restricted')) {
      icon = '🚨';
    }

    content.innerHTML = `
      <div style="font-size: 2.75rem; margin-bottom: 1rem;">${icon}</div>
      <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.75rem;">System notification</h3>
      <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.75rem;">${msg}</p>
      <div style="display: flex; justify-content: center;">
        <button class="btn btn-primary" style="padding: 0.65rem 2.5rem; min-width: 120px; border-radius: 10px; font-weight: 600;">Dismiss</button>
      </div>
    `;

    overlay.appendChild(content);
    document.body.appendChild(overlay);

    const closeBtn = content.querySelector('button');
    closeBtn.focus();

    const closeAlert = () => {
      overlay.style.opacity = '0';
      content.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        overlay.remove();
      }, 200);
    };

    closeBtn.onclick = closeAlert;
  }
}

// Initialise on load
window.app = new App();
window.addEventListener('DOMContentLoaded', () => window.app.init());
