apps = [
  'zeke/chaos-monkey-app-manifest',
  'zeke/roots-buildpack-sample',
  'heroku-examples/geosockets',
  'zeke/harp-slideshow-template',
  'zeke/ruby-rails-sample',
  # 'ryanbrainard/forceworkbench'
]

$ ->
  for app in apps
    Manifest.fetch app, (err, manifest) ->
      return console.error(err) if err
      $('#apps').append(ich.app(manifest))

  $(".app a.logo").live "click", (event) ->
    event.preventDefault()
    # $(this).closest('.app').toggleClass('active')
    $(this).closest('.app').find('.drawer').slideToggle()

  $("form.deploy").live "submit", (event) ->
    event.preventDefault()

    build_xhr = $.post "/go", $(this).serialize()

    build_xhr.done (build) =>
      console.log "build started:", build, $(this)
      $(this).closest('.app').find('.output').append(ich.build_result(build))

    # ).fail(->
    #   console.log "error"
    #   return
    # ).always(->
    #   console.log "finished"
    #   return
    # ))
