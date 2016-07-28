import data from './data.fr';
import Grid from './grid';
import { findCombinations } from './words';
import cellTemplate from './cell.jade';
import Random from 'random-js';
import { BJSpell } from './bjspell/BJSpell';
/* eslint-disable camelcase */
import { fr_FR } from './bjspell/fr_FR';
BJSpell.fr_FR = fr_FR;
/* eslint-enable camelcase */

const spellChecker = BJSpell('fr_FR.js');

const size = Object.freeze({ w: 4, h: 4 });

const r = Random();
const values = r.sample(data.distribution, size.w * size.h);

const QUALIFIERS_TABLE = [
  ['ld', 'lt'],
  ['ld', 'ld', 'lt', 'wd'],
  ['ld', 'lt', 'lt', 'wd', 'wd', 'wt']
];

const currentTour = 2;
const qualifiers = QUALIFIERS_TABLE[currentTour];
const qualifierPopulation = Array.from({ length: values.length }, (_, i) => i);
const qualifiersIndices = r.sample(qualifierPopulation, qualifiers.length);

function findLetterInfos(letter, row, column) {
  const letterIndex = row * size.w + column;
  const qualifierIndex = qualifiersIndices.indexOf(letterIndex);
  let qualifier = '';
  if (qualifierIndex >= 0) {
    qualifier = qualifiers[qualifierIndex];
  }
  return { letter, row, column, score: data.scores[letter], qualifier };
}

function cellRenderer(letter, row, column) {
  return cellTemplate(findLetterInfos(letter, row, column));
}

function newState() {
  return {
    foundWords: new Set(),
    totalScore: 0,
    currentWord: '',
    currentLetters: [],
  };
}

let dealState = newState();

const gridElt = document.querySelector('.grid');
const grid = new Grid(size, values, gridElt, cellRenderer);

const currentWordElt = document.querySelector('.current-word');
const totalScoreElt = document.querySelector('.total-score');
const restartElt = document.querySelector('.restart-button');
restartElt.addEventListener('click', () => {
  grid.render();
  dealState = newState();
});

function updateCurrentWord(newValue) {
  dealState.currentWord = newValue;
  currentWordElt.textContent = newValue;
  currentWordElt.classList.remove('incorrect', 'correct');
}

grid.on('letter', info => {
  updateCurrentWord(dealState.currentWord + info.letter);
  dealState.currentLetters.push(info);
});

function calculateScore() {
  const letters = dealState.currentLetters.map(info => {
    const { letter, row, column } = info;
    return findLetterInfos(letter, row, column);
  });

  const globalQualifiers = letters
    .filter(info => info.qualifier.startsWith('w'))
    .map(info => info.qualifier);

  const score = letters.reduce((score, info) => {
    let letterScore = info.score;
    switch(info.qualifier) {
      case 'ld':
        console.log('lettre compte double:', info.letter);
        letterScore *= 2;
        break;
      case 'lt':
        console.log('lettre compte triple:', info.letter);
        letterScore *= 3;
        break;
      default:
        // nothing to do
    }

    return score + letterScore;
  }, 0);

  return globalQualifiers.reduce((score, qualifier) => {
    switch(qualifier) {
      case 'wd':
        console.log('mot compte double');
        return score * 2;
      case 'wt':
        console.log('mot compte triple');
        return score * 3;
      default:
        return score;
    }
  }, score);
}

grid.on('word', () => {
  const combinations = findCombinations(dealState.currentWord);
  const correctWord = combinations.find(
    combination =>
      !dealState.foundWords.has(combination) &&
      spellChecker.check(combination)
  );

  if (correctWord) {
    dealState.foundWords.add(correctWord);
    const score = calculateScore();
    updateCurrentWord(`${correctWord} (${score})`);
    dealState.totalScore += score;
    totalScoreElt.textContent = dealState.totalScore;
    currentWordElt.classList.add('correct');
  } else {
    currentWordElt.classList.add('incorrect');
  }
  dealState.currentWord = '';
  dealState.currentLetters = [];
});
grid.render();

