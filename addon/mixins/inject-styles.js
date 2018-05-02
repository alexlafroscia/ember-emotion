import Mixin from '@ember/object/mixin';
import {
  defineProperty,
  computed,
  get,
  getWithDefault,
  set
} from '@ember/object';
import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';

/**
 * Looks up the style object for the current context
 *
 * @returns {object} the style object
 */
function lookupStyles() {
  const key = this._debugContainerKey;
  assert('Emotion-enabled component must have a registry key', !!key);

  const owner = getOwner(this);
  const [type, styleModuleKeyBase] = key.split(':');
  let styleModuleKey = styleModuleKeyBase;

  if (type === 'component') {
    styleModuleKey = `components/${styleModuleKeyBase}`;
  }

  return owner.resolveRegistration(`style:${styleModuleKey}`) || {};
}

/**
 * Compute CSS definition for the component based on the definition in the pod
 *
 * @return {object} A mapping of user-defined CSS class names to `emotion` class names
 */
function computeStyles() {
  const css = lookupStyles.call(this);

  return Object.keys(css).reduce((acc, key) => {
    let value = css[key];

    if (typeof value.createStyles === 'function') {
      value = value.createStyles(this);
    }

    acc[key] = value;

    return acc;
  }, {});
}

export default Mixin.create({
  init() {
    this._super(...arguments);

    // Get all of the dependent keys from the style definition
    const dependentKeys = Object.values(lookupStyles.call(this)).reduce(
      (acc, { dependentKeys }) => {
        if (dependentKeys) {
          return [...acc, ...dependentKeys];
        }

        return acc;
      },
      []
    );

    // Dynamically set up the computed property based on the dependent keys
    defineProperty(
      this,
      '__emotion__styles__',
      computed(...dependentKeys, computeStyles).readOnly()
    );

    const styles = get(this, '__emotion__styles__');

    if (typeof styles.default === 'string') {
      const classNames = getWithDefault(this, 'classNames', []);

      set(this, 'classNames', [styles.default, ...classNames]);
    }
  },

  /**
   * The contents of the `style.js` that corresponds to this module
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
  __emotion__styles__: undefined
});
