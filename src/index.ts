import { createServer, Server } from 'http';
import * as mongoose from 'mongoose';

import { config } from './config';
import { logger } from './utils';
import { init as initApp } from './app';

export const httpServer: Server = createServer();

function start(): Server {
  (mongoose as any).Promise = Promise;
  mongoose.connect(config.mongoUri);

  return httpServer.listen(config.port, err => {
    if (err) {
      return console.error(err.message);
    }

    logger.info(`Server is running on port ${config.port}`);
  });
}

async function stop() {
  try {
    mongoose.disconnect();
    httpServer.close();
    process.exit(0);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

async function init() {
  httpServer.addListener('request', initApp());

  process
    .on('SIGINT', await stop)
    .on('SIGTERM', await stop);

  start();
}

init();
