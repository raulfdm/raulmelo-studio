#!/usr/bin/env bash

echo "┏━━━ 🧹+ Full Clean: remove all node_modules and reinstall deps  ━━━━━━━"

yarn lerna clean -y
rm -rf node_modules
yarn