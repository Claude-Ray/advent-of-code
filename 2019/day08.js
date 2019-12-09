function countDigits(str) {
  const map = {};
  for (const digit of str) {
    map[digit] = map[digit] ? map[digit] + 1 : 1;
  }
  return map;
}

function displayImage(image, width) {
  image = image.replace(/0/g, ' ');
  for (let i = 0; i < image.length; i += width) {
    console.log(image.slice(i, i + width));
  }
}

function part1(input, width = 25, height = 6) {
  const imagePixels = width * height;
  let minMap = {};
  let min = imagePixels;
  for (let i = 0; i < input.length; i += imagePixels) {
    const image = input.slice(i, i + imagePixels);
    const map = countDigits(image);
    if (map[0] < min) {
      min = map[0];
      minMap = map;
    }
  }
  return minMap[1] * minMap[2];
}

function part2(input, width = 25, height = 6) {
  const imagePixels = width * height;
  let result = '';
  for (let i = 0; i < imagePixels; i++) {
    for (let j = i; j < input.length; j += imagePixels) {
      if (input[j] === '2') continue;
      result += input[j];
      break;
    }
  }
  displayImage(result, width);
  return result;
}

module.exports = {
  part1,
  part2
};
