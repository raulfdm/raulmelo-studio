#!/usr/bin/env bash

# Remove dist folder
./scripts/clean.sh

# Build itself
NODE_OPTIONS=--experimental-json-modules ./scripts/build/build.js $@

#generate .d.ts files
yarn tsc
