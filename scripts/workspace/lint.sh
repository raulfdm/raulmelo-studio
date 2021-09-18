#!/usr/bin/env bash

echo "┏━━━ 🕵️ Lint: yarn lint  ━━━━━━━"

yarn lerna run lint --stream --concurrency=5 $@