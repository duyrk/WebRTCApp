import { WretchInstance } from '@utils';
import { ILoginRequest, ILoginResponse } from './service';

export const AuthServiceEndpoint = {
  login: 'auth/login',
  register: 'auth/register',
};

export const AuthService = {
  login: async (body: ILoginRequest) => {
    return WretchInstance.post<ILoginRequest, ILoginResponse>(AuthServiceEndpoint.login, body);
  },
} as const;
