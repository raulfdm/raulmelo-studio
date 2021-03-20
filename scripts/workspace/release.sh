#!/usr/bin/env bash

echo "Realing...."

echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> ./.npmrc

yarn lerna publish from-package --conventional-commits --no-private -y