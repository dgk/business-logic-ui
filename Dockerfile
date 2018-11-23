FROM node:alpine as buider
#FROM node:8 as builder
#FROM node:8-alpine as buider

RUN mkdir /build
WORKDIR /build
COPY package.json .

RUN npm install -g yarn && \
    yarn install

COPY . .

RUN yarn build


#RUN npm install && \
#    npm run build

FROM nginx:alpine

COPY --from=builder /build/public/* /var/lib/nginx/public_html/

