import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | component without emotion', function(hooks) {
  setupRenderingTest(hooks);

  test('it does not blow up when there are no emotion styles for the component', async function(assert) {
    assert.expect(0);

    await render(hbs`{{without-emotion}}`);
  });
});
