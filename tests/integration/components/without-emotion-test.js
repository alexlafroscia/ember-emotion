import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

import { initialize } from 'ember-emotion/initializers/apply-emotion';

moduleForComponent('without-emotion', 'Integration | Component | component without emotion', {
  integration: true,
  setup() {
    initialize();
  }
});

test('it does not blow up when there are no emotion styles for the component', function(assert) {
  assert.expect(0);

  this.render(hbs`{{without-emotion}}`);
});
