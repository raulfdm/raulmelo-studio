# Raul Melo - Studio

## Commands

- build
- clean
- dev
- lint
- start
- test

<!--
Scripts to import projects
lerna import ../raulmelo-dev-server --dest=apps --flatten -y
lerna import ../raulmelo-dev-web --dest=apps --flatten -y
lerna import ../mdx-prism-2 --dest=packages --flatten -y
lerna import ../raulmelo-dev-components --dest=packages --flatten -y
 -->

## TODOS

- [ ] fix husky
- [ ] test publishing packages with verdaccio
- [ ] move some dependencies up in the root
- [ ] keep the same react, typescript, babel, version
- [x] update strapi by resolving missing packages
- [ ] add scripty
- [ ] Fix icu for next
- [ ] remove Prettier from subtv
- [ ] remove eslint from subtv

NPM SCRIPTS

- mdx-prism-2
  - [x] test
  - [x] lint
- blog-components
  - [x] lint
  - [ ] test
  - [x] build
  - [x] dev
  - [x] prepare
  - [x] size
  - [x] analyze
  - [x] storybook
  - [ ] buildstorybook
- lambdas
  - [x] build
  - [x] dev
  - [x] test
- server
  - [ ] build
  - [x] clean
  - [ ] dev
  - [x] start
- website
  - [ ] build
  - [ ] dev
  - [ ] lint
  - [ ] postbuild
  - [ ] start
  - [x] test
