#!/usr/bin/env bash

echo "Shipping"
yarn lerna run deploy --stream --concurrency=5 $1