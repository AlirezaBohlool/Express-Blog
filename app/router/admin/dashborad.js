const express  = require("express");
const router  = express.Router();
const conttrolerAdmin = require("@controller/admin/conttrolerAdmin")

router.get("/",conttrolerAdmin.dashbord)

module.exports = router