const authRouter = require("./auth.routes.js");
const messageRouter = require("./message.routes.js");
const userRouter = require("./user.route.js")
const express = require("express");
const indexRouter = express.Router()

indexRouter.use("/auth", authRouter)
indexRouter.use("/user", userRouter)
indexRouter.use("/message", messageRouter)

module.exports = indexRouter