#!/usr/bin/env bash

# Remove dist folder
./scripts/clean.sh

# Build itself
./scripts/build/build.js $@

#generate .d.ts files
yarn tsc
