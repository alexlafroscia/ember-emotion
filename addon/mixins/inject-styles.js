/* global require */

import Mixin from '@ember/object/mixin';
import { computed, get, set } from '@ember/object';
import { assert } from '@ember/debug';

export default Mixin.create({
  init() {
    this._super();

    const styles = get(this, '__emotion__styles__');

    // Set the default export as a class on the component
    if (styles.default) {
      set(this, 'classNames', [styles.default]);
    }
  },

  __emotion__styles__: computed(function() {
    const key = this._debugContainerKey;
    assert('Must be applied to component in the registry', !!key);

    const module = Object.values(require._eak_seen).find(
      module => get(module, 'module.exports.default') === this.constructor
    );

    // We couldn't find the module; abort
    if (!module) {
      return {};
    }

    const styleModuleName = module.id.replace(/component$/, 'styles');

    try {
      return require(styleModuleName);
    } catch (e) {
      return {};
    }
  })
});
