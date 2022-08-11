#!/usr/bin/env bash

echo "Dev server..."

pnpm run typegen && \
node ./scripts/fetchSiteData.mjs && \
pnpm next $@