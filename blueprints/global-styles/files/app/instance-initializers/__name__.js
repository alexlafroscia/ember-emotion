import { injectGlobal } from 'emotion';

export function initialize() {
  injectGlobal`
    // Global styles go here
  `;
}

export default {
  initialize,
  after: ['hydrate-fastboot-styles']
};
