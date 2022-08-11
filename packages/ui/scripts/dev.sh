#!/usr/bin/env bash

pnpm run typegen && \
pnpm exec concurrently "vite build --watch" "pnpm run build:css -- --watch" "tsc --watch"