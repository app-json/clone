apps = [
  'zeke/roots-buildpack-sample',
  'heroku-examples/geosockets',
  'zeke/harp-slideshow-template',
  'zeke/ruby-rails-sample',
  # 'ryanbrainard/forceworkbench'
]

$ ->

  apps = apps.map (app) ->

    Manifest.fetch app, (err, manifest) ->
      return console.error(err) if err
      $('#apps').append(ich.app(manifest))

      # manifest.calculateAddonCost (err, mix) ->
      #   return console.error(err) if err
      #   manifest.addons = mix.addons
      #   manifest.totalPriceInCents = mix.totalPriceInCents
      #   manifest.totalPrice = mix.totalPrice
      #   console.log(mix)
      #   $('#apps').append(ich.app(manifest))
      #   return manifest

  # if getParameterByName('source')
  #   source = getParameterByName('source')
  #   log 'found source query param'
  # else if document.referrer and document.referrer.match(/github\.com\/\w+\/\w+/)
  #   source = document.referrer
  #   log 'found github referrer'
  # else
  #   log 'no source'
  #   return
  #
  # log 'source', source
  #
  # Manifest.fetch source, (err, manifest) ->
  #   return console.error(err) if err
  #
  #   manifest.calculateAddonCost (err, addons) ->
  #     return console.error(err) if err
  #     manifest.addonsConcoction = addons
  #
  #     log manifest
  #     app = ich.app(manifest)
  #     $('body').append(app)
