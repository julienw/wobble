import { assert } from 'chai';

import data from '../src/js/data.fr';

suite('data.fr.js', function() {
  test('data is correctly loaded', function() {
    assert.ok(data.scores);
    assert.ok(data.distribution);
  });
});

