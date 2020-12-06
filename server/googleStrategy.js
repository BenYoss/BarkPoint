require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const clientId = process.env.CLIENT_ID;
const secret = process.env.CLIENT_SECRET;

/**
 * Creates a new user instance as Req.user.
 */

passport.serializeUser((user, done) => {
  console.warn(user, 'serialize');
  done(null, user);
});

/**
 * Destroys Req.user instance.
 */
passport.deserializeUser((user, done) => {
  console.warn(user, 'deserialize');
  done(null, user);
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
    done(null, profile);
  }),
);
