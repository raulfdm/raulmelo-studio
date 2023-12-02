FROM docker.io/library/raulmelo-node-18-pnpm-8.11-bun-1.0.14 AS base

FROM base AS builder

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Prune unused files
RUN turbo prune website --docker

# ----------------------- #
FROM base AS prod-deps

# Set working directory
WORKDIR /app

# First install the dependencies (as they change less often)
# COPY .gitignore .gitignore
COPY --from=builder /app/out/full/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install -F website...

# Build the project
RUN pnpm turbo run build --filter=website...

FROM base AS runner

WORKDIR /app

EXPOSE 4321

COPY --from=installer . .

CMD ["pnpm", "-F", "website", "run", "start"]