const postModel = require("@models/post");
const commentModel = require("@models/comment");
exports.store = async (req, res) => {
  const PostSlug = req.params.post_slug
  const post = await postModel.findBySlug(PostSlug);
  if (!post) {
    res.redirect("/404");
  }
  const { user_name, user_email, user_url, comment } = req.body;
  const dataComment = {
    author_id: "user" in req.session ? req.session.usr.id : null,
    post_id: post.id,
    user_name,
    user_email,
    user_url,
    comment: comment,
  };
  const insertId = await commentModel.store(dataComment);
  console.log({ insertId });
  if (!insertId) {
    return res.redirect("/404");
  }
  return res.redirect(`/p/${PostSlug}`);
};
