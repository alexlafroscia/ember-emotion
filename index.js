'use strict';

const MergeTrees = require('broccoli-merge-trees');
const VersionChecker = require('ember-cli-version-checker');

const HtmlbarsPlugin = require('./lib/htmlbars-plugin');

module.exports = {
  name: 'ember-emotion',

  init() {
    this._super.init && this._super.init.apply(this, arguments);

    this.checker = new VersionChecker(this);
  },

  appOptions() {
    return (
      (this.parent && this.parent.options) || (this.app && this.app.options)
    );
  },

  included() {
    this._super.included.apply(this, arguments);

    this.import('node_modules/emotion/dist/emotion.umd.min.js', {
      using: [{ transformation: 'amd', as: 'emotion' }]
    });

    let opts = this.appOptions();
    opts.babel = opts.babel || {};
    opts.babel.plugins = opts.babel.plugins || [];
    let emotion = opts.emotion || {};
    opts.babel.plugins.push(['emotion', emotion.babel || {}]);
  },

  treeForAddon() {
    const addonTree = this._super.treeForAddon.apply(this, arguments);

    return new MergeTrees([addonTree, `${__dirname}/vendor`]);
  },

  setupPreprocessorRegistry(type, registry) {
    // Skip if we're setting up this addon's own registry
    if (type !== 'parent') {
      return;
    }

    registry.add('htmlbars-ast-plugin', {
      name: 'ember-css-modules',
      plugin: HtmlbarsPlugin.forEmberVersion(this.checker.forEmber().version),
      baseDir() {
        return __dirname;
      }
    });
  }
};
