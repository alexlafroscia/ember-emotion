import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const red = 'rgb(255, 0, 0)';

moduleForComponent(
  'computed-styles',
  'Integration | Component | computed styles',
  {
    integration: true
  }
);

test('it can compute a CSS definition without a dependent key', function(assert) {
  this.render(hbs`{{computed-styles color='blue'}}`);

  assert.equal(
    this.$('p').css('border-color'),
    red,
    'paragraph has the computed border color'
  );
});

test('it can compute a CSS definition with a dependent key', function(assert) {
  this.set('color', 'blue');
  this.render(hbs`{{computed-styles color=color}}`);

  assert.equal(
    this.$('p').css('color'),
    'rgb(0, 0, 255)',
    'paragraph is initially blue'
  );

  this.set('color', 'red');

  assert.equal(
    this.$('p').css('color'),
    red,
    'css updates with the dependent property'
  );
});
