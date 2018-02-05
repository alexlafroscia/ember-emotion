# ember-emotion

> Use [emotion][emotion] in Ember.js

[![Build Status](https://travis-ci.org/alexlafroscia/ember-emotion.svg?branch=master)](https://travis-ci.org/alexlafroscia/ember-emotion)
[![Ember Observer Score](https://emberobserver.com/badges/ember-emotion.svg)](https://emberobserver.com/addons/ember-emotion)
[![npm version](https://badge.fury.io/js/ember-emotion.svg)](https://www.npmjs.com/package/ember-emotion)
![Ember Version](https://embadge.io/v1/badge.svg?start=2.12.0)

This addon

- 👩‍🎤 Exposes `emotion` as a module that can be imported in Ember
- 📦 Adds the ability to define styles scoped to a pod
- 🚀 Supports FastBoot out-of-the-box
- ⚡️ Allows for dynamically defining CSS values

## Installation

```bash
ember install ember-emotion
```

Make sure that the changes to your `resolver.js` file were applied; your resolver must include the [provided mixin](blueprints/ember-emotion/files/app/resolver.js)

## Usage

To start using `ember-emotion`, add a `style.js` file within a `Component` or `Controller` pod. Each named export can be accessed through the `emotion-class` helper in the pod's template. The default export, for `Component` pods, is merged into the `classNames` property automatically

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

```handlebars
{{! components/foo-bar/template.hbs }}
The component background will be grey.
<p class={{emotion-class 'paragraph'}}>
  Just this text will be blue.
</p>
```

## Advanced Usage

<details>
  <summary>Dynamically defining CSS</summary>

  Often times you want to define style based on the state of your component. `ember-emotion` provides tools for pulling in that state and using it to define your CSS dynamically.

  As a quick example, image you have an input component that should have black text normally, but should turn red when there's an error.  Here's what the CSS definition for that component might look like:

  ```javascript
  import { computed } from 'ember-emotion';

  export default text = computed('hasError')`
    color: ${ctx => ctx.get('hasError') ? 'red' : 'black'}
  `;
  ```

  By using the `computed` function to define your CSS block, two features are unlocked. Arguments passed to `computed` (like `hasError` above) are dependent keys just like in an Ember computed property definition. Functions embedded in the CSS definition are passed the context of the component as the first argument, so you can base your CSS off of the state. In the example above, any time `hasError` changes, the function will be called again and `red` or `black` will be set as the text color accordingly. This provides an alternative to the "normal" approach of doing this logic in the template to define different classes manually based on the state. Instead, you can allow Ember and Emotion to do that logic for you.

  If the state you care about is present initially and will never change, you can also just use the `computed` function as a template tag directly and define no dependent keys, like so:

  ```javascript
  import { computed } from 'ember-emotion';

  export default computed`
    padding: ${ctx => ctx.get('paddingAmount')}
  `;
  ```

  Note that this will not be re-computed should `paddingAmount` be changed.
</details>

<details>
  <summary>FastBoot Support</summary>
  FastBoot is supported out-of-the-box with no additional work required from you as the user. The initial CSS definition will be computed on the server, and the styles required for that initial paint injected into the HTML payload sent to the browser. Those initial values will also be hydrated into `emotion` before the first render, which will avoid those classes from being defined a second time by `emotion` when the first paint happens in the browser.
</details>

<details>
  <summary>Global styles</summary>
  Although an anti-pattern, it's sometimes useful to inject global styles, such as removing default styling from `body` or `html`. `emotion` provides the `injectGlobal` function for this, but for it to work with FastBoot it must be called at the right time.

  To make this easier, this addon provides a `global-styles` blueprint that can be used to generate the appropriate instance initializer. You can run:

  ```bash
  ember generate global-styles __name__of__initializer__
  ```

  where `__name__of__initializer__` would be replaced by whatever you want to call this file, and you'll get an initializer pre-configured to execute at the right time. You can simply add to the `injectGlobals` usage provided there and everything else will be taken care of.
</details>

## Configuration Options

Configuration options can be provided in the `ember-cli-build.js` file.

Example:

```javascript
/* ember-cli-build.js */
const app = new EmberApp(defaults, {
  emotion: {
    injectMixin: true, // Enabled by default
    babel: {
      // See `babel-plugin-emotion` for options
    }
  }
});
```

<details>
  <summary>`injectMixin`</summary>
  By default, the mixin is injected into all `Component` and `Controller` objects. However, if you'd rather inject it manually into just the classes that need it, you can disable the automatic injection with the `injectMixin` property

  Defaults to `true`
</details>

<details>
  <summary>`babel`</summary>
  Many additional features are supported, optionally, via [babel-plugin-emotion][babel-plugin-emotion]. By default, the default configuration is applied, which simply strips out unnecessary whitespace from CSS definitions.

  See the documentation for that package for details more.
</details>

## Caveats

- You _must_ have a `component.js` or `controller.js` file in your pod for the `emotion` styles to work, even if it just re-exports the default implementation
- Even if it's empty, you must leave your `app.css` file in place (for now). The build will break without it.

[emotion]: https://github.com/emotion-js/emotion
[emotion-object-styles]: https://emotion.sh/docs/object-styles
[babel-plugin-emotion]: https://github.com/emotion-js/emotion/tree/master/packages/babel-plugin-emotion
