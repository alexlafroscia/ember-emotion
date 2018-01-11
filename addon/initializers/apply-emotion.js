import Component from '@ember/component';
import InjectStyles from 'ember-emotion/mixins/inject-styles';

export function initialize() {
  Component.reopen(InjectStyles);
}

export default {
  initialize
};
