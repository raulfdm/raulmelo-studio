#!/usr/bin/env bash

echo "Building website with NextJS"

node ./scripts/fetchSiteData.mjs
pnpm run generateRss
pnpm next build