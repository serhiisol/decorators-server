import { Middleware } from '@decorators/express';
import { Request, Response, NextFunction } from 'express';

import { DecodedToken } from '../types';
import { User, UserModel } from '../models';

/**
 * Validate user token
 */
export class UserMiddleware implements Middleware {

  async use(request: Request, _: Response, next: NextFunction) {
    const decodedToken: DecodedToken = request.user.decodedToken;

    const user: User = await UserModel.findById(decodedToken.id);
    request.user.instance = user;

    next();
  }

}
