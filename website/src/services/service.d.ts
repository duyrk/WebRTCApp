import { DefaultResponse } from '@services';
import { IToken, IUser } from '@global/global';

// Auth DTO

interface ILoginResponse extends DefaultResponse {
  data: {
    user: IUser;
    token: IToken;
  };
}

interface ILoginRequest {
  username: string;
  password: string;
}
//   Auth DTO
