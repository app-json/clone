var passport  = require("./lib/passport-config")
var logfmt = require("logfmt")
var express = require("express")
var harp = require("harp")
var app = express()

app.configure(function(){
  app.set("port", (process.env.PORT || 5000))
  if (process.env.NODE_ENV !== "test") {
    app.use(logfmt.requestLogger())
  }
  app.use(express.cookieParser())
  app.use(express.json())
  app.use(express.urlencoded())
  app.use(express.methodOverride())
  app.use(express.session({
    secret: process.env.SESSION_SECRET || "fooby dooby"
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(express.static(__dirname + "/public"))
  app.use(harp.mount(__dirname + "/public"))
  app.set('view engine', 'jade')
})

app.get('/', passport.ensureAuthenticated, function(req, res) {
  console.log('got /')
  res.render('index', {})
})

app.get("/auth/heroku", passport.authenticate("heroku"), function(req, res) {
  // noop
})

app.get("/auth/heroku/callback", passport.authenticate("heroku", {
  failureRedirect: "/login"
}), function(req, res) {
  res.redirect("/")
})

app.post('/go', passport.ensureAuthenticated, function(req, res) {
  console.log('post /go', req)
})

// app.get("/logout", function(req, res) {
//   req.logout()
//   res.redirect("/")
// })

app.listen(app.get("port"), function() {
  console.log("Clone is running at localhost:" + app.get("port"))
})
