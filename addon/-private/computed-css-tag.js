import { css } from 'emotion';

/**
 * The output from this function is used by the Mixin to detect CSS definitions
 * that need to be altered such that functions are called with the component as
 * an argument.
 *
 * @private
 */
export default function createTag(...dependentKeys) {
  return function(strings, ...args) {
    return {
      dependentKeys,
      createStyles(context) {
        return css(
          strings,
          args.map(arg => {
            if (typeof arg === 'function') {
              arg = arg(context);
            }

            return arg;
          })
        );
      }
    };
  };
}
