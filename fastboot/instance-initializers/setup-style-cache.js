import { scheduleOnce } from '@ember/runloop';
import { get } from '@ember/object';
import emotion from 'emotion';

import { FASTBOOT_STYLE_CACHE_NAME } from 'ember-emotion/instance-initializers/hydrate-fastboot-styles';

export function initialize(application) {
  const document = application.lookup('service:-document');
  const fastboot = application.lookup('service:fastboot');
  const shoebox = get(fastboot, 'shoebox');

  // Generate the styles that we need to inject into the page
  scheduleOnce('afterRender', function() {
    const style = document.createElement('style');
    const css = Object.values(emotion.cache.inserted).reduce(
      (acc, style) => acc + style,
      ''
    );

    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    // Put IDs into shoebox for re-hydration
    shoebox.put(FASTBOOT_STYLE_CACHE_NAME, Object.keys(emotion.cache.inserted));

    document.head.appendChild(style);
  });
}

export default {
  initialize
};
