apps = [
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
