# ember-emotion

> Use [emotion][emotion] styling in Ember.js

[![Build Status](https://travis-ci.org/alexlafroscia/ember-emotion.svg?branch=master)](https://travis-ci.org/alexlafroscia/ember-emotion)
[![Ember Observer Score](https://emberobserver.com/badges/ember-emotion.svg)](https://emberobserver.com/addons/ember-emotion)
[![npm version](https://badge.fury.io/js/ember-emotion.svg)](https://www.npmjs.com/package/ember-emotion)
![Ember Version](https://embadge.io/v1/badge.svg?start=2.12.0)

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

There are a few ways to use `emotion` in Ember:

### Pod Styles

If you define a `styles.js` within a component pod, each exported class is made available to the template. The default export is applied to the base element, and the rest become properties on the component so they can be used to dynamically set class names.

```javascript
// components/foo-bar/styles.js
import { css } from 'emotion';

export default css`
  background: grey;
`;

export const paragraph = css`
  color: blue;
`;
```

```hbs
{{!-- components/foo-bar/template.hbs
      The background of the whole component be grey,
      because of the default export above --}}
<p class={{emotion-class 'paragraph'}}>
  This text will be blue
</p>
```

### `css` helper

A `css` helper is provided that can either create a class on the fly based on the properties passed to it, or compose a class name from those passed to the helper.

See the [`emotion` "object styles" documentation][emotion-object-styles] for more information.

```javascript
// components/foo-bar/styles.js
import { css } from 'emotion';

export const redText = css`
  color: red;
`;
export const blueBackground = css`
  background-color: blue;
`;
```

```hbs
{{! components/foo-bar/template.hbs }}
<p class={{css
    (emotion-class 'redText')
    (emotion-class 'blueBackground')
    border='1px solid black'
  }}
>
  This has red text, a blue background, and a solid black border
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

## Configure emotion's babel plugin

Many additional options are supported, optionally, via [babel-plugin-emotion][babel-plugin-emotion].  By default, all options are disabled with exception to whitespace trimming (default).

Example configuration:

```js
/* ember-cli-build.js */
let app = new EmberApp(defaults, {
  emotion: {
    babel: {
      hoist: false,
      sourceMap: false,
      autoLabel: false,
      extractStatic: false,
      importedNames: {
        styled: 'styled',
        css: 'css',
        keyframes: 'keyframes',
        injectGlobal: 'injectGlobal',
        merge: 'merge'
      }
    }
  }
});
```

## Notes

- You can always generate multiple `emotion` class names in the `component.js` and set them manually as properties if you don't want to manage a separate `styles.js` file

[emotion]: https://github.com/emotion-js/emotion
[emotion-object-styles]: https://emotion.sh/docs/object-styles
[babel-plugin-emotion]: https://github.com/emotion-js/emotion/tree/master/packages/babel-plugin-emotion
