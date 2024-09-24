FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --production

COPY dist ./dist

COPY .env ./

EXPOSE 8999

CMD ["node", "dist/app.js"]
