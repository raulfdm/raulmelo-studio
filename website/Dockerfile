# Base layer
FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Prune stage - Create a pruned monorepo with only website and its dependencies
FROM base AS prepare
WORKDIR /app

## We need to install turbo globally
RUN pnpm add -g turbo@2.4.4
COPY . .
## Prune only website-related dependencies
RUN pnpm turbo prune --scope=website --docker

## Builder stage - Build the website and its dependencies
FROM base AS builder
WORKDIR /app

## Copy only package.json and lockfile files so we can install dependencies
COPY --from=prepare /app/out/json .
RUN pnpm install --frozen-lockfile --ignore-scripts
## Now we can copy the full source code and build the website
COPY --from=prepare /app/out/full .
## ... and build the website
RUN APP_ENV=production ALGOLIA_ADMIN_KEY=xx SANITY_TOKEN=xx API_TOKEN=xx pnpm turbo run build --filter=website...

# Runner stage - Run the website
FROM base AS runner
WORKDIR /app

## Copy only package.json and lockfile files so we can install PRODUCTION dependencies
COPY --from=prepare /app/out/json .
## Copy the built website
COPY --from=builder /app/website/dist ./website/dist
## Can't forget the config!
COPY --from=builder /app/website/config ./website/config
## Install PRODUCTION dependencies
RUN pnpm install --frozen-lockfile --ignore-scripts --prod
## Expose the port the website will run on
EXPOSE 4321
## App expects to be in the website directory so the config can be loaded properly (layerfig limitation)
WORKDIR /app/website
## Now we can run the website
CMD ["node", "./dist/server/entry.mjs"]
