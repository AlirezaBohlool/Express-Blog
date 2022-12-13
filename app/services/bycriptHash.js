const bcrypt = require("bcrypt");

exports.hashing=(password)=>{
    return bcrypt.hashSync(password,10)
}

exports.comperHash = (password,hash)=>{
  return  bcrypt.compareSync(password,hash);
}
