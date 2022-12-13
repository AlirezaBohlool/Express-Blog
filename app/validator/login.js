const userModel = require("@models/user");
const userRoles = require("@models/user/userRoles");
const bcrypt = require("@service/bycriptHash");

exports.validetorLogin = async (email, plainPassword) => {
  const user = await userModel.findWithEmail(email);
  if (!user) {
    return false;
  }
  const { password } = user;
  return bcrypt.comperHash(plainPassword, password) ? user : false;
};


exports.validetorRegister = async (email,password,password_confirm) => {
   const find = await userModel.findWithEmail(email);
   if(find){
    return false
   }
   const userInfo = {
    ful_name:"نامشخص",
    email,
    password,
    role:userRoles.USER
   }
  const user = await userModel.store(userInfo)
  return user
};