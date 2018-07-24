import { Controller, Get, Post, Body, Request as Req, Response as Res } from '@decorators/express';
import { Request, Response } from 'express';
import { Injectable } from '@decorators/di';

import { TokenService } from '../services';
import { authenticate, TokenMiddleware, UserMiddleware } from '../middleware';
import { User } from '../models';

@Injectable()
@Controller('/auth')
export class AuthController {

  constructor(private tokenService: TokenService) {}

  /**
   * Redirects back to facebook to get code
   */
  @Get('/facebook', [authenticate({ scope : 'email' })])
  facebook() {}

  /**
   * Validates received code and creates internal session using JWT
   *
   * @param {Request} req
   * @param {Response} res
   */
  @Get('/facebook/authorize', [authenticate()])
  async authorize(
    @Req() req: Request,
    @Res() res: Response
  ) {
    const accessData = await this.tokenService.ensureSession(req.user as User);
    res.send(accessData);
  }

  /**
   * Refresh internal session using JWT
   *
   * @param {Response} res
   * @param {string} refreshToken
   */
  @Post('/refresh')
  async refresh(
    @Res() res: Response,
    @Body('refreshToken') refreshToken: string
  ) {
    const accessData = await this.tokenService.refreshSession(refreshToken);
    res.send(accessData);
  }

  /**
   * Refresh internal session using JWT
   *
   * @param {Request} req
   * @param {Response} res
   */
  @Get('/profile', [TokenMiddleware, UserMiddleware])
  async profile(
    @Req() req: Request,
    @Res() res: Response
  ) {
    res.send((req.user.instance as User).toJSON());
  }

}
