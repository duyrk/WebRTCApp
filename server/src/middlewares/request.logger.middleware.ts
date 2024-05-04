import { customLogsColor, customLogsText } from '@src/utils'
import { logger } from '@src/utils/logger'
import { NextFunction, Request, Response } from 'express'

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const now = Date.now()
  const url = req.url
  let method: string

  switch (req.method) {
    case 'PUT':
      method = `${customLogsText.bold}${customLogsColor.orange}[${req.method}]${customLogsText.reset}`
      break
    case 'PATCH':
      method = `${customLogsText.bold}${customLogsColor.pink}[${req.method}]${customLogsText.reset}`
      break
    case 'POST':
      method = `${customLogsText.bold}${customLogsColor.lightGreen}[${req.method}]${customLogsText.reset}`
      break
    case 'DELETE':
      method = `${customLogsText.bold}${customLogsColor.red}[${req.method}]${customLogsText.reset}`
      break
    default:
      method = `${customLogsText.bold}${customLogsColor.lightBlue}[${req.method}]${customLogsText.reset}`
      break
  }

  res.on('finish', () => {
    const elapsed = Date.now() - now
    logger.info(`${method} => ${customLogsColor.white}${url} - ${elapsed}ms`)
  })

  next()
}
