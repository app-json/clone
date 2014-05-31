window.apps = []
window.urls = []
// window.App = require("app.json")
window.Cloner = require("app-cloner-heroku")
window.domready = require("domready")
window.superagent = require("superagent")
$ = require('zepto-browserify').$

domready(function(){

  superagent
    .get("http://app-registry.herokuapp.com/apps")
    .end(function(err, res) {
      if (err) return console.error(err)
      urls = res.body
      urls.forEach(function(url) {
        App.fetch(url, function(err, app) {
          if (err) return console.error(app, err)
          if (!app.valid) return console.error("Invalid app", app, app.errors)
          apps.push(app)
          app.getAddonPrices(function(err, prices) {
            if (err) return console.error(app, err)
            app.prices = prices
            // console.log(app)
            $('#apps').append(App.templates.app.render(app))
            if (urls.length === 1) $('#apps .app').addClass('active')
          })
        })
      })
    })


  // When an app is clicked, display a "deploy" button
  $(".app a.activator").live("click", function(event) {
    event.preventDefault()
    $(this).closest('.app').toggleClass("active")
  })

  // When "deploy" is clicked, ajax submit form to local backend
  $("form.deploy").live("submit", function(event) {
    var _form = $(this)
    // Prevent the form from submitting
    event.preventDefault()

    $.getJSON("/token", function(token) {

      var clone = Cloner.new({
        repo: _form.find("input[name='source']").val(),
        token: token
      })

      // console.log({
      //   repo: _form.find("input[name='source']").val(),
      //   token: token
      // })

      clone.on("start", function(payload){
        console.log("start", payload)
      })

      clone.on("create", function(build){
        console.log("create", build)
      })

      clone.on("create", function(build){
        console.log("create", build)
      })

      clone.on("pending", function(){
        console.log("pending")
      })

      clone.on("succeeded", function(build){
        console.log("succeeded", build)
      })

      clone.on("error", function(error){
        console.error(error)
      })

      clone.start()

    })

    // $(_this)
    //   .closest('.app')
    //   .find('.output')
    //   .html(App.templates.build.render(build))

  })

})
