# Base layer
FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Prune stage - Create a pruned monorepo with only website and its dependencies
FROM base AS prepare
WORKDIR /app

## Install Turbo without invoking pnpm before the repository's pinned version
## is available in the image.
RUN npm install --global turbo@2.4.4
COPY . .
## Prune only website-related dependencies
RUN turbo prune website --docker

## Builder stage - Build the website and its dependencies
FROM base AS builder
WORKDIR /app

## Copy only package.json and lockfile files so we can install dependencies
COPY --from=prepare /app/out/json .
RUN pnpm install --frozen-lockfile --ignore-scripts
## Now we can copy the full source code and build the website
COPY --from=prepare /app/out/full .
## The site is generated statically, so every page is fetched from Sanity right
## here. Unlike the old server build, a real SANITY_TOKEN is required.
## ALGOLIA_ADMIN_KEY only has to satisfy config validation - the Algolia index
## is rebuilt from CI, not from this image.
RUN --mount=type=secret,id=sanity_token \
    APP_ENV=production \
    SANITY_TOKEN="$(cat /run/secrets/sanity_token)" \
    ALGOLIA_ADMIN_KEY=xx \
    pnpm turbo run build --filter=website...

# Runner stage - Serve the generated files
FROM caddy:2-alpine AS runner

COPY --from=builder /app/website/dist /srv
COPY --from=builder /app/website/Caddyfile /etc/caddy/Caddyfile

EXPOSE 4321
