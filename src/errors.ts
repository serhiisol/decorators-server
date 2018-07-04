import { config } from './config';

/**
 * Registered error codes in the system
 *
 * @enum {number}
 */
export enum ErrorCodes {

  /**
   * GENERIC ERRORS - 1000
   */
  BadRequest = 1001,
  Unauthorized = 1002,
  NotFound = 1003,
  Conflict = 1004,
  Internal = 1005,

  /**
   * AUTHENTICATION - 2000
   */
  TokenInvalid = 2001,
  TokenExpired = 2002,
  RefreshTokenInvalid = 2003,
  RefreshTokenExpired = 2004,

  /**
   * ACCESS - 3000
   */
  AccessRestricted = 3001

}

export class ServerError extends Error {
  static badRequest(message = 'Bad Request', code = ErrorCodes.BadRequest): ServerError {
    return new ServerError(400, message, code);
  }

  static unauthorized(message = 'Unauthorized', code = ErrorCodes.Unauthorized): ServerError {
    return new ServerError(401, message, code);
  }

  static notFound(message = 'Not Found', code = ErrorCodes.NotFound): ServerError {
    return new ServerError(404, message, code);
  }

  static conflict(message = 'Conflict', code = ErrorCodes.Conflict): ServerError {
    return new ServerError(409, message, code);
  }

  static internalError(message = 'Internal Server Error', code = ErrorCodes.Internal): ServerError {
    return new ServerError(500, message, code);
  }

  message: string;
  status: number;
  code: number;

  constructor(status: number, message: string, code: number) {
    super(message);

    Object.defineProperty(this, 'status', {
      value: status
    });
    Object.defineProperty(this, 'code', {
      value: code
    });

    (Error as any).captureStackTrace(this, this.constructor);
  }

  toObject(): { message: string, status: number, code: number, stack: string[] } {
    return {
      status: this.status,
      message: this.message,
      code: this.code,
      stack: this.toStack()
    };
  }

  private toStack(): string[] {
    if (config.production) {
      return;
    }

    return this.stack.split(/\n/gi);
  }
}
