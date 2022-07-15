#!/usr/bin/env bash

pnpm run clean && \
LIB=core pnpm exec vite build && \
LIB=scripts pnpm exec vite build && \
pnpm exec tsc