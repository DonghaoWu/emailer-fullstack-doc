const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const connectDB = require('./services/db');
const keys = require('./config/keys');
const PORT = process.env.PORT || 5000;
require('./models/User');
require('./services/passport');

connectDB();
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

app.listen(PORT, () => console.log(`server is listening on port ${PORT} ===>`));
