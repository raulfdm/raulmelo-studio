FROM raulfdm/website-base-image:1.0.15-8.11.0-node18 AS base

# --------------------------- #
FROM base AS builder
WORKDIR /app

COPY . .
RUN pnpm turbo prune website --docker

# --------------------------- #
FROM base as installer
WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --ignore-scripts

COPY --from=builder /app/out/full/ .
RUN pnpm run build

# --------------------------- #
# FROM base AS runner
# WORKDIR /app

# COPY --from=builder /app/out/json/ .
# COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
# RUN pnpm install --prod --ignore-scripts


# RUN pnpm install -F website...

# RUN pnpm run build --filter=website...

# EXPOSE 4321

# ENV PUBLIC_ALGOLIA_INDEX_NAME=$PUBLIC_ALGOLIA_INDEX_NAME
# ENV PUBLIC_ALGOLIA_INDEX_NAME=
# ENV PUBLIC_ALGOLIA_SEARCH_KEY=
# ENV PUBLIC_ALGOLIA_APP_ID=
# ENV ALGOLIA_ADMIN_KEY=
# ENV SANITY_TOKEN=
# ENV API_TOKEN=
# ENV APP_ENV=

# CMD ["pnpm", "-F", "website", "run", "start"]