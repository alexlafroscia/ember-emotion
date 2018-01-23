import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import * as allStyles from 'dummy/components/tagless-component/style';

moduleForComponent(
  'tagless-component',
  'Integration | Component | tagless component',
  {
    integration: true
  }
);

test('it can work with a tagless component', function(assert) {
  this.render(hbs`{{tagless-component}}`);

  assert.ok(this.$('p').hasClass(allStyles.blue));
});
