#!/usr/bin/env bash

echo "┏━━━ 🚢 Deploy: yarn deploy  ━━━━━━━"

yarn lerna run deploy --stream --concurrency=5 $1