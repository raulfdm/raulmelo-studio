#!/usr/bin/env bash

echo "TSDX dev"
node scripts/copyAssets.js
yarn tsdx watch --noClean