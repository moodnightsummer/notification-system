FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @nestjs/cli
RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]
