import { moduleForComponent, test } from 'ember-qunit';
import * as originalStylesModule from 'dummy/components/pod-styles-js/style';

moduleForComponent('pod-styles-js', 'Unit | Component | pod-styles-js', {
  needs: ['style:components/pod-styles-js'],
  unit: true
});

test('it can look up the right styles module', function(assert) {
  const instance = this.subject();

  assert.deepEqual(instance.get('__emotion__styles__'), originalStylesModule);
});
