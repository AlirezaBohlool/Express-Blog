const express  = require("express");
const router  = express.Router();
const homeRouter = require("./home")
const singleRouter = require("./single")

router.use("/",homeRouter)
router.use("/",singleRouter)


module.exports = router