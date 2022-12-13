const express  = require("express");
const router  = express.Router();
const conttrolerPost = require("@controller/admin/post/conttrolerPosts")

router.get("/",conttrolerPost.index)
router.get("/create",conttrolerPost.create)
router.post("/store",conttrolerPost.store)
router.get("/delet/:postId",conttrolerPost.remove)
router.get("/edit/:postId",conttrolerPost.edit)
router.post("/update/:postId",conttrolerPost.update)

module.exports = router