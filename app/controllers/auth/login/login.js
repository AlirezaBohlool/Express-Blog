const validetor = require("@validator/login");
const userRoles = require("@models/user/userRoles");

exports.showLogin = (req, res) => {
  res.newRender("auth/login/login", { layout: "login" });
};
exports.doLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await validetor.validetorLogin(email, password);
  if (!user) {
    req.flash("error", ["نامه کاربری یا ایمیل معتبرنیست"]);
    res.redirect("/auth/login");
    return
  }
  req.session.user = user;
  const pathToRoles = user.role === userRoles.ADMIN ? "/admin/dashborad" : "/";
  return res.redirect(pathToRoles);
  res.send(req.body)
};
exports.showRegister = (req, res) => {
  res.newRender("auth/register/",{layout:"login"});
};
exports.doRegister = async (req, res) => {
  const {email,password,password_confirm} = req.body
  const insertId = await validetor.validetorRegister(email,password,password_confirm);
  if(!insertId){
    req.flash("error",["کاربر وجود دارد "])
    res.redirect("/auth/register")
    return
  } 
  res.redirect("/auth/login")
};

exports.logout = async (req,res)=>{
  req.session.destroy(error=>{
    res.redirect('auth/login')
  })
}
