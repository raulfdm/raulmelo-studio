#!/usr/bin/env bash

echo "Dev server..."

export NODE_OPTIONS='--inspect'
export NODE_ICU_DATA=../../node_modules/full-icu

yarn next