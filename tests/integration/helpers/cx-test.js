import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { css } from 'emotion';

module('Integration | Helper | cx', function(hooks) {
  setupRenderingTest(hooks);

  test('it can compose multiple positional params', async function(assert) {
    this.set(
      'firstEmotionClass',
      css`
        color: red;
      `
    );
    this.set(
      'secondEmotionClass',
      css`
        background: blue;
      `
    );

    await render(hbs`
      <p class={{cx firstEmotionClass secondEmotionClass}}>
        This text should be red and the background should be blue
      </p>
    `);

    assert.equal(this.$('p').css('color'), 'rgb(255, 0, 0)');
    assert.equal(this.$('p').css('backgroundColor'), 'rgb(0, 0, 255)');
  });

  test('it works with the `emotion-class` helper', async function(assert) {
    this.set('__emotion__styles__', {
      foo: css`
        color: red;
      `,
      bar: css`
        background: blue;
      `
    });

    await render(hbs`
      <p class={{css (emotion-class 'foo') (emotion-class 'bar')}}>
        This text should be red
      </p>
    `);

    assert.equal(this.$('p').css('color'), 'rgb(255, 0, 0)');
    assert.equal(this.$('p').css('backgroundColor'), 'rgb(0, 0, 255)');
  });
});
