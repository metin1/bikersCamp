# build
FROM node:lts-alpine as build
WORKDIR /app
# COPY .env ./
COPY package*.json ./
ARG NPM_TOKEN  
# COPY .npmrc ./
RUN yarn install
COPY . .
RUN yarn build

# serve
FROM nginx:stable-alpine as serve
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
