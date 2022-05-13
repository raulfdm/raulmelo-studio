#!/usr/bin/env bash

pnpm --filter cms... run build && pnpm dlx sanity deploy --no-build