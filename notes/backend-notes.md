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

---

7/8:frontend section

1. set up

```bash
$ npx create-react-app client
$ npm i concurrently
```

2. react server & express server

3. backend/package.json

```json
"client":"npm start ==prefix client",
"dev":"currently \"npm run server\" \"npm run client\" "
```

4. proxy setting.

```bash
$ cd client
$ npm install http-proxy-middleware@1.0.6
```

- client/src/setupProxy.js

```js
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    ['/api', '/auth/google'],
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
};
```

5. add the second URI redirect to the google project

```diff
+ http://localhost:5000/api/auth/google/callback
+ http://localhost:3000/api/auth/google/callback
```

6. client/package.json (为什么这样写，原来的版本不可以吗，直接写 proxy 的版本。)

```json
"proxy":{
  "/auth/google":{
    "target":"http://localhost:5000"
  }
}
```

7. 要注意的是这个 app 使用的是 google 的 callback，可能对回传的 uri 有影响。

8. 这里提出一个观点，就是 proxy 只是用于 dev 环境，而不设定 proxy 在 prod 环境也可以运行。`但是在之前的一个 app 之中，不设定 proxy 在 deploy 之后好像不能运行，待考证。`

9. 把 frontend app 和 backend app 放在一起的重要性，

- 不会产生 cross domain。
- cors policy
-

10. 开发时使用 2 个 server，产品时使用 1 个 server。

11. 说清楚为什么要增加一个新的 callback，以 3000 为端口。

12. proxy 的设置很有学问。

13. async/await

---

section2: client react setup

1. install

- src folder

```bash
$ cd client
$ cd src
$ touch index.js # redux
$ touch App.js # react-router
$ npm i redux react-redux react-router-dom
```

2. redux review and setup

- authReducer
- surveysReducer

- auth reducer

- reducers/index.js

```js
import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer,
});
```

- authReducer.js

```js
export default function (state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}
```

3. react-router

```js

```

- setup react-router in App.js, setup redux in index.js

- matching routes with Exact

- 没有 exact 就会自动匹配后面的无效字符串，就如

```jsx
<div>
  <Header />
  <Route path="/" component={Landing} />
  <Route path="/surveys" component={Survey} />
</div>
```

- 以上代码是无法访问第二个组件的。

4. Materialize CSS

```jsx
import React from 'react';

class Header extends Component {
  render() {
    return <h2>Header</h2>;
  }
}

export default Header;
```

```bash
$ npm i materialize-css
```

```js
import 'materialize-css/dist/css/materialize.min.css';
```

5. webpack with css

```js

```

6. Header Design

```jsx
import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">Emailer</a>
          <a className="">Login With Google</a>
        </div>
      </nav>
    );
  }
}

export default Header;
```

7. container

```js
<div className='container'>
```

8. current User API
9. additional proxy rules

- App component calls the action creator

```bash
$ cd client
$ npm i axios redux-thunk
```

- /src/actions/types.js
- /src/actions/index.js

```js
import axios from 'axios';
import { FETCH_USER } from './types';

const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');
  dispatch({
    type: 'FETCH_USER',
    payload: res.data,
  });
};
```

- call the function. refactor App to a class component, add componentDidMount

```js
import { connect } from 'react-redux';
import * as actions from '../actions';

export default connect(null, mapDispatchToProps)(App);
```

- 在 passport 完成动作后会有一个 cookie 返回并存到 req 上，这时就需要一个 call，在 App 那里，每次开始或者刷新都调用这个函数去获取用户信息。

- authReducer

```js
let initState = null;

export default function (state = initState, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
```

```jsx
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return 'loading';
      case false:
        return (
          <li>
            <a href="/auth/google">Login with google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/auth/google/logout">Logout</a>
          </li>
        );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">Emailer</a>
          <ul className="right">
            <li>{this.renderContent()}</li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps, null)(Header);
```

- callback function

```js
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/surveys');
});
```

- redirect on logout

```js
router.get('/google/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
```

- landing component

```jsx
import React from 'react';

const Landing = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Emailer</h1>
      Collerct feeback from your users
    </div>
  );
};

export default Landing;
```

- link tags

