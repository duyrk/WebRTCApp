import Joi from 'joi'
import { HTTP_STATUS, config } from '@src/constants'

import { queryFilter } from '@src/utils'
import { ApiError } from '@src/utils/ApiError'
import { Request, Response, NextFunction } from 'express'

export const validator =
  (schema) => (req: Request, res: Response, next: NextFunction) => {
    const validSchema = queryFilter(schema, ['params', 'query', 'body', 'file'])
    const object = queryFilter(req, Object.keys(validSchema))
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(object)

    if (error) {
      const errorMessage =
        config.mode === 'dev' ? error.message : 'Validation failed'
      throw new ApiError({
        message: errorMessage,
        statusCode: HTTP_STATUS.BAD_REQUEST,
      })
    }

    Object.assign(req, value)
    next()
  }
