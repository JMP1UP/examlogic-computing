module.exports = {
  schemaVersion: 12,
  schools: [
    { id: 'org_fixture_01', name: 'Organisation 01' }
  ],
  coordinators: [
    { id: 'user_fixture_staff_01', role: 'coordinator' }
  ],
  students: [
    {
      id: 'user_fixture_student_01',
      achievements: ['fixture_achievement_01'],
      personalRevisionPriorities: ['fixture_priority_01']
    },
    {
      id: 'user_fixture_student_02',
      achievements: [],
      personalRevisionPriorities: []
    }
  ],
  classes: [
    {
      id: 'group_fixture_01',
      studentIds: ['user_fixture_student_01', 'user_fixture_student_02']
    }
  ],
  assignments: [
    {
      id: 'assignment_fixture_01',
      classId: 'group_fixture_01',
      topicId: 'topic_1_1',
      status: 'Required'
    },
    {
      id: 'assignment_fixture_02',
      studentId: 'user_fixture_student_02',
      topicId: 'topic_2_1',
      status: 'Optional'
    }
  ],
  attempts: [
    {
      id: 'attempt_fixture_01',
      studentId: 'user_fixture_student_01',
      questionId: 'q_1_1_a',
      type: 'spaced_theory',
      score: '2/4'
    },
    {
      id: 'attempt_fixture_02',
      studentId: 'user_fixture_student_02',
      questionId: 'legacy_fixture_question_01',
      type: 'retrieval',
      score: '1/1'
    }
  ],
  writtenSubmissions: [
    {
      id: 'written_fixture_01',
      studentId: 'user_fixture_student_01',
      questionId: 'wq_1',
      response: '[synthetic written response 01]'
    },
    {
      id: 'written_fixture_02',
      studentId: 'user_fixture_student_02',
      questionId: 'wq_2',
      response: '[synthetic written response 02]'
    }
  ],
  programmingSubmissions: [
    {
      id: 'programming_fixture_01',
      studentId: 'user_fixture_student_01',
      challengeId: 'pc_1',
      code: '[synthetic program payload 01]',
      status: 'Submitted'
    }
  ],
  settings: {
    organisationLabel: 'Organisation 01',
    alerts: false,
    accessibilityMode: 'fixture_mode_01',
    customSetting: 'fixture_setting_01'
  },
  studentProgress: [
    {
      studentId: 'user_fixture_student_01',
      topicId: 'topic_1_1',
      status: 'In progress'
    },
    {
      studentId: 'user_fixture_student_02',
      topicId: 'topic_2_1',
      status: 'Not started'
    }
  ],
  messages: [
    { id: 'message_fixture_01', text: '[synthetic message payload 01]' }
  ],
  auditLogs: [
    { id: 'audit_fixture_01', action: 'fixture_action_01' }
  ],
  customUserRecords: [
    { id: 'custom_fixture_01', value: 'fixture_value_01' }
  ],
  curriculumContent: [
    {
      id: 'legacy_fixture_curriculum_01',
      explanation: '[synthetic legacy curriculum payload 01]'
    }
  ],
  questions: [
    {
      id: 'legacy_fixture_question_01',
      topicId: 'topic_1_1',
      specificationPointId: '1.1.1',
      purpose: 'retrieval',
      type: 'mcq'
    }
  ]
};
