#!/bin/bash

tmux new-session -d -s consamables 'docker-compose up'
docker run -d --name watchtower --rm -v /var/run/docker.sock:/var/run/docker.sock v2tec/watchtower --interval 30