```jsx
import { Link } from 'react-router-dom';

<Link to={this.props.user ? '/surveys' : '/'}>Emailer</Link>;
```

7/10: client side billing

1. component

- add credits button, credit card form

- stripe for credit card, avoid bad security.

2. install stripe

- sign in stripe website, test data mode
- API/publishabel key/ Secret key
- add the keys in frontend

```bash
$ cd client
$ npm i react-stripe-checkout
```

3. hide secret in frontend

- backend/config/dev.js

```js
module.exports = {
  striptPublishbleKey: '',
  stripeSecretKey: '',
};
```

- backend/config/prods.js

```js
module.exports = {
  striptPublishbleKey: '',
  stripeSecretKey: '',
};
```

- use the new keys

- 要注意的是这个 project 的结构是把 client 文件夹放在 server 之中，这样 client 可以取得 config 里面的 secret。在部署过程中，因为最后都是要把 project 放进 server 文件夹中的，所以放在 prods 中的 key 可以起作用，但放在 dev 中的不起作用。

- use the keys in frontend(dev env)

- 新建 /client/.env.development

```js
REACT_APP_STRIPE_KEY=
REACT_APP_STRIPE_KEY=
```

- 新建 /client/.env.production

```js

```

- access in frontend

```js
console.log(process.env.REACT_APP_STRIPE_KEY);
console.log(process.env.NODE_ENV);
```

4. create a component to render stripe form

- /src/components/Payments.js

```jsx
import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

import { connect } from 'react-redux';
import * as action from '../actions';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Emailer"
        description="$5 fro 5 email credit"
        amount={500}
        token={(token) => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add credits</button>
      </StripeCheckout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleToken: (token) => dispatch(action.handleToken(token)),
  };
}

export default connect(null, mapDispatchToProps)(Payments);
```

- Header.js

```js
<li>
  <Payments />
</li>
```

- fix the payment styling

```js

```

5. new action creator

```js
export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post('/api/stripe', token);

  dispatch({
    type: FETCH_USER,
    payload: res.data,
  });
};
```

6. backend routes

- billRoutes.js

```bash
$ cd backend
$ npm i stripe
```

```js
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

const requireLogin = require('../middlewares/requireLogin');

router.post('/api/stripe', requireLogin, async (req, res) => {
  const charge = await stripe.charges.create({
    amount: 500,
    currency: 'usd',
    description: '$5 for 5 credits.',
    source: req.body.id,
  });

  if (!req.user) req.user.credits += 5;
  const user = await req.user.save();
  res.send(user);
});
```

- use a bodyParser middleware

```bash
$ cd backend
$ npm i body-parser
```

- use the middleware
- backend/index.js

```js
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
```

6. add credits to user

- User.js

```js
const userSchema = new Schema({
  googlId: String,
  credits: {
    type: Number,
    default: 0,
  },
});
```

7. requiring authentication

- add an auth middleware

- route-specific middlewares

- middlewares/requireLogin.js

```js
modules.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must login.' });
  }

  next();
};
```

7. displaying credit quantity

- /client/src/components/Header.js

```js
<li key="3">Credits:{this.props.auth.credits}</li>
```

8. updating credits

```js
dispatch(FETCH_USER);
```

7/10: back end and front end routing in production

1. express with cra in production

- build process,最后需要把 2 个 app 整合到由 backend 提供的 app 上面。

- 也就是使用 backend app 去 handle 所有 production assets

- /backend/index.js

- 如果由 backend 处理 request，则会有 3 中 request，`api/react-route/assets`

```js
if (process.env.NODE_ENV === 'production') {
  //express will server up production assets,like main.js
  app.use(express.static('client/build'));
  //express will server up the index.html file if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
```

2. deployment options

- package.json

```js
"scripts":{
  "start":"node index.js",
  "heroku-postbuild":"NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build -- prefix client"
}
```

- bash

```bash
$ git add .
$ git commit -m'ready for commit.'
$ git push heroku main
$ heroku open
$ heroku logs --tail
```

- testing deployment

---

7/11 Mongoose for Survey

1. survey overview

- server Models

- /backend/models/Survey.js

