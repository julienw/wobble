import data from './data.fr';
import Grid from './grid';
import Random from 'random-js';

const size = Object.freeze({ w: 4, h: 4 });

const r = Random();
let values = r.string(size.w * size.h, data.distribution);

const grid = new Grid(size, values);
grid.render(document.body, data.scores);

