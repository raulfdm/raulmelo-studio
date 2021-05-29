#!/usr/bin/env bash

echo "Manually Deploy Docker Image to Heroku"

# Login to heroku container
heroku container:login

# Build image
docker build . -f apps/cms/DockerFile -t raulfdm/raulmelo.dev-cms:latest

# Create locally the tag
docker tag raulfdm/raulmelo.dev-cms:latest registry.heroku.com/raulmelo-dev-server/web

# Push the image to heroku registry
docker push registry.heroku.com/raulmelo-dev-server/web

#Release
heroku container:release web --app raulmelo-dev-server