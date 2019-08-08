const utils = {
  //sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max(edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  //pick a random number between min and max(edges included)
  random: (min, max) => min + Math.floor(max * Math.random()),

  //given an array of numbers and a max...
  //Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const len = sets.length;

    const sums = [];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length)];
  }
};

module.exports = utils;
