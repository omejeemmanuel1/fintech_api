FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --production

COPY . .

RUN yarn run compile

EXPOSE 8999

CMD ["yarn", "run", "start"]
