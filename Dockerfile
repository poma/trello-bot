FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn && yarn cache clean --force
COPY . .

CMD ["yarn", "start"]