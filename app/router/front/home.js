const express  = require("express");
const router  = express.Router();
const conttrolerFront = require("@controller/front/home")

router.get("/",conttrolerFront.index)
router.get("/search",conttrolerFront.search)

module.exports = router