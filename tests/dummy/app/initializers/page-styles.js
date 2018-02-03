import { injectGlobal } from 'emotion';
import { black } from '../styles/theme';

export function initialize() {
  injectGlobal`
    html,
    body {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    }

    body {
      background-color: ${black};
      margin: 0;
      padding: 0;
    }
  `;
}

export default {
  initialize
};
