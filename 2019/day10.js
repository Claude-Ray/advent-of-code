function getCoordinates(map) {
  const coordinates = [];
  map.forEach((line, y) =>
    line.split('').forEach((asteroid, x) => (asteroid === '#' && coordinates.push({ x, y }))));
  return coordinates;
}

function detectAsteroids(map, x0, y0) {
  const set = new Set();
  getCoordinates(map)
    .forEach(({ x, y }) => set.add(Math.atan2(x0 - x, y0 - y)));
  return set.size;
}

function getBestCoordinate(input) {
  const asteroidMap = input.split('\n');
  let max = 0;
  let x, y;
  getCoordinates(asteroidMap).forEach(({ x: x1, y: y1 }) => {
    const count = detectAsteroids(asteroidMap, x1, y1);
    if (max < count) {
      max = count;
      x = x1;
      y = y1;
    }
  });
  return { count: max, x, y, asteroidMap };
}

function getAngle(x1, y1, x0, y0) {
  return ((Math.atan2(y0 - y1, x0 - x1) * 180) / Math.PI + 270) % 360;
}

function getAngleMap(asteroidMap, x0, y0) {
  const angleMap = {};
  getCoordinates(asteroidMap).forEach(({ x, y }) => {
    if (x0 === x && y0 === y) return;
    const angle = getAngle(x, y, x0, y0);
    if (!angleMap[angle]) angleMap[angle] = [];
    angleMap[angle].push({ x, y, angle });
  });
  return angleMap;
}

function countAsteroids(input, n) {
  const { x, y, asteroidMap } = getBestCoordinate(input);
  const angleMap = getAngleMap(asteroidMap, x, y);
  let count = 0;
  while (count < n) {
    const angles = Object.keys(angleMap).sort((a, b) => a - b);
    for (const angle of angles) {
      const coordinate = angleMap[angle].pop();
      if (coordinate && ++count === n) return coordinate.x * 100 + coordinate.y;
    }
  }
  return null;
}

function part1(input) {
  return getBestCoordinate(input).count;
}

function part2(input) {
  return countAsteroids(input, 200);
}

module.exports = {
  part1,
  part2
};
