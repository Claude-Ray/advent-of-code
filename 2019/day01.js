function fuel(n) {
  return Math.floor(n / 3) - 2;
}

function part1(list) {
  return list.reduce((sum, n) => sum + fuel(n), 0);
}

function part2(list) {
  const arr = list.map(fuel).filter(n => n > 0);
  if (arr.length === 0) return 0;
  return arr.reduce((sum, n) => sum + n, 0) + part2(arr);
}

module.exports = {
  part1,
  part2
};
