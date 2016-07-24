import { assert } from 'chai';

import { findCombinations } from '../src/js/words';

suite('words', function() {
  suite('findCombinations', function() {
    const tests = {
      a: ['a', 'à', 'â', 'ä'],
      e: ['e', 'ê', 'é', 'è', 'ë'],
      i: ['i', 'î', 'ï'],
      o: ['o', 'ô'],
      u: ['u', 'ù', 'û', 'ü'],
      c: ['c', 'ç'],
      roti: [
        'roti',
        'rôti',
        'rotî',
        'rotï',
        'rôtî',
        'rôtï',
      ],
    };

    Object.keys(tests).forEach(fixture => {
      test(fixture, function() {
        const result = findCombinations(fixture);

        tests[fixture].forEach(letter => {
          assert.include(result, letter);
        });
        assert.lengthOf(result, tests[fixture].length);
      });
    });

    test('macon', function() {
      assert.include(findCombinations('macon'), 'maçon');
    });
  });
});

