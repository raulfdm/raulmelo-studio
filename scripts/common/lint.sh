#!/usr/bin/env bash

echo "LINTING..."
yarn eslint . --ext ts,js,tsx,jsx --resolve-plugins-relative-to .