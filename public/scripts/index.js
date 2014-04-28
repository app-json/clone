var apps = []
var repos = []
var repo = location.pathname.match(/^\/apps\/(.*)\/(.*)/)

// If url is in the format /apps/user/repo, then use that repo
// Otherwise, use a canned list of repos
if (repo) {
  repos.push([repo[1], repo[2]].join("/"))
} else {
  repos.push(
    'heroku-examples/geosockets',
    'heroku/node-js-sample',
    'ryanbrainard/forceworkbench',
    'zeke/harp-slideshow-template',
    'zeke/ruby-rails-sample',
    'zeke/hound',
    'zeke/chaos-monkey-app-manifest',
    'zeke/roots-buildpack-sample',
    'kennethreitz/httpbin',
    'zeke/moby'
  )
}

$(function() {
  var repo, i

  // Iterate over shorthand repo names, fetching app.json content for each
  for (i = 0; i < repos.length; i++) {
    repo = repos[i]
    App.fetch(repo, function(err, app) {
      if (err) return console.error(app, err)
      if (!app.valid) return console.error(app, app.errors)
      apps.push(app)

      app.getAddonPrices(function(err, prices) {
        if (err) return console.error(err)
        app.prices = prices
        $('#apps').append(App.templates.app.render(app))

        if (repos.length === 1) {
          $('#apps .app').addClass('active')
        }
      })

    })
  }

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
