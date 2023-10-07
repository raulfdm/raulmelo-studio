# Raul Melo - Studio

> A monorepo with a collection of packages and apps

|                                                                                                                                                                              Pipeline Status |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [![Fitness Buddy](https://github.com/raulfdm/raulmelo-studio/actions/workflows/fitness-buddy.yml/badge.svg)](https://github.com/raulfdm/raulmelo-studio/actions/workflows/fitness-buddy.yml) |
|                [![Packages](https://github.com/raulfdm/raulmelo-studio/actions/workflows/packages.yml/badge.svg)](https://github.com/raulfdm/raulmelo-studio/actions/workflows/packages.yml) |
|                   [![Website](https://github.com/raulfdm/raulmelo-studio/actions/workflows/website.yml/badge.svg)](https://github.com/raulfdm/raulmelo-studio/actions/workflows/website.yml) |

## Technologies

Each project/package uses different technologies because they have different purposes.

However, the core technologies here are:

- [TypeScript](https://www.typescriptlang.org/) - core programming language;
- [vitejs](https://vitejs.dev/) - for bundling packages;
- [TailwindCSS](https://tailwindcss.com/) - for styles;

## Structure

I've decided to divide this project into 2 types of projects:

1. `apps`: anything I don't need to publish or use as a package
1. `packages`: npm packages and modules used cross packages and projects

## Pipeline

Each project or group of project implements a specific pipeline via Github actions.

To prevent unnecessary builds, they also filter when it should happen using `on.paths` and sometimes ignoring specific branches (e.g. `not main`).

## LICENSE

[MIT](./LICENSE)
