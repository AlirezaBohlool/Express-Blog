const express  = require("express");
const router  = express.Router();
const conttrolerFront = require("@controller/front/post/index")
const controllerComment = require("@controller/front/comment/index");

router.get("/p/:post_slug",conttrolerFront.showPost)
router.post("/p/:post_slug",controllerComment.store)


module.exports = router