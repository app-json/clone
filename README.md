# Clone

A simple UI for cloning app.json apps.

It's a node app that uses harp for javascript and css compilation.

It strives to do most of the work client-side, but uses some server-side stuff
to inject your OAuth token (API key) when sending build requests to [nyata](https://github.com/heroku/nyata).

## Use it

If you don't already have node installed, [go to nodejs.org](http://nodejs.org/)
and click "Install". Easy peasy.

```sh
npm install harp --global
cd clone
harp server
```
