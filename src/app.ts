import { Container } from '@decorators/di';
import { attachControllers, ERROR_MIDDLEWARE } from '@decorators/express';
import { json, urlencoded } from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';
import { initialize as initializePassport } from 'passport';

import { StatusController } from './api';
import { ServerErrorMiddleware } from './middleware';

export function init(): express.Application {
  const app: express.Express = express();

  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(initializePassport());
  app.use(cors());

  attachControllers(app, [
    StatusController
  ]);

  Container.provide([
    { provide: ERROR_MIDDLEWARE, useClass: ServerErrorMiddleware }
  ]);

  return app;
}
