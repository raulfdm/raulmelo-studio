#!/usr/bin/env bash

echo "Build..."

export API_ENDPOINT=https://raulmelo-dev-server.herokuapp.com

yarn lerna link --force-local
yarn next build