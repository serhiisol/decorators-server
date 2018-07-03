import { Injectable } from '@decorators/di';

import { DecodedToken, SessionTokens } from '../types';
import { User, Session, SessionModel } from '../models';
import { ServerError, ErrorCodes } from '../errors';
import { JWT } from './jwt';

@Injectable()
export class TokenService {

  constructor(private jwt: JWT) {}

  /**
   * Checks if access token is valid and user has access to the system
   *
   * @param {string} accessToken
   *
   * @returns {Promise<boolean>}
   */
  async validateAccessToken(accessToken: string): Promise<DecodedToken> {
    const session: Session = await SessionModel.findOne({ accessToken });

    if (!session) {
      throw ServerError.unauthorized('User with that token not found', ErrorCodes.TokenInvalid);
    }

    return this.verifyToken(accessToken);
  }

  /**
   * Checks if refresh token is valid and user has access to the system
   *
   * @param {string} accessToken
   * @returns {Promise<boolean>}
   */
  async validateRefreshToken(refreshToken: string): Promise<DecodedToken> {
    const session: Session = await SessionModel.findOne({ refreshToken });

    if (!session) {
      throw ServerError.unauthorized('User with that token not found', ErrorCodes.RefreshTokenInvalid);
    }

    return this.verifyToken(refreshToken, true);
  }

  /**
   * Update or create session for user
   *
   * @param {User} user
   * @returns {Promise<SessionTokens>}
   */
  async ensureSession(user: User): Promise<SessionTokens> {
    let session: Session = await SessionModel.findOne({ user }).populate('user').exec();

    if (!session) {
      session = new SessionModel();
      session.user = user;
    }

    return this.updateSession(session);
  }

  /**
   * Refresh session
   *
   * @param {string} refreshToken
   * @returns {Promise<SessionTokens>}
   */
  async refreshSession(refreshToken: string): Promise<SessionTokens> {
    const session: Session = await SessionModel.findOne({ refreshToken }).populate('user').exec();

    if (!session) {
      throw ServerError.unauthorized('User with that token not found', ErrorCodes.RefreshTokenInvalid);
    }

    await this.validateRefreshToken(refreshToken);

    return this.updateSession(session);
  }

  /**
   * Update session with new tokens for user
   *
   * @param {Session} session
   * @param {User} user
   *
   * @returns {Promise<SessionTokens>}
   */
  private async updateSession(session: Session): Promise<SessionTokens> {
    session.accessToken = this.jwt.signToken(session.user.toJSON(), this.jwt.JWT_ACCESS_OPTIONS);
    session.refreshToken = this.jwt.signToken(session.user.toJSON(), this.jwt.JWT_REFRESH_OPTIONS);

    await session.save();

    return {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken
    };
  }
  /**
   * Verify provided token using options
   *
   * @private
   * @param {string} token
   * @param {boolean} [refreshToken=false]
   * @returns
   */
  private async verifyToken(token: string, refreshToken = false): Promise<DecodedToken> {
    try {
      const options = refreshToken ? this.jwt.JWT_REFRESH_OPTIONS : this.jwt.JWT_ACCESS_OPTIONS;
      return await this.jwt.verifyToken(token, options);
    } catch (error) {
      throw this.convertError(error, refreshToken);
    }
  }

  /**
   * Convert JWT error to system error
   *
   * @param {Error} err
   * @param {boolean} [refreshToken=false]
   *
   * @returns {InvoError}
   */
  private convertError(err: Error, refreshToken = false): ServerError {
    let message;
    let code;

    if (err.name === 'TokenExpiredError') {
      message = 'Token expired';
      code = refreshToken ? ErrorCodes.RefreshTokenExpired : ErrorCodes.TokenExpired;
    }

    if (err.name === 'JsonWebTokenError') {
      message = 'Incorrect token';
      code = refreshToken ? ErrorCodes.RefreshTokenInvalid : ErrorCodes.TokenInvalid;
    }

    return ServerError.unauthorized(message, code);
  }

}
