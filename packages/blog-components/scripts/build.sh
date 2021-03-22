#!/usr/bin/env bash

echo "Build..."
yarn tsdx build && node scripts/copyAssets.js