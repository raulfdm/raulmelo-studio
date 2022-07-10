#!/usr/bin/env bash

pnpm xstate typegen "src/**/*.ts?(x)" && \
pnpm svelte-kit sync && \
echo "Typegen complete"