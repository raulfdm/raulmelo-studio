FROM node:24-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS development
ARG APP_ENV=production
ENV ALGOLIA_ADMIN_KEY=xx
ENV SANITY_TOKEN=xx
ENV API_TOKEN=xx

RUN pnpm install
RUN pnpm turbo run build --filter=website...
RUN pnpm --filter=website --prod deploy ./pruned

FROM base AS production
WORKDIR /app
COPY --from=development /app/pruned .

# COPY . .
# RUN bun install
# RUN bun run build --filter=website
# RUN bun run scripts/prepare-pkg-json.ts

# FROM base AS production
# # Copy repo files
# COPY --from=development /usr/src/app/package.json ./package.json
# COPY --from=development /usr/src/app/temp_package.json ./package.json

# COPY --from=development /usr/src/app/bun.lock ./bun.lock
# COPY --from=development /usr/src/app/turbo.json ./turbo.json

# # Copy website
# COPY --from=development /usr/src/app/website/dist ./website/dist
# COPY --from=development /usr/src/app/website/public ./website/public
# COPY --from=development /usr/src/app/website/config ./website/config
# COPY --from=development /usr/src/app/website/package.json ./website/package.json

# # Copy packages
# ## code-highlight
# COPY --from=development /usr/src/app/packages/code-highlight/dist ./packages/code-highlight/dist
# COPY --from=development /usr/src/app/packages/code-highlight/package.json ./packages/code-highlight/package.json
# COPY --from=development /usr/src/app/packages/code-highlight/styles ./packages/code-highlight/styles
# ## core
# COPY --from=development /usr/src/app/packages/core ./packages/core