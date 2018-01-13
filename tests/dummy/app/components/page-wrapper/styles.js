import { css } from 'emotion';
import { black, blue, pink } from '../../style/theme';

export default css`
  background: linear-gradient(to bottom, ${blue} 0%, ${pink} 100%);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 16px;
`;

export const blackBackground = css`
  background-color: ${black};
  flex-grow: 1;
  padding: 16px;
`;
