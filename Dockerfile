FROM node:16.10-alpine
USER root

RUN mkdir /usr/app
WORKDIR /usr/app

RUN npm install npm@8.11.0
RUN rm -rf /usr/local/lib/node_modules/npm
RUN mv /usr/app/node_modules/npm /usr/local/lib/node_modules/npm

COPY package*.json ./

RUN npm i

COPY ./ /usr/app
