#!/usr/bin/env bash

echo "LINTING..."
yarn lerna run lint --stream --concurrency=5 $1