#!/usr/bin/env bash

echo "โโโโ ๐งช Test: yarn test  โโโโโโโ"

yarn lerna run test --stream --concurrency=5 $1