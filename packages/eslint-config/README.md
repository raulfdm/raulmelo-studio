# @raulmelo/eslint-config

> Eslint flat config

## Getting started

1. add `@raulmelo/eslint-config`
2. in your `eslint.config.js`, add the following:

```js
import fullConfig from '@raulmelo/eslint-config/full';

export default [
  ...fullConfig,
  // other configs
];
```

In case you don't want to add everything, you could select what you want to have:

```js
import baseConfig from '@raulmelo/eslint-config/base';
import typeScriptConfig from '@raulmelo/eslint-config/typescript';

export default [...baseConfig, typeScriptConfig];
```
