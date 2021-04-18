#!/usr/bin/env bash

echo "Dev server..."

export NODE_OPTIONS='--inspect'

node ./scripts/fetchSiteData.js
yarn next