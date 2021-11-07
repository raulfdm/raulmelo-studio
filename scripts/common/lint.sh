#!/usr/bin/env bash

echo "Running ESLint"
pnpm eslint . --ext ts,js,tsx,jsx --resolve-plugins-relative-to . $@