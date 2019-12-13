const intcode = require('./intcode');

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

function part1(input) {
  return Math.max(...permuteSequence(getSequence(5)).map(sequence => sequence.reduce((pre, phase) => [...intcode(input, phase, pre)].pop(), 0)));
}

function part2(input) {
  const sequences = permuteSequence(getSequence(5, 5));

  const results = sequences.map(sequence => {
    const amplifiers = sequence.map(n => intcode(input, n, 0));

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
