const express  = require("express");
const router  = express.Router();
const conttroleruser = require("@controller/admin/user/conttrolerusers")

router.get("/",conttroleruser.index)
router.get("/create",conttroleruser.create)
router.post("/store",conttroleruser.store)
router.get("/delet/:userId",conttroleruser.remove)
router.get("/edit/:userId",conttroleruser.edit)
router.post("/update/:userId",conttroleruser.update)

module.exports = router