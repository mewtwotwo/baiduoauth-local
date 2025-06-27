FROM node:20-slim

WORKDIR /app

RUN npm install -g npm@latest

COPY package*.json ./
RUN npm install

COPY server.js index.html ./

CMD ["npm", "start"]
