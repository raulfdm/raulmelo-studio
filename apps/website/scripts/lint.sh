#!/usr/bin/env bash

echo "Linting website"
echo "=============================="
./../../scripts/common/lint.sh

echo "Running TSC"
pnpm tsc