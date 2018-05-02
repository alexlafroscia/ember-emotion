import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import * as allControllerStyles from 'dummy/index/style';

module('Unit | Styling controllers', function(hooks) {
  setupTest(hooks);

  test('it injects the `styles` object into the controller', function(assert) {
    const controller = this.owner.lookup('controller:index');

    assert.deepEqual(
      controller.get('__emotion__styles__'),
      allControllerStyles
    );
  });
});
