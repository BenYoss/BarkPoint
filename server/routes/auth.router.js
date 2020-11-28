const { Router } = require('express');
const passport = require('passport');

const authRouter = Router();

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  }
  res.status(200).send('not logged in');
};

authRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/auth/google/callback', passport.authenticate('google'),
  (req, res) => {
    res.redirect('/form');
  });

authRouter.get('/', isLoggedIn, (req, res) => {
  res.send('this is the profile');
});

authRouter.get('/logout', (req, res) => {
  req.session.destroy();
  req.logOut();
  res.redirect('/auth/google/callback');
});

module.exports = authRouter;
