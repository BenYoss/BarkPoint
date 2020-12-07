const { Router } = require('express');
const passport = require('passport');
const { User } = require('../db/models/models');

const authRouter = Router();

authRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * If google authentication is successful, the user will be sent to a form page where
 * they can input information about their pet dog
 */
authRouter.get('/auth/google/callback', passport.authenticate('google'),
  (req, res) => {
    if (req.user.isNewUser) {
      res.redirect('/form');
    } else {
      res.redirect('/profile');
    }
  });

/**
 * If the user is already logged in, don't send them to the form page
 */
authRouter.get('/redirect', (req, res) => {
  res.redirect('/form');
});

/**
 * Upon logout destroy the current session and send user back to the sign-in page
 */
authRouter.get('/logout', (req, res) => {
  req.session.destroy();
  req.logOut();
  res.redirect('/logout');
});

/**
 * Once a session is registered, a user is then recorded as an instance.
 * sends the user session data from request.
 */
authRouter.get('/session', async ({ user }, res) => {
  try {
    const userData = await User.findUser(user.id_google);
    res.status(200).send(userData);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = authRouter;
