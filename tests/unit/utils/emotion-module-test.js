import { module, test } from 'qunit';
import { css } from 'emotion';

module('Unit | emotion module');

test('the `css` function is available', function(assert) {
  assert.ok(css);
});
