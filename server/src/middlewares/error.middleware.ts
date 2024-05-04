import { NextFunction, Request, Response } from 'express'

import { HTTP_STATUS, HTTP_STATUS_MESSAGE, config } from '@src/constants'
import { logger } from '@src/utils'
import { DefaultErrorResponse, IHTTPError } from '@src/interfaces'

export const pageNotFoundError = (
  req: Request,
  res: Response<DefaultErrorResponse>,
  next: NextFunction,
) => {
  return res
    .status(HTTP_STATUS.NOT_FOUND)
    .json({ code: HTTP_STATUS.NOT_FOUND, message: 'Page not found' })
}

export const errorHandler = (
  error: IHTTPError,
  req: Request,
  res: Response<DefaultErrorResponse>,
  next: NextFunction,
) => {
  const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER
  const message = error.message || HTTP_STATUS_MESSAGE.GENERIC

  if (config.mode === 'dev') {
    logger.error(`[${req.method.toUpperCase()}] => ${error.message}`)
  }
  return res.status(statusCode).send({ code: statusCode, message })
}
