#!/usr/bin/env bash

echo "┏━━━ 🚢 Release: lerna publish packages  ━━━━━━━"

# Setup git globals
export GIT_AUTHOR_NAME="Raul Melo"
export GIT_AUTHOR_EMAIL="melo.raulf@gmail.com"

lerna exec --concurrency 1 --scope='{mdx-prism-2,@raulfdm/blog-components,@raulfdm/blog-tailwind-preset}' -- semantic-release -e semantic-release-monorepo --tag-format='${LERNA_PACKAGE_NAME}-v\${version}'
