/* global require */

import Mixin from '@ember/object/mixin';
import { computed, get, set } from '@ember/object';
import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';

const VALID_STYLE_MODULE_PATTERN = /(component|controller)$/;

export default Mixin.create({
  classNameBindings: ['__default__emotion__class__'],
  __default__emotion__class__: undefined,

  init() {
    this._super();

    const styles = get(this, '__emotion__styles__');

    if (styles.default) {
      set(this, '__default__emotion__class__', styles.default);
    }
  },

  /**
   * The contents of the `styles.js` that corresponds to this module
   *
   * Tries to look them up from the registry if possible, to avoid walking the total set up
   * registered modules more than necessary
   *
   * If not cached, it looks through the total set of modules to find what is most likely the
   * right one and caches it on the registry for future lookups
   *
   * This module is passed into the `emotion-class` helper through a HTMLBars transform so that
   * the underlying implementation is transparent to users
   *
   * @property {object} __emotion__styles__
   * @private
   */
  __emotion__styles__: computed(function() {
    const key = this._debugContainerKey;
    assert('Emotion-enabled component must have a registry key', !!key);

    const owner = getOwner(this);
    const emotionStyleRegistryKey = `emotion-style:${key.replace(':', '__')}`;

    const cachedStylesLookup = owner.resolveRegistration(
      emotionStyleRegistryKey
    );

    if (cachedStylesLookup) {
      return cachedStylesLookup;
    }

    const module = Object.values(require._eak_seen).find(
      module => get(module, 'module.exports.default') === this.constructor
    );

    // If the module doesn't exist or isn't within a pod that supports a style
    // file, abort (and cache an empty object to avoid this work in the future)
    if (!module || !VALID_STYLE_MODULE_PATTERN.test(module.id)) {
      owner.register(emotionStyleRegistryKey, {});

      return {};
    }

    const styleModuleName = module.id.replace(
      VALID_STYLE_MODULE_PATTERN,
      'styles'
    );

    try {
      const styleModule = require(styleModuleName);

      owner.register(emotionStyleRegistryKey, styleModule);

      return styleModule;
    } catch (e) {
      return {};
    }
  })
});
