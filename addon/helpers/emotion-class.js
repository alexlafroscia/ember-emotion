import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';

export function emotionClass([className], { from }) {
  assert('A class name must be provided', !!className);
  assert('Missing styles lookup object', !!from);

  return from[className];
}

export default helper(emotionClass);
