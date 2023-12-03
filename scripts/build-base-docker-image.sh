export BUN_VERSION=1.0.15
export PNPM_VERSION=8.11.0
export NODE_VERSION=18

docker build . \
  --build-arg BUN_VERSION=$BUN_VERSION \
  --build-arg PNPM_VERSION=$PNPM_VERSION \
  --build-arg NODE_VERSION=$NODE_VERSION \
  -t raulmelo-node-$NODE_VERSION-pnpm-$PNPM_VERSION-bun-$BUN_VERSION \
  -f docker/base-image/Dockerfile