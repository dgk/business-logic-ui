FROM node:18-alpine as builder
#FROM node:alpine as builder

RUN mkdir /app
WORKDIR /app
COPY package-lock.json .
COPY package.json .

RUN apk add --update git build-base
RUN npm ci
# yarn install --frozen-lockfile

COPY . .

# TODO:
ARG BASE_PATH="http://django-business-logic.dgk.su/business-logic/rest"
#ARG BASE_PATH="/business-logic/rest"

#RUN ( export BASE_PATH=$BASE_PATH ; yarn run test && yarn run bla-bla && .. && yarn run build )
RUN npm run build

#
#FROM nginx:alpine
#
#COPY --from=builder /app/public/* /usr/share/nginx/html/
