# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# Name the node stage "builder"
FROM node:14 AS builder

# Set working directory
WORKDIR /app

COPY package*.json /app/
COPY yarn.lock     /app/

ARG NPM_TOKEN

COPY .npmrc_config /app/.npmrc

RUN yarn install

# Copy all files from current directory to working dir in image
COPY ./ /app/

ARG REACT_APP_CORE_SERVICE_URL

ENV REACT_APP_CORE_SERVICE_URL $REACT_APP_CORE_SERVICE_URL

ARG REACT_APP_ACCOUNT_SERVICE_URL

ENV REACT_APP_ACCOUNT_SERVICE_URL $REACT_APP_ACCOUNT_SERVICE_URL

# install node modules and build assets
RUN npm run build

# nginx state for serving content
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=builder /app/build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
