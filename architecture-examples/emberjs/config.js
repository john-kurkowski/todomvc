var path = require('path'),
    projectBower = require('./bower.json'),
    isVendorFile;

// TODO: this function shouldn't be necessary. read-components should handle
// discovering Bower main scripts for us, but I was seeing e.g.
// ember-data.min.js included in vendor.js.
isVendorFile = function(filepath) {
  var bowerRegex = /^bower_components\/([^\/]+)\/([^\/]+.js)$/,
      bowerSplit = bowerRegex.exec(filepath) || [],
      bowerComponent = bowerSplit[1],
      bowerScript = bowerSplit[2],
      bowerJson,
      bowerMain;

  if (!bowerComponent) {
    return false;
  }

  bowerJson = require('./bower_components/' + bowerComponent + '/bower.json');
  bowerMain = (projectBower.overrides[bowerComponent] || {}).main || bowerJson.main;
  return bowerScript === path.basename(bowerMain);
};

exports.config = {
  paths: {
    watched: ['app', 'envs', 'bower_components', 'vendor', 'test']
  },
  files: {
    javascripts: {
      joinTo: {
        'javascripts/app.js': /^(app|envs\/development)/,
        'javascripts/vendor.js': isVendorFile
      },
      order: {
        before: [
          'bower_components/jquery/jquery.js',
          'bower_components/handlebars/handlebars.js',
          'bower_components/ember/ember.js'
        ]
      }
    },
    stylesheets: {
      joinTo: {
        'stylesheets/app.css': /^(app|vendor)/
      },
      order: {
        before: ['vendor/styles/normalize.css']
      }
    },
    templates: {
      precompile: true,
      root: 'templates',
      joinTo: {
        'javascripts/app.js': /^app/
      }
    }
  },
  overrides: {

    // Production Settings
    production: {
      files: {
        javascripts: {
          joinTo: {
            'javascripts/app.js': /^(app|envs\/production)/,
            'javascripts/vendor.js': isVendorFile
          }
        }
      },
      optimize: true,
      sourceMaps: false,
      plugins: {
        autoReload: {
          enabled: false
        }
      }
    }
  }
};
