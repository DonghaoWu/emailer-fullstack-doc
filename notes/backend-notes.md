1. relationship between express and node

- express
- Node API

```bash
$ npm init -y
$ npm i express
$ touch index.js
```

2. index.js

```js
// common js / ES2016 module
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
```

```bahs
$ node index.js
$ node -v
$ npm -v
```

3. Heroku Deployment checklist

```diff
+ dynamic port binding
+ specify node environment
+ specifu start script
+ create .gitignore file
+
```

```json
"engines":{
    "node":"8.1.1",
    "npm":"5.0.3"
}
```

- 一定是 start script，其他名字不可以。

```json
"scripts":{
    "start":"node index.js"
}
```

- .gitignore

```bash
node_modules
```

4. Installing the Herolu CLI

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

6/30:

1. PassportJS

2. passport & passport strategy

3. passport setup, passport google strategy

```bash
$ npm i passport passport-google-oauth20
```

```js
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 5000;

app.listen(PORT);
```

4. new google project ui

7/5: google api

1. signup google auth api

2. console.l=developer.google.com/ google account

3. create a new project

4. select the new project

5. enabel api

6. create a brand new credential

7. google+ api / enable

8. generate api credential/ oauth credentail ID

9. web application

10. authorized JS origin ==> http://localhost:5000

11. authorized redirect URIs ==> http://localhost:5000/auth/google/callback

12. oauth client: ID/secret

13. copy the client ID

14. securing API keys

- config/keys.js

```js
module.exports = {
  googleClientID: '',
  googleSecret: '',
};
```

- .gitignore

```js
node_modules;
keys.js;
```

15. set up

```js
const express = require('express');
const passport = require('passport');
const keys = require('./config.js');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken) => {
      console.log(accessToken);
    }
  )
);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
```

- 有 3 个人，分别是 用户，第三方，google，用户把资料放在 google，然后用户需要登陆第三方，他就叫第三方跟 google 要，然后 google 跑来问用户是不是有这回事，用户确认之后 google 就把用户资料给了第三方。

16. testing Oauth

```js
const express = require('express');
const passport = require('passport');
const keys = require('./config.js');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken) => {
      console.log(accessToken);
    }
  )
);

app.get('/auth/google', passport.authenticate('google'), {
  scope: ['profile', 'email'],
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
```

17. redirect URL

- redirect url should match the one set up in the google UI.

```js
const express = require('express');
const passport = require('passport');
const keys = require('./config.js');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken) => {
      console.log(accessToken);
    }
  )
);

app.get('/auth/google', passport.authenticate('google'), {
  scope: ['profile', 'email'],
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
```

- 当 google 获得用户批准后，会把需要的用户资料/`token`发送回 app 中设置好的 callback url 之中。

18. oauth callback， set up the callback route

```js
const express = require('express');
const passport = require('passport');
const keys = require('./config.js');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
    }
  )
);

app.get('/auth/google', passport.authenticate('google'), {
  scope: ['profile', 'email'],
});

app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;

app.listen(PORT);
```

- google 把 token 给了 app，然后 app 可以代表用户向 google 发出请求，通过 access token 实现通行。

19. nodemon

```bash
$ npm i nodemon
```

7/5 section2: mongoDB

1. server Structure refactor

- config
- services
- routes

```js
const express = require('express');
const passport = require('passport');
const keys = require('./config.js');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
    }
  )
);

app.get('/auth/google', passport.authenticate('google'), {
  scope: ['profile', 'email'],
});

app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;

app.listen(PORT);
```

- routes/authRoutes.js
- services/passport.js
-

3. http request is stateless, 意味着 http 每次都需要 auth/ token，它不会帮你记住你的身份。

4. 如果有人盗用了你的 token 会怎样

5. token 会一般放在本地的 cookie/localStorage

6. signing in users with Oauth

```js

```

- sign up 之后获得 profile.id 并把它储存，要注意从 google 获得的 token 只能向 google 发送能接受的请求，但不是向 app 发送请求。

