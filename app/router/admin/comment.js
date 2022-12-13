const express  = require("express");
const router  = express.Router();
const conttrolerComment = require("@controller/admin/comment/conttrolerComment")

router.get("/",conttrolerComment.index);
router.get("/reject/:commentId",conttrolerComment.reject);
router.get("/accept/:commentId",conttrolerComment.accept);


module.exports = router