#!/usr/bin/env bash

echo "โโโโ ๐งน+ Full clean: remove node_modules and reinstall  โโโโโโโ"

yarn lerna clean -y
rm -rf node_modules
yarn install
