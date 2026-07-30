// Original Interactive Visual Tracing Scaffolds for OCR GCSE Computer Science J277.
(function initialiseVisualTracers(root, factory) {
  const tracers = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = tracers;
  if (root) {
    root.StudySpiceContent = root.StudySpiceContent || {};
    root.StudySpiceContent.visualTracers = tracers;
  }
})(typeof window !== 'undefined' ? window : globalThis, function buildVisualTracers() {
  'use strict';

  return {
    simulateBinaryShift(binaryString = '00001101', direction = 'left', shiftCount = 1) {
      const bits = binaryString.padStart(8, '0').split('');
      const initialDenary = parseInt(binaryString, 2);
      let resultingBits = [...bits];
      let droppedBits = [];

      for (let i = 0; i < shiftCount; i++) {
        if (direction === 'left') {
          const dropped = resultingBits.shift();
          droppedBits.push(dropped);
          resultingBits.push('0');
        } else {
          const dropped = resultingBits.pop();
          droppedBits.push(dropped);
          resultingBits.unshift('0');
        }
      }

      const finalBinary = resultingBits.join('');
      const finalDenary = parseInt(finalBinary, 2);
      const mathEffect = direction === 'left' ? `Multiplied by ${Math.pow(2, shiftCount)}` : `Divided by ${Math.pow(2, shiftCount)}`;

      return {
        initialBinary: binaryString,
        initialDenary,
        direction,
        shiftCount,
        finalBinary,
        finalDenary,
        droppedBits,
        mathEffect,
        visualSteps: [
          `Original: ${binaryString} (${initialDenary})`,
          `Shift ${shiftCount} place(s) ${direction}`,
          `Result: ${finalBinary} (${finalDenary}) -> ${mathEffect}`
        ]
      };
    },

    simulateLogicGate(gateType = 'AND', inputA = 0, inputB = 0) {
      let output = 0;
      const type = gateType.toUpperCase();

      if (type === 'AND') output = (inputA === 1 && inputB === 1) ? 1 : 0;
      if (type === 'OR') output = (inputA === 1 || inputB === 1) ? 1 : 0;
      if (type === 'XOR') output = (inputA !== inputB) ? 1 : 0;
      if (type === 'NOT') output = inputA === 0 ? 1 : 0;

      return {
        gateType: type,
        inputA,
        inputB,
        output,
        signalTrace: `Input A (${inputA}) -> [${type} Gate] <- Input B (${inputB}) => Output (${output})`,
        explanation: type === 'AND' ? 'AND gate outputs 1 only when BOTH inputs are 1.'
          : type === 'OR' ? 'OR gate outputs 1 when EITHER or BOTH inputs are 1.'
          : type === 'XOR' ? 'XOR gate outputs 1 exclusively when EXACTLY ONE input is 1.'
          : 'NOT gate inverts the input.'
      };
    },

    stepAlgorithmTrace(codeLines = [], variableHistory = []) {
      return {
        totalSteps: codeLines.length,
        steps: codeLines.map((line, idx) => ({
          stepNumber: idx + 1,
          lineText: line,
          variableState: variableHistory[idx] || {}
        }))
      };
    }
  };
});
