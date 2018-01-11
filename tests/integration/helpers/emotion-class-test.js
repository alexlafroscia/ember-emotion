import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('emotion-class', 'Integration | Helper | emotion-class', {
  integration: true
});

test('it throws an error if the emotion styles are not defined', function(assert) {
  assert.expectAssertion(() => {
    this.render(hbs`{{emotion-class 'foo'}}`);
  }, 'Missing styles lookup object');
});

test('it throws an error if the emotion class name is not provided', function(assert) {
  assert.expectAssertion(() => {
    this.render(hbs`{{emotion-class}}`);
  }, 'A class name must be provided');
});

test('it can look up a class name from the emotion classes on the context', function(assert) {
  this.set('__emotion__styles__', {
    foo: 'bar'
  });

  this.render(hbs`{{emotion-class 'foo'}}`);

  assert.equal(
    this.$()
      .text()
      .trim(),
    'bar'
  );
});
