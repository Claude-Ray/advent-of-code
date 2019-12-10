const OPERATIONS = {
  1: (p1, p2) => BigInt(p1) + BigInt(p2),
  2: (p1, p2) => BigInt(p1) * BigInt(p2),
  7: (p1, p2) => p1 < p2 ? 1 : 0,
  8: (p1, p2) => p1 === p2 ? 1 : 0
};

function parseParamIndex(arr, base, mode, idx) {
  if (mode === '1') return idx;
  const index = +arr[idx] || 0;
  return mode === '2'
    ? index + base
    : index;
}

function intcode(program, ...inputs) {
  program = program.split(',');
  const outputs = [];
  let relativeBase = 0;

  let i = 0;
  while (i < program.length) {
    const ins = program[i++].split('').reverse().join('');

    if (ins === '99') break;

    const [op, _, mode1, mode2, mode3] = ins;

    const paramIndex1 = parseParamIndex(program, relativeBase, mode1, i++);
    if (op === '3') {
      program[paramIndex1] = inputs[0].toString();
      inputs.shift();
      continue;
    }

    const param1 = +program[paramIndex1] || 0;
    if (op === '4') {
      outputs.push(param1.toString());
      continue;
    }
    if (op === '9') {
      relativeBase += param1;
      continue;
    }

    const param2 = +program[parseParamIndex(program, relativeBase, mode2, i++)] || 0;
    if (op === '5') {
      if (param1) i = param2;
      continue;
    }
    if (op === '6') {
      if (!param1) i = param2;
      continue;
    }

    const paramIndex3 = parseParamIndex(program, relativeBase, mode3, i++);
    program[paramIndex3] = OPERATIONS[op](param1, param2).toString();
  }

  return outputs;
}

function part1(input) {
  return intcode(input, 1).pop();
}

function part2(input) {
  return intcode(input, 2).pop();
}

module.exports = {
  part1,
  part2
};
