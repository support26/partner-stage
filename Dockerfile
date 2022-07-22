FROM node:14-alpine as build

ARG env_name

ENV REACT_APP_ENV=${env_name}

ENV INLINE_RUNTIME_CHUNK=false

WORKDIR /src/App.js

COPY package*.json .

RUN npm i --quiet

COPY . .

RUN npm run build

# ---
FROM fholzer/nginx-brotli:v1.12.2

WORKDIR /etc/nginx
ADD nginx.conf /etc/nginx/nginx.conf

COPY --from=build /src/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
