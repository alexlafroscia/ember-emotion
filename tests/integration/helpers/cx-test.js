import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { stylesFor } from 'ember-emotion/test-support';
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

    const styles = await stylesFor('p');

    assert.equal(styles['color'], 'rgb(255, 0, 0)');
    assert.equal(styles['background-color'], 'rgb(0, 0, 255)');
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

    const styles = await stylesFor('p');

    assert.equal(styles['color'], 'rgb(255, 0, 0)');
    assert.equal(styles['background-color'], 'rgb(0, 0, 255)');
  });
});
