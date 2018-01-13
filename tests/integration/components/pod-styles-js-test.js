import emotion from 'emotion';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

import * as allStyles from 'dummy/components/pod-styles-js/styles';

const {
  default: componentClassName,
  paragraph,
  excessiveWhitespaceClass
} = allStyles;

moduleForComponent('pod-styles-js', 'Integration | Component | pod styles', {
  integration: true
});

test('it sets the default exported class on the root element', function(assert) {
  this.render(hbs`{{pod-styles-js classNames='foobar'}}`);

  assert.ok(
    this.$('div').hasClass(componentClassName),
    'It has the default exported class'
  );
  assert.ok(
    this.$('div').hasClass('foobar'),
    'It has class set from the properties'
  );
});

test('it exposes other exports as properties', function(assert) {
  this.render(hbs`{{pod-styles-js}}`);

  assert.ok(this.$('p').hasClass(paragraph));
});

test('it injects the styles into the registry after the initial lookup', function(assert) {
  this.render(hbs`{{pod-styles-js}}`);

  const registeredStylesClass = this.registry.resolve(
    'emotion-style:component__pod-styles-js'
  );

  assert.deepEqual(registeredStylesClass, allStyles);
});

test('it strips whitespacing', function(assert) {
  assert.equal(
    emotion.registered[excessiveWhitespaceClass],
    'background-color:grey;padding:1em;'
  );
});
