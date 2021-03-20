#!/usr/bin/env bash

echo "DEPLOY Functions"

export NETLIFY_AUTH_TOKEN=1BDm-c764_ZV0nFPwiSlwT1yJi5vGqkc7Z3JhEErIqM
export NETLIFY_SITE_ID=4b1b2f1e-e403-4c46-85e5-634161755f7c

netlify deploy --functions=functions --dir=functions --prod