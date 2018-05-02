import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import * as originalStylesModule from 'dummy/components/pod-styles-js/style';

module('Unit | Component | pod-styles-js', function(hooks) {
  setupTest(hooks);

  test('it can look up the right styles module', function(assert) {
    const instance = this.owner.lookup('component:pod-styles-js');

    assert.deepEqual(instance.get('__emotion__styles__'), originalStylesModule);
  });
});
