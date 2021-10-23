#!/usr/bin/env bash

echo "Dev server..."

node ./scripts/fetchSiteData.mjs
pnpm next $@