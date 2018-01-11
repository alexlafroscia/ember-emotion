import { helper } from '@ember/component/helper';
import { cx } from 'emotion';

export function cxHelper(params) {
  return cx(params);
}

export default helper(cxHelper);
