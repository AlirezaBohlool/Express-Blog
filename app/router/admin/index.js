const express  = require("express");
const router  = express.Router();

// router
const dashboradRouter = require("./dashborad")
const postsRourer = require("./posts")
const commentRouter = require("./comment")
const userRouter = require("./user")
const settingRouter = require("./setting")


router.use('/dashborad',dashboradRouter)
router.use("/posts",postsRourer)
router.use("/comment",commentRouter)
router.use("/users",userRouter)
router.use("/setting",settingRouter)

module.exports = router

