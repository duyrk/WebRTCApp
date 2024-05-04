import { IUser } from '../models'
import { DefaultResponse } from '../defaultRes'

export interface IToken {
  accessToken: string
  refreshToken: string
  accessTokenExpiresIn: number
  refreshTokenExpiresIn: number
}

export interface TokenPayload {
  id: string
  email: string
}

export interface ILoginRequest {
  username: string
  password: string
}

export interface ILoginDataResponse {
  user: IUser
  token: IToken
}

export interface ILoginResponse extends DefaultResponse<ILoginDataResponse> {}

export interface IRegisterRequest {
  email: string
  password: string
  username: string
}

export interface IOAuth {
  token: string
}
