import { moduleFor, test } from 'ember-qunit';
import * as allControllerStyles from 'dummy/index/style';

moduleFor('controller:index', 'Unit | Styling controllers', {
  needs: ['style:index']
});

test('it injects the `styles` object into the controller', function(assert) {
  const controller = this.subject();

  assert.deepEqual(controller.get('__emotion__styles__'), allControllerStyles);
});
