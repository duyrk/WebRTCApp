import { config } from '@src/constants'
import { ISignTokenResponse, TokenPayload } from '@src/interfaces'
import dayjs from 'dayjs'
import jwt, { SignOptions } from 'jsonwebtoken'

import 'dayjs/locale/vi'

export const signToken = ({
  payload,
  privateKey,
  options = {
    algorithm: 'HS256',
  },
}: {
  payload: string | object | Buffer
  privateKey: string
  options?: SignOptions
}) => {
  return new Promise<ISignTokenResponse>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (_err, _token) => {
      if (_err) {
        reject(_err)
      }
      resolve({
        token: _token,
        expiresIn: dayjs(options?.expiresIn).valueOf(),
      })
    })
  })
}

export const verifyToken = ({
  token,
  secretOrPublicKey = config.jwt.passwordSecret as string,
}: {
  token: string
  secretOrPublicKey?: string
}) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, (_err, _decoded) => {
      if (_err) {
        throw reject(_err)
      }
      resolve(_decoded as TokenPayload)
    })
  })
}
