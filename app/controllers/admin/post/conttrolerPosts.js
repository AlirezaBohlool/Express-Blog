const postModel = require("@models/post");
const dateservice = require("@service/dateservice");
const langservice = require("@service/langservice");
const userModel = require("@models/user");
const postvalidat = require("@validator/post");
exports.index = async (req, res) => {
  const post = await postModel.findAll();
  const persentedpost = post.map((post) => {
    post.created_at_persion = dateservice.dateparse(post.created_at);
    post.langnumber = langservice.topersionNumber(post.view);
    return post;
  });
  res.adminRender("admin/posts/index", { layout: "admin", post });
};

exports.create = async (req, res) => {
  const users = await userModel.findAll("ful_name,id");
  res.adminRender("admin/posts/createpost", { layout: "admin", users });
};

exports.store = async (req, res) => {
  const data = {
    author_id: 1,
    title: req.body.title,
    slug: req.body.slug,
    content: req.body.content,
    status: req.body.status,
  };

  const errors = await postvalidat.validatvalue(req);

  if (errors.length > 0) {
    const users = await userModel.findAll("ful_name,id");
    return res.adminRender("admin/posts/createpost", {
      layout: "admin",
      errors,
      users,
    });
  }
  const insertId = postModel.store(data);

  if (insertId) {
    res.redirect("/admin/posts");
  }
};

exports.remove = async (req, res) => {
  const postId = req.params.postId;
  if (postId === 0) {
    res.redirect("/admin/posts");
  }
  
  const result = await postModel.delete(postId);

  if(result){
    res.redirect("/admin/posts")
  }
};


exports.edit = async (req,res)=>{
  const postId = req.params.postId;
  if (postId === 0) {
    res.redirect("/admin/posts");
  }
  
  const post = await postModel.find(postId);  
  const users = await userModel.findAll("ful_name,id");
  res.adminRender("admin/posts/edit", { layout: "admin", users,post,helpers:{
    isPostAuthor:function(userId,options){
      return post.author_id === userId ? options.fn(this) : options.inverse(this);
    },
    isPostStatus:function(status,options){
      return post.status===status?options.fn(this):options.inverse(this); 
    }
  } 
});

}

exports.update = async (req,res)=>{
  const postId = req.params.postId;
  if (postId === 0) {
    res.redirect("/admin/posts");
  }
  const data = {
    author_id: 1,
    title: req.body.title,
    slug: req.body.slug,
    content: req.body.content,
    status: req.body.status,
  };
  const post = await postModel.update(data,postId);
  return res.redirect("/admin/posts")

}
