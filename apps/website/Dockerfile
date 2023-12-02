FROM docker.io/library/raulmelo-node-18-pnpm-8.11-bun-1.0.14 AS base

FROM base AS builder

# Set working directory
WORKDIR /app

COPY . .

RUN turbo prune website --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer

# Set working directory
WORKDIR /app

# First install the dependencies (as they change less often)
# COPY .gitignore .gitignore
COPY --from=builder /app/out/full/ .
RUN pnpm install -F website...

# Build the project
RUN pnpm turbo run build --filter=website...

# FROM base AS runner

# WORKDIR /app