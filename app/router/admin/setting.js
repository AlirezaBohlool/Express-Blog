const express  = require("express");
const router  = express.Router();
const conttrolersetting = require("@controller/admin/setting/conttrolerSetting")

router.get("/",conttrolersetting.index)
router.post("/register",conttrolersetting.register)


module.exports = router