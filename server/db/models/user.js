const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: String,
  email: String,
<<<<<<< HEAD
=======
  image: String,
>>>>>>> (fix) format in model files
});

const User = model('User', userSchema);

<<<<<<< HEAD
const createUser = (body) => {
  User.create({
    name: body.name,
    email: body.email,
  });
};

module.exports = createUser;
=======
module.exports = User;
>>>>>>> (fix) format in model files
