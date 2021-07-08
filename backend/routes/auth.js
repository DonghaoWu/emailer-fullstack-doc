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
