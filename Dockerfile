FROM node:10.5.0-slim

ENV SERVICE_DIR /usr/src/service

COPY package.json yarn.lock ${SERVICE_DIR}/
COPY .bin ${SERVICE_DIR}/.bin/

WORKDIR ${SERVICE_DIR}

RUN yarn && \
  yarn cache clean && \
  rm -rf /usr/local/share/.cache/yarn/* \
  /var/lib/apt/lists/* \
  /var/cache/apk/* \
  /usr/share/man \
  /tmp/* \
  /var/tmp/*  \
  /usr/lib/node_modules/npm/man \
  /usr/lib/node_modules/npm/doc \
  /usr/lib/node_modules/npm/html \
  /usr/lib/node_modules/npm/scripts

EXPOSE 8080 5858

USER node

CMD ["node", ".bin/index.js"]

ONBUILD COPY environment /
