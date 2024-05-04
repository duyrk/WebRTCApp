import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

export const config = {
  port: process.env.PORT || 3000,
  mode: process.env.MODE || 'dev',
  mongodb: {
    url: process.env.MONGO_URL as string,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  session: {
    secret: process.env.SESSION_SECRET,
  },
  jwt: {
    passwordSalt: process.env.PASSWORD_SALT,
    passwordSecret: process.env.PASSWORD_SECRET,
    accessTokenSecret: process.env.JWT_SECRET_ACCESS_TOKEN,
    freshTokenSecret: process.env.JWT_SECRET_REFRESH_TOKEN,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
  defaultAccount:{
    email: process.env.DEFAULT_EMAIL,
    username: process.env.DEFAULT_USER_NAME,
    password: process.env.DEFAULT_PASSWORD
  }
} as const
