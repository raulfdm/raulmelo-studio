#!/usr/bin/env bash

echo "Build..."

export API_ENDPOINT=https://raulmelo-dev-server.herokuapp.com

node ./scripts/fetchSiteData.mjs
yarn generateRss
yarn next build