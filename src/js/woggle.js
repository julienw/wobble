import data from './data.fr';
import Grid from './grid';
import cellTemplate from './cell.jade';
import Random from 'random-js';
import { BJSpell } from './bjspell/BJSpell';

/* eslint-disable camelcase, lines-around-comment */
import { fr_FR } from './bjspell/fr_FR';
BJSpell.fr_FR = fr_FR;
/* eslint-enable camelcase, lines-around-comment */

const spellChecker = BJSpell('fr_FR.js');

const size = Object.freeze({ w: 4, h: 4 });

const r = Random();
const values = r.string(size.w * size.h, data.distribution);

const QUALIFIERS_TABLE = [
  ['ld', 'lt'],
  ['ld', 'ld', 'lt', 'wd'],
  ['ld', 'lt', 'lt', 'wd', 'wd', 'wt']
];

const currentTour = 2;
const qualifiers = QUALIFIERS_TABLE[currentTour];
const qualifierPopulation = Array.from({ length: values.length }, (_, i) => i);
const qualifiersIndices = r.sample(qualifierPopulation, qualifiers.length);

function cellRenderer(letter, row, column) {
  const letterIndex = row * size.w + column;
  const qualifierIndex = qualifiersIndices.indexOf(letterIndex);
  let qualifierClass = '';
  if (qualifierIndex >= 0) {
    qualifierClass = qualifiers[qualifierIndex];
  }
  return cellTemplate({ letter, score: data.scores[letter], qualifierClass });
}

const gridElt = document.querySelector('.grid');
const grid = new Grid(size, values, gridElt, cellRenderer);

const currentWordElt = document.querySelector('.current-word');
let currentWord = '';

function updateCurrentWord(newValue) {
  currentWord = newValue;
  currentWordElt.textContent = newValue;
  currentWordElt.classList.remove('incorrect', 'correct');
}


grid.on('letter', letter => {
  updateCurrentWord(currentWord + letter);
});

grid.on('word', word => {
  currentWord = '';
  const isCorrect = spellChecker.check(word);
  if (isCorrect) {
    currentWordElt.classList.add('correct');
  } else {
    currentWordElt.classList.add('incorrect');
  }
  console.log('word', word, isCorrect);
});
grid.render();

