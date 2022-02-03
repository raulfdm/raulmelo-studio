# @raulmelo/core

This package is responsible to holding the core logic for my website which includes:

- data fetching (e.g. posts, tags, tils, etc.)
- basic utilities function (e.g. isNil, head, etc)

## Data Fetching

The api endpoint is consumed from environment variable `API_ENDPOINT`:

```js
process.env.API_ENDPOINT;
```

For external injection, you can populate the `window`/`global` (or easily via `globalThis`) object with a variable called `__API_ENDPOINT__`:

```js
globalThis.__API_ENDPOINT__ = process.env.ANOTHER_API_ENDPOINT;
```

> It'll always fallback to localhost.
