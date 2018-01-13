import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  classNameBindings: ['enabled'],

  layout,

  enabled: true
});
