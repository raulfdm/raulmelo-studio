#!/usr/bin/env bash

echo "┏━━━ 🧪 Test: yarn test  ━━━━━━━"

yarn lerna run test --stream --concurrency=5 $1