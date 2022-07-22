FROM node:14

WORKDIR : /src/App.js

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]