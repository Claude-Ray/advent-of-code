const intcode = require('./intcode');

const POS = {
  R: { X: 1, Y: 0 },
  L: { X: -1, Y: 0 },
  U: { X: 0, Y: 1 },
  D: { X: 0, Y: -1 }
};

const DIRECTIONS = ['L', 'U', 'R', 'D'];

function turnCorner(curDirection, indication) {
  const diff = +indication === 0 ? 3 : 1;
  return DIRECTIONS[(DIRECTIONS.indexOf(curDirection) + diff) % 4];
}

function runRobot(input) {
  const robot = intcode(input, 0);
  const whites = new Set();
  const path = new Set();

  let x = 0;
  let y = 0;
  let direction = 'U';
  let done;
  while (!done) {
    const pos = `${x},${y}`;
    ({ value, done } = robot.next(whites.has(pos) ? 1 : 0));
    if (value == null) continue;

    path.add(pos);

    if (+value) {
      if (!whites.has(pos)) whites.add(pos);
    } else {
      if (whites.has(pos)) whites.delete(pos);
    }

    ({ value, done } = robot.next(whites.has(pos) ? 1 : 0));
    direction = turnCorner(direction, value);
    x += POS[direction].X;
    y += POS[direction].Y;
  }
  return path.size;
}

function part1(input) {
  return runRobot(input);
}

module.exports = {
  part1,
};
