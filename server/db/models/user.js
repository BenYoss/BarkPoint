const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: String,
  email: String,
});

const User = model('User', userSchema);

const createUser = (body) => {
  User.create({
    name: body.name,
    email: body.email,
  });
};

module.exports = createUser;

