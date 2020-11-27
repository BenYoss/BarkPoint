require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const clientId = process.env.CLIENT_ID;
const secret = process.env.CLIENT_SECRET;

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/callback',
    clientID: clientId,
    clientSecret: secret,
  }, (accessToken, refreshToken, profile, done) => {
    console.warn(profile);
    done();
  }),
);
