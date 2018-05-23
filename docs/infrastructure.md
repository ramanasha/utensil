# Utensil Build/Deployment Infrastructure
In production, the app should start up easily with minimal setup, and new versions should be easy to deploy
with minimal downtime. From a developer standpoint, the workflow should look something like this:
- Develop feature
- Review feature
- Land feature
- Tag version
- Push tag to GitHub

To make this happen, there are a few moving parts. A high-level overview of the system can be found [here](./CI_CD.pdf).
_(Note: The original production prototype of Utensil indicated in the diagram ran on dedicated server hardware on premises.
The current version is hosted entirely in the cloud. Due to the containerized setup, the deployment model is virtually
identical in both places.)_

## Travis CI
The Travis build server is where most of the business logic for deployment takes place. Travis tests and builds Utensil for
every pushed branch and pull request, and executes the deployment stage only for tagged commits.
As a full-stack webapp of moderate size, Utensil has separately built but functionally coupled frontend and backend layers
that coexist in a top-level repository; however, contrary to intuition, this is a scarcely documented use case for a Travis build
setup. The Utensil configuration relies on specifying a build matrix with separate jobs for the frontend and backend, each with
its own language (Java and Node.js):
```yaml
# .travis.yml

dist: trusty
sudo: required

services:
  - docker

matrix:
  include:
    - language: java
      jdk: oraclejdk8
      ...

    - language: node_js
      node_js:
        - "9"
      ...
```
Each job has its own `before_script` (navigate into the proper subdirectory and install dependencies if necessary), `script`
(lint, test, and build), and `deploy` ([package build artifacts into a docker container](../docker-build.sh)) stages. Ideally,
the deploy stage, which is also responsible for pushing the newly built images to the Docker registry, would run as a single
step after both jobs have completed successfully, but Travis currently does not support this functionality.

## Production Server
Since the application is containerized, Utensil can be deployed on a machine assuming only Docker, Docker Compose, and tmux
as dependencies. [The deployment script](../deploy.sh) simply initializes the Utensil services based on [the Compose
configuration](../docker-compose.yml), pulling the most recent images from Docker Hub. To automatically redeploy when new
versions are released, Utensil uses [Watchtower](https://github.com/v2tec/watchtower), a service that checks Docker Hub for new
images and swaps them in as necessary. 

## Migrations
Utensil uses [Flyway](https://flywaydb.org/), a simple but robust migration utility, to deal with updates to the database layer.
To be consistent with minimizing dependencies on the host machine, Utensil uses Flyway in a docker container in production.
However, [the reference Docker images for Flyway](https://github.com/flyway/flyway-docker) assume manual interaction on the
part of the user to ensure that the database container is fully initialized before starting up Flyway. Utensil uses a simple
but custom [image](https://github.com/sammyers/docker-flyway) with [Dockerize](https://github.com/jwilder/dockerize)
to allow for automatically waiting on the database. The Flyway image is included in the Docker Compose configuration and will
automatically run when the application is first deployed, as well as whenever is subsequently desired by running
`docker-compose up flyway`.
