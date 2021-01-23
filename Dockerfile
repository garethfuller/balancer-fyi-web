FROM node:14-alpine as build

WORKDIR /build
COPY package.json yarn.* ./
RUN yarn install
COPY . ./
ENV NODE_ENV production
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000
RUN yarn run build
RUN rm -rf node_modules && yarn install --production=true

FROM node:14-alpine

RUN addgroup -S deploy && adduser -S deploy -G deploy
USER deploy
RUN mkdir -p /home/deploy/app
WORKDIR /home/deploy/app

ENV NODE_ENV production
EXPOSE 3000

COPY --from=build --chown=deploy:deploy /build/package.json /build/yarn.* ./
COPY --from=build --chown=deploy:deploy /build/nuxt.config.js ./
COPY --from=build --chown=deploy:deploy /build/node_modules ./node_modules/
COPY --from=build --chown=deploy:deploy /build/static ./static/
COPY --from=build --chown=deploy:deploy /build/lib ./lib/
COPY --from=build --chown=deploy:deploy /build/.nuxt ./.nuxt/

CMD yarn run start

# test build:
# docker build -t <NAMESPACE>/web .
# docker run --rm -p 3000:3000 <NAMESPACE>/web
