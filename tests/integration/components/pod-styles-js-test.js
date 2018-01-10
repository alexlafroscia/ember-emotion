import emotion from 'emotion';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

import componentClassName, { paragraphClass, excessiveWhitespaceClass } from 'dummy/components/pod-styles-js/styles';
import { initialize } from 'ember-emotion/initializers/apply-emotion';

moduleForComponent('pod-styles-js', 'Integration | Component | pod styles', {
  integration: true,
  setup() {
    initialize();
  }
});

test('it sets the default exported class on the root element', function(assert) {
  this.render(hbs`{{pod-styles-js}}`);

  assert.ok(this.$('div').hasClass(componentClassName));
});

test('it exposes other exports as properties', function(assert) {
  this.render(hbs`{{pod-styles-js}}`);

  assert.ok(this.$('p').hasClass(paragraphClass));
});

test('it strips whitespacing', function(assert) {
  assert.equal(
    emotion.registered[excessiveWhitespaceClass],
    'background-color:grey;padding:1em;'
  );
});
