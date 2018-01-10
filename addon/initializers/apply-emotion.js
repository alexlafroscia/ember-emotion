/* global require */

import CreateMixin from 'ember-emotion/create-emotion-mixin';

export function initialize() {
  Object.values(require._eak_seen).forEach(module => {
    const { id } = module;

    if (id.endsWith('styles')) {
      const componentModuleId = id.replace(/styles$/, 'component');
      const styles = require(id);
      const component = require(componentModuleId).default;
      const Mixin = CreateMixin(styles);

      component.reopen(Mixin);
    }
  });
}

export default {
  initialize
};
