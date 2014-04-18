var repos = [
  'zeke/chaos-monkey-app-manifest',
  'zeke/roots-buildpack-sample',
  'heroku-examples/geosockets',
  'zeke/harp-slideshow-template',
  'zeke/ruby-rails-sample',
  'zeke/hound',
  'ryanbrainard/forceworkbench'
]

$(function() {
  var repo, i

  // Iterate over shorthand repo names, fetching app.json content for each
  for (i = 0; i < repos.length; i++) {
    repo = repos[i]
    App.fetch(repo, function(err, app) {
      if (err) return console.error(err)
      $('#apps').append(ich.app(app))
    })
  }

  // When an app is clicked, display a "deploy" button
  $(".app a.activator").live("click", function(event) {
    event.preventDefault()
    $(this).closest('.app').toggleClass("active")
  })

  // When "deploy" is clicked, ajax submit form to local backend
  $("form.deploy").live("submit", function(event) {
    var build_xhr

    // Prevent the form from submitting
    event.preventDefault()

    build_xhr = $.post("/go", $(this).serialize())

    return build_xhr.done((function(_this) {
      return function(build) {
        console.log(build)
        if (build.app && build.app.name) {
          $(_this)
            .closest('.app')
            .find('.output')
            .html(ich.buildSuccess(build))
        } else {
          $(_this)
            .closest('.app')
            .find('.output')
            .text(JSON.stringify(build,null,2))
        }
      }
    })(this))
  })

})
