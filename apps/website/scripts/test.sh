#!/usr/bin/env bash

echo "Testing website"

pnpm run typegen && \
./../../scripts/common/test.sh $@