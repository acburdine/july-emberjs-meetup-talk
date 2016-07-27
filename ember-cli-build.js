/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app'),
    concat = require('broccoli-concat'),
    mergeTrees = require('broccoli-merge-trees'),
    environment = EmberApp.env(),
    codemirrorAssets;

codemirrorAssets = function () {
    var codemirrorFiles = [
        'lib/codemirror.css',
        'theme/xq-light.css',
        'lib/codemirror.js',
        'mode/htmlmixed/htmlmixed.js',
        'mode/xml/xml.js',
        'mode/css/css.js',
        'mode/javascript/javascript.js'
    ];

    if (environment === 'test') {
        return {import: codemirrorFiles};
    }

    return {
        public: {
            include: codemirrorFiles,
            destDir: '/',
            processTree: function (tree) {
                var jsTree = concat(tree, {
                    outputFile: 'assets/codemirror.js',
                    headerFiles: ['lib/codemirror.js'],
                    inputFiles: ['mode/**/*']
                });

                var cssTree = concat(tree, {
                    outputFile: 'assets/codemirror.css',
                    inputFiles: ['**/*.css']
                });

                return mergeTrees([jsTree, cssTree]);
            }
        }
    };
};

module.exports = function(defaults) {
    var app = new EmberApp(defaults, {
        nodeAssets: {
            codemirror: codemirrorAssets()
        }
    });

    // Use `app.import` to add additional libraries to the generated
    // output files.
    //
    // If you need to use different assets in different
    // environments, specify an object as the first parameter. That
    // object's keys should be the environment name and the values
    // should be the asset to use in that environment.
    //
    // If the library that you are including contains AMD or ES6
    // modules that you would like to import into your application
    // please specify an object with the list of modules as keys
    // along with the exports of each module as its value.

    app.import('bower_components/normalize-css/normalize.css');

    return app.toTree();
};
