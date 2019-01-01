import { get } from '@ember/object';
import { hydrate } from 'emotion';

export const FASTBOOT_STYLE_CACHE_NAME = 'emotion-ids';

export function initialize(appInstance) {
  const fastboot = appInstance.lookup('service:fastboot');

  if (fastboot && !get(fastboot, 'isFastBoot')) {
    const shoebox = get(fastboot, 'shoebox');
    const emotionIds = shoebox.retrieve(FASTBOOT_STYLE_CACHE_NAME);

    if (emotionIds) {
      hydrate(emotionIds);
    }
  }
}

export default {
  initialize
};
