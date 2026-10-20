# Raul Melo - Studio

> A monorepo for handling my website infra

## Development setup

Install [mise](https://mise.jdx.dev/), then [activate it in your shell](https://mise.jdx.dev/getting-started.html#activate-mise). For zsh, add `eval "$(mise activate zsh)"` to `~/.zshrc` and open a new terminal. From the repository root, run:

```sh
mise install
pnpm install --frozen-lockfile
pnpm dev
```

`mise.toml` pins pnpm and Bun for local development, CI, and Docker builds.
The repository's `node` command is a small compatibility wrapper that runs Bun
for dependency scripts that still invoke `node`. Development and build environments
do not install Node.js.
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
