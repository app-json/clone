var superagent = require("superagent")
var logfmt = require("logfmt")
var express = require("express")
var harp = require("harp")
var app = express()
var bouncer = require('heroku-bouncer')({
  herokuOAuthID      : process.env.HEROKU_OAUTH_ID,
  herokuOAuthSecret  : process.env.HEROKU_OAUTH_SECRET,
  herokuBouncerSecret: process.env.BOUNCER_SECRET
})

app.configure(function(){
  app.set("port", (process.env.PORT || 5000))
  app.set('view engine', 'jade')

  if (process.env.NODE_ENV !== "test")
    app.use(logfmt.requestLogger())
  app.use(express.json())
  app.use(express.urlencoded())
  app.use(express.methodOverride())

  app.use(express.cookieParser(process.env.COOKIE_SECRET))
  app.use(express.cookieSession({
    secret: process.env.SESSION_SECRET,
    cookie: {
      path    : '/',
      signed  : true,
      httpOnly: true,
      maxAge  : null
    }
  }))

  app.use(bouncer.middleware)
  app.use(bouncer.router)
  app.use(express.static(__dirname + "/public"))
  app.use(harp.mount(__dirname + "/public"))
})

app.get('/', function(req, res) {
  res.render('index')
})

app.post('/go', function(req, res) {
  var user = require('github-url-to-object')(req.body.source).user
  var repo = require('github-url-to-object')(req.body.source).repo
  var tarball="https://codeload.github.com/" + user + "/" + repo + "/legacy.tar.gz/master"
  superagent
    .post('https://nyata.herokuapp.com/builds')
    .auth('', req['heroku-bouncer'].token)
    .send({source_blob:{url:tarball}})
    .end(function(buildRes){
      res.json(buildRes.body)
    })
})

app.listen(app.get("port"), function() {
  console.log("Clone is running at localhost:" + app.get("port"))
})
