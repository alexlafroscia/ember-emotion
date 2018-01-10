import Component from '@ember/component';
import layout from '../templates/components/emotion-styled-component';
import { css } from 'emotion';

const emotionStyleClass = css`
  color: red;
`;

export default Component.extend({
  classNames: [emotionStyleClass],
  layout
});
