import { helper } from '@ember/component/helper';
import config from 'dummy/config/environment';

export function assetPath([path]) {
  return config.rootURL + path;
}

export default helper(assetPath);
