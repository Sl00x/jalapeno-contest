FROM node:16.19.1-alpine
WORKDIR /app

COPY . .

ARG DATABASE_URL

RUN yarn
RUN yarn prisma generate
RUN yarn prisma migrate deploy
RUN yarn build

CMD yarn start:prod