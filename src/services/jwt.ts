import { Injectable } from '@decorators/di';
import { verify, sign } from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { config } from '../config';
import { JWTOptions, DecodedToken } from '../types';

/**
 * JWT Utility class
 *
 * @export
 * @class JWT
 */
@Injectable()
export class JWT {

  /**
   * JWT access token options
   *
   * @type {JWTOptions}
   */
  JWT_ACCESS_OPTIONS: JWTOptions = {
    issuer: config.jwtIssuer,
    expiresIn: config.jwtAccessExpiration
  };

  /**
   * JWT refresh token options
   *
   * @type {JWTOptions}
   */
  JWT_REFRESH_OPTIONS: JWTOptions = {
    issuer: config.jwtIssuer,
    expiresIn: config.jwtRefreshExpiration
  };

  /**
   * Certificate
   *
   * @type {string}
   */
  cert = config.production ? readFileSync(resolve(__dirname, 'key', 'private.key')) : 'temp-key-secret';

  /**
   * Sign data using passed options
   *
   * @param {*} data
   * @param {JWTOptions} options
   *
   * @returns {string}
   */
  signToken(data: any, options: JWTOptions): string {
    return sign(data, this.cert, options);
  }

  /**
   * Verify and retrieve token using passed options
   *
   * @param {string} token
   * @param {JWTOptions} options
   *
   * @returns {Promise<DecodedToken>}
   */
  verifyToken(token: string, options: JWTOptions): Promise<DecodedToken> {
    return new Promise((res, reject) => {
      verify(token, this.cert, options, (err: Error, decoded: any) =>
        err ? reject(err) : res(decoded)
      );
    });
  }

}
