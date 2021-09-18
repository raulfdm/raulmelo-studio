#!/usr/bin/env bash

echo "Dev server..."

node ./scripts/fetchSiteData.mjs
yarn next $1 $2