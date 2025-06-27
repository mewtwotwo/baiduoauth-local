FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY server.js index.html ./

CMD ["npm", "start"]
