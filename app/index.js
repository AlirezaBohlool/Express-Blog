require("dotenv").config();
const express = require("express");
const app = express();

//Middleware
require("./boostrap")(app);
require("./middleware/render")(app);

//router
require("./router/index")(app);


module.exports = () => {
  app.listen(5000, () => {
    console.log(`application run in port ${process.env.APP_PORT}`);
  });
};
