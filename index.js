'use strict';

const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const VersionChecker = require('ember-cli-version-checker');

const HtmlbarsPlugin = require('./lib/htmlbars-plugin');

module.exports = {
  name: 'ember-emotion',

  init() {
    this._super.init && this._super.init.apply(this, arguments);

    this.checker = new VersionChecker(this);
  },

  /**
   * Return the root of the consuming application, regardless of whether that's
   * an Addon's dummy app or a real application
   */
  applicationRoot() {
    const root = this.project.root;

    if (this.project.isEmberCLIAddon()) {
      return `${root}/tests/dummy`;
    }

    return root;
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

  /**
   * Ensure that the `styles` directory's JavaScript files are in the App tree
   */
  treeForApp(tree) {
    const parentStylesDirectory = `${this.applicationRoot()}/app/styles`;

    const styleDirectory = new Funnel(parentStylesDirectory, {
      destDir: 'styles',
      include: ['**/*.js']
    });

    return new MergeTrees([tree, styleDirectory]);
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
