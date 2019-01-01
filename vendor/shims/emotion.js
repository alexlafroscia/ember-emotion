(function() {
  function vendorModule() {
    'use strict';

    const emotion =
      typeof FastBoot !== 'undefined'
        ? FastBoot.require('emotion')
        : require('emotion-umd');

    return Object.assign(
      {
        default: emotion,
        __esModule: true
      },
      emotion
    );
  }

  define('emotion', [], vendorModule);
})();
