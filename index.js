'use strict';

module.exports = {
  name: 'ember-emotion',

  appOptions() {
    return (this.parent && this.parent.options) || (this.app && this.app.options);
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
  }
};
