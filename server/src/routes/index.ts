import { Router, Request, Response } from 'express'

import { apiRouter } from './api'

export const mainRouter = Router()

mainRouter.get('', (req: Request, res: Response) => {
  res.json({ message: "What's up! bro" })
})

mainRouter.use('/api', apiRouter)
