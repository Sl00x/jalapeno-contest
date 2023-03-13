FROM node:16.19.1-alpine
WORKDIR /app

COPY package.json yarn.lock ./

CMD yarn;yarn prisma generate;yarn prisma migrate dev;yarn start:dev