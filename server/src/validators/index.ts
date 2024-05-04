import Joi from 'joi'

export const JoiInstance = Joi.defaults((schema) =>
  schema.options({
    errors: {
      wrap: {
        // Remove quotes from variable names in error messages
        label: false,
      },
    },
  }),
)

export * from './test.validator'
export * from './auth.validator'
