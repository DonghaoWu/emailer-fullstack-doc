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

app.use("/api", require("./routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT);
