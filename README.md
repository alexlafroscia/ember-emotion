# ember-emotion

> Use [emotion][emotion] in Ember.js

[![Build Status](https://travis-ci.org/alexlafroscia/ember-emotion.svg?branch=master)](https://travis-ci.org/alexlafroscia/ember-emotion)
[![Ember Observer Score](https://emberobserver.com/badges/ember-emotion.svg)](https://emberobserver.com/addons/ember-emotion)
[![npm version](https://badge.fury.io/js/ember-emotion.svg)](https://www.npmjs.com/package/ember-emotion)
![Ember Version](https://embadge.io/v1/badge.svg?start=2.12.0)

This addon

- Exposes `emotion` as a module that can be imported in Ember
- Adds the ability to define a file of scoped styles for pod components
- Provides some template helpers for working with `emotion`

## Installation

```bash
ember install ember-emotion
```

Make sure that the changes to your `resolver.js` file were applied; your resolver must include the [provided mixin](blueprints/ember-emotion/files/app/resolver.js)

## Usage

The basic way to use `ember-emotion` is to define a `styles.js` file within a `Component` or `Controller` pod.

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

If the module has a default export, that class will be applied to the root element of the component (for a controller, this is ignored).

All other exported classes can be access through the `emotion-class` helper in the template for the pod.

```hbs
{{!-- components/foo-bar/template.hbs
      The background of the whole component be grey,
      because of the default export above --}}
<p class={{emotion-class 'paragraph'}}>
  This text will be blue
</p>
```

For more usage information, [check out the wiki](https://github.com/alexlafroscia/ember-emotion/wiki).

## Configuration Options

### `injectMixin` (default: `true`)

By default, the mixin is injected into all `Component` and `Controller` objects. However, if you'd rather inject it manually into just the classes that need it, you can disable the automatic injection with the `injectMixin` property

### `babel` (default: see `babel-plugin-emotion` docs)

Many additional features are supported, optionally, via [babel-plugin-emotion][babel-plugin-emotion].  By default, all options are disabled with exception to whitespace trimming (default).

## Example configuration

Example configuration (equivalent to the default):

```js
/* ember-cli-build.js */
let app = new EmberApp(defaults, {
  emotion: {
    injectMixin: true,
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

## Caveats

- You _must_ have a `component.js` or `controller.js` file in your pod for the `emotion` styles to work, even if it just re-exports the default implementation

[emotion]: https://github.com/emotion-js/emotion
[emotion-object-styles]: https://emotion.sh/docs/object-styles
[babel-plugin-emotion]: https://github.com/emotion-js/emotion/tree/master/packages/babel-plugin-emotion
