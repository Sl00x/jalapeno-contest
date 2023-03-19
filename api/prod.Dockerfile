FROM node:16.19.1-alpine
WORKDIR /app

COPY . .

RUN yarn
RUN yarn prisma generate
RUN yarn prisma migrate deploy
RUN yarn build

CMD yarn start:prod