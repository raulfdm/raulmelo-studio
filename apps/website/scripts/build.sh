#!/usr/bin/env bash

echo "Building website with NextJS"

export API_ENDPOINT=https://raulmelo-dev-server.herokuapp.com

node ./scripts/fetchSiteData.mjs
pnpm run generateRss
pnpm next build