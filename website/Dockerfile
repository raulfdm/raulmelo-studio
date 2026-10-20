# The website output is static, so build it once on the runner's native CPU.
# Caddy remains multi-platform in the final stage.
FROM --platform=$BUILDPLATFORM ghcr.io/jdx/mise:2026.10.15-debian AS base
WORKDIR /app
COPY mise.toml ./
RUN mise trust && mise install
COPY scripts/bin/node /usr/local/bin/node

# Prune stage - Create a pruned monorepo with only website and its dependencies
FROM base AS prepare
COPY . .
## Prune only website-related dependencies
RUN bunx --bun turbo@2.11.9 prune website --docker

## Builder stage - Build the website and its dependencies
FROM base AS builder
## Copy only package.json and lockfile files so we can install dependencies
COPY --from=prepare /app/out/json .
RUN pnpm install --frozen-lockfile --ignore-scripts
## Now we can copy the full source code and build the website
COPY --from=prepare /app/out/full .
## The site is generated statically, so every page is fetched from Sanity right
## here. The workflow passes its SANITY_AUTH_TOKEN secret to the build as
## sanity_token; the website reads it through SANITY_TOKEN.
## ALGOLIA_ADMIN_KEY only has to satisfy config validation - the Algolia index
## is rebuilt from CI, not from this image.
## Sanity content can change without a source change, so rebuild pages on every run.
ARG CONTENT_BUILD_ID=local
RUN --mount=type=secret,id=sanity_token \
    --mount=type=secret,id=turbo_api \
    --mount=type=secret,id=turbo_team \
    --mount=type=secret,id=turbo_token \
    : "$CONTENT_BUILD_ID" && \
    APP_ENV=production \
    CONTENT_BUILD_ID="$CONTENT_BUILD_ID" \
    SANITY_TOKEN="$(cat /run/secrets/sanity_token)" \
    ALGOLIA_ADMIN_KEY=xx \
    TURBO_API="$(cat /run/secrets/turbo_api)" \
    TURBO_TEAM="$(cat /run/secrets/turbo_team)" \
    TURBO_TOKEN="$(cat /run/secrets/turbo_token)" \
    bun run --bun turbo run build --filter=website...

# Runner stage - Serve the generated files
FROM caddy:2-alpine AS runner

COPY --from=builder /app/website/dist /srv
COPY --from=builder /app/website/Caddyfile /etc/caddy/Caddyfile

EXPOSE 4321
