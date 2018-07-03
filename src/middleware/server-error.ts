import { ErrorMiddleware } from '@decorators/express';
import { Request, Response, NextFunction } from 'express';

import { ServerError } from '../errors';
import { createLogger, Logger } from '../utils';

export class ServerErrorMiddleware implements ErrorMiddleware {
  private logger: Logger = createLogger('ServerErrorMiddleware');

  public use(error: Error, _request: Request, response: Response, _next: NextFunction) {
    this.logger.error('Server Error', error);

    if (error instanceof ServerError) {
      return response.status(error.status)
        .json({ error: error.toObject() });
    }

    return response.status(500)
      .json({ error: ServerError.internalError().toObject() });
  }

}
