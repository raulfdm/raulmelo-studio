# Raul Melo - Studio

> A monorepo for handling my website infra

## Development setup

Install [mise](https://mise.jdx.dev/), then run these commands from the repository root:

```sh
mise install
mise exec -- pnpm install --frozen-lockfile
mise exec -- pnpm dev
```

`mise.toml` pins Node.js, pnpm, and Bun for local development, CI, and Docker builds.
The root `packageManager` field remains for tools such as Turbo that inspect it;
update it alongside the pnpm version in `mise.toml`.

| CI/CD                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![CI](https://github.com/raulfdm/raulmelo-studio/actions/workflows/ci.yaml/badge.svg?branch=main)](https://github.com/raulfdm/raulmelo-studio/actions/workflows/ci.yaml)   |
| [![Playwright Tests](https://github.com/raulfdm/raulmelo-studio/actions/workflows/e2e.yml/badge.svg)](https://github.com/raulfdm/raulmelo-studio/actions/workflows/e2e.yml) |

## Website

Access [raulmelo.me](https://www.raulmelo.me).

## LICENSE

[MIT](./LICENSE)
