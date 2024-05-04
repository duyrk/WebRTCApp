import { Request, Response, NextFunction } from 'express'

import { UserModel } from '@src/models'
import { ApiError, verifyToken } from '@src/utils'
import { HTTP_STATUS, config, message } from '@src/constants'

const RequestAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization?.split(' ')

  if (authorization) {
    const isSupportToken = authorization[0] === 'Bearer'
    if (isSupportToken) {
      const tokenValue = authorization[1]

      try {
        const tokenData = await verifyToken({
          token: tokenValue,
          secretOrPublicKey: config.jwt.accessTokenSecret,
        })

        const hasUser = await UserModel.aggregate([
          { $project: { id: 1 } },
          { $match: { id: tokenData.id } },
          { $limit: 1 },
        ])

        if (hasUser) {
          next()
        } else {
          throw new ApiError({
            statusCode: HTTP_STATUS.FORBIDDEN,
            message: message.notFound('User'),
          })
        }
      } catch (e) {
        throw new ApiError({
          statusCode: HTTP_STATUS.UNAUTHORIZED,
          message: 'Invalid token',
        })
      }
    }
  } else {
    throw new ApiError({
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: 'Invalid token',
    })
  }
}

export default RequestAuth
