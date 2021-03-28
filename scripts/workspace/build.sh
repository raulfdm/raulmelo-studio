#!/usr/bin/env bash

echo "┏━━━ 📦 Build: yarn build  ━━━━━━━"

yarn lerna run build --stream --concurrency=5 --include-dependencies $1