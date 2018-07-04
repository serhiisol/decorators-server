import { Middleware } from '@decorators/express';
import { Injectable } from '@decorators/di';
import { Request, Response, NextFunction } from 'express';

import { DecodedToken } from '../types';
import { TokenService } from '../services';

/**
 * Validate authorization header
 */
@Injectable()
export class TokenMiddleware implements Middleware {

  constructor(private tokenService: TokenService) {}

  async use(request: Request, _: Response, next: NextFunction) {
    let error;

    try {
      const authorization = request.headers.authorization || '';
      const accessToken = authorization.split(' ')[1];
      const decodedToken: DecodedToken = await this.tokenService.validateAccessToken(accessToken);

      request.user = request.user || {};
      request.user.decodedToken = decodedToken;
    } catch (e) {
      error = e;
    }

    next(error);
  }

}
