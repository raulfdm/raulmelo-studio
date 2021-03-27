#!/usr/bin/env bash

echo "┏━━━ 🧹+ Full clean: remove node_modules and reinstall  ━━━━━━━"

yarn lerna clean -y
rm -rf node_modules
yarn install