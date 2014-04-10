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

  $("form.deploy").live("submit", (event) ->

    # Stop form from submitting normally
    event.preventDefault()

    xhr = $.post "/go", $(this).serialize(), ->
      console.log "success"

    xhr.done (data)->
      console.log "second success", data
      return

    return false

  )

    # ).fail(->
    #   console.log "error"
    #   return
    # ).always(->
    #   console.log "finished"
    #   return
    # ))
