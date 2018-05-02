import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import * as allStyles from 'dummy/components/with-class-name-bindings/style';

module('Integration | Component | with class name bindings', function(hooks) {
  setupRenderingTest(hooks);

  test('it does not break compatibility with class name bindings', async function(assert) {
    this.set('enabled', false);

    await render(hbs`{{with-class-name-bindings enabled=enabled}}`);

    assert.ok(
      this.$('div').hasClass(allStyles.default),
      'Has the default exported class'
    );
    assert.notOk(
      this.$('div').hasClass('enabled'),
      'Does not have the bound class'
    );

    this.set('enabled', true);

    assert.ok(this.$('div').hasClass('enabled'), 'Has the bound class');
  });
});
