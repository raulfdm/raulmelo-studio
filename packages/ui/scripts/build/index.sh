#!/usr/bin/env bash

pnpm exec vite build
pnpm exec tsc
pnpm run build:css
