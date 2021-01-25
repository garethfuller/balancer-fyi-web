# Introduction
This repo is the frontend for [balancer.fyi](https://balancer.fyi). Balancer FYI is an alternative UI for exploring and interacting with [Balancer](https://balancer.finance) pools.

# Development
To setup the development environment first clone the repo:
```bash
git clone https://github.com/garethfuller/balancer-fyi-web.git && cd balancer-fyi
```

Install dependencies:
```bash
yarn install
```

Start the app:
```bash
yarn dev
```
The app should be live at [http://localhost:3000](http://localhost:3000)

## Docker
If you'd rather spin up the app in a docker container:
```bash
docker-compose up
```
The app should be live at [http://localhost:3000](http://localhost:3000)

# Deployment (CI/CD)
On push or merge to the `main` branch the CI/CD workflows are triggered. That is:

1. Linting and tests are run.
2. The production Docker image is built.
3. The Docker image is pushed to DockerHub.
4. The Kubernetes `deployment.yml` manifest is updated and applied to the cluster.

## Manual Deployments
Deployments can be triggered manually from the [Actions tab](/actions). 

To trigger a re-deployment of the latest commit on the `main` branch:

1. Select `Production CI/CD`
2. Select `Run workflow`
3. Click `Run workflow` button

### Rollbacks
To trigger a rollback deployment:

1. Select `Rollback CI/CD`
2. Select `Run worflow`
3. Paste in the commit SHA you want to rollback to
4. Click `Run workflow` button
