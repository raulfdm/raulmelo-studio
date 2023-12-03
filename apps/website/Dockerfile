FROM raulmelo-node-18-pnpm-8.11.0-bun-1.0.15 AS base

FROM base AS prunne

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Prune unused files
RUN turbo prune website --docker

# ----------------------- #
FROM base AS builder

# Set working directory
WORKDIR /app

# First install the dependencies (as they change less often)
# COPY .gitignore .gitignore
COPY --from=prunne /app/out/full/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install -F website...

# Build the project
RUN pnpm turbo run build --filter=...^website
RUN pnpm deploy --filter=website --prod ./prod/website
RUN cp ./apps/website/.env ./prod/website/
RUN cd ./prod/website && pnpm run build


FROM base AS runner

WORKDIR /app

EXPOSE 4321

COPY --from=builder /app/prod/website ./

CMD ["pnpm", "run", "start"]