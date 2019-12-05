const POS = {
  R: { X: 1, Y: 0 },
  L: { X: -1, Y: 0 },
  U: { X: 0, Y: 1 },
  D: { X: 0, Y: -1 }
};

function getWires(input) {
  return input.split('\n')
    .map(str => {
      const curPos = { x: 0, y: 0 };
      const paths = [];
      str.split(',')
        .forEach(action => {
          const { X, Y }= POS[action[0]];
          for (let i = 0; i < action.slice(1); i++) {
            curPos.x += X;
            curPos.y += Y;
            paths.push(`${curPos.x},${curPos.y}`);
          }
        });
      return paths;
    });
}

function parseInput(input) {
  const wires = getWires(input);
  const firstWireSet = new Set(wires[0]);
  const crossPoints = wires[1].filter(pos => firstWireSet.has(pos));
  return { crossPoints, wires };
}

function part1(input) {
  const { crossPoints } = parseInput(input);

  return Math.min(...crossPoints.map(pos => {
    const [ x, y ] = pos.split(',').map(Number);
    return x + y;
  }));
}

function part2(input) {
  const { crossPoints, wires } = parseInput(input);

  return Math.min(...crossPoints.map(pos => wires[0].indexOf(pos) + wires[1].indexOf(pos) + 2));
}

module.exports = {
  part1,
  part2
};
