
importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.3/full/pyodide.js');

let pyodide;

async function initialise() {
  pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.3/full/' });
  self.postMessage({ type: 'ready' });
}

const ready = initialise().catch(error => {
  self.postMessage({ type: 'initialisation-error', error: String(error?.message || error) });
  throw error;
});

function buildHarness(code, challengeId, testCase) {
  return `
import ast, io, traceback, builtins as _builtins

_source = ${JSON.stringify(code)}
_challenge = ${JSON.stringify(challengeId)}
_test = ${JSON.stringify(testCase)}

class _BlockedCode(Exception):
    pass

_tree = ast.parse(_source, filename="student_code.py", mode="exec")
for _node in ast.walk(_tree):
    if isinstance(_node, (ast.Import, ast.ImportFrom, ast.Global, ast.Nonlocal)):
        raise _BlockedCode("Imports and global namespace access are not available in this GCSE practice runner.")
    if isinstance(_node, ast.Attribute) and str(_node.attr).startswith("__"):
        raise _BlockedCode("Double-underscore attributes are not available in this practice runner.")
    if isinstance(_node, ast.Name) and _node.id in {"eval", "exec", "compile", "__import__", "globals", "locals", "vars", "breakpoint"}:
        raise _BlockedCode("That advanced operation is not available in this GCSE practice runner.")

_inputs = iter([str(value) for value in _test.get("inputs", [])])
def _input(prompt=""):
    try:
        return next(_inputs)
    except StopIteration:
        raise EOFError("The program requested more input values than this test case supplies.")

_safe_builtins = {
    "print": _builtins.print, "input": _input, "range": _builtins.range,
    "len": _builtins.len, "int": _builtins.int, "float": _builtins.float,
    "str": _builtins.str, "bool": _builtins.bool, "list": _builtins.list,
    "dict": _builtins.dict, "set": _builtins.set, "tuple": _builtins.tuple,
    "min": _builtins.min, "max": _builtins.max, "sum": _builtins.sum,
    "abs": _builtins.abs, "round": _builtins.round, "enumerate": _builtins.enumerate,
    "zip": _builtins.zip, "open": _builtins.open, "Exception": _builtins.Exception,
    "ValueError": _builtins.ValueError, "TypeError": _builtins.TypeError
}

if _challenge == "pc_5":
    with _builtins.open("scores.txt", "w") as _file:
        _file.write(_test.get("fileContent", "50\\n60\\n40\\n"))

_namespace = {"__builtins__": _safe_builtins, "__name__": "__main__"}
_stdout = io.StringIO()
_stderr = io.StringIO()
try:
    _old_stdout, _old_stderr = __import__("sys").stdout, __import__("sys").stderr
    __import__("sys").stdout, __import__("sys").stderr = _stdout, _stderr
    exec(compile(_tree, "student_code.py", "exec"), _namespace, _namespace)
    if _challenge == "pc_4":
        if "hex_char_to_val" not in _namespace or not callable(_namespace["hex_char_to_val"]):
            raise NameError("Define a function named hex_char_to_val(char).")
        print(_namespace["hex_char_to_val"](_test.get("functionArg", "A")))
    elif _test.get("functionName"):
        _function_name = _test["functionName"]
        if _function_name not in _namespace or not callable(_namespace[_function_name]):
            raise NameError(f"Define a function named {_function_name}.")
        print(_namespace[_function_name](*_test.get("functionArgs", [])))
    _result = {"output": _stdout.getvalue().strip(), "error": _stderr.getvalue().strip()}
except Exception as _error:
    _trace = traceback.TracebackException.from_exception(_error)
    _line = next((_frame.lineno for _frame in reversed(list(_trace.stack)) if _frame.filename == "student_code.py"), None)
    _result = {"output": _stdout.getvalue().strip(), "error": f"{type(_error).__name__}: {_error}", "line": _line}
finally:
    if "_old_stdout" in globals():
        __import__("sys").stdout, __import__("sys").stderr = _old_stdout, _old_stderr

_result
`;
}

self.onmessage = async event => {
  await ready;
  const { id, code, challengeId, tests } = event.data || {};
  const results = [];
  for (const testCase of tests || []) {
    try {
      const proxy = await pyodide.runPythonAsync(buildHarness(code, challengeId, testCase));
      const result = proxy.toJs({ dict_converter: Object.fromEntries });
      proxy.destroy();
      results.push(result);
    } catch (error) {
      results.push({ output: '', error: String(error?.message || error) });
    }
  }
  self.postMessage({ type: 'result', id, results });
};
