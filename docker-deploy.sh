#!/bin/bash

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t consamables-${1} $2
docker tag consamables-${1} ${DOCKER_USERNAME}/consamables-${1}:${TRAVIS_TAG}
docker tag consamables-${1} ${DOCKER_USERNAME}/consamables-${1}:latest
docker push ${DOCKER_USERNAME}/consamables-${1}
