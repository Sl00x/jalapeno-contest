FROM node:16.19.1-alpine
WORKDIR /app

COPY . .

ARG DATABASE_URL

RUN yarn
RUN yarn prisma generate
RUN yarn build

CMD yarn prisma migrate deploy;yarn start:prod