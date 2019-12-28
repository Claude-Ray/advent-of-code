const AXES = ['x', 'y', 'z'];

function parseInput(input) {
  return input.split('\n')
    .map(str => str.match(/(-?\d+)/g).map(Number))
    .map(([x, y, z]) => ({ x, y, z, vx: 0, vy: 0, vz: 0 }));
}

function applyGravity(moons) {
  AXES.forEach(axis =>
    moons.forEach(moon =>
      moon[`v${axis}`] += moons.reduce((sum, cur) => {
        if (moon[axis] === cur[axis]) return sum;
        return sum + (moon[axis] < cur[axis] ? 1 : - 1);
      }, 0)
    )
  );
}

function applyVelocity(moons) {
  for (let i = 0; i < moons.length; i++) {
    moons[i].x += moons[i].vx;
    moons[i].y += moons[i].vy;
    moons[i].z += moons[i].vz;
  }
}

function getTotalEnergy(moons) {
  return moons.reduce((total, moon) => {
    let potential = 0;
    let kinetic = 0;
    AXES.forEach(axis => {
      potential += Math.abs(moon[axis]);
      kinetic += Math.abs(moon[`v${axis}`]);
    });
    return total += potential * kinetic;
  }, 0);
}

function part1(input, step = 1000) {
  let moons = parseInput(input);
  for (let i = 0; i < step; i++) {
    applyGravity(moons);
    applyVelocity(moons);
  }
  return getTotalEnergy(moons);
}

function gcd(a, b) {
  return !b ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return a * (b / gcd(a, b));
}

function toString(moons, axis) {
  return moons.map((moon) => moon[axis]).join(',');
}

function part2(input) {
  const moons = parseInput(input);
  const init = AXES.map(axis => toString(moons, axis));
  const meets = Array.from({ length: AXES.length });
  const counts = Array.from({ length: AXES.length }).fill(0);

  while (!meets.every(Boolean)) {
    applyGravity(moons);
    applyVelocity(moons);
    for (let a = 0; a < AXES.length; a++) {
      const state = toString(moons, AXES[a]);
      if (meets[a]) continue;
      if (state === init[a]) meets[a] = true;
      counts[a] += 1;
    }
  }
  return lcm(lcm(...counts.slice(0, 2)), counts[2]);
}

module.exports = {
  part1,
  part2
};
