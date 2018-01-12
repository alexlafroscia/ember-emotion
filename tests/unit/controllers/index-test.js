import { moduleFor, test } from 'ember-qunit';
import * as allControllerStyles from 'dummy/index/styles';

moduleFor('controller:index', 'Unit | Styling controllers', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it injects the `styles` object into the controller', function(assert) {
  const controller = this.subject();

  assert.deepEqual(controller.get('__emotion__styles__'), allControllerStyles);
});
