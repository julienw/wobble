import gridTemplate from './grid.jade';

/**
 * @param {{w: Number, h: Number}} size Size of the grid (cell count)
 * @param {Array.Number} values Array of values to use in this cell. Its length
 * needs to be w * h.
 * @returns {Grid} New object Grid
 */
export default function Grid(size, values) {
  if (values.length !== size.w * size.h) {
    throw new Error(
      `values.length must equal size.w * size.h
      (${values.length} != ${size.w} * ${size.h})`
    );
  }

  this.size = size;
  this.values = values;
}

Grid.prototype = {
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
  * @param {Node} node Element where the gris will render
  * @param {Object.<String, Number>} scores Information of letter to scores
  * @returns {void}
  */
  render(node, scores) {
    if (!(node instanceof Element)) {
      throw new Error('node must be an Element');
    }

    this.computeValues();
    node.innerHTML = gridTemplate({ grid: this.grid, scores });
  }
};
