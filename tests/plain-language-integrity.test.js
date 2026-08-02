const fs = require('fs');
const path = require('path');

describe('pupil-facing plain-language integrity', () => {
  const appSource = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
  const curriculumSource = fs.readFileSync(path.join(__dirname, '..', 'curriculum-content.js'), 'utf8');
  const databaseSource = fs.readFileSync(path.join(__dirname, '..', 'database.js'), 'utf8');

  test('keeps internal product and engineering language out of revised pupil instructions', () => {
    expect(appSource).not.toContain('This strand does not currently have a valid learning view');
    expect(appSource).not.toContain('objective-level teaching');
    expect(appSource).not.toContain('logged in progress registry');
    expect(appSource).not.toContain('Mark Scheme Criteria Detected');
    expect(appSource).not.toContain('(formative estimate)');
    expect(appSource).not.toContain('Local Rubric Sandbox');
    expect(curriculumSource).not.toContain('Refactor it into named subprograms');
  });

  test('does not present keyword matching as answer quality or marking', () => {
    expect(appSource).not.toContain('suggested terms found');
    expect(appSource).not.toContain('live-keyphrase-scanner');
    expect(appSource).not.toContain('scanKeyphrases');
  });

  test('uses accurate defensive-design and testing guidance', () => {
    expect(databaseSource).toContain('Parameterised queries are the main defence against SQL injection');
    expect(databaseSource).not.toContain('SQL Injection $\\\\rightarrow$ Input sanitisation');
    expect(databaseSource).not.toContain('filters out erroneous data before it is processed, preventing code crashes');
    expect(databaseSource).not.toContain('stripping out characters that could execute SQL code');
    expect(curriculumSource).toContain('Then refine it: split the code into clearly named subprograms');
    expect(curriculumSource).toContain('Boundary data is valid data at an allowed limit.');
  });

  test('does not turn a section evidence goal into a claim of full completion', () => {
    expect(appSource).toContain('Section goal met');
    expect(appSource).not.toContain('Section complete');
    expect(appSource).not.toContain('available sections completed');
    expect(appSource).not.toContain('Topic mastered');
    expect(appSource).toContain('section goals met through checked work');
  });

  test('uses one consistent pupil-facing name for recall and the exam-answer sequence', () => {
    expect(appSource).not.toContain('Spaced recall');
    expect(appSource).not.toContain('Spaced quiz completed');
    expect(appSource).not.toContain('Spaced Theory Check');
    expect(databaseSource).not.toContain('Spaced Theory Check');
    expect(appSource).toContain('Quick recall completed');
    expect(appSource).toContain('Understand, plan, answer and self-check one question.');
    expect(appSource).toContain('Optional independent practice');
    expect(appSource).not.toContain('Decode, Plan, Answer, Check and Retry');
  });

  test('describes workload and practice drafts without implying extra credit or a false total', () => {
    expect(appSource).toContain('Topic review:');
    expect(appSource).toContain('Notes and flashcards are optional extras.');
    expect(appSource).toContain('Save draft — practice only');
    expect(appSource).not.toContain('Topic Workload:');
    expect(databaseSource).not.toContain("summary: 'Master how");
  });

  test('chunks pupil instructions and explains visible progress rules', () => {
    expect(appSource).toContain('Try it one step at a time');
    expect(appSource).toContain("content.supportedPractice.split('|')");
    expect(appSource).toContain('It will not change your Progress score.');
    expect(appSource).toContain('Add at least one explained point before you check your answer.');
    expect(appSource).not.toContain('Write a meaningful retry');
    expect(appSource).not.toContain('contributing to your progress');
  });

  test('keeps OCR command words and gives each a plain explanation', () => {
    ['Describe', 'Explain', 'Compare', 'Calculate', 'Trace', 'Refine', 'Discuss', 'Evaluate'].forEach(word => {
      expect(appSource).toContain(`${word}:`);
    });
    expect(appSource).toContain('Link a cause to its effect.');
    expect(appSource).toContain('Show your working and include the requested unit.');
  });

  test('does not pretend the extended-writing draft is automatically marked', () => {
    expect(appSource).toContain('This practice is not marked automatically.');
    expect(appSource).toContain('Save draft — practice only');
    expect(appSource).toContain('It does not change Progress and has not been marked.');
    expect(appSource).not.toContain('instant AI feedback');
    expect(appSource).not.toContain('Processing handwritten essay photo with OCR');
    expect(appSource).not.toContain('e-waste vs energy efficiency');
  });

  test('gives each pseudocode task a concept-specific answer-safe hint', () => {
    const pseudocodeSection = appSource.slice(
      appSource.indexOf('renderStudentPseudocode(panel)'),
      appSource.indexOf('// ==================== PROGRAMMING sandbox')
    );
    const hints = [...pseudocodeSection.matchAll(/hint: '([^']+)'/g)].map(match => match[1]);
    expect(hints).toHaveLength(9);
    expect(new Set(hints).size).toBe(9);
    hints.forEach(hint => expect(hint.length).toBeGreaterThanOrEqual(70));
    expect(hints[0]).toContain('value held by score');
    expect(hints[1]).toContain('trace table');
    expect(hints[2]).toContain('too low');
    expect(hints[3]).toContain('accumulator');
    expect(hints[4]).toContain('array index');
  });

  test('makes repeated official references distinguishable by section scope', () => {
    expect(appSource).toContain('${this.escapeHTML(item.officialSpecificationPointId)} — ${this.escapeHTML(item.scope)}');
    expect(appSource).toContain('Your latest checked result can contribute to Progress.');
    expect(appSource).not.toContain('Counts towards Progress');
  });
});
