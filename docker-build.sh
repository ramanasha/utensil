#!/bin/bash

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t utensil-${1} .
docker tag utensil-${1} ${DOCKER_USERNAME}/utensil-${1}:${TRAVIS_TAG}
docker tag utensil-${1} ${DOCKER_USERNAME}/utensil-${1}:latest
docker push ${DOCKER_USERNAME}/utensil-${1}
