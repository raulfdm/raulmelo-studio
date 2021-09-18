#!/usr/bin/env bash

echo "┏━━━ 🧹 Clean: yarn clean  ━━━━━━━"

yarn lerna run clean --stream --concurrency=5 $@