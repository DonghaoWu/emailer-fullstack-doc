1. dependencies & configuration

```bash
$ node -v
$ npm -v
$ npm init -y
$ npm i express passport passport-google-oauth20 nodemon cookie-session mongoose
$ touch index.js
```

2. files

- .gitignore

```bash
node_modules
dev.js
```

- keys.js

```js
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
```

- prod.js

```js
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googltCLIentSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
};
```

- dev.js
```js
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googltCLIentSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
};
```

- index.js

```js
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('./config.js');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// 把 id 转换之后放进 cookie
passport.serializeUser((user, done) => {
  done(null, user.id); // accessing the _id in Mongo
});

// 把 cookie 转换后成 id。
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);

app.get('/auth/google', passport.authenticate('google'), {
  scope: ['profile', 'email'],
});

app.get('/auth/google/callback', passport.authenticate('google'));

app.get('/api/current_user', (req, res) => {
  //   res.send(req.user);
  res.send(req.session);
});

app.get('/api/logout', (req, res) => {
  req.logout();
  res.send(req.user);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
```

3. heroku set up

- create heroku account
- commit our commit to git. (install git)

```bash
$ git --version
$ git init
$ git add .
$ git commit -m'initial commit'
$ brew install heroku
$ heroku -v
$ heroku login
$ heroku create
$ git remote add heroku <link>
$ git push heroku master
$ heroku open
$ heroku logs

$ git add .
$ git commit -m'changed something'
$ git push heroku master
```

4. Google api

5. MongoDB setup

- connect

```js
const mongoose = require('mongoose');

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
```

- models

```js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
});

export default mongoose.model('users', userSchema);
```
