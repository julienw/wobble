import data from './data.fr';
import Grid from './grid';
import cellTemplate from './cell.jade';
import Random from 'random-js';

const size = Object.freeze({ w: 4, h: 4 });

const r = Random();
let values = r.string(size.w * size.h, data.distribution);

function cellRenderer(letter) {
  return cellTemplate({ letter, score: data.scores[letter] });
}

const grid = new Grid(size, values, cellRenderer);
grid.render(document.body);

