exports.config = {
  files: {
    javascripts: { joinTo: 'app.js' }
  },
  paths: { watched: 'src' },
  conventions: { assets: 'root' },
  /*
  modules: {
    wrapper: false,
    definition: false
  },
  plugins: {
    browserify: {
      extensions: 'js',
      bundles: {
        'bundle.js': {
          entry: 'src/js/woggle.js',
          matcher: /^src\/js/
        }
      }
    }
  },
*/
  server: { run: true, port: 4567 }
};
