import { Request, Response } from 'express'

import {
  DefaultResponse,
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
} from '@src/interfaces'
import { AuthService } from '@src/services'
import { HTTP_STATUS, message } from '@src/constants'

export default class AuthController {
  static async login(
    req: Request<null, null, ILoginRequest>,
    res: Response<ILoginResponse>,
  ) {
    const data = await AuthService.login(req.body)
    return res.json({
      data,
      code: HTTP_STATUS.OK,
      message: message.success('Login'),
    })
  }

  static async register(
    req: Request<null, null, IRegisterRequest>,
    res: Response<DefaultResponse<unknown>>,
  ) {
    const data = await AuthService.register(req.body)
    return res.json({
      data,
      code: HTTP_STATUS.CREATED,
      message: message.success('Register'),
    })
  }
}
