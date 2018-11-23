#
# ---- OLD CONFIG ----
#
#FROM node:alpine as buider
##FROM node:8 as builder
##FROM node:8-alpine as buider
#
#RUN mkdir /build
#WORKDIR /build
#COPY package.json .
#
#RUN npm install -g yarn && \
#    yarn install
#
#COPY . .
#
#RUN yarn build
#
#
##RUN npm install && \
##    npm run build
#
#FROM nginx:alpine
#
#COPY --from=builder /build/public/* /var/lib/nginx/public_html/
#
# ---- OLD CONFIG ----
#

FROM node:8

RUN mkdir /build
WORKDIR /build
#COPY package.json .
COPY package*.json ./

RUN npm install
#RUN npm install -g yarn && \
#    yarn install

COPY . .

#RUN yarn build

EXPOSE 8080
CMD [ "npm", "start" ]
