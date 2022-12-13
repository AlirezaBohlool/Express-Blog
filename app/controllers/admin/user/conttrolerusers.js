const userModel = require("@models/user");
const dateservice = require("@service/dateservice");
const uservalidate = require("@validator/user")

exports.index = async (req, res) => {
  const user = await userModel.findAll("*");
  const persenteduser = user.map((user)=>{
    user.created_at_persion = dateservice.dateparse(user.created_at) 
    return user
  })
  res.render("admin/user/index", { layout: "admin", user:persenteduser });
};


exports.create = async (req, res) => {
  const users = await userModel.findAll("ful_name,id");
  res.render("admin/user/createuser", { layout: "admin", users });
};

exports.store = async (req, res) => {

  const data = {
    ful_name:req.body.ful_name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };

  const errors = await uservalidate.validatvalue(req);

  if (errors.length > 0) {
    return res.render("admin/user/createuser", {layout: "admin",errors});
  }
  const insertId = userModel.store(data);

  if (insertId) {
    res.redirect("/admin/users");
  }

};

exports.remove =async (req, res) => {
  const userId = req.params.userId;
  if (userId === 0) {
    res.redirect("/admin/users");
  }
  
  const result = await userModel.delete(userId);

  if(result){
    res.redirect("/admin/users")
  }
};


exports.edit = async (req,res)=>{
  const userId = req.params.userId;
  if (userId === 0) {
    res.redirect("/admin/users");
  }
  
  const user = await userModel.find(userId);  
  console.log(user)
  
  res.render("admin/user/edit", { layout: "admin",user});

}

exports.update = async (req,res)=>{
  const userId = req.params.userId;
  if (userId === 0) {
    res.redirect("/admin/users");
  }
  const data = {
    author_id: 1,
    title: req.body.title,
    slug: req.body.slug,
    content: req.body.content,
    status: req.body.status,
  };
  const user = await userModel.update(data,userId);
  return res.redirect("/admin/users")
  
}