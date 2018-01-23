// components/code-example/styles.js
import { css } from 'emotion';
import { blue, orange } from '../../style/theme';

const spacer = '0.5em';

export default css`
  border-radius: 2px;
  position: relative;

  .hljs {
    background: white;
    padding: ${spacer};
    margin: ${spacer} 0 0 0;
  }

  .hljs-string {
    color: ${orange};
  }

  .hljs-number {
    color: ${blue};
  }
`;

export const banner = css`
  background-color: ${orange};
  color: white;
  padding: 0.2em ${spacer};
  position: absolute;
  right: 0;
`;
