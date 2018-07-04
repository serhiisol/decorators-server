import { ErrorMiddleware } from '@decorators/express';
import { Request, Response, NextFunction } from 'express';

import { ServerError } from '../errors';
import { createLogger, Logger } from '../utils';

export class ServerErrorMiddleware implements ErrorMiddleware {
  private logger: Logger = createLogger('ServerErrorMiddleware');

  use(error: Error, _request: Request, response: Response, _next: NextFunction) {
    this.logger.error('Server Error', error);

    let status = 500;
    let payload = { error: ServerError.internalError().toObject() };

    if (error instanceof ServerError) {
      status = error.status;
      payload = { error: error.toObject() };
    }

    response.status(status).json(payload);
  }

}
