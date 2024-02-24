# @raulmelo/eslint-config

> Eslint flat config

## Getting started

1. add `@raulmelo/eslint-config`
2. in your `eslint.config.js`, add the following:

```js
import * as path from 'node:path';
import * as url from 'node:url';

import createConfig from '@raulmelo/eslint-config';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  ...createConfig(__dirname),
  // other configs
];
```
