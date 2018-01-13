import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import * as allStyles from 'dummy/components/with-class-name-bindings/styles';

moduleForComponent(
  'with-class-name-bindings',
  'Integration | Component | with class name bindings',
  {
    integration: true
  }
);

test('it does not break compatibility with class name bindings', function(assert) {
  this.set('enabled', false);

  this.render(hbs`{{with-class-name-bindings enabled=enabled}}`);

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
