#!/usr/bin/env bash

pnpm concurrently "pnpm run typegen --watch" "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch"