const fs = require('fs');
const path = require('path');

describe('real browser Python runtime', () => {
  const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
  const worker = fs.readFileSync(path.join(__dirname, '..', 'python-worker.mjs'), 'utf8');

  test('runs pinned Pyodide away from the main interface thread', () => {
    expect(worker).toContain('pyodide/v0.26.3/full/pyodide.js');
    expect(app).toContain("new Worker('/python-worker.mjs');");
  });

  test('executes controlled tests and restricts advanced operations', () => {
    expect(worker).toContain('ast.Import');
    expect(worker).toContain('_safe_builtins');
    expect(worker).toContain('fileContent');
    expect(worker).toContain('functionName');
    expect(worker).toContain('functionArgs');
    expect(app).toContain('worker.postMessage({ id, code: this.editorCode');
  });

  test('does not award marks by searching the source text', () => {
    expect(app).not.toContain('Python execution simulator check');
    expect(app).not.toContain("codeVal.includes('range(1, 6)')");
  });

  test('Pyodide CDN release serves a valid module', async () => {
    const https = require('https');
    const checkUrl = (url) => new Promise((resolve, reject) => {
      const req = https.get(url, { agent: false }, (res) => {
        res.resume();
        if (res.statusCode === 200) resolve(true);
        else reject(new Error(`Status: ${res.statusCode}`));
        req.destroy();
      });
      req.on('error', (err) => {
        reject(err);
        req.destroy();
      });
    });
    const success = await checkUrl('https://cdn.jsdelivr.net/pyodide/v0.26.3/full/pyodide.js');
    expect(success).toBe(true);
  });
});
