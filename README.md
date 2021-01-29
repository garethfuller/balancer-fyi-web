# Introduction
This repo is the frontend for [balancer.fyi](https://balancer.fyi). Balancer FYI is an alternative UI for exploring and interacting with [Balancer](https://balancer.finance) pools.

# Development
To setup the development environment first clone the repo:
```bash
git clone https://github.com/garethfuller/balancer-fyi-web.git && cd balancer-fyi-web
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
Deployments can be triggered manually from the `Actions tab`. 

To trigger a re-deployment of the latest commit on the `main` branch:

1. Select `Production CI/CD`
2. Select `Run workflow`
3. Click `Run workflow` button

### Rollbacks
Rollbacks to a specific commit can be triggered manually. To trigger a rollback deployment:

1. Select `Rollback CI/CD`
2. Select `Run worflow`
3. Paste in the commit SHA you want to rollback to
4. Click `Run workflow` button

# Dependencies
The following is a list of relevant and important dependencies:

- [Nuxt.js](https://nuxtjs.org/) - A frontend Vue framework
- [TailwindCSS](https://tailwindcss.com/) - Utility CSS class framework
- [Ethers.js](https://docs.ethers.io/v5/) - JS library for interacting with Ethereum

# Design System
The design system is derived from the [Tailwind configuration file](/tailwind.config.js). Please see the [docs](https://tailwindcss.com/docs/configuration) for configuration options.

In development, a visual library of the design system can be accessed at [localhost:3000/_tailwind](http://localhost:3000/_tailwind)

# TODO

- Add tests for critical components. e.g. AuthBtn.vue
- Add filtering functionality
- Add pool pages
- Add create pool functionality
- Better abstraction for subgraph queries
