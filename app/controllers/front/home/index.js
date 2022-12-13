const presentre = require("@presenters/");
const postModel = require("@models/post");
exports.index = async (req, res) => {
  const page = "page" in req.query ? parseInt(req.query.page) : 1;
  const perpage = 10;
  const totalPost = await postModel.findAllPost();
  const totalPage = Math.ceil(totalPost / perpage);
  const pagination = {
    totalPage,
    page,
    nextPage: page < totalPage ? page + 1 : page,
    perPage: page > 1 ? page-1 : 1 ,
    hasNextPage:page<totalPage,
    hasPrePage:page>1
  };
  const posts = await postModel.findAll(page, perpage);
  const presentedPost = posts.map((post) => {
    const presented = new presentre(post);
    post.jalaliDate = presented.jalaliPer();
    post.expert = presented.expert();
    return post;
  });
  const recently = posts.splice(0,3);
  console.log(recently)
  res.frontRender("front/home/home", {
    layout: "front",
    recently,
    post: presentedPost,
    pagination,
    helpers:{
        isDisabled:function(disabled,options){
            return !disabled ? "disabled" : ""; 
        }
    }
  });
};

exports.search = async(req,res)=>{
  const query = req.query.keyword
  const post = await postModel.findByKeyword(query);

  const presentedPost = post.map((post) => {
    const presented = new presentre(post);
    post.jalaliDate = presented.jalaliPer();
    post.expert = presented.expert();
    return post;
  });
  res.frontRender("front/home/search", {
    layout: "front",
    post: presentedPost,
  });
}
