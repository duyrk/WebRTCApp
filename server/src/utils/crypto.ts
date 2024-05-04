import { config } from '@src/constants'
import { SHA256 } from 'crypto-js'

export function hashPassword(password: string) {
  const salt = config.jwt.passwordSalt
  const hash = SHA256(password + salt).toString()
  return hash
}

export function comparePassword(password: string, hash: string) {
  return hashPassword(password) === hash
}