- 这个过程就是使用 google 返回的 profile id，进行以下动作

  1. 制作成 token，并返回，储存在本地 cookie 中
  2. 储存 ID 于 mongoDB 中，便于 app 每次能辨认用户
  3. token 是由 server 制作的，储存在用户本地设备，也是由 server 解密的。
  4.

7. set up mongoDB

- signup mongo Altas/ mongoose / connect

```bash
$ npm i mongoose
```

```js
const mongoose = require('mongoose');

mongoose.connect(keys.mongoURI);

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
```

- 使用 Mongo 去储存用户的 id。

8. Mongoose Model Classes

- models/User.js

```js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
});

export default mongoose.model('users', userSchema);
```

9. Saving model instances

```js
require('./models/User');
require('./services/passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      new User({ googleId: profile.id }).save();
    }
  )
);
```

TokenError: Bad Request
This is a very common issue that gets brought up in the QA quite a bit. In general, this is an expected error that you will get at this point in the course, after making the request to localhost:5000/auth/google. If you let the browser continue loading, it will eventually timeout with this error. Or, after a successful request, you attempt to reload your browser.

A quick check to determine if there is a problem:

Are you getting the user's data logged to the console?

If you are at the lecture where we are saving a user, is the user saved to your Mongo Atlas DB?

The Bad Request error only occurs after allowing the browser to load for a while.

The Bad Request error only occurs if you attempt to reload the page after a successful authentication request.

If you have answered yes to these questions, this is expected, there is likely no issue with your code.

If any of these applies to you:

The Bad Request error shows up immediately

Your server terminal shows errors, such as MongoNetworkError or a MongoAuthError

There are no console logs in your terminal

If you are at the lecture where we are saving a user, no user is saved to the database

The Bad request error occurs on Heroku, not on localhost.

Then, there likely is a bug in the code or with the project's configuration. In this case, please create a new question thread in the QA and share your full project code in a Github Repo, so that it can be tested.

Note: If you are getting a MongoNetworkError in your terminal then you need to add your IP address to the access list for your project in the Mongo Atlas Dashboard. If your IP address changes frequently, you should add a global access policy to the access list: 0.0.0.0/0`\

10. mongoose queries

```js
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
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
```

11. encoding Users & decoding

```js
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
```

- 加密 userId，然后发送到 client 中，以 cookie 的方式储存。

- googleId 和 mongo 自身给 object 添加的 ‘\_id’.

- googleId 用来辨别用户重复注册，id 用来区分用户。

13. enabling cookie

```bash
$ npm i cookie-session
```

- index.js

```js
const cookieSession = require('cookie-session');

const passport = require('passport');

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

// middlewares
app.use(passport.initialize());
app.use(passport.session());
```

14. testing authentication

- new route

```js
app.get('/api/current_user', (req, res) => {
  //   res.send(req.user);
  res.send(req.session);
});
```

- User model instance added to req object as 'req.user'

15. log out users

- routes

```js
app.get('/api/logout', (req, res) => {
  req.logout();
  res.send(req.user);
});
```

- 目前位置，可以实现 url sign up/in，同时 logout，然后注册 id 到 mongoDB altas。

7/5 section3: Dev vs Prod Environments

1. configuration.

- Dev: mongoDB/Google API/Cookie Key -- `config/dev.js`
- Prod: mongoDB/Google API/Cookie Key -- `Use env variabels`

```js

```

- mongoDB altas: create a new database & user credentials
- production version google API: create a new project/enable api/ google+ api/ production URIs
-

2. determining environment

- paste the heroku deployed uri to production/ google
- dev.js/prod.js/keys.js

3. set up two keys

- keys.js

```js
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
```

4. production keys

-

```js
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googltCLIentSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
};
```

- gitignore

```bash
node_modules
dev.js
```

5. 另外一个方案是使用 dotenv，这样使用变量的时候就可以统一使用 process.env，而不管是 dev 还是 prod

6. add heroku variabels

7. heroku http => https

- solution 1

```js
callbaskURL: `/auth/google/callback`;

googleRedirectURI: 'https://abc.herokuapp.com/auth/google/callback';
```

- solution 2

```js
new GoogleStrategy();

proxy: true;
```
