import template from './test.jade';
console.log('template : ', template());

/**
 * @param {{w: Number, h: Number}} size Size of the grid (cell count)
 * @param {Array.Number} values Array of values to use in this cell. Its length
 * needs to be w * h.
 * @param {Function} cellRenderer a function that takes 2 arguments: the node to
 * render to, the value to render
 * @returns {Grid} New object Grid
 */
export default function Grid(size, values, cellRenderer) {
  if (values.length !== size.w * size.h) {
    throw new Error(
      `values.length must equal size.w * size.h
      (${values.length} != ${size.w} * ${size.h})`
    );
  }

  if (typeof cellRenderer !== 'function') {
    throw new Error('cellRenderer must be a function');
  }

  this.size = size;
  this.values = values;
  this.cellRenderer = cellRenderer;
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
  * @returns {void}
  */
  render(node) {
    if (!(node instanceof Element)) {
      throw new Error('node must be an Element');
    }

    this.computeValues();
    node.textContent = '';
    const table = document.createElement('table');
    this.grid.forEach((row) => {
      const tr = document.createElement('tr');
      row.forEach((cell) => {
        const td = document.createElement('td');
        this.cellRenderer.call(null, td, cell);
        tr.appendChild(td);
      });

      table.appendChild(tr);
    });

    node.appendChild(table);
  }
};
