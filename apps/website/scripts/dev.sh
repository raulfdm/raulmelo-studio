#!/usr/bin/env bash

echo "Dev server..."

pnpm run typegen && \
pnpm run fetchSiteData && \
pnpm next $@