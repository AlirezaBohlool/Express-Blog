const express  = require("express");
const router  = express.Router();
const conttrolerLogin = require("@controller/auth/login/login")

router.get("/login",conttrolerLogin.showLogin)
router.post("/login",conttrolerLogin.doLogin)
router.get("/register",conttrolerLogin.showRegister)
router.post("/register",conttrolerLogin.doRegister)


module.exports = router