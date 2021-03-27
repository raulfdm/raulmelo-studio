#!/usr/bin/env bash

echo "Build Storybook..."

export NODE_ENV=production
yarn build-storybook -s ./static