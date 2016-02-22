import gridTemplate from './grid.jade';
import { EventDispatcher } from './event_dispatcher';
import matches from 'dom-matches';
import closest from 'dom-closest';

/**
 * @param {{w: Number, h: Number}} size Size of the grid (cell count)
 * @param {Array.Number} values Array of values to use in this cell. Its length
 * needs to be w * h.
 * @param {Node} node Element where the grid will render
 * @param {Function} cellRenderer a function that takes 2 arguments: the node to
 * render to, the value to render
 * @returns {Grid} New object Grid
 */
export default function Grid(size, values, node, cellRenderer) {
  if (values.length !== size.w * size.h) {
    throw new Error(
      `values.length must equal size.w * size.h
      (${values.length} != ${size.w} * ${size.h})`
    );
  }

  if (!(node instanceof Element)) {
    throw new Error('node must be an Element');
  }

  if (typeof cellRenderer !== 'function') {
    throw new Error('cellRenderer must be a function');
  }

  this.size = size;
  this.values = values;
  this.cellRenderer = cellRenderer;
  this.node = node;
  this.currentMove = [];
  this.grid = null;

  EventDispatcher.mixin(this, ['letter', 'word']);

  Object.seal(this);

  this.attachEventListeners();
}

Grid.prototype = {
  attachEventListeners() {
    this.node.addEventListener('mousedown', this);
  },

  handleEvent(e) {
    switch(e.type) {
      case 'mousedown':
        this.onMousedown(e);
        break;
      case 'mouseup':
        this.onMouseup(e);
        break;
      case 'mousemove':
        this.onMousemove(e);
        break;
      default:
        console.error(`Event ${e.type} is unexpected.`);
    }
  },

  onMousedown(e) {
    if (!e.target.classList.contains('letter__inner')) {
      return;
    }

    this.currentMove.length = 0;

    console.log('onMousedown', e.target);
    this.node.setCapture(/* retargetToElement */ false);
    this.node.addEventListener('mousemove', this);
    this.node.addEventListener('mouseup', this);
  },

  onMouseup(e) {
    console.log('onMouseup', e.target);

    this.node.removeEventListener('mousemove', this);
    this.node.removeEventListener('mouseup', this);

    const word = this.currentMove.map(
      inner => closest(inner, '[data-letter]').dataset.letter
    ).join('');

    this.emit('word', word);
    this.currentMove.length = 0;
  },

  onMousemove(e) {
    if (!e.target.classList.contains('letter__inner')) {
      return;
    }

    if (this.currentMove.indexOf(e.target) >= 0) {
      return;
    }

    this.emit('letter', closest(e.target, '[data-letter]').dataset.letter);

    this.currentMove.push(e.target);
  },

  computeValues() {
    let count = 0;

    this.grid = new Array(this.size.h);
    for (let j = 0; j < this.size.h; j++) {
      this.grid[j] = new Array(this.size.w);
      for (let i = 0; i < this.size.w; i++) {
        this.grid[j][i] = this.values[count++];
      }
    }
  },

  /**
   * Render the Grid to the prevoisly specified node.
   * @returns {void}
   */
  render() {
    this.computeValues();
    this.node.innerHTML = gridTemplate(
      { grid: this.grid, cellRenderer: this.cellRenderer }
    );
  }
};
