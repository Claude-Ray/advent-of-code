function intcode(ints) {
  for (let i = 0; i < ints.length; i += 4) {
    const op = ints[i];
    const input1 = ints[i + 1];
    const input2 = ints[i + 2];
    const output = ints[i + 3];

    if (op === 99) break;
    ints[output] = op === 1
      ? ints[input1] + ints[input2]
      : ints[input1] * ints[input2];
  }
  return ints[0];
}

function part1(str) {
  const ints = str.split(',').map(Number);
  ints[1] = 12;
  ints[2] = 2;

  return intcode(ints);
}

function part2(str) {
  const ints = str.split(',').map(Number);

  for (let noun = 0; noun < ints.length; noun++) {
    for (let verb = 0; verb < ints.length; verb++) {
      const inputs = [...ints];
      inputs[1] = noun;
      inputs[2] = verb;
      if (intcode(inputs) === 19690720) return 100 * noun + verb;
    }
  }
  return null;
}

module.exports = {
  part1,
  part2
};
