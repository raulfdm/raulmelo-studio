#!/usr/bin/env bash

pnpm run build --filter cms... && pnpm dlx sanity deploy --no-build