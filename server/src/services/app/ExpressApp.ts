import session from 'cookie-session'
import cors from 'cors'
import express from 'express'

import { config } from '@constants'
import { mainRouter } from '@routes'
import {
  errorHandler,
  pageNotFoundError,
  requestLogger,
} from '@src/middlewares'
import { customLogsColor, logger } from '@src/utils'
import { DbServices } from './db.service'
import bodyParser from 'body-parser'

export class ExpressApp {
  static app = express()
  static port = config.port

  static async start() {
    try {
      this.useMiddlewares([
        requestLogger,
        cors(),
        express.json(),
        session({
          secret: config.session.secret,
        }),

        //logger middleware
        mainRouter,
        pageNotFoundError,
        errorHandler,
      ])
      this.app.listen(this.port, () => {
        logger.info(
          `[${process.pid}] 🚩 ${customLogsColor.pink}Server start at port ${this.port}`,
        )
      })

      //handle db
      await DbServices.connect()
    } catch (e) {
      logger.error(e.stack)
    }
  }

  static useMiddlewares(middlewares: Array<any>) {
    for (const middleware of middlewares) {
      this.app.use(middleware)
    }
  }
}
