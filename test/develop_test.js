import { assert } from 'chai';

import { developDistribution, developScores } from '../src/js/develop';

suite('develop.js', function() {
  suite('distribution', function() {
    test('one letter', function() {
      assert.equal(developDistribution('a'), 'a');
    });

    test('2 letters', function() {
      assert.equal(developDistribution('ab'), 'ab');
    });

    test('repeat letters', function() {
      assert.equal(developDistribution('a2b'), 'abb');
    });

    test('more than 10 repeat', function() {
      assert.equal(developDistribution('a15b'), 'abbbbbbbbbbbbbbb');
    });

    test('longer string', function() {
      assert.equal(
        developDistribution('2a4b11cdef2g'), 'aabbbbcccccccccccdefgg'
      );
    });
  });

  suite('scores', function() {
    test('1 score, 1 letter', function() {
      assert.deepEqual(
        developScores({ 1: 'a' }),
        { a: 1 }
      );
    });

    test('2 scores, 1 letter', function() {
      assert.deepEqual(
        developScores({ 1: 'a', 2: 'b' }),
        { a: 1, b: 2 }
      );
    });

    test('1 score, 2 letters', function() {
      assert.deepEqual(
        developScores({ 1: 'ab' }),
        { a: 1, b: 1 }
      );
    });

    test('more scores, more letters', function() {
      assert.deepEqual(
        developScores({ 1: 'abcd', 2: 'efgh', 3: 'ijkl', 5: 'mnop' }),
        { a: 1, b: 1, c: 1, d: 1, e: 2, f: 2, g: 2, h: 2, i: 3, j: 3,
          k: 3, l: 3, m: 5, n: 5, o: 5, p: 5 }
      );
    });

    test('throws if the same letter is specified twice', function() {
      assert.throws(
        () => developScores({ 1: 'a', 2: 'a' })
      );
    });
  });
});

