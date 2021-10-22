FROM node:14

WORKDIR /app

EXPOSE 1337

COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY apps/cms ./apps/cms

RUN npm install -g pnpm

RUN pnpm i --shamefully-hoist --filter cms

RUN pnpm run build --filter cms

VOLUME [ "${PWD}/apps/cms/build:/app/build" ]

CMD [ "pnpm", "run", "start", "--filter", "cms" ]
