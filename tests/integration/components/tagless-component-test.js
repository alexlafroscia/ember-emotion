import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import * as allStyles from 'dummy/components/tagless-component/style';

module('Integration | Component | tagless component', function(hooks) {
  setupRenderingTest(hooks);

  test('it can work with a tagless component', async function(assert) {
    await render(hbs`{{tagless-component}}`);

    assert.ok(this.$('p').hasClass(allStyles.blue));
  });
});
