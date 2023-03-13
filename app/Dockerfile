FROM node:16.19.1-alpine
WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn

CMD ["yarn", "dev"]