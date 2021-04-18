#!/usr/bin/env bash

echo "Dev server..."

export NODE_OPTIONS='--inspect'

node ./scripts/fetchConfig.js
yarn next