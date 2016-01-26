exports.config =
  files: {}
  paths:
    watched: "src/js"
  conventions:
    assets: "src/root"
  modules:
    wrapper: false
    definition: false
  plugins:
    browserify:
      extensions: "js"
      bundles:
        "bundle.js":
          entry: "src/js/woggle.js"
          matcher: /^src\/js/
  server:
    run: yes
    port: 4567
