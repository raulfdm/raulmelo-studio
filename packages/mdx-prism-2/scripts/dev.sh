#!/usr/bin/env bash

echo "Dev server..."

export NODE_OPTIONS='--inspect'

yarn rollup -w -c