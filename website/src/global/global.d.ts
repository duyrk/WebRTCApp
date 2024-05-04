import { EProvider, ERole } from './enum';

interface IToken {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}

interface IUser {
  _id?: any;
  username: string;
  email: string;
  avatar: string;
  provider: EProvider;
  provider_token?: string;
  collections: Array<string>;
  watched: Array<string>;
  watching: Array<string>;
  to_watch: Array<string>;
  follower: Array<string>;
  following: Array<string>;
  role: ERole;
}
