const OPERATIONS = {
  1: (p1, p2) => p1 + p2,
  2: (p1, p2) => p1 * p2,
  7: (p1, p2) => p1 < p2 ? 1 : 0,
  8: (p1, p2) => p1 === p2 ? 1 : 0
};

function parseParameter(arr, mode, idx) {
  return +mode === 1 ? arr[idx] : arr[arr[idx]];
}

function intcode(program, ...inputs) {
  inputs = inputs.map(i => i.toString());
  program = program.split(',');
  const outputs = [];

  let i = 0;
  while (i < program.length) {
    const ins = program[i++].split('').reverse().join('');

    if (ins === '99') break;

    if (ins === '3') {
      const param = program[i++];
      program[param] = inputs[0];
      inputs.shift();
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

function permuteSequence(arr, length = arr.length, cur = [], result = []) {
  if (cur.length === length) {
    return result.push(cur);
  }

  for (let i = 0; i < arr.length; i++) {
    const less = [...arr];
    less.splice(i, 1);
    permuteSequence(less, length, cur.concat(arr[i]), result);
  }

  return result;
}

function getSequence(length, start = 0) {
  return Array.from({ length }, (v, k) => k + start);
}

function* generatorIntcode(program, ...inputs) {
  program = program.split(',');

  let i = 0;
  while (i < program.length) {
    const ins = program[i++].split('').reverse().join('');

    if (ins === '99') break;

    if (ins === '3') {
      const inputValue = yield;
      if (inputValue != null) inputs = Array.isArray(inputValue) ? inputValue : [inputValue];
      const param = program[i++];
      program[param] = inputs[0].toString();
      inputs.shift();
      continue;
    }

    const [op, _, mode1, mode2] = ins;
    if (op === '4') {
      yield parseParameter(program, mode1, i++);
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
}

function part1(input) {
  return Math.max(...permuteSequence(getSequence(5)).map(sequence => sequence.reduce((pre, phase) => intcode(input, phase, pre), 0)));
}

function part2(input) {
  const sequences = permuteSequence(getSequence(5, 5));

  const results = sequences.map(sequence => {
    const amplifiers = sequence.map(n => generatorIntcode(input, n, 0));

    let result = null;
    for (let i = 0, done, value; !done; i++) {
      ({ value, done } = amplifiers[i % sequence.length].next(result));
      if (value != null) result = value;
    }

    return result;
  });
  return Math.max(...results.map(Number));
}

module.exports = {
  part1,
  part2
};
