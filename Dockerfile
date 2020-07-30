# ---- Base Node ----
FROM node:10.17.0-alpine3.10 AS base
WORKDIR /sphere
COPY package*.json ./

# ---- Prod-dependencies ----
FROM base AS dependencies
RUN npm install --only=production 
# Рекурсивно копирует модули в отдельную папку prod-модулей
RUN cp -R node_modules prod_node_modules

# ---- Build ----
FROM base AS build
COPY . ./
# Ставит все модули для последующей сборки через Webpack
RUN npm install
ARG NODE_ENV=production
ENV NODE_ENV="${NODE_ENV}"
RUN npx webpack
RUN cp -R static/scripts prod_scripts

# ---- Release ----
FROM base AS release
# Копирует файлы приложения из корневой директории
COPY . ./
# Копирует чистые prod-модули
COPY --from=dependencies /sphere/prod_node_modules ./node_modules
COPY --from=build /sphere/prod_scripts ./static/scripts

EXPOSE 8000

ENTRYPOINT ["node"]
CMD ["app.js"]
