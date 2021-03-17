#!/usr/bin/env bash

echo "Build..."

export NODE_ICU_DATA=./node_modules/full-icu
export API_ENDPOINT=https://raulmelo-dev-server.herokuapp.com

yarn next build