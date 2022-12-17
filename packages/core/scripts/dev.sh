#!/usr/bin/env bash

pnpm concurrently \
  "pnpm exec tsc --watch --preserveWatchOutput" \
  "pnpm vite build --watch" \
  --kill-others-on-fail \
  --restartTries=3 \
  --restartDelay=1000