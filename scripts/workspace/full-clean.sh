#!/usr/bin/env bash

echo "┏━━━ 🧹+ Full clean: remove node_modules and reinstall  ━━━━━━━"

rm -rf node_modules
yarn install
