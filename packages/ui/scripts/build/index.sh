#!/usr/bin/env bash

pnpm run typegen && \
pnpm exec vite build && \
pnpm exec tsc && \
pnpm run build:css