```js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const recipientSchema = reuqire('./Recipient');

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [recipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  dateSent: Date,
  lastResponded: Date,
});

const Survey = mongoose.model('survey', surveySchema);

module.exports = Survey;
```

- run the file
- index.js

```js
require('./models/Survey');
```

2. recipient.js

```js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: {
    type: boolean,
    default: false,
  },
});

module.exports = recipientSchema;
```

3. survey creation route handler

- /routes/surveyRoutes.js

```js
const mongoose = require('mongoose');
const router = require('express');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('survey', surveySchema);

router.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(',').map((email) => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now(),
  });
});
```

- new middleware to verify minimum credits

- requireCredits.js

```js
modules.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'Not enough credits.' });
  }
  next();
};
```

---

7/13: mailers

1. email template

- identifying unique users

- create mailer
- sendGrid server
- sendGrid create email, and when a user click a link, sendGrid knows who clicked it.

- signup for sendgrid account
- fill out the info form
- verify account
- configure a single sender
- fill out the single sender form
- verify sender
- sender verified
- `generate API key`
- click the create api key button
- select access level
- copy the api key to a safe place

- add keys in dev.js & prod.js

```js
sendGridKey: 'key';
```

```bash
$ npm i sendgrid
```

- mailer setup

```js
const mongoose = require('mongoose');
const router = require('express');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');

const surveyTemplate = require('../services/emailTemplates/surveyTemplate.js');

const Survey = mongoose.model('survey', surveySchema);

router.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(',').map((email) => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now(),
  });

  const mailer = new Mailer(survey, surveyTemplate(survey));
  try {
    await mailer.send();
    await survey.save();
    req.user.credits--;
    const user = await req.user.save();

    res.send(user);
  } catch (err) {
    res.status(422).send(err);
  }
});
```

- services/emailTemplates/surveyTemplate.js

```js
module.exports = (survey) => {
  return '<div>' + survey.body + '</div>';
};
```

- /backend/services/Mailer.js

```js
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;

const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();
    // this.from_email = new helper.Email('no-reply@emaily.com');
    this.sgApi = sendgrid(keys.sendGridKey);
    this.subject = subject;
    this.content = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.mao(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const request = await this.sgApi.emptyRequest({
      method: 'POST',
      path: 'v3/mail/send',
      body: this.toJSON(),
    });

    const response = this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
```

```diff
- this.from_email = new helper.Email('no-reply@emaily.com');
```

- testing email sending

- improving the email template

```js
module.exports = (survey) => {
  return `
  <html>
    <body>
      <div style='text-align:center;'>
        <h3>I'd like your input!</h3>
        <p>Please answer the following question:</p>
        <p>${survey.body}</p>

        <div>
          <a href='http://localhost:3000'>Yes</a>
        </div>

        <div>
          <a href='http://localhost:3000'>No</a>
        </div>

        </div>
    </body>
  </html>
  `;
};
```

- polish in the route handler

```js

```

- feedback for user feedback

- dev.js

```js
redirectDomain: 'http://localhost:3000';
```

- prod.js

```js
redirectDomain: process.env.REDIRECT_DOMAIN;
```

```js
const key = require('../../config/keys');
module.exports = (survey) => {
  return `
  <html>
    <body>
      <div style='text-align:center;'>
        <h3>I'd like your input!</h3>
        <p>Please answer the following question:</p>
        <p>${survey.body}</p>

        <div>
          <a href='${keys.redirectDomain}/api/survey/thanks'>Yes</a>
        </div>

        <div>
          <a href='${keys.redirectDomain}/api/survey/thanks'>No</a>
        </div>

        </div>
    </body>
  </html>
  `;
};
```

```js
router.get('/api/surveys/thanks', (req, res) => {
  res.send('Thanks for voting!');
});
```

---

7/13: back to the client:

- add a material icon link in index.html

1. client/src/components/Dashboard

```jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="fixed-action-btn">
      <Link to="/surveys/new" className="btn-floating btn-large red">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

export default Dashboard;
```

- materialize / fixed Action button

```jsx
<div className="container">
  <Header />
  <Route path="/" component={Landing} />
  <Route path="/surveys" component={Dashboard} />
  <Route path="/surveys/new" component={SurveyNew} />
</div>
```

