import { JoiInstance } from '.'

const pattern = {
  password: (value: string, helpers: any) => {
    if (value.length < 8) {
      return helpers.message('Password must be at least 8 characters')
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
      return helpers.message(
        'Password must contain at least 1 letter and 1 number',
      )
    }
    return value
  },
  email: (value: string, helpers: any) => {
    if (!value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      return helpers.message('Please provide a valid email')
    }
    return value
  },
}

export const LoginSchema = {
  body: JoiInstance.object({
    username: JoiInstance.string().min(1).required(),
    password: JoiInstance.string().min(8).custom(pattern.password).required(),
  }),
}

export const RegisterSchema = {
  body: JoiInstance.object({
    username: JoiInstance.string().min(1).required(),
    email: JoiInstance.string().custom(pattern.email).required(),
    password: JoiInstance.string().min(8).custom(pattern.password).required(),
  }),
}
