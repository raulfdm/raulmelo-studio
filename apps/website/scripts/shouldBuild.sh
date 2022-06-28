#!/usr/bin/env bash

# This script is mainly used for avoiding unnecessary builds in Vercel
# https://vercel.com/docs/concepts/projects/overview#ignored-build-step
# https://vercel.com/support/articles/how-do-i-use-the-ignored-build-step-field-on-vercel

# This command exits with 0 if nothing has changed or 1 if something has changed in:
#                           \/-- Application
git diff HEAD^ HEAD --quiet ./apps/website ./packages/
#                                          /\--- packages this project depends on