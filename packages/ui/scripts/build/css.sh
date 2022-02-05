#!/usr/bin/env bash

pnpm exec tailwindcss --postcss -i ./src/infrastructure/prism-code.css -o ./dist/prism.css $@