#!/usr/bin/env bash

pnpm run typegen && \
svelte-kit sync && \
svelte-check --tsconfig ./tsconfig.json $@