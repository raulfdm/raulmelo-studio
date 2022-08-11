#!/usr/bin/env bash

echo "Building website with NextJS"

node ./scripts/fetchSiteData.mjs && \
pnpm run generateRss && \
pnpm run typegen && \
pnpm next build && \
pnpm next-sitemap --config next-sitemap.config.mjs