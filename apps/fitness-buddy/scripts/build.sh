#!/usr/bin/env bash

pnpm svelte-kit sync && \
pnpm run typegen && \
pnpm vite build