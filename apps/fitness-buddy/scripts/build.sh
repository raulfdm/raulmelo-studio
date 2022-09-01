#!/usr/bin/env bash

pnpm svelte-kit sync && \
./scripts/typegen.sh && \
pnpm vite build