ARG NGINX_VERSION=1.19

# BUILD STAGE
FROM node:lts-alpine as build

RUN apk update && apk add git python

COPY . /build/

WORKDIR  /build/

RUN yarn install && yarn run build


# PRODUCTION STAGE

FROM nginx:${NGINX_VERSION}-alpine as prod

ARG APP_HOME=/app
ENV APP_HOME ${APP_HOME}

COPY --from=build /build/dist ${APP_HOME}/public

COPY ./docker/default.conf.template default.conf.template

RUN envsubst '\$APP_HOME' < default.conf.template > /etc/nginx/conf.d/default.conf
