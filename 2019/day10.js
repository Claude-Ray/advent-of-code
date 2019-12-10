function detectAsteroids(map, x, y) {
  const set = new Set();
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === '.' || (x === j && y === i)) continue;
      set.add(Math.atan2(x - j, y - i));
    }
  }
  return set.size;
}

function getBestCoordinate(input) {
  const asteroidMap = input.split('\n');
  let max = 0;
  let x, y;
  for (let i = 0; i < asteroidMap.length; i++) {
    for (let j = 0; j < asteroidMap[i].length; j++) {
      if (asteroidMap[i][j] === '.') continue;
      const count = detectAsteroids(asteroidMap, j, i);
      if (max < count) {
        max = count;
        x = j;
        y = i;
      }
    }
  }
  return { count: max, x, y };
}

function part1(input) {
  return getBestCoordinate(input).count;
}

module.exports = {
  part1
};
