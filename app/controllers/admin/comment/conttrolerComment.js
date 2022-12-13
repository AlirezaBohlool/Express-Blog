const dateservice = require("@service/dateservice");
const langservice = require("@service/langservice");
const gravatarservice = require("@service/gravatar");
const commentModel = require("@models/comment");

exports.index = async (req, res) => {
  const comments = await commentModel.findAll();
  console.log(comments)
  const persentedcomment = comments.map((comment) => {
    comment.gravatar = gravatarservice.gravatar(comment.user_email);
    comment.created_at_persion = dateservice.dateparse(comment.created_at);
    return comment;
  });

  res.adminRender("admin/comment/comment", {
    layout: "admin",
    comments: persentedcomment,helpers:{
      isreject:(status,options)=>{

         let classCss = "";

         switch (true) {
            case  status === 0:
               classCss ="alert-danger"
               break;
            case  status === 1:
               classCss = "alert"
            default:
               break;
         }
         return classCss
      }
    }
  });
};

exports.reject = async (req, res) => {
  const commentId = await req.params.commentId;
  if(commentId===0){
    res.redirect("admin/comment");
    return
  }
    const result = commentModel.reject(commentId)
    res.redirect("/admin/comment")
}


exports.accept = async (req, res) => {
  const commentId = await req.params.commentId;
  if(commentId === 1){
    res.redirect("admin/comment");
    return
  }
    const result = commentModel.accept(commentId)
    res.redirect("/admin/comment")
}