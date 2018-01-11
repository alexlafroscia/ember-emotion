import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { css } from 'emotion';

moduleForComponent('css', 'Integration | Helper | css', {
  integration: true
});

test('it produces a class name from the named params', function(assert) {
  this.render(hbs`
    <p class={{css color='red'}}>
      This text should be red
    </p>
  `);

  assert.equal(this.$('p').css('color'), 'rgb(255, 0, 0)');
});

test('it can compose multiple positional params', function(assert) {
  this.set('firstEmotionClass', css`
    color: red;
  `);
  this.set('secondEmotionClass', css`
    background: blue;
  `);

  this.render(hbs`
    <p class={{css firstEmotionClass secondEmotionClass}}>
      This text should be red
    </p>
  `);

  assert.equal(this.$('p').css('color'), 'rgb(255, 0, 0)');
  assert.equal(this.$('p').css('backgroundColor'), 'rgb(0, 0, 255)');
});
