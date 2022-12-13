const postModel = require("@models/post");
const userModel = require("@models/user");
const userService = require("@service/gravatar");
const commentModel = require("@models/comment");
const dateservice = require("@service/dateservice");
const gravatar = require("@service/gravatar");
const _ = require("lodash");
exports.showPost = async (req, res) => {
  const slugPost = req.params.post_slug;
  const post = await postModel.findBySlug(slugPost);
  if (!post) {
    return res.redirect("/404");
  }
  const user = await userModel.find(post.author_id);
  user.avatar = userService.gravatar(user.email);
  post.author = user;
  const comment = await commentModel.findByPostId(post.id);
  const presentedComment = comment.map((comment) => {
    comment.jalali_date = dateservice.dateparse(comment.created_at);
    comment.avatar = gravatar.gravatar(comment.user_email);
    return comment;
  });

  const newComment = _.groupBy(presentedComment, "parent");
  res.send(newComment)
   res.frontRender("front/post/single", {
    post,
    comment: newComment[0],
    bodyClass: "single-post",
    helpers: {
      hasChildren: function (commentId, options) {
        return commentId in newComment;
      },
      getComment: function (commentId, options) {
        return  newComment[commentId];
      },
    },
  });
};
