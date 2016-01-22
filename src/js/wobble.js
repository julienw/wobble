import data from './data.fr';
import Grid from './grid';
import Random from 'random-js';

function cellRenderer(node, value) {
  node.textContent = value;
}

const r = Random();
const size = Object.freeze({ w: 4, h: 4 });
let values = r.string(size.w * size.h, data.distribution);

const grid = new Grid(size, values, cellRenderer);
grid.render(document.body);

