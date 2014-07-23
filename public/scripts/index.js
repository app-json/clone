window.apps = []

$(function() {

  var fetchApps = function(urls) {
    urls.forEach(function(url){
      App.fetch(url, function(err, app) {
        if (err) return console.error(app, err)
        if (!app.valid) return console.error("Invalid app", app, app.errors)
        apps.push(app)
        app.getAddonPrices(function(err, prices) {
          if (err) return console.error(app, err)
          app.prices = prices
          $('#apps').append(App.templates.app.render(app))
          if (urls.length === 1) {
            $('#apps .app').addClass('active')
            $('#apps').addClass('single')
          }
        })
      })
    })
  }

  var singleApp = location.pathname.match(/\/apps\/(.*)/)

  if (document.referrer && document.referrer.match("github.com")){
    urls = [document.referrer]
    fetchApps(urls)
  } else if (singleApp) {
    urls = [singleApp[1]]
    fetchApps(urls)
  } else {
    $.getJSON("http://app-registry.herokuapp.com/apps", function(urls) {
      fetchApps(urls)
    })
  }

})
