#!/usr/bin/env bash

echo "┏━━━ 🍳 Prepare: bootstrap and husky  ━━━━━━━"

yarn lerna bootstrap
husky install