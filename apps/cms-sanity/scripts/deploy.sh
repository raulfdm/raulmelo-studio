#!/usr/bin/env bash

pnpm run build --filter cms-sanity... && pnpm sanity deploy --no-build