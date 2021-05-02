#!/usr/bin/env bash

echo "┏━━━ 🚢 Release: lerna publish packages  ━━━━━━━"

# Setup git globals
export GIT_AUTHOR_NAME="Raul Melo"
export GIT_AUTHOR_EMAIL="melo.raulf@gmail.com"
# This prevents semantic release being stuck forever
# https://github.com/semantic-release/git/issues/154#issuecomment-524676502
export HUSKY_SKIP_HOOKS=1

# lerna exec --concurrency 1 --scope=mdx-prism-2 -- semantic-release -e semantic-release-monorepo --tag-format='${LERNA_PACKAGE_NAME}@\${version}'
yarn lerna publish --conventional-commits --no-private -y
