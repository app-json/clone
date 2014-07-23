require('dotenv').load()

var superagent = require("superagent")
var logfmt = require("logfmt")
var express = require("express")
var harp = require("harp")
var app = express()

app.set("port", (process.env.PORT || 5000))
app.set('view engine', 'jade')
app.use(logfmt.requestLogger())
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(__dirname + "/public"))
app.use(harp.mount(__dirname + "/public"))

app.get('/', function(req, res) {
  res.render('index')
})

app.get('/apps/:user/:repo', function(req, res) {
  res.render('show')
})

app.listen(app.get("port"), function() {
  console.log("Clone is running at localhost:" + app.get("port"))
})
