import { css } from 'emotion';
import { blue } from '../styles/theme';

export const wrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 800px;

  > *:not(:last-child) {
    margin-bottom: 24px;
  }
`;

export const icons = css`
  align-items: center;
  flex-direction: column;
  display: flex;
  justify-content: center;
  margin-top: 2em;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

export const emotionLogo = css`
  height: 100px;
`;

export const joiner = css`
  color: white;
  font-size: 50px;
  margin-top: -0.2em;
  padding-bottom: 0.2em;

  &:before {
    content: '+';
  }

  @media (min-width: 600px) {
    margin-top: 0;
    padding-bottom: 0;

    &:before {
      content: '\\2014';
    }
  }
`;

export const emberLogo = css`
  height: 100px;
`;

export const description = css`
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  color: white;
  font-size: 1.2em;
  margin: 0;
  padding: 1em;
  text-align: center;

  a,
  a:visited {
    color: ${blue};
  }

  code {
    font-size: 1em;
  }
`;
