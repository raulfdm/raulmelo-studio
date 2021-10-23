# Raul Melo - Studio

> A monorepo with a collection of packages and apps

|                                                                                Pipeline Status                                                                                |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [![CMS](https://github.com/raulfdm/raulmelo-studio/actions/workflows/cms-deploy.yml/badge.svg)](https://github.com/raulfdm/raulmelo-studio/actions/workflows/cms-deploy.yml)  |
|  [![Website](https://github.com/raulfdm/raulmelo-studio/actions/workflows/website.yml/badge.svg)](https://github.com/raulfdm/raulmelo-studio/actions/workflows/website.yml)   |
|  [![Lambdas](https://github.com/raulfdm/raulmelo-studio/actions/workflows/lambdas.yml/badge.svg)](https://github.com/raulfdm/raulmelo-studio/actions/workflows/lambdas.yml)   |
| [![Packages](https://github.com/raulfdm/raulmelo-studio/actions/workflows/packages.yml/badge.svg)](https://github.com/raulfdm/raulmelo-studio/actions/workflows/packages.yml) |

## Technologies

Each project/package uses different technologies because they have different purposes.

For the root level I'm using:

- [pnpm + pnp workspaces](https://pnpm.io/) - Maintain this Monorepo
- [TypeScript](https://www.typescriptlang.org/) - core programming language
- [scripty](https://www.npmjs.com/package/scripty) - Run npm scripts with bash files
- [Babel](https://babeljs.io/) - Parse and bundle together with TSC
- [commitlint](https://commitlint.js.org/#/) - Ensure commit consistency

## Structure

I've decided to divide this project into 2 types of projects:

1. `apps`: anything I don't need to publish or use as a package
1. `packages`: npm packages and modules used cross packages and projects

## Scripts

I might need to run a specific workflow for each package/app. Doing that with npm script will be hard, I've introduced the package `scripty`.

This helper allows me to use an executable file (e.g. `bash` or `node exec`) to determine what needs to happen.

Then I have per package/app script which calls whatever they need in other to make it work (e.g. `nextjs cli`, `tsdx cli`, etc.). For some commands, they can refer to a common script (e.g. `lint` and `test`) in the root level script if they don't need to do anything special for these commands.

## Pipeline

Each project or group of project implements a specific pipeline via Github actions.

To prevent unnecessary builds, they also filter when it should happen using `on.paths` and sometimes ignoring specific branches (e.g. `not main`).

## LICENSE

[MIT](./LICENSE)
