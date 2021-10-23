FROM node:14

WORKDIR /app

# TODO: delete docker or refactor this docker file
COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

EXPOSE 3000

CMD [ "yarn", "dev" ]
