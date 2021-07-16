#!/usr/bin/env bash

echo "Build for CI..."

./scripts/build/index.sh
mkdir .next_output
cp -R .vercel_build_output .next_output/
cp -R .svelte-kit .next_output/