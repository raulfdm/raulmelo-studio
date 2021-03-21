#!/usr/bin/env bash

echo "┏━━━ 🚢 Release: lerna publish packages  ━━━━━━━"

yarn lerna publish --conventional-commits --no-private -y