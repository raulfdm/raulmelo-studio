#!/usr/bin/env bash

export NODE_OPTIONS=--experimental-json-modules
./scripts/clean.sh
./scripts/dev/dev.js $@
