#!/usr/bin/env bash

pnpm --filter cms... run build && pnpm sanity deploy --no-build