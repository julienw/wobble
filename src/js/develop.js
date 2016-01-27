const re = /(\d*)([a-z])/ig;
export function developDistribution(str) {
  let parsed;
  let result = '';
  while ((parsed = re.exec(str)) !== null) {
    const [, count, letter] = parsed;
    result += letter.repeat(count || 1);
  }

  return result;
}

export function developScores(scores) {
  const result = {};

  for (const score in scores) {
    const letters = scores[score];
    letters.split('').forEach(letter => {
      if (result[letter]) {
        throw new Error(`Letter '${letter}' is specified twice.`);
      }

      result[letter] = +score;
    });
  }

  return result;
}
