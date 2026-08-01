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
      marks: 6,
      scenario: 'A secondary school is considering cameras that use facial recognition to record when pupils enter the site. Face templates and entry times would be stored online. Discuss the ethical, legal, cultural and privacy issues raised by this proposal.',
      scaffoldLadder: [
        {
          stage: 1,
          name: 'Technical Facts & Environmental Points',
          prompt: 'Select two distinct technical/environmental facts relevant to replacing 500 computers.',
          options: [
            'E-waste generation from disposing 500 old computers containing toxic metals (lead, mercury)',
            'Reduced energy consumption from modern energy-efficient laptops compared to old desktops',
            'Increased server storage capacity in cloud data centres',
            'Shorter battery life on mobile phones'
          ],
          correctSelections: [
            'E-waste generation from disposing 500 old computers containing toxic metals (lead, mercury)',
            'Reduced energy consumption from modern energy-efficient laptops compared to old desktops'
          ]
        },
        {
          stage: 2,
          name: 'Stakeholders & Perspectives',
          prompt: 'Identify the key stakeholders affected by this change.',
          options: [
            'Students & Teachers (portability vs digital divide / home internet access)',
            'School IT Administrators (device management and cloud network security)',
            'Commercial airlines',
            'Supermarket shoppers'
          ],
          correctSelections: [
            'Students & Teachers (portability vs digital divide / home internet access)',
            'School IT Administrators (device management and cloud network security)'
          ]
        },
        {
          stage: 3,
          name: 'Scenario Application',
          prompt: 'Link a technical point directly to the school environment.',
          guidance: 'For example: Laptops allow students to work from home, but pupils without home Wi-Fi face inequality (cultural digital divide).'
        },
        {
          stage: 4,
          name: 'Reasoned Evaluation & Conclusion',
          prompt: 'Provide a balanced conclusion weighing benefits against environmental/ethical harms.',
          guidance: 'Conclude whether the educational benefit outweighs the e-waste impact if the school uses a certified recycler.'
        }
      ],
      modelExemplar: {
        level3: 'A high-level (6/6 mark) response discusses technical features (e-waste, toxic heavy metals in landfills, power efficiency), identifies distinct stakeholders (pupils, IT staff, recyclers), applies points directly to the 500-laptop scenario, and provides a balanced, justified conclusion recommending certified e-waste recycling to mitigate environmental harm.',
        level1: 'A low-level (1-2 mark) response gives generic opinions without computing terminology or scenario application (e.g., "Laptops are good for school because kids like them").'
      }
    }
  };

  return {
    getExtendedWritingScaffold(strandId = '1.6.1') {
      return extendedScaffolds[strandId] || extendedScaffolds['1.6.1'];
    },

    evaluateExtendedResponse(strandId, userSelections = {}) {
      const scaffold = this.getExtendedWritingScaffold(strandId);
      let marksAwarded = 0;
      const feedback = [];

      // Check Stage 1
      const stage1Selected = userSelections.stage1 || [];
      const stage1Correct = scaffold.scaffoldLadder[0].correctSelections.filter(sel => stage1Selected.includes(sel));
      if (stage1Correct.length > 0) {
        marksAwarded += stage1Correct.length;
        feedback.push(`Stage 1 Passed: Identified ${stage1Correct.length} valid technical/environmental points.`);
      } else {
        feedback.push('Stage 1 Missed: Focus on e-waste disposal and device energy efficiency.');
      }

      // Check Stage 2
      const stage2Selected = userSelections.stage2 || [];
      const stage2Correct = scaffold.scaffoldLadder[1].correctSelections.filter(sel => stage2Selected.includes(sel));
      if (stage2Correct.length > 0) {
        marksAwarded += stage2Correct.length;
        feedback.push(`Stage 2 Passed: Identified ${stage2Correct.length} valid stakeholder perspectives.`);
      }

      // Check Stage 3 & 4 text length / substance
      if (userSelections.stage3Text && userSelections.stage3Text.length > 30) {
        marksAwarded += 1;
        feedback.push('Stage 3 Passed: Applied technical points directly to the school scenario.');
      }
      if (userSelections.stage4Text && userSelections.stage4Text.length > 30) {
        marksAwarded += 1;
        feedback.push('Stage 4 Passed: Formulated a balanced evaluation and conclusion.');
      }

      return {
        marksAwarded: Math.min(scaffold.marks, marksAwarded),
        totalMarks: scaffold.marks,
        feedback,
        exemplarComparison: scaffold.modelExemplar
      };
    }
  };
});
