window.apps = []

$(function() {

  $.getJSON("http://app-registry.herokuapp.com/apps", function(urls) {

    console.log(urls)

    urls.forEach(function(url){
      App.fetch(url, function(err, app) {
        if (err) return console.error(app, err)
        if (!app.valid) return console.error("Invalid app", app, app.errors)
        apps.push(app)
        app.getAddonPrices(function(err, prices) {
          if (err) return console.error(app, err)
          app.prices = prices
          $('#apps').append(App.templates.app.render(app))
          // if (urls.length === 1) $('#apps .app').addClass('active')
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

    // Prevent the form from submitting
    event.preventDefault()

    var build_xhr = $.post("/go", $(this).serialize())

    return build_xhr.done((function(_this) {
      return function(build) {
        console.log(build)
        $(_this)
          .closest('.app')
          .find('.output')
          .html(App.templates.build.render(build))
      }
    })(this))
  })

})
