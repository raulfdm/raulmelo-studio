#!/usr/bin/env bash

echo "Linting"
./scripts/prettify.sh --check && \
eslint --ignore-path .gitignore .