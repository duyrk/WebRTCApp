import mongoose from 'mongoose'

import { config, ERole } from '@constants'
import { customLogsColor, hashPassword, logger } from '@src/utils'
import { UserModel } from '@models'

export class DbServices {
  static async connect() {
    if (!mongoose.connections[0].readyState) {
      mongoose.set({
        strictQuery: false,
      })
      await mongoose.connect(config.mongodb.url)
      logger.info(
        `[${process.pid}] 🧭 ${customLogsColor.pink}Connected to mongodb`,
      )
      await this.createInitData()
    }
  }

  static async createInitData() {
    const adminAccount = await UserModel.findOne({ role: ERole.ADMIN }).lean()
    if (!adminAccount) {
      await UserModel.create({
        role: ERole.ADMIN,
        email: config.defaultAccount.email,
        username: config.defaultAccount.username,
        avatar: `https://robohash.org/kurosawanime?set=set4`,
        password: hashPassword(config.defaultAccount.password),
      })
    }
  }
}
