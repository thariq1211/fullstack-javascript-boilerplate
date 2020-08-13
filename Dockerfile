#BUILD STAGE
FROM node:12.18.3-alpine
EXPOSE 31045
RUN mkdir /app
WORKDIR /app
RUN mkdir app | mkdir server
WORKDIR /app/server
COPY server/package.json /app/server/
WORKDIR /app/app
COPY app/package.json /app/app/
RUN yarn
WORKDIR /app/server
RUN yarn
COPY app/. /app/app/
COPY server/. /app/server/
WORKDIR /app/app
RUN yarn run build
RUN rm -rf node_modules
WORKDIR /app/server
CMD ["yarn", "start"]
