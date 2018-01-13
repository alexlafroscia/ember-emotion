// components/code-example/component.js
import Controller from '@ember/component';
import { computed, get } from '@ember/object';

export default Controller.extend({
  fileType: computed('snippetName', function() {
    return get(this, 'snippetName').split('.')[1];
  })
});
