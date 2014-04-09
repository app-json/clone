var HerokuStrategy, passport

passport = module.exports = require('passport')

HerokuStrategy = require('passport-heroku').Strategy

passport.serializeUser(function(user, done) {
  return done(null, user)
})

passport.deserializeUser(function(obj, done) {
  return done(null, obj)
})

if (process.env.NODE_ENV === "production") {
  passport.host = "https://nomnom.heroku.com"
} else {
  passport.host = "http://127.0.0.1:5000"
}

passport.use(new HerokuStrategy({
  clientID: process.env.HEROKU_OAUTH_ID,
  clientSecret: process.env.HEROKU_OAUTH_SECRET,
  callbackURL: "" + passport.host + "/auth/heroku/callback"
}, function(accessToken, refreshToken, profile, done) {
  return process.nextTick(function() {
    return done(null, profile)
  })
}))

passport.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.redirect("/auth/heroku")
}
