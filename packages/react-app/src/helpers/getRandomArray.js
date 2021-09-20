export default function getRandomArray({ min, max, numOfRandoms, unique }) {
  var getRandom = function (x, y) {
    return Math.floor(Math.random() * (x - y + 1) + y)
  }
  var randoms = []
  while (randoms.length < numOfRandoms) {
    var random = getRandom(min, max)
    if (randoms.indexOf(random) == -1 || !unique) {
      randoms.push(random)
    }
  }
  return randoms
}
