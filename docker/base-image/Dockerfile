FROM node:18-slim AS base

ENV BUN_INSTALL="$HOME/.bun" 
ENV PATH=$BUN_INSTALL/bin:$PATH

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
RUN corepack prepare pnpm@8.11.0 --activate

RUN pnpm add -g turbo bun@1.0.14