'use strict';

module.exports = {
  name: 'ember-emotion',

  included() {
    this._super.included.apply(this, arguments);

    this.import('node_modules/emotion/dist/emotion.umd.min.js', {
      using: [
        { transformation: 'amd', as: 'emotion' }
      ]
    });
  }
};
