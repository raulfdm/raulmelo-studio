#!/usr/bin/env bash

echo "โโโโ ๐งน Clean: yarn clean  โโโโโโโ"

yarn lerna run clean --stream --concurrency=5 $1