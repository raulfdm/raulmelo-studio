# Build with the same runtimes used locally and in CI.
FROM ghcr.io/jdx/mise:2026.10.7-debian AS base
WORKDIR /app
COPY mise.toml ./
RUN mise trust && mise install

# Prune stage - Create a pruned monorepo with only website and its dependencies
FROM base AS prepare
RUN mise exec -- npm install --global turbo@2.4.4
COPY . .
## Prune only website-related dependencies
RUN mise exec -- turbo prune website --docker

## Builder stage - Build the website and its dependencies
FROM base AS builder
## Copy only package.json and lockfile files so we can install dependencies
COPY --from=prepare /app/out/json .
RUN mise exec -- pnpm install --frozen-lockfile --ignore-scripts
## Now we can copy the full source code and build the website
COPY --from=prepare /app/out/full .
## The site is generated statically, so every page is fetched from Sanity right
## here. The workflow passes its SANITY_AUTH_TOKEN secret to the build as
## sanity_token; the website reads it through SANITY_TOKEN.
## ALGOLIA_ADMIN_KEY only has to satisfy config validation - the Algolia index
## is rebuilt from CI, not from this image.
RUN --mount=type=secret,id=sanity_token \
    APP_ENV=production \
    SANITY_TOKEN="$(cat /run/secrets/sanity_token)" \
    ALGOLIA_ADMIN_KEY=xx \
    mise exec -- pnpm turbo run build --filter=website...

# Runner stage - Serve the generated files
FROM caddy:2-alpine AS runner

COPY --from=builder /app/website/dist /srv
COPY --from=builder /app/website/Caddyfile /etc/caddy/Caddyfile

EXPOSE 4321
