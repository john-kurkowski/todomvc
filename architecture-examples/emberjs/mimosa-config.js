exports.config = {
  "modules": [
    "copy",
    "jshint",
    "csslint",
    "server",
    "require",
    "minify-js",
    "minify-css",
    "live-reload",
    "bower",
    "ember-handlebars"
  ],

  watch: {
    sourceDir: "js",
    javascriptDir: "."
  },

  bower: {
    mainOverrides: {
      "todomvc-common": ["base.js"]
    }
  },

  server: {
    defaultServer: {
      enabled: true,
      onePager: true
    },

    views: {
      compileWith: "html",
      extension: "html",
      path: "."
    }
  }
}
