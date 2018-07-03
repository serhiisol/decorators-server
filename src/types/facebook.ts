/**
 * Facebook profile
 *
 * @interface FacebookProfile
 */
export interface FacebookProfile {
  id: string;
  displayName: string;
  emails?: Array<{ value: string }>;
  photos: Array<{ value: string }>;
}

/**
 * Facebook data saved in DB
 *
 * @interface Facebook
 */
export interface Facebook {
  id: string;
  token: string;
  email: string;
  name: string;
}
