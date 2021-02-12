FROM node:12-alpine

WORKDIR /app

EXPOSE 1337

COPY package.json .
COPY yarn.lock .

RUN yarn

RUN yarn build

COPY . .

VOLUME [ "${PWD}/build:/app/build" ]

CMD [ "yarn", "start" ]
