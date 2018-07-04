import { Container } from '@decorators/di';
import { attachControllers, ERROR_MIDDLEWARE } from '@decorators/express';
import { json, urlencoded } from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';
import { initialize as initializePassport } from 'passport';

import { configurePassport, ServerErrorMiddleware } from './middleware';
import { StatusController, AuthController } from './api';

export function init(): express.Application {
  const app: express.Express = express();

  configurePassport();

  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(initializePassport());
  app.use(cors());

  Container.provide([
    { provide: ERROR_MIDDLEWARE, useClass: ServerErrorMiddleware }
  ]);

  attachControllers(app, [
    StatusController,
    AuthController
  ]);

  return app;
}
