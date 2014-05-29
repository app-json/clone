require('dotenv').load()
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

app.set("port", (process.env.PORT || 5000))
app.set('view engine', 'jade')
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

var apps = []

app.get('/', function(req, res) {
  res.render('index')
})

app.get('/apps/:user/:repo', function(req, res) {
  res.render('show')
})

app.post('/go', function(req, res) {
  var user = require('github-url-to-object')(req.body.source).user
  var repo = require('github-url-to-object')(req.body.source).repo
  var tarball="https://api.github.com/repos/" + user + "/" + repo + "/tarball"

  superagent
    .post('https://api.heroku.com/app-setups')
    .set('Accept', 'application/vnd.heroku+json; version=3')
    .set('Content-Type', 'application/json')
    .auth('', req['heroku-bouncer'].token)
    .send({source_blob:{url:tarball}})
    .end(function(buildRes){
      // console.log("buildRes.body", buildRes.body)
      res.json(buildRes.body)
    })
})

app.listen(app.get("port"), function() {
  console.log("Clone is running at localhost:" + app.get("port"))
})
