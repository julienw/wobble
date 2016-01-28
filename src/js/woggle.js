import data from './data.fr';
import Grid from './grid';
import Random from 'random-js';

function cellRenderer(node, letter) {
  node.textContent = letter;

  const scoreElement = document.createElement('div');
  scoreElement.textContent = data.scores[letter];
  node.appendChild(scoreElement);
}

const size = Object.freeze({ w: 4, h: 4 });

const r = Random();
let values = r.string(size.w * size.h, data.distribution);

const grid = new Grid(size, values, cellRenderer);
grid.render(document.body);

