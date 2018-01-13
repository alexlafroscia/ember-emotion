// components/code-example/styles.js
import { css } from 'emotion';
import { orange } from '../../style/theme';

const spacer = '0.5em';

export default css`
  border-radius: 2px;
  position: relative;

  .hljs {
    background: white;
    padding: ${spacer};
    margin: ${spacer} 0 0 0;
  }
`;

export const banner = css`
  background-color: ${orange};
  padding: 0.1em ${spacer};
  position: absolute;
  right: 0;
`;
