import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | emotion-class', function(hooks) {
  setupRenderingTest(hooks);

  skip('it throws an error if the emotion styles are not defined', function(assert) {
    assert.expectAssertion(async () => {
      await render(hbs`{{emotion-class 'foo'}}`);
    }, 'Missing styles lookup object');
  });

  skip('it throws an error if the emotion class name is not provided', function(assert) {
    assert.expectAssertion(async () => {
      await render(hbs`{{emotion-class}}`);
    }, 'A class name must be provided');
  });

  test('it can look up a class name from the emotion classes on the context', async function(assert) {
    this.set('__emotion__styles__', {
      foo: 'bar'
    });

    await render(hbs`{{emotion-class 'foo'}}`);

    assert.equal(
      this.$()
        .text()
        .trim(),
      'bar'
    );
  });
});
