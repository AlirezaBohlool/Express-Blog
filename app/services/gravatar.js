const gravatar = require("gravatar")

exports.gravatar = (userEmail)=>{

    return gravatar.url(userEmail)
    
}