const { sendMessage, getConversation, searchUsers } = require("../controllers/messages.controller")
const { isAuth } = require("../middlewares/isAuth")
const upload = require("../middlewares/multer")

const messageRouter = require("express").Router()

messageRouter.post("/sendMessage/:reciverId", isAuth, upload.single("image"), sendMessage);
messageRouter.get("/getConversation/:reciverId", isAuth, getConversation)
messageRouter.get("/searchUsers", isAuth, searchUsers)

module.exports = messageRouter