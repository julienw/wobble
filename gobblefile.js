'use strict';
const gobble = require('gobble');

const tests =
  gobble([
    gobble('src').moveTo('src'),
    gobble('test').moveTo('test')
  ]).observe('eslint', {
    reportOnly: !process.env.ESLINT_FAIL,
    growl: true
  }).transform('devnull');

module.exports = gobble([
  tests,
  gobble('src/root'),
  gobble([
    gobble('src/js'),
    gobble('src/libs'),
    gobble('src/jade').transform('jade-es6')
  ])
  .transform('babel')
  .transform('webpack', {
    entry: './woggle.js',
    sourceMap: true
  })
]);
