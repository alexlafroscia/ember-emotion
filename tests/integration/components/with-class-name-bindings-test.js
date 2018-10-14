import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import * as allStyles from 'dummy/components/with-class-name-bindings/style';

module('Integration | Component | with class name bindings', function(hooks) {
  setupRenderingTest(hooks);

  test('it does not break compatibility with class name bindings', async function(assert) {
    this.set('enabled', false);

    await render(hbs`
      {{with-class-name-bindings data-test-component='' enabled=enabled}}
    `);

    assert
      .dom('[data-test-component]')
      .hasClass(allStyles.default, 'Has the default exported class');
    assert
      .dom('[data-test-component]')
      .doesNotHaveClass('enabled', 'Does not have the bound class');

    this.set('enabled', true);

    assert
      .dom('[data-test-component]')
      .hasClass('enabled', 'Has the bound class');
  });
});
