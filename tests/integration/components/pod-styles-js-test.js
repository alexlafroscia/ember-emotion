import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import emotion from 'emotion';

import * as allStyles from 'dummy/components/pod-styles-js/style';

const {
  default: componentClassName,
  paragraph,
  excessiveWhitespaceClass
} = allStyles;

module('Integration | Component | pod styles', function(hooks) {
  setupRenderingTest(hooks);

  test('it sets the default exported class on the root element', async function(assert) {
    await render(hbs`
      {{pod-styles-js data-test-element='' classNames='foobar'}}
    `);

    assert
      .dom('[data-test-element]')
      .hasClass(componentClassName, 'It has the default exported class');
    assert
      .dom('[data-test-element]')
      .hasClass('foobar', 'It has class set from the properties');
  });

  test('it exposes other exports as properties', async function(assert) {
    await render(hbs`{{pod-styles-js}}`);

    assert.dom('p').hasClass(paragraph);
  });

  test('it strips whitespacing', function(assert) {
    assert.equal(
      emotion.cache.registered[excessiveWhitespaceClass],
      'background-color:grey;padding:1em;label:excessiveWhitespaceClass;'
    );
  });
});
