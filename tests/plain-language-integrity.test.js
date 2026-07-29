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

  test('explains the keyword check without presenting it as marking', () => {
    expect(appSource).toContain('suggested terms found');
    expect(appSource).toContain('It does not decide whether your explanation is correct or award a mark.');
    expect(appSource).not.toContain("matches === task.requiredElements.length ? 'badge badge-success'");
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
    expect(appSource).toContain('do not claim that you will remember it permanently');
  });

  test('uses one consistent pupil-facing name for recall and the exam-answer sequence', () => {
    expect(appSource).not.toContain('Spaced recall');
    expect(appSource).not.toContain('Spaced quiz completed');
    expect(appSource).not.toContain('Spaced Theory Check');
    expect(databaseSource).not.toContain('Spaced Theory Check');
    expect(appSource).toContain('Quick recall completed');
    expect(appSource).toContain('Understand, Plan, Answer, Check and Retry');
    expect(appSource).not.toContain('Decode, Plan, Answer, Check and Retry');
  });

  test('describes workload and practice drafts without implying extra credit or a false total', () => {
    expect(appSource).toContain('Core guided learning:');
    expect(appSource).toContain('Optional notes and quick recall are additional.');
    expect(appSource).toContain('Save draft — practice only');
    expect(appSource).not.toContain('Topic Workload:');
    expect(databaseSource).not.toContain("summary: 'Master how");
  });

  test('gives each pseudocode task a concept-specific answer-safe hint', () => {
    const pseudocodeSection = appSource.slice(
      appSource.indexOf('renderStudentPseudocode(panel)'),
      appSource.indexOf('// ==================== PROGRAMMING sandbox')
    );
    const hints = [...pseudocodeSection.matchAll(/hint: '([^']+)'/g)].map(match => match[1]);
    expect(hints).toHaveLength(5);
    expect(new Set(hints).size).toBe(5);
    hints.forEach(hint => expect(hint.length).toBeGreaterThanOrEqual(70));
    expect(hints[0]).toContain('value held by score');
    expect(hints[1]).toContain('trace table');
    expect(hints[2]).toContain('too low');
    expect(hints[3]).toContain('accumulator');
    expect(hints[4]).toContain('array index');
  });

  test('makes repeated official references distinguishable by section scope', () => {
    expect(appSource).toContain('${this.escapeHTML(item.officialSpecificationPointId)} — ${this.escapeHTML(item.scope)}');
    expect(appSource).toContain('Included as your latest checked result');
    expect(appSource).not.toContain('Counts towards Progress');
  });
});
