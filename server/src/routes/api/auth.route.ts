import { Router } from 'express'

import { asyncCatch } from '@src/utils'
import { validator } from '@src/middlewares'
import { AuthController } from '@src/controllers'
import { LoginSchema, RegisterSchema } from '@src/validators'

export const authRouter = Router()

authRouter.post(
  '/login',
  validator(LoginSchema),
  asyncCatch(AuthController.login),
)
authRouter.post(
  '/register',
  validator(RegisterSchema),
  asyncCatch(AuthController.register),
)
