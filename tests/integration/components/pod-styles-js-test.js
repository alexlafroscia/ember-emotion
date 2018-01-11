import emotion from 'emotion';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

import componentClassName, {
  paragraph,
  excessiveWhitespaceClass
} from 'dummy/components/pod-styles-js/styles';

moduleForComponent('pod-styles-js', 'Integration | Component | pod styles', {
  integration: true
});

test('it sets the default exported class on the root element', function(assert) {
  this.render(hbs`{{pod-styles-js}}`);

  assert.ok(this.$('div').hasClass(componentClassName));
});

test('it exposes other exports as properties', function(assert) {
  this.render(hbs`{{pod-styles-js}}`);

  assert.ok(this.$('p').hasClass(paragraph));
});

test('it strips whitespacing', function(assert) {
  assert.equal(
    emotion.registered[excessiveWhitespaceClass],
    'background-color:grey;padding:1em;'
  );
});
