const { getCurrentUser, editProfile, getAllOtherUsers } = require("../controllers/user.controller")
const { isAuth } = require("../middlewares/isAuth")
const upload = require("../middlewares/multer")


const userRouter = require("express").Router()

userRouter.get("/getCurrentUser", isAuth, getCurrentUser)
userRouter.put("/editProfile", isAuth, upload.single("image"), editProfile)
userRouter.get("/getAllOtherUsers", isAuth, getAllOtherUsers)

module.exports = userRouter