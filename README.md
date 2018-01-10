# ember-emotion

> Use [emotion][emotion] styling in Ember.js

[![npm version](https://badge.fury.io/js/ember-emotion.svg)](https://www.npmjs.com/package/ember-emotion)

This addon

- Exposes `emotion` as a module that can be imported in Ember
- Adds the ability to define a file of scoped styles for pod components

## Installation

```bash
ember install ember-emotion
# or
yarn add -D ember-emotion
# or
npm install --save-dev ember-emotion
```

## Usage

There are two ways to use `emotion` in Ember:

### Pod Styles

If you define a `style.js` within a component pod, each exported class is made available to the template. The default export is applied to the base element, and the rest become properties on the component so they can be used to dynamically set class names.

```javascript
// components/foo-bar/component.js
import { css } from 'emotion';

const baseElementClass = css`
  background: grey;
`;

export default baseElementClass;
export const paragraphClass = css`
  color: blue;
`;
```

```hbs
{{!-- components/foo-bar/styles.js
      The background of the whole component be grey,
      because of the default export above }}
<p class={{paragraphClass}}>
  This text will be blue
</p>
```

### Just the base element

If you just want to generate a class to apply to the base element of your class, you can import `emotion` directly to create it

```javascript
import Component from '@ember/component';
import { css } from 'emotion';

const generatedClassName = css`
  color: red;
`;

export default Component.extend({
  classNames: [generatedClassName];
});
```

## Notes

- If you need the `emotion` styles to be applied during an integration test, be sure to import the initializer function and run it
- You can always generate multiple `emotion` class names in the `component.js` and set them manually as properties if you don't want to manage a separate `styles.js` file

[emotion]: https://github.com/emotion-js/emotion
