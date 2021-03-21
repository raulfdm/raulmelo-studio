#!/usr/bin/env bash

echo "Releasing packages with lerna."

yarn lerna publish --conventional-commits --no-private -y