#!/usr/bin/env bash

echo "Build..."

export API_ENDPOINT=https://raulmelo-dev-server.herokuapp.com

node ./scripts/fetchSiteData.js
# pnpm run generateRss
pnpm svelte-kit build