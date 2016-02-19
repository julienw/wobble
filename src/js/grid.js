import gridTemplate from './grid.jade';

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

  onMousedown() {
    this.node.addEventListener('mousemove', this);
    document.body.addEventListener('mouseup', this);
  },

  onMouseup() {
    this.node.removeEventListener('mousemove', this);
    document.body.removeEventListener('mouseup', this);
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
