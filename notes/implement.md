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

- services/db.js

```js
const mongoose = require('mongoose');
const keys = require('../config/keys');

const connectDB = async () => {
  try {
    await mongoose.connect(keys.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDb connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

- models/User.js

```js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
});

const User = mongoose.model('users', userSchema);
module.exports = User;
```

- services/passport.js

```js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/keys');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

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
      callbackURL: '/api/auth/google/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // we already have a record with the given profile ID
          done(null, existingUser);
        } else {
          // we don't have a user record with this ID, make a new record!
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
```

- routes/auth.js

```js
const router = require('express').Router();
const passport = require('passport');

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.send(`this is callback route.`);
});

router.get('/google/logout', (req, res) => {
  req.logout();
  res.send(`user logged out`);
});

router.get('/google/current_user', (req, res) => {
  if (!req.user) {
    res.send(`user has logged out.`);
  } else res.send(req.user);
});

module.exports = router;
```

- index.js

```js
const express = require('express');
const cookieSession = require('cookie-session');

const passport = require('passport');
const db = require('./services/db');

const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

db();
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./routes'));

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

6. summary

```diff
+ googleClientID/googleClientSecret
+ mongoURI
+ cookieKey

+ http://localhost:5000/api/auth/google
+ http://localhost:5000/api/auth/google/callback
+ http://localhost:5000/api/auth/google/logout
+ http://localhost:5000/api/auth/google/current_user
```
