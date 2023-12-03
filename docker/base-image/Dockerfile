ARG NODE_VERSION=18

FROM node:${NODE_VERSION}-slim AS base

ARG PNPM_VERSION=8.11.0
ARG BUN_VERSION=1.0.15

ENV BUN_INSTALL="$HOME/.bun" 
ENV PATH=$BUN_INSTALL/bin:$PATH

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
RUN corepack prepare pnpm@${PNPM_VERSION} --activate

RUN pnpm add -g turbo bun@${BUN_VERSION}