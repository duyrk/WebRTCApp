import dayjs from 'dayjs'

import {
  IUser,
  ILoginRequest,
  IRegisterRequest,
  ILoginDataResponse,
  ISignTokenResponse,
} from '@src/interfaces'
import { UserModel } from '@src/models'
import { HTTP_STATUS, authMessage, config, message } from '@src/constants'
import { ApiError, comparePassword, hashPassword, signToken } from '@src/utils'

export default class AuthService {
  static async signToken(
    user: IUser,
    expiresIn: number,
  ): Promise<ISignTokenResponse> {
    return signToken({
      payload: {
        id: user._id,
        email: user.email,
      },
      privateKey: config.jwt.accessTokenSecret,
      options: {
        expiresIn,
        algorithm: 'HS256',
      },
    })
  }

  static async login(payload: ILoginRequest) {
    const { password, username } = payload

    const user = await UserModel.findOne({ username }).lean()
    if (user) {
      const compare = comparePassword(password, user.password)

      if (compare) {
        delete user.__v
        delete user.password

        const [dataToken, dataRefreshToken] = await Promise.all([
          this.signToken(
            user,
            dayjs()
              .add(Number(config.jwt.accessTokenExpiresIn), 'day')
              .valueOf(),
          ),
          this.signToken(
            user,
            dayjs()
              .add(Number(config.jwt.refreshTokenExpiresIn), 'day')
              .valueOf(),
          ),
        ])

        const data: ILoginDataResponse = {
          token: {
            accessToken: dataToken.token,
            refreshToken: dataRefreshToken.token,
            accessTokenExpiresIn: dataToken.expiresIn,
            refreshTokenExpiresIn: dataRefreshToken.expiresIn,
          },
          user: user,
        }

        return data
      } else {
        throw new ApiError({
          message: authMessage.wrongPassword,
          statusCode: HTTP_STATUS.BAD_REQUEST,
        })
      }
    }

    throw new ApiError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: message.notFound('User'),
    })
  }

  static async register(payload: IRegisterRequest) {
    const { email, password, username } = payload

    const hasUserWithEmail = await UserModel.findOne({ email }).lean()

    if (!hasUserWithEmail) {
      const userCreate = await UserModel.create({
        email,
        username,
        password: hashPassword(password),
        avatar: `https://robohash.org/${username}?set=set4`,
      })

      if (userCreate) {
        delete userCreate.__v
        delete userCreate.password

        return userCreate
      } else {
        throw new ApiError({
          message: message.internal,
          statusCode: HTTP_STATUS.FORBIDDEN,
        })
      }
    } else {
      throw new ApiError({
        message: message
          .alreadyExist('Email')
          .concat('. Please use another email'),
        statusCode: HTTP_STATUS.BAD_REQUEST,
      })
    }
  }
}
