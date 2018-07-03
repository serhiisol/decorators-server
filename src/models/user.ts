import { Document, Model as MongooseModel } from 'mongoose';
import {
  model,
  Model,
  SchemaField,
  Instance,
  Static
} from '@decorators/mongoose';

import { Facebook, FacebookProfile } from '../types';

@Model('User')
export class User {

  /**
   * Create user's profile out of facebook data
   *
   * @param {FacebookProfile} profile
   * @param {string} token
   * @returns
   */
  @Static()
  static create(profile: FacebookProfile, token: string) {
    let user: User = new User();
    user.fullName = profile.displayName;
    user.email = profile.emails[0].value;
    user.profilePicture = profile.photos[0].value;

    user.facebook.id = profile.id;
    user.facebook.token = token;

    return user;
  }

  @SchemaField({
    id: String,
    token: String,
    email: String,
    name: String
  })
  facebook: Facebook;

  @SchemaField(String)
  fullName: string;

  @SchemaField(String)
  profilePicture: string;

  /**
   * Email
   *
   * @type {string}
   */
  @SchemaField(String)
  email: string;

  /**
   * Converts user model to plain object
   *
   * @returns {object}
   */
  @Instance()
  toJSON(): object {
    return {
      id: this._id,
      fullName: this.fullName,
      email: this.email,
      profilePicture: this.profilePicture
    };
  }

}
export interface User extends Document {}

export const UserModel = model<MongooseModel<User> & typeof User>(User);
