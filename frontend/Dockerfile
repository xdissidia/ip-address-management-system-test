FROM node:20-alpine 

RUN mkdir -p /frontend

WORKDIR /frontend

COPY package*.json ./


COPY . .

RUN npm install

CMD npm run dev
