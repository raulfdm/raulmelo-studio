#!/usr/bin/env bash

echo "Building website with NextJS"

pnpm run typegen && \
node ./scripts/fetchSiteData.mjs && \
pnpm run generateRss && \
pnpm next build && \
pnpm next-sitemap --config next-sitemap.config.mjs