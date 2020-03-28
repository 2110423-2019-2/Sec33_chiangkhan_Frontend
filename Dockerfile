FROM node:13.12.0-alpine3.10
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
COPY yarn build
CMD "yarn" "start"
