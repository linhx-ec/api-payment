FROM node:16-alpine as build-stage

WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

###

FROM node:16-alpine as production-stage
WORKDIR /app

ENV APP_DIR=/app

COPY --from=build-stage /app/dist ${APP_DIR}/dist
#COPY --from=build-stage /app/.env ${APP_DIR}/.env
COPY --from=build-stage /app/node_modules ${APP_DIR}/node_modules

EXPOSE 3000
CMD [ "node", "./dist/main" ]
