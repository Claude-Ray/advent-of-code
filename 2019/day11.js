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

function runRobot(input, start = '.') {
  const robot = intcode(input, 0);
  const whites = new Set();
  const path = new Set();

  if (start === '#') whites.add('0,0');

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
  return { count: path.size, whites };
}

function displayCoordinates(coordinates) {
  let xmin = 0;
  let xmax = 0;
  let ymin = 0;
  let ymax = 0;

  for (const coordinate of coordinates) {
    const [x, y] = coordinate.split(',');
    if (x < xmin) xmin = +x;
    else if (x > xmax) xmax = +x;
    if (y < ymin) ymin = +y;
    else if (y > ymax) ymax = +y;
  }

  for (let y = ymax; y >= ymin; y--) {
    let lines = '';
    for (let x = xmin; x <= xmax; x++)
      lines += coordinates.has(`${x},${y}`) ? '#' : ' ';
    console.log(lines);
  }
}

function part1(input) {
  return runRobot(input).count;
}

function part2(input) {
  const { whites } = runRobot(input, '#');
  displayCoordinates(whites);
}

module.exports = {
  part1,
  part2
};
