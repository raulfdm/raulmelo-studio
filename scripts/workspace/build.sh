#!/usr/bin/env bash

echo "BUILDING....."
yarn lerna run build --stream --concurrency=5 $1