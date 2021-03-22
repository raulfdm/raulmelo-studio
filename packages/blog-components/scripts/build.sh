#!/usr/bin/env bash

echo "Build..."
yarn tsdx build && node copyAsset.js