# `@raulmelo/styles`

> Concentrate styles like globals, tailwind and postcss configs.

## Usage

### PostCSS

Different applications could have different ways of declaring postcss config. To cover that, I've added 2 configs: with flat object shape and with the required modules:

```js
// postcss.config.js

const {
  configuredConfig,
  flatConfig,
} = require('@raulmelo/styles/lib/postcss.config');

module.exports = configuredConfig;
// or
// module.exports = flatConfig
```

## Tailwind configuration

Tailwind supports presets so all you need to do is import and set it as preset:

```js
// tailwind.config.js

module.exports = {
  presets: [require('@raulmelo/styles/lib/tailwind.config')],
  //... overrides like
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,tsx}'],
  // ... etc
};
```
