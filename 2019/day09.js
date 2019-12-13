const intcode = require('./intcode');

function part1(input) {
  return [...intcode(input, 1)].pop();
}

function part2(input) {
  return [...intcode(input, 2)].pop();
}

module.exports = {
  part1,
  part2
};
