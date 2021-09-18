#!/usr/bin/env bash

echo "┏━━━ 🍳 Prepare: bootstrap and husky  ━━━━━━━"

# Attempt to solve lerna not installing all deps
## https://github.com/lerna/lerna/issues/1457#issuecomment-812889752
NODE_ENV=development yarn lerna bootstrap
husky install
yarn lerna run prepare --stream --concurrency=5 $@