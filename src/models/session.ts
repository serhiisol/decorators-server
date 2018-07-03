import { Injectable } from '@decorators/di';
import { Document, Model as MongooseModel } from 'mongoose';
import { model, Model, SchemaField, ref } from '@decorators/mongoose';

import { User } from './user';

@Injectable()
@Model('Session')
export class Session {

  /**
   * User ref
   *
   * @type {UserType}
   */
  @SchemaField(ref('User'))
  user: User;

  /**
   * Access token
   *
   * @type {string}
   */
  @SchemaField(String)
  accessToken: string;

  /**
   * Refresh token
   *
   * @type {string}
   */
  @SchemaField(String)
  refreshToken: string;

}
export interface Session extends Document {}

export const SessionModel = model<MongooseModel<Session> & typeof Session>(Session);
