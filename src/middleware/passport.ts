import { use, serializeUser, deserializeUser, authenticate as _authenticate, AuthenticateOptions } from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Middleware } from '@decorators/express';

import { FacebookProfile } from '../types';
import { config } from '../config';
import { User, UserModel } from '../models';

/**
 * Configure passport to validate facebook authentication
 *
 * @export
 */
export function configurePassport() {

  serializeUser((user: {id: string}, done) => done(null, user.id));

  deserializeUser((id, done) => UserModel.findById(id, done));

  async function processUser(accessToken: string, profile: FacebookProfile): Promise<User> {
    let user: User = await UserModel.findOne({ 'facebook.id': profile.id });

    if (!user) {
      user = User.create(profile, accessToken);

      await user.save();
    }

    return user;
  }

  use(
    new FacebookStrategy({
      clientID: config.facebookAppId,
      clientSecret: config.facebookAppSecret,
      callbackURL: config.facebookAppCallback,
      profileFields: ['id', 'displayName', 'picture.type(large)', 'email']
    }, (accessToken: string, _, profile: any, done) => {

      processUser(accessToken, profile)
        .then(user => done(null, user))
        .catch(done);

    })
  );

}

/**
 * Facebook authenticate middleware
 *
 * @param {AuthenticateOptions} [scope]
 */
export function authenticate(scope?: AuthenticateOptions) {
  return class FacebookMiddleware implements Middleware {
    use = _authenticate('facebook', scope);
  };
}
