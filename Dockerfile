FROM node:10.5.0-slim

ENV SERVICE_DIR /usr/src/service

COPY package.json package-lock.json ${SERVICE_DIR}/
RUN mkdir ${SERVICE_DIR}/.bin/

WORKDIR ${SERVICE_DIR}

EXPOSE 8080 5858

RUN npm i

USER node

CMD ["node", ".bin/index.js"]

ONBUILD COPY environment /
