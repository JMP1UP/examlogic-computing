module.exports = {
  schemaVersion: 12,
  schools: [{ id: 'school_existing', name: 'Existing School' }],
  coordinators: [{ id: 'coord_existing', name: 'Existing Teacher' }],
  students: [{
    id: 'stud_existing',
    name: 'Existing Learner',
    achievements: ['Kept achievement'],
    personalRevisionPriorities: ['kept priority']
  }],
  classes: [{ id: 'class_existing', name: 'Existing Class' }],
  assignments: [{
    id: 'assign_existing',
    title: 'Existing assignment',
    completedCount: 2,
    status: 'Required'
  }],
  attempts: [{
    id: 'att_existing',
    studentId: 'stud_existing',
    questionId: 'q_1_1_a',
    type: 'spaced_theory',
    score: '3/4'
  }],
  writtenSubmissions: [{
    id: 'wsub_existing',
    studentId: 'stud_existing',
    questionId: 'wq_1',
    response: 'Existing written response'
  }],
  programmingSubmissions: [{
    id: 'psub_existing',
    studentId: 'stud_existing',
    challengeId: 'pc_1',
    code: 'print("kept")',
    status: 'Passed'
  }],
  settings: {
    schoolName: 'Existing School',
    alerts: false,
    customSetting: 'keep me'
  },
  studentProgress: [{
    studentId: 'stud_existing',
    topicId: 'topic_1_1',
    status: 'In progress'
  }],
  messages: [{ id: 'msg_existing', text: 'Existing message' }],
  auditLogs: [{ id: 'log_existing', action: 'Existing action' }],
  customUserRecords: [{ id: 'custom_existing', value: 'preserved' }],
  curriculumContent: [{
    id: 'legacy_curriculum_item',
    explanation: 'A locally stored legacy curriculum item'
  }],
  questions: [{
    id: 'legacy_teacher_question',
    topicId: 'topic_1_1',
    specificationPointId: '1.1.1',
    purpose: 'retrieval',
    type: 'mcq'
  }]
};
