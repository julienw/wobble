import { assert } from 'chai';
import sinon from 'sinon';
import { jsdom } from 'jsdom';

import Grid from '../src/js/grid';

suite('Grid', function() {
  let node;

  setup(function() {
    global.document = jsdom();
    global.Element = document.defaultView.Element;
    node = document.createElement('div');
  });

  test('2x3 grid', function() {
    const size = { w: 2, h: 3 };
    const values = 'abcdef';
    const stub = sinon.stub();

    // to check the grid is properly emptied before rendering
    node.innerHTML = '<div>';

    const grid = new Grid(size, values, node, stub);
    grid.render();

    const rows = node.querySelectorAll('table tr');
    assert.lengthOf(rows, size.h);
    Array.from(rows).forEach((row, i) => {
      assert.lengthOf(row.children, size.w);
      Array.from(row.children).forEach((cell, j) => {
        assert.equal(cell.tagName, 'TD');
        sinon.assert.calledWith(stub, values[i * size.w + j], i, j);
      });
    });
  });

  test('throws if the values length is incorrect', function() {
    const size = { w: 2, h: 3 };
    const values = 'abcd';
    const stub = sinon.stub();

    assert.throws(() => new Grid(size, values, node, stub));
  });

  test('throws if the cellRenderer is not provided', function() {
    const size = { w: 2, h: 2 };
    const values = 'abcd';

    assert.throws(() => new Grid(size, values, node));
  });

  test('throws if the cellRenderer is not a function', function() {
    const size = { w: 2, h: 2 };
    const values = 'abcd';

    assert.throws(() => new Grid(size, values, node, 'renderer'));
  });

  test('throws if node is not an element', function() {
    const size = { w: 2, h: 2 };
    const values = 'abcd';
    const stub = sinon.stub();

    assert.throws(() => new Grid(size, values, 'node', stub));
  });
});

