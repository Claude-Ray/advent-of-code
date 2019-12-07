const OPERATIONS = {
  1: (p1, p2) => p1 + p2,
  2: (p1, p2) => p1 * p2,
  7: (p1, p2) => p1 < p2 ? 1 : 0,
  8: (p1, p2) => p1 === p2 ? 1 : 0
};

function parseParameter(arr, mode, idx) {
  return +mode === 1 ? arr[idx] : arr[arr[idx]];
}

function test(program, input) {
  input = input.toString();
  program = program.split(',');
  const outputs = [];

  let i = 0;
  while (i < program.length) {
    const ins = program[i++].split('').reverse().join('');

    if (ins === '99') break;

    if (ins === '3') {
      const param = program[i++];
      program[param] = input;
      continue;
    }

    const [op, _, mode1, mode2] = ins;
    if (op === '4') {
      const out = parseParameter(program, mode1, i++);
      outputs.push(out);
      continue;
    }

    const param1 = +parseParameter(program, mode1, i++);
    const param2 = +parseParameter(program, mode2, i++);
    if (op === '5') {
      if (param1) i = param2;
      continue;
    }
    if (op === '6') {
      if (!param1) i = param2;
      continue;
    }

    const out = program[i++];
    program[out] = OPERATIONS[op](param1, param2).toString();
  }

  return outputs;
}

function part1(input) {
  return test(input, 1).pop();
}

function part2(input) {
  return test(input, 5).pop();
}

module.exports = {
  part1,
  part2
};
