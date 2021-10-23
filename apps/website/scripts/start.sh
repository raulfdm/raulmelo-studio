#!/usr/bin/env bash

echo "Start server..."

export NODE_OPTIONS='--inspect'
export API_ENDPOINT=https://raulmelo-dev-server.herokuapp.com

pnpm next start