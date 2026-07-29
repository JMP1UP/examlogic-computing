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
});
