import winston from 'winston'

import { config } from '@src/constants'
import { customLogsColor } from './customLoggerColor'

const { combine, timestamp, printf, colorize } = winston.format

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
}
winston.addColors(colors)

// Log Format
const logFormat = combine(
  timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  printf((info) => {
    if (info.stack) {
      return `${info.timestamp} | ${info.message} \n Error Stack: ${info.stack} \n`
    }
    return `${info.message} | ${customLogsColor.yellow}${info.timestamp}`
  }),
)

const level = () => {
  const env = config.mode || 'dev'
  const isDevelopment = env === 'dev'
  return isDevelopment ? 'debug' : 'http'
}

const consoleOpts = {
  handleExceptions: true,
  level: config.mode === 'production' ? 'error' : 'debug',
  format: combine(
    colorize({ all: true }),
    timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  ),
}

const transports = [new winston.transports.Console(consoleOpts)]

export class Logging {
  private readonly logger = winston.createLogger({
    level: level(),
    levels,
    format: logFormat,
    transports,
  })

  info(message: string) {
    this.logger.info(message)
  }

  error(message: string) {
    this.logger.error(message)
  }

  debug(message: string) {
    this.logger.debug(message)
  }
}

export const logger = new Logging()
