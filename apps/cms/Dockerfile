FROM node:14

WORKDIR /app

EXPOSE 1337

COPY package.json .
COPY yarn.lock .
COPY lerna.json .
COPY scripts/ ./scripts/
COPY apps/cms ./apps/cms

RUN yarn

RUN yarn build --scope=cms

VOLUME [ "${PWD}/apps/cms/build:/app/build" ]

CMD [ "yarn", "start", "--scope=cms" ]
