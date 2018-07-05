FROM node:10.5.0-slim

ENV SERVICE_DIR /usr/src/service

COPY package.json yarn.lock ${SERVICE_DIR}/
COPY .bin ${SERVICE_DIR}/.bin/

WORKDIR ${SERVICE_DIR}

EXPOSE 8080 5858

USER node

CMD ["node", ".bin/index.js"]

ONBUILD COPY environment /
