# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 3.0.3 (2021-03-22)

**Note:** Version bump only for package mdx-prism-2





## 3.0.2 (2021-03-21)

**Note:** Version bump only for package mdx-prism-2





## 3.0.1 (2021-03-21)

**Note:** Version bump only for package mdx-prism-2





# 3.0.0 (2021-03-19)


### Bug Fixes

* entry file ([7d5ea45](https://github.com/raulfdm/mdx-prism-2/commit/7d5ea45c5bbcc90a9a8fd0fa0372464df9f08960))
* eslint ([b87ed80](https://github.com/raulfdm/mdx-prism-2/commit/b87ed80749750fc427c4f4c94fe7373bd40ed5f7))
* include all src files ([e87919d](https://github.com/raulfdm/mdx-prism-2/commit/e87919d33b88933690e7e1f449e83684b4d93718))


### chore

* **deps:** upgrade all dependencies to latest version ([7c1b319](https://github.com/raulfdm/mdx-prism-2/commit/7c1b31937777072393fef41b9157a31d76eb5f14))


### Features

* copy updated addMarker script ([d7b2e0a](https://github.com/raulfdm/mdx-prism-2/commit/d7b2e0adc665cd2a3e27bf91c107065572a55392))


### BREAKING CHANGES

* **deps:** Despite the tests are passing and works in existing application, some deps were very out to date.





# Changelog

## 0.3.1+fork.0.1.0

- Fork from @mapbox/rehype-prism
- Add markers following react-refractor example
- Add highlight line support following gatsby-remark-prismjs example

## 0.3.1

- Allow uppercase language names in the `language-*` class (e.g. `language-CSS`).

## 0.3.0

- Add `language-*` class to the `<pre>` tag of the output, because many Prism themes rely on this undocumented pattern.

## 0.2.0

- **Breaking:** Add `options.ignoreMissing` which defaults to `false`.
  If you are relying on *silent* failures to highlight when the language is not defined, you'll need to use this option.
- **Breaking:** Remove support for `nohighlight` and `no-highlight` classes.
  You can skip highlighting for any given `<code>` by *not* putting a `language-*` class on it.
- Under the hood, use [refractor](https://github.com/wooorm/refractor) instead of Parse5 and PrismJS directly.

## 0.1.0

- Initial release.
