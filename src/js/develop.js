const re = /(\d*)([a-z])/ig;
const DEFAULT_COUNT = 1;

export function developDistribution(str) {
  let parsed;
  let result = '';
  while ((parsed = re.exec(str)) !== null) {
    const [, count, letter] = parsed;
    result += letter.repeat(count || DEFAULT_COUNT);
  }

  return result;
}

export function developScores(scores) {
  return Object.keys(scores).reduce((result, score) => {
    const letters = scores[score];
    letters.split('').forEach((letter) => {
      if (result[letter]) {
        throw new Error(`Letter '${letter}' is specified twice.`);
      }

      result[letter] = +score;
    });

    return result;
  }, {});
}
