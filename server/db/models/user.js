const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: String,
  email: String,
  image: String,
});

const User = model('User', userSchema);

module.exports = User;
