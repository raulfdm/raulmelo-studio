docker buildx build . \
  --platform linux/amd64 \
  -t raulmelo-website \
  -f apps/website/Dockerfile