- SurveyNew component
- redux form

```bash
$ cd client
$ npm install redux-form --legacy-peer-deps
```

- add reducer

```js
import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
});
```

- SurveyNew component
- survey/SurveyNew.jsx

```jsx
import React, { Component } from 'react';
import SurveyForm from './SurveyForm';

class SurveyNew extends Component {
  render() {
    return (
      <div>
        <SurveyForm />
      </div>
    );
  }
}

export default SurveyNew;
```

- survey/SurveyForm.js

```js
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const FIELDS = [
  {
    label: 'Survey Title',
    name: 'title',
  },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email body', name: 'body' },
  { label: 'Recipient List', name: 'emails' },
];

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate({ title, subject, body }) {
  const errors = {};

  _.each(FIELD, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a value.`;
    }
  });

  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'surveyForm',
})(SurveyForm);
```

- surveyFields.js

```js
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      {touched && error}
    </div>
  );
};
```

---

7/14: generalizing field validation

```js
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      <div className="red-text" style={{ marginBottom: '5px' }}>
        {touched && error}
      </div>
    </div>
  );
};
```

2. validating emails

- utils/validateEmails.js

- email regex

```js
const re = '';

export default (emails) => {
  const invalidEmails = emails
    .split(',')
    .map((email) => email.trim())
    .filter((email) => re.test(email) === false);

  if (invalidEmails.length) {
    return `These emails are invalid:${invalidEmails}.`;
  }

  return;
};
```

- survey/SurveyForm.js

```js
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
  {
    label: 'Survey Title',
    name: 'title',
  },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email body', name: 'body' },
  { label: 'Recipient List', name: 'emails' },
];

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate({ title, subject, body }) {
  const errors = {};

  errors.emails = validataEmails(values.emails || '');

  _.each(FIELD, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a value.`;
    }
  });

  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'surveyForm',
})(SurveyForm);
```

3. surveyFormReview.js

- toggling visibility
- /survey/new
- component state

- survey/SurveyForm.js

```js
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
  {
    label: 'Survey Title',
    name: 'title',
  },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email body', name: 'body' },
  { label: 'Recipient List', name: 'recipients' },
];

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate({ title, subject, body }) {
  const errors = {};

  errors.recipients = validataEmails(values.recipients || '');

  _.each(FIELD, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a value.`;
    }
  });

  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'surveyForm',
  destroyOnUnmount: false,
})(SurveyForm);
```

- SurveyReview.js

```js
import _ from 'loadsh';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields.js';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey }) => {
  const reviewFields = _.map(formFields, (field) => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>{formValues[field.name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>hello</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onCLick={() => submitSurvey(formValues)}
      >
        Back
      </button>
      <button className="green right btn-flat white-text" onCLick={onCancel}>
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values,
  };
}

export default connect(mapStateToProps, actions)(SurveyFormReview);
```

- SurveyNew.js

```jsx
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview === true) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    } else {
      return (
        <SurveyForm
          onSurveySubmit={() => this.setState({ showFormReview: true })}
        />
      );
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: 'surveyForm',
})(SurveyNew);
```

- persisting form values

- new action creator

```js
export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};
```

- redirect on submit

```js
import _ from 'loadsh';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields.js';
import * as actions from '../../actions';
import { withRouter } from 'react-router';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, (field) => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>{formValues[field.name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>hello</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onCLick={() => submitSurvey(formValues, history)}
      >
        Back
      </button>
      <button className="green right btn-flat white-text" onCLick={onCancel}>
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values,
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
```

---

7/15 handing webhook data

1. feedback with webhooks

2. webhooks in development

```bash
$ cd backend
$ npm i localtunnel
```

- 使用 ngrok 代替 localTunnel

3. localTunnel setup

- package.json

```js
"dev":"currently \"npm run server\" \"npm run client\" \"npm run webhook\"",
"webhook":"lt -p 5000 -s abcdeee"
```

- ngrok setup instead localTunnel

```bash
$ npx ngrok http 5000
```

4. testing webhooks

- add a url in sendgrid mail setting configuration.

```js
https: abcdeee.localtunnel.me / api / surveys / webhooks;
```

- select actions: clicked, chekc mark
-

- button test your integration

```js
router.post('/api/surveys/webhooks', () => {
  console.log(req.body);
  res.send({});
});
```

5. encoding survey data

```diff
- /api/survey/thanks
+ /api/survey/:choice
```

```js
const key = require('../../config/keys');
module.exports = (survey) => {
  return `
  <html>
    <body>
      <div style='text-align:center;'>
        <h3>I'd like your input!</h3>
        <p>Please answer the following question:</p>
        <p>${survey.body}</p>

        <div>
          <a href='${keys.redirectDomain}/api/survey/${survey.id}/yes'>Yes</a>
        </div>

        <div>
          <a href='${keys.redirectDomain}/api/survey/${survey.id}/no'>No</a>
        </div>

        </div>
    </body>
  </html>
  `;
};
```

6. dirty data from webhooks, prevent repeat.

- processing pipeline

```bash
$ npm i lodash path-parser
```

- surveyRoutes.js

- unique events

```js
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');

router.post('/api/surveys/webhooks', () => {
  const p = new Path('/api/surveys/:surveyId/:choice');

  const events = _.chain(req.body)
    .map(req.body, (event) => {
      const match = p.test(new URL(event.url).pathname);
      if (match) {
        return {
          email: event.email,
          surveyId: match.surveyId,
          choice: match.choice,
        };
      }
    })
    .compact()
    .uniqBy('email', 'surveyId')
    .value();

  console.log(events);
});
```

- bad mongoose queries
- finding the exact survey

```js
choice = 'yes' || 'no';
Survey.updateOne(
  {
    id: surveyId,
    recipients: {
      $elemMatch: { email: email, responded: false },
    },
  },
  {
    $inc: { [choice]: 1 },
    $set: { 'recipients.$.responded': true },
  }
);
```

6. executing queries

```js
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const Survey = mongoose.model('survey');

router.post('/api/surveys/webhooks', (req, res) => {
  const p = new Path('/api/surveys/:surveyId/:choice');

  _.chain(req.body)
    .map(req.body, (event) => {
      const match = p.test(new URL(event.url).pathname);
      if (match) {
        return {
          email: event.email,
          surveyId: match.surveyId,
          choice: match.choice,
        };
      }
    })
    .compact()
    .uniqBy('email', 'surveyId')
    .each(({ surveyId, email, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false },
          },
        },
        {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date(),
        }
      ).exec();
    })
    .value();

  res.send({});
});
```

- mongo tips, stackflow, node

```js

```

---

7/15 hte home stretch

1. fetching a list of surveys

```js
router.get('/api/surveys', requireLogin, async (req, res) => {
  const surveys = await Survey.find({ _user: req.user.id }).select({
    recipients: false,
  });

  res.send(surveys);
});
```

---

7/16 last section

1. front end part

- actions/types.js

```js
export const FETCH_SURVEYS = 'fetch_surveys';
```

- index.js

```js
import { FETCH_SURVEYS } from './types';
export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get('/api/surveys');

  dispatch({
    type: FETCH_SURVEYS,
    payload: res,
  });
};
```

- reducers/surveysReducer.js

```js
import { FETCH_SURVEYS } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}
```

- reducers/index.js

```js
import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer,
});
```

2. wiring react to redux

- SurveyList.js

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions/index';

class SurveyList extends Component {
  componentDidMOunt() {
    this.props.fetchSurveys();
  }
  render() {
    return (
      <div>
        {this.props.surveys.reverse().map((el) => {
          return (
            <div className="card darken-1" key={survey._id}>
              <div className="card-content">
                <span calssName="card-title">{survey.title}</span>
                <p>{survey.body}</p>
                <p className="right">
                  Send on:{new Date(survey.dateSent).toLocaleDateString()}
                </p>
              </div>
              <div className="card-action">
                <a>Yes:{survey.yes}</a>
                <a>No:{survey.no}</a>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    surveys: state.surveys,
  };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
```


- expanding the app

```diff
+ css
+ user can delete survey
+ specify the from field on survey emails
+ allow client side sorting of surveys
+ all surveys to be created in draft mode
```

- 7/24 will work on this project again from backend. Will review the video again.

- 7/24 watch videos.
