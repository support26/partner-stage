FROM node:14 as build 

WORKDIR : /src/App.js

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM fholzer/nginx-brotli:v1.12.2

COPY /nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html 

