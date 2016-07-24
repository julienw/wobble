
const transliterations = {
  a: 'àâä',
  e: 'éèêë',
  i: 'îï',
  o: 'ô',
  u: 'ûüù',
  c: 'ç',
};

function findCombinations(word) {
  let combinations = [ '' ];

  Array.from(word).forEach(l => {
    let nextLetters = [];
    if (l in transliterations) {
      nextLetters = Array.from(transliterations[l]);
    }
    nextLetters.push(l);

    combinations = combinations.reduce((result, combination) => {
      result.push(...nextLetters.map(appending => combination + appending));
      return result;
    }, []);
  });

  return combinations;
}

export { findCombinations };
