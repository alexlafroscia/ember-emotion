/* globals require */

import Mixin from '@ember/object/mixin';

export default Mixin.create({
  /**
   * Look up a `style` object and _always_ return the entire module
   *
   * This circumvents the default behavior of resolving to the default export
   * of the module, which is not the desired behavior for styles.
   *
   * This method also resolves an empty object for pods that do not have a style
   * defined
   */
  resolveStyle(parsedName) {
    const moduleName = this.findModuleName(parsedName);

    try {
      return require(moduleName, null, null, true);
    } catch (e) {
      if (
        e.message ===
        'Could not find module `undefined` imported from `(require)`'
      ) {
        return {};
      }

      throw e;
    }
  }
});
