## Base layer
FROM node:24-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

## Dev layer
FROM base AS development
WORKDIR /app

COPY . .

RUN pnpm install
RUN APP_ENV=production ALGOLIA_ADMIN_KEY=xx SANITY_TOKEN=xx API_TOKEN=xx pnpm turbo run build --filter=website...
RUN pnpm --filter=website --prod deploy ./pruned

## Prod layer
FROM base AS production
WORKDIR /app
EXPOSE 4321

COPY --from=development /app/pruned .
CMD ["node", "./dist/server/entry.mjs"]