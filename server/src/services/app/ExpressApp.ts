import session from "cookie-session";
import cors from "cors";
import express from "express";

import { config } from "@constants";
import { mainRouter } from "@routes";
import {
  errorHandler,
  pageNotFoundError,
  requestLogger,
} from "@src/middlewares";
import { customLogsColor, logger } from "@src/utils";
import { DbServices } from "./db.service";
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import { roomHandler } from "@src/handlers/room.handler";
export class ExpressApp {
  static app = express();
  static port = config.port;
  static server = createServer(this.app);

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
      ]);
      const io = new Server(this.server,{
        cors:{
          origin: "*",
          methods: ["GET","POST","PUT","PATCH","DELETE"]
        }
      });
      io.on("connection", (socket) => {
        console.log("server is connected");
        roomHandler(socket)

        socket.on("disconnect", () => {
          console.log("server is disconnected");
        });
      });
      this.server.listen(this.port, () => {
        logger.info(
          `[${process.pid}] 🚩 ${customLogsColor.pink}Server start at port ${this.port}`
        );
      });

      //handle db
      await DbServices.connect();
    } catch (e) {
      logger.error(e.stack);
    }
  }

  static useMiddlewares(middlewares: Array<any>) {
    for (const middleware of middlewares) {
      this.app.use(middleware);
    }
  }
}
