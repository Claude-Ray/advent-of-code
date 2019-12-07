function generateMap(input) {
  const map = {};
  const orbits = input.split('\n');
  orbits.forEach(orbit => {
    const [value, key] = orbit.split(')');
    map[key] = value;
  });
  return map;
}

function countOrbits(map) {
  let count = 0;
  for (const key in map) {
    let object = key;
    while (map[object]) {
      count++;
      object = map[object];
    }
  }
  return count;
}

function scanMap(map, key) {
  const orbits = [];
  while (map[key]) {
    key = map[key];
    orbits.push(key);
  }
  return orbits;
}

function countMinTransfers(map) {
  const youOrbits = scanMap(map, 'YOU');
  const sanOrbits = scanMap(map, 'SAN');
  for (let i = 0; i < youOrbits.length; i++) {
    const idx = sanOrbits.indexOf(youOrbits[i]);
    if (idx !== -1) return idx + i;
  }
  return null;
}

function part1(input) {
  const map = generateMap(input);
  return countOrbits(map);
}

function part2(input) {
  const map = generateMap(input);
  return countMinTransfers(map);
}

module.exports = {
  part1,
  part2
};
