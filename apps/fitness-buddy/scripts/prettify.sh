#!/usr/bin/env bash

prettier --config ../../.prettierrc.js --ignore-path .gitignore --plugin-search-dir=. . $@