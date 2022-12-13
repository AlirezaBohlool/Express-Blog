const adminRouter = require("./admin/index")
const authRouter = require("./auth/login")
const auth = require("@middleware/auth")
const admin = require("@middleware/admin")
const guest = require("@middleware/guest")
const controllerAuth = require("@controller/auth/login/login")
const frontRouter = require("./front/index")

module.exports = app =>{
    app.use('/',frontRouter)
    app.use("/admin",[admin,auth],adminRouter)
    app.use("/auth",[guest],authRouter)
    app.use('/logout',controllerAuth.logout)

}