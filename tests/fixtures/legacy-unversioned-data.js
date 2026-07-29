module.exports = {
  schools: [{ id: 'school_legacy_fixture', label: 'Fixture school' }],
  students: [{
    id: 'student_legacy_fixture',
    label: 'Fixture learner',
    achievements: ['Fixture achievement'],
    personalRevisionPriorities: ['fixture priority']
  }],
  classes: [{ id: 'class_legacy_fixture', label: 'Fixture class' }],
  attempts: [{
    id: 'attempt_legacy_fixture',
    studentId: 'student_legacy_fixture',
    questionId: 'legacy_question_fixture',
    type: 'spaced_theory',
    score: '2/3',
    response: 'anonymised fixture response'
  }],
  writtenSubmissions: [{
    id: 'written_legacy_fixture',
    studentId: 'student_legacy_fixture',
    response: 'anonymised written fixture'
  }],
  programmingSubmissions: [{
    id: 'programming_legacy_fixture',
    studentId: 'student_legacy_fixture',
    code: 'OUTPUT "fixture"',
    status: 'Submitted'
  }],
  assignments: [{
    id: 'assignment_legacy_fixture',
    title: 'Fixture assignment',
    status: 'Required'
  }],
  settings: {
    alerts: false,
    fixturePreference: 'preserve'
  },
  studentProgress: [{
    studentId: 'student_legacy_fixture',
    topicId: 'topic_fixture',
    status: 'In progress'
  }],
  messages: [{ id: 'message_legacy_fixture', text: 'Anonymised fixture message' }],
  customUserRecords: [{ id: 'custom_legacy_fixture', value: 'preserve' }],
  questions: [{
    id: 'legacy_question_fixture',
    topicId: 'topic_fixture',
    type: 'mcq',
    purpose: 'retrieval'
  }]
};
