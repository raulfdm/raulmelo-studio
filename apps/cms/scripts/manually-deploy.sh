#!/usr/bin/env bash

echo "Manually Deploy Docker Image to Heroku"

# Build image
docker build -t raulfdm/raulmelo.dev-cms:latest . # -f apps/cms/DockerFile 

# Create locally the tag
docker tag raulfdm/raulmelo.dev-cms:latest registry.heroku.com/raulmelo-dev-server/web

# Push the image to heroku registry
docker push registry.heroku.com/raulmelo-dev-server/web

#Release
heroku container:release web --app raulmelo-dev-server