export BUN_VERSION=1.0.15
export PNPM_VERSION=8.11.0
export NODE_VERSION=18

export DOCKER_IMAGE_VERSION="${BUN_VERSION}-${PNPM_VERSION}-node${NODE_VERSION}"

docker buildx build . \
  --platform linux/amd64 \
  --build-arg BUN_VERSION=$BUN_VERSION \
  --build-arg PNPM_VERSION=$PNPM_VERSION \
  --build-arg NODE_VERSION=$NODE_VERSION \
  -t raulfdm/website-base-image \
  -t raulfdm/website-base-image:$DOCKER_IMAGE_VERSION \
  -f docker/base-image/Dockerfile