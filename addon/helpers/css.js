import { helper } from '@ember/component/helper';
import { css as emotionCss } from 'emotion';

export function css(params, hash) {
  return emotionCss(...params, hash);
}

export default helper(css);
