require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('./db/models/models');

const clientId = process.env.CLIENT_ID;
const secret = process.env.CLIENT_SECRET;

/**
 * Creates a new user instance as Req.user.
 */

passport.serializeUser((user, done) => {
  done(null, user.id);
});

/**
 * Destroys Req.user instance.
 */
passport.deserializeUser((id, done) => {
  User.findUser(id).then((user) => {
    done(null, user);
  }).catch((err) => console.error(err));
});

/**
 * Below is the @GoogleStrategy which retrieves user information from the google authentication.
 * If user information exists, the user is then created as a database instance.
 * inputs include the @param {clientID} process.env and @param {clientSecret} process.env .
 */
passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/callback',
    clientID: clientId,
    clientSecret: secret,
  }, (accessToken, refreshToken, profile, done) => {
    User.findUser(profile.id)
      .then((result) => {
        if (result) {
          // eslint-disable-next-line no-param-reassign
          profile.isNewUser = false;
          done(null, profile);
        } else {
          User.createUser(profile)
            .then(() => {
              // eslint-disable-next-line no-param-reassign
              profile.isNewUser = true;
              done(null, profile);
            });
        }
      }).catch((err) => {
        console.error(err);
        done(null, err);
      });
  }),
);
