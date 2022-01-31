# @raulmelo/ui

## Getting started

1. Install both styles and ui:

```json
{
  "devDependencies": {
    "@raulmelo/styles": "workspace:*",
    "@raulmelo/ui": "workspace:*"
  }
}
```

2. Import the CSS files:

```ts
import '@raulmelo/styles/lib/all.css';
import '@raulmelo/ui/dist/style.css';
```

3. Import the component you want to use:

```tsx
import {Button} '@raulmelo/ui';
```

## Development

### Storybook

Since it's a component package, it makes sense having an isolated environment to see them, that's where Storybook comes in.

To run storybook development you have to run:

```sh
pnpm run storybook --filter ui
```

### Watch mode

If you want to see the package linked in a project, you can open another terminal tab and run:

```sh
pnpm run build:watch --filter ui
```

This will stay listening for changes to rebuild.

### Build

For a simple build you may run the command `build`:

```sh
pnpm run build --filter ui
```

This will create a commonJS, ESModules, types, and styles assets at `./dist` folder.
