/*jshint node:true */
'use strict';
var gobble = require('gobble');

let jsSources = gobble('src/js');

let build = gobble([
  gobble('src/root'),
  jsSources.transform('babel', {}).transform('browserify', {
    entries: 'wobble.js',
    dest: 'bundle.js'
  })
]);

let observers = jsSources
  .observe('eslint')
  .observe('jscs');

module.exports = gobble([ build, observers ]);

