import { assert } from 'chai';
import sinon from 'sinon';
import { jsdom } from 'jsdom';

import Grid from '../src/js/grid';

suite('Grid', function() {
  setup(function() {
    global.document = jsdom();
    global.Element = document.defaultView.Element;
  });

  test('2x3 grid', function() {
    const size = { w: 2, h: 3 };
    const values = 'abcdef';
    const stub = sinon.stub();
    const node = document.createElement('div');

    // to check the grid is properly emptied before rendering
    node.innerHTML = '<div>';

    const grid = new Grid(size, values, stub);
    grid.render(node);

    const table = node.querySelector('table');
    assert.ok(table);
    assert.lengthOf(table.children, size.h);
    Array.from(table.children).forEach((row, i) => {
      assert.equal(row.tagName, 'TR');
      assert.lengthOf(row.children, size.w);
      Array.from(row.children).forEach((cell, j) => {
        assert.equal(cell.tagName, 'TD');
        sinon.assert.calledWith(stub, cell, values[i * size.w + j]);
      });
    });
  });

  test('throws if the values length is incorrect', function() {
    const size = { w: 2, h: 3 };
    const values = 'abcd';
    const stub = sinon.stub();

    assert.throws(() => new Grid(size, values, stub));
  });

  test('throws if the cellRenderer is not provided', function() {
    const size = { w: 2, h: 2 };
    const values = 'abcd';

    assert.throws(() => new Grid(size, values));
  });

  test('throws if the cellRenderer is not a function', function() {
    const size = { w: 2, h: 2 };
    const values = 'abcd';

    assert.throws(() => new Grid(size, values, 'renderer'));
  });

  test('throws if node is not an element', function() {
    const size = { w: 2, h: 2 };
    const values = 'abcd';
    const stub = sinon.stub();

    const grid = new Grid(size, values, stub);
    assert.throws(() => grid.render('node'));
  });


});
