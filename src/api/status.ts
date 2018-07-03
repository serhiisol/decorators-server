import { Controller, Get, Response as Res } from '@decorators/express';
import { Response } from 'express';

@Controller('/status')
export class StatusController {

  /**
   * Server status endpoint
   * @param {Response} res
   */
  @Get('/')
  public async status(@Res() res: Response) {
    res.status(200).send({ status: 'OK' });
  }

}
