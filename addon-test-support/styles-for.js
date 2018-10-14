import { find } from '@ember/test-helpers';

const { getComputedStyle } = window;

export default async function stylesFor(selector) {
  const element = await find(selector);

  return getComputedStyle(element);
}
