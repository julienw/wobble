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

const gridElt = document.querySelector('.grid');
const grid = new Grid(size, values, gridElt, cellRenderer);

const currentWordElt = document.querySelector('.current-word');
const totalScoreElt = document.querySelector('.total-score');
let currentWord = '';
let currentLetters = [];
let totalScore = 0;

function updateCurrentWord(newValue) {
  currentWord = newValue;
  currentWordElt.textContent = newValue;
  currentWordElt.classList.remove('incorrect', 'correct');
}

grid.on('letter', info => {
  updateCurrentWord(currentWord + info.letter);
  currentLetters.push(info);
});

function calculateScore() {
  const letters = currentLetters.map(info => {
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
  const combinations = findCombinations(currentWord);
  const correctWord = combinations.find(
    combination => spellChecker.check(combination)
  );

  if (correctWord) {
    const score = calculateScore();
    updateCurrentWord(`${correctWord} (${score})`);
    totalScore += score;
    totalScoreElt.textContent = totalScore;
    currentWordElt.classList.add('correct');
  } else {
    currentWordElt.classList.add('incorrect');
  }
  currentWord = '';
  currentLetters = [];
});
grid.render();

