## Base layer
FROM node:24-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

## Dev layer
FROM base AS development
WORKDIR /app

ARG APP_ENV=production
ARG ALGOLIA_ADMIN_KEY=xx
ARG SANITY_TOKEN=xx
ARG API_TOKEN=xx

COPY . .

RUN pnpm install
RUN pnpm turbo run build --filter=website...
RUN pnpm --filter=website --prod deploy ./pruned

## Prod layer
FROM base AS production
WORKDIR /app
EXPOSE 3000

COPY --from=development /app/pruned .
CMD ["node", "./dist/server/entry.mjs"]