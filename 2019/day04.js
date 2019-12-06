function hasAdjacentNumber(str) {
  for (let i = 1; i < str.length; i++)
    if (str[i] === str[i - 1]) return true;
  return false;
}

function twoAdjacentNumber(str) {
  for (let i = 1; i < str.length; i++) {
    if (str[i] !== str[i - 1]) continue;
    if (i === str.length - 1 || str[i] !== str[i + 1]) return true;
    while (++i < str.length - 1 && str[i] === str[i + 1]);
  }
  return false;
}

function countPasswords(input, filter) {
  const [min, max] = input.split('-').map(Number);
  let count = 0;
  for (let i = min; i <= max; i++) {
    const str = i.toString();
    if (str === str.split('').sort().join('') && filter(str)) {
      count++;
    }
  }
  return count;
}

function part1(input) {
  return countPasswords(input, hasAdjacentNumber);
}

function part2(input) {
  return countPasswords(input, twoAdjacentNumber);
}

module.exports = {
  part1,
  part2
};
