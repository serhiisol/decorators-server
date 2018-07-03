/**
 * JWT Options config
 *
 * @interface JWTOptions
 */
export interface JWTOptions {
  issuer: string;
  expiresIn: number|string;
}

/**
 * Decoded Session token data
 *
 * @interface DecodedToken
 */
export interface DecodedToken {
  id: string;
}

/**
 * Session tokens
 * @description Return when user authorizes in the system
 * or updates it
 * @interface SessionTokens
 */
export interface SessionTokens {
  accessToken: string;
  refreshToken: string;
}
