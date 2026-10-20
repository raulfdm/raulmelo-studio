# New website

From the repository root, install the pinned Bun and pnpm versions with `mise install`,
then run `pnpm install --frozen-lockfile`.

```sh
pnpm --filter astro-latest dev
pnpm --filter astro-latest build
pnpm --filter astro-latest test
```

Run the end-to-end tests with `bun run --bun turbo test:e2e` after installing the
Playwright browsers with `bun run --bun --cwd website-new playwright install --with-deps`.
