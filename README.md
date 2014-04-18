# Clone

A simple UI for cloning app.json apps.

![http://cl.ly/image/17063j3Z2X3s/Screen%20Shot%202014-04-09%20at%209.19.43%20PM.png](http://cl.ly/image/17063j3Z2X3s/Screen%20Shot%202014-04-09%20at%209.19.43%20PM.png/content#.png)

- Clone is a node app that uses harp for javascript and css compilation.
- Clone strives to do most of its work in the browser, but does some server-side work
to include your Heroku OAuth token (API key) when sending build requests to [nyata](https://github.com/heroku/nyata).
- Clone uses [node-heroku-bouncer](https://github.com/jclem/node-heroku-bouncer) to do OAuth

For more clarity, check out the [client](/public/scripts/app.coffee) and [server](/index.js) code.

## Add Your Apps

If you know of any apps with legit `app.json` files, add them to the list at
[/public/scripts/app.coffee](/public/scripts/app.coffee)

## OAuth Timeouts

If you're trying to deploy an app using Clone and it fails, your OAuth token may
have timed out. You'll need to hit
[http://clone.herokuapp.com/auth/heroku/logout](clone.herokuapp.com/auth/heroku/logout)
to log out and log back in with a new token.

## Run it locally

```sh
npm install
cp .env.sample .env # then add missing values
npm start
```
