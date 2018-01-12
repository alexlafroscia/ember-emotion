import Component from '@ember/component';
import Controller from '@ember/controller';
import InjectStyles from 'ember-emotion/mixins/inject-styles';

Component.reopen(InjectStyles);
Controller.reopen(InjectStyles);
