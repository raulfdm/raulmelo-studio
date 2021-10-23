#!/usr/bin/env bash

echo "Dev server..."

./scripts/fetchSiteData.js && pnpm svelte-kit dev