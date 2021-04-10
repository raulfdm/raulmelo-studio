#!/usr/bin/env bash

echo "┏━━━ 🚢 Release: lerna publish packages  ━━━━━━━"

# Setup git globals
export GIT_AUTHOR_NAME="Raul Melo"
export GIT_AUTHOR_EMAIL="melo.raulf@gmail.com"

yarn workspaces run semantic-release -e semantic-release-monorepo
