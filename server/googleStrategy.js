require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('./db/models/models');

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
    const { _json } = profile;
    User.findUser(_json.email)
      .then((result) => {
        if (!result) {
          User.createUser(_json)
            .then(() => {
              done(null, profile);
            }).catch(() => {
              done(null);
            });
        }
      })
      .catch((err) => console.error(err));
  }),
);
