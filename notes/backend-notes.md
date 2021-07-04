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

5. 