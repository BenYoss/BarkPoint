require('dotenv').config();
require('./googleStrategy');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const { authRouter } = require('./routes/auth.router');

const app = express();
const PORT = process.env.PORT || '8080';
const distPath = path.join(__dirname, '../client/dist');

app.use(express.json());
app.use(session({
  secret: 'dog',
  resave: 'false',
  keys: ['key1', 'key2'],
  maxAge: 3600000,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(distPath));
app.use(authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.error(`http://localhost:${PORT}`);
});
