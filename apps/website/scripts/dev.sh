#!/usr/bin/env bash

echo "Dev server..."

node ./scripts/fetchSiteData.js
yarn next $1 $2