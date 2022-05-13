#!/usr/bin/env bash

pnpm --filter cms... run build && pnpmx sanity deploy --no-build