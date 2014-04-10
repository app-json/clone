# Clone

A simple UI for cloning app.json apps.

- Clone is a node app that uses harp for javascript and css compilation.
- Clone strives to do most of its work in the browser, but does some server-side work
to include your Heroku OAuth token (API key) when sending build requests to [nyata](https://github.com/heroku/nyata).
- Clone uses [node-heroku-bouncer](https://github.com/jclem/node-heroku-bouncer) to do OAuth

## Caveats

If you're trying to deply an app using Clone and it fails, your OAuth token may
have timed out. You'll need to hit
[http://clone.herokuapp.com/auth/heroku/logout](clone.herokuapp.com/auth/heroku/logout)
to log out and log back in with a new token.

## Use it

If you don't already have node installed, [go to nodejs.org](http://nodejs.org/)
and click "Install". Easy peasy.

```sh
npm install harp --global
cd clone
harp server
```
