/* eslint env:"node" */

'use strict';
const realGobble = require('gobble');

function gobble(arg) {
  var result = realGobble(arg);
  if (typeof arg === 'string') {
    result = result.exclude('**/.*.sw?');
  }

  return result;
}

const lint =
  gobble([
    gobble('src').moveTo('src'),
    gobble('test').moveTo('test')
  ]).observe('eslint', {
    reportOnly: !process.env.ESLINT_FAIL,
    growl: true
  }).transform('devnull');

const js_sources = gobble([
  gobble('src/js'),
  gobble('src/libs'),
  gobble('src/jade').transform('jade-es6')
]).transform('babel');

const test = gobble([
  js_sources.moveTo('src/js'),
  gobble('test').transform('babel').moveTo('test')
]).transform('forcecopy')
  .observe('mocha', {
    reportOnly: !process.env.TEST_FAIL,
    ui: 'tdd'
  })
  .transform('devnull');

let mainBuild = [
  lint,
  test,
  gobble('src/root'),
  js_sources.transform('webpack', {
    entry: './woggle.js',
    sourceMap: true
  })
];

module.exports = gobble(mainBuild);
