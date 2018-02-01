import { isArray } from '@ember/array';
import createComputedCSSTag from './-private/computed-css-tag';

/**
 * Allows for declaration of CSS based on the component's state
 *
 * If the function is used directly as a tag, then no dependent keys
 * are set up for the `emotion` style definition.
 *
 * The function can also be called with some arguments, the return value of
 * which can be used as a template tag to define CSS that will be re-computed
 * based on the given dependent keys
 *
 * @example <caption>Declaring CSS that will not be re-computed</caption>
 *   import { computed } from 'ember-emotion';
 *
 *   export const dynamicParagraph = computed`
 *     color: ${cxt => cxt.get('color')};
 *   `;
 *
 * @example <caption>Declaring CSS that re-computes with a dependent key</caption>
 *   import { computed } from 'ember-emotion';
 *
 *   export const dynamicParagraph = computed('color')`
 *     color: ${cxt => cxt.get('color')};
 *   `;
 */
export function computed(...args) {
  if (isArray(args[0])) {
    return createComputedCSSTag()(...args);
  }

  return createComputedCSSTag(...args);
}
