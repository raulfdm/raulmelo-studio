#!/usr/bin/env bash

echo "Build..."

API_ENDPOINT=https://raulmelo-dev-server.herokuapp.com

node ./scripts/fetchConfig.js
yarn next build