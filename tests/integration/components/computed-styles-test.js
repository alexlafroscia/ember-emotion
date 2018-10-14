import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { stylesFor } from 'ember-emotion/test-support';
import hbs from 'htmlbars-inline-precompile';

const red = 'rgb(255, 0, 0)';

module('Integration | Component | computed styles', function(hooks) {
  setupRenderingTest(hooks);

  test('it can compute a CSS definition without a dependent key', async function(assert) {
    await render(hbs`{{computed-styles color='blue'}}`);

    const style = await stylesFor('p');

    assert.equal(
      style['border-color'],
      red,
      'paragraph has the computed border color'
    );
  });

  test('it can compute a CSS definition with a dependent key', async function(assert) {
    this.set('color', 'blue');

    await render(hbs`
      {{computed-styles color=color size='1000'}}
    `);

    const style = await stylesFor('p');

    assert.equal(
      style['color'],
      'rgb(0, 0, 255)',
      'paragraph is initially blue'
    );
    assert.equal(
      style['font-size'],
      '1000px',
      'header has the right font size'
    );

    this.set('color', 'red');

    assert.equal(
      style['color'],
      red,
      'css updates with the dependent property'
    );
  });
});
