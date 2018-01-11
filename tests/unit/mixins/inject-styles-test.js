import EmberObject from '@ember/object';
import InjectStylesMixin from 'ember-emotion/mixins/inject-styles';
import { module, test } from 'qunit';

module('Unit | Mixin | inject styles');

test('it verifies that the object has a registry key', function(assert) {
  const Klass = EmberObject.extend(InjectStylesMixin);

  assert.expectAssertion(() => {
    Klass.create();
  }, 'Emotion-enabled component must have a registry key');
});
