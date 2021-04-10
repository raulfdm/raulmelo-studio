#!/usr/bin/env bash

echo "┏━━━ 🚢 Release: lerna publish packages  ━━━━━━━"

# Setup git globals
git config --global user.email "melo.raulf@gmail.com"
git config --global user.name "Raul Melo"

yarn lerna publish --no-git-reset --conventional-commits --no-private -y