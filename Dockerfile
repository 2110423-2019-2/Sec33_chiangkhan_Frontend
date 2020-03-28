FROM node:13.12.0-alpine3.10
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 4200
RUN yarn build
CMD "yarn" "start"
