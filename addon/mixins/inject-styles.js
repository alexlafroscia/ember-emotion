import Mixin from '@ember/object/mixin';
import { computed, get, getWithDefault, set } from '@ember/object';
import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';

export default Mixin.create({
  init() {
    this._super();

    const styles = get(this, '__emotion__styles__');

    if (typeof styles.default === 'string') {
      const classNames = getWithDefault(this, 'classNames', []);

      set(this, 'classNames', [styles.default, ...classNames]);
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
    const [type, styleModuleKeyBase] = key.split(':');
    let styleModuleKey = styleModuleKeyBase;

    if (type === 'component') {
      styleModuleKey = `components/${styleModuleKeyBase}`;
    }

    return owner.resolveRegistration(`style:${styleModuleKey}`) || {};
  })
});
