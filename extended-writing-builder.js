// Original Scaffolded 6-8 Mark Extended Response Builder for OCR GCSE Computer Science J277.
(function initialiseExtendedWritingBuilder(root, factory) {
  const builder = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = builder;
  if (root) {
    root.StudySpiceContent = root.StudySpiceContent || {};
    root.StudySpiceContent.extendedWritingBuilder = builder;
  }
})(typeof window !== 'undefined' ? window : globalThis, function buildExtendedWritingBuilder() {
  'use strict';

  const extendedScaffolds = {
    '1.6.1': {
      strandId: '1.6.1',
      title: 'Should a school use facial recognition for attendance?',
      commandWord: 'Discuss',
      marks: 8,
      scenario: 'A secondary school is considering cameras that use facial recognition to record when pupils enter the site. Face templates and entry times would be stored online. Discuss the ethical, legal, cultural and privacy issues raised by this proposal.',
      scaffoldLadder: [
        {
          stage: 1,
          name: 'Technology and data',
          prompt: 'Choose two facts that are directly relevant to the facial-recognition proposal.',
          options: [
            'The system stores face templates and records when pupils enter the site',
            'Biometric data could be exposed or misused if storage and access are not secure',
            'The school will automatically own every pupil’s copyright',
            'Facial recognition makes the school network immune to malware'
          ],
          correctSelections: [
            'The system stores face templates and records when pupils enter the site',
            'Biometric data could be exposed or misused if storage and access are not secure'
          ]
        },
        {
          stage: 2,
          name: 'Stakeholders & Perspectives',
          prompt: 'Identify the key stakeholders affected by this change.',
          options: [
            'Pupils and families (privacy, consent and possible incorrect matches)',
            'School staff (attendance information, security and responsibility for stored data)',
            'Commercial airlines with no link to the school',
            'Shoppers at an unrelated supermarket'
          ],
          correctSelections: [
            'Pupils and families (privacy, consent and possible incorrect matches)',
            'School staff (attendance information, security and responsibility for stored data)'
          ]
        },
        {
          stage: 3,
          name: 'Scenario Application',
          prompt: 'Link a technical point directly to the school environment.',
          guidance: 'For example: an incorrect match could mark a pupil absent, so a member of staff would need a clear way to check and correct the record.'
        },
        {
          stage: 4,
          name: 'Reasoned judgement',
          prompt: 'Weigh the relevant benefits and risks, then justify what the school should do.',
          guidance: 'Base your judgement on the scenario. You might consider whether a less intrusive attendance method could meet the same need.'
        }
      ],
      modelExemplar: {
        level3: 'A strong response uses accurate points about biometric data, privacy and security, identifies affected stakeholders, applies each point to the school, develops relevant consequences and reaches a supported judgement.',
        level1: 'A limited response gives general opinions without explaining how the facial-recognition system affects people in this school.'
      }
    }
  };

  return {
    getExtendedWritingScaffold(strandId = '1.6.1') {
      return extendedScaffolds[strandId] || extendedScaffolds['1.6.1'];
    },

    evaluateExtendedResponse(strandId, userSelections = {}) {
      const scaffold = this.getExtendedWritingScaffold(strandId);
      const feedback = [];

      const stage1Selected = userSelections.stage1 || [];
      const stage1Correct = scaffold.scaffoldLadder[0].correctSelections.filter(sel => stage1Selected.includes(sel));
      if (stage1Correct.length > 0) {
        feedback.push(`You selected ${stage1Correct.length} relevant ${stage1Correct.length === 1 ? 'fact' : 'facts'} for your plan.`);
      } else {
        feedback.push('Add a fact about the face templates, entry records or how that data could affect pupils.');
      }

      const stage2Selected = userSelections.stage2 || [];
      const stage2Correct = scaffold.scaffoldLadder[1].correctSelections.filter(sel => stage2Selected.includes(sel));
      if (stage2Correct.length > 0) {
        feedback.push(`You selected ${stage2Correct.length} relevant stakeholder ${stage2Correct.length === 1 ? 'group' : 'groups'} for your plan.`);
      } else {
        feedback.push('Name at least one person or group affected by the proposal.');
      }

      feedback.push('Write the full answer in your own words. This planning check does not award marks or change Progress.');

      return {
        marksAwarded: null,
        totalMarks: scaffold.marks,
        reviewStatus: 'practice_only',
        feedback,
        exemplarComparison: scaffold.modelExemplar
      };
    }
  };
});
