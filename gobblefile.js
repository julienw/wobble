'use strict';
const gobble = require('gobble');

module.exports = gobble([
  gobble('src/root'),
  gobble([
    gobble('src/js'),
    gobble('src/jade').transform('jade-es6')
  ])
  .transform('babel')
  .transform('webpack', {
    entry: './woggle.js',
    sourceMap: true
  })
]);
