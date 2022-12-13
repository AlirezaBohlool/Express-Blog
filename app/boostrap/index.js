const express = require("express");
const hbs= require("express-handlebars");
const path = require("path");
const bodyparser = require("body-parser")
const flash = require("connect-flash");
const session = require("express-session");
let RedisStore = require("connect-redis")(session);
const { createClient } = require("redis")
let redisClient = createClient({ legacyMode: true })
redisClient.connect().catch(console.error)

module.exports = (app) => {
  app.use(bodyparser(bodyparser.json()));
  app.use(bodyparser(bodyparser.urlencoded()));
  app.use(flash())
  app.use(session({
    secret: 'codeforgeek',
    store: new RedisStore({ client: redisClient}),
    saveUninitialized: true,
    resave: true,
    unset:"destroy",
}));
  app.engine("handlebars",hbs.engine());
  app.set("view engine", "handlebars");
  app.set("views", path.join(__dirname, "../views"));
  app.use('/static',express.static(path.join(__dirname,"../../public")))
};
