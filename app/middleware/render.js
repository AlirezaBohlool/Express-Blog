const gravatar = require("@service/gravatar")
module.exports = app => {

  app.use((req,res,next)=>{

    const error = req.flash("error")
    const success = req.flash("success")
    const hasError = error.length > 0
    let user = null
    if("user" in req.session){
      user = req.session.user
      user.gravatar = gravatar.gravatar(user.email)
    }
    res.newRender = function (templet, options) {
      options = { ...options, error, success, hasError };
      res.render(templet, options);
    };

    res.adminRender = function (templet, options) {
      options = { ...options, error, success, hasError,user};
      res.render(templet, options);
    };

    res.frontRender = function (templet, options) {
      options = {layout:"front",bodyClass:"bg-gray",...options};
      res.render(templet,options);
    };


    next();

   })

};