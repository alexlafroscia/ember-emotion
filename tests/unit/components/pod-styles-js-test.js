import { moduleForComponent, test } from 'ember-qunit';
import * as originalStylesModule from 'dummy/components/pod-styles-js/styles';

moduleForComponent('pod-styles-js', 'Unit | Component | pod-styles-js', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('it can look up the right styles module', function(assert) {
  const instance = this.subject();

  assert.deepEqual(instance.get('__emotion__styles__'), originalStylesModule);
});

test('it can look up a cached version of the styles module name', function(assert) {
  const classes = {
    foo: 'bar'
  };

  // Register a fake set of classes in the cache, so that we can ensure a cache hit prevents
  // looking up the actual styles
  this.register('emotion-style:component__pod-styles-js', classes);

  const instance = this.subject();

  assert.deepEqual(instance.get('__emotion__styles__'), classes);
});
