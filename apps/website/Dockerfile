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
FROM base AS runner
WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=installer /app/apps/website/dist ./apps/website/dist
COPY --from=installer /app/packages/code-highlight/dist ./packages/code-highlight/dist
COPY --from=installer /app/packages/core/dist ./packages/core/dist
COPY --from=installer /app/packages/sanity-core/dist ./packages/sanity-core/dist

RUN pnpm install --prod --ignore-scripts

EXPOSE 4321

ENV PUBLIC_ALGOLIA_INDEX_NAME=$PUBLIC_ALGOLIA_INDEX_NAME
ENV PUBLIC_ALGOLIA_INDEX_NAME=$PUBLIC_ALGOLIA_INDEX_NAME
ENV PUBLIC_ALGOLIA_SEARCH_KEY=$PUBLIC_ALGOLIA_SEARCH_KEY
ENV PUBLIC_ALGOLIA_APP_ID=$PUBLIC_ALGOLIA_APP_ID
ENV ALGOLIA_ADMIN_KEY=$ALGOLIA_ADMIN_KEY
ENV SANITY_TOKEN=$SANITY_TOKEN
ENV API_TOKEN=$API_TOKEN
ENV APP_ENV=$APP_ENV

CMD pnpm -F website run start