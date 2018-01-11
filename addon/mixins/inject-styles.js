import Mixin from '@ember/object/mixin';
import { computed, get, set } from '@ember/object';
import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';
import require from 'require';

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

    const { modulePrefix } = getOwner(this).resolveRegistration(
      'config:environment'
    );
    const componentName = key.replace('component:', '');
    const styleModuleName = `${modulePrefix}/components/${componentName}/styles`;

    try {
      return require(styleModuleName);
    } catch (e) {
      return {};
    }
  })
});
