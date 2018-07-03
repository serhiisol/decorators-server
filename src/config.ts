export const config = {
  production: process.env.NODE_ENV === 'production',
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  facebookAppId: process.env.FACEBOOK_APP_ID,
  facebookAppSecret: process.env.FACEBOOK_APP_SECRET,
  facebookAppCallback: process.env.FACEBOOK_APP_CALLBACK,
  jwtIssuer: process.env.JWT_ISSUER,
  jwtAccessExpiration: process.env.JWT_ACCESS_EXPIRATION,
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
};
