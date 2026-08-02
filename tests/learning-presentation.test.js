const fs = require('fs');
const path = require('path');

const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, '..', 'style.css'), 'utf8');
const extendedWriting = fs.readFileSync(path.join(__dirname, '..', 'extended-writing-builder.js'), 'utf8');
const curriculum = fs.readFileSync(path.join(__dirname, '..', 'curriculum-content.js'), 'utf8');

describe('student learning presentation', () => {
  test('purposeful diagrams are available on CPU and bitmap objectives', () => {
    expect(app).toContain("id === '1.1.1'");
    expect(app).toContain("id === '1.2.4c'");
    expect(app).toContain('where an instruction goes during fetch');
    expect(app).toContain('pixels, resolution and colour depth');
    expect(app).toContain('aria-hidden="true"');
    expect(app).toContain('file size in bits = width &times; height &times; colour depth');
  });

  test('combined logic teaching uses an accessible signal-flow diagram', () => {
    expect(curriculum).toContain('logic-worked-diagram');
    expect(curriculum).toContain('<title id="logic-svg-title">');
    expect(curriculum).toContain('<desc id="logic-svg-desc">');
    expect(curriculum).toContain('Follow the signals from left to right');
    expect(curriculum).toContain('1 AND 0 = 0');
    expect(curriculum).toContain('NOT 0 = 1');
    expect(curriculum).toContain('0 OR 1 = 1');
    expect(css).toContain('.logic-worked-steps');
  });

  test('legacy accent colours cannot reduce teaching-text contrast', () => {
    expect(css).toContain('.student-teaching-part-content :is(p, li, dd)');
    expect(css).toContain('.student-teaching-part-content :is(strong, h3, h4, dt)');
    expect(css).toMatch(/student-teaching-part-content :is\(strong, h3, h4, dt\).*color: var\(--text-main\) !important/);
  });

  test('teaching hierarchy uses dividers instead of nested definition cards', () => {
    expect(css).toMatch(/\.student-teaching-part\s*\{[\s\S]*?border: 0;/);
    expect(css).toMatch(/\.student-teaching-points > div\s*\{[\s\S]*?background: transparent;/);
    expect(css).toMatch(/\.student-teaching-part-number,[\s\S]*?font-size: 14px;/);
  });

  test('extended writing starts from a concrete decision and plain reasoning steps', () => {
    expect(extendedWriting).toContain('Should a school use facial recognition for attendance?');
    expect(extendedWriting).toContain('Face templates and entry times');
    expect(app).toContain('Decision for the school');
    expect(app).toContain('Build an answer that earns credit');
    expect(app).toContain('Name a stakeholder');
    expect(app).toContain('Explain a consequence');
  });
});
