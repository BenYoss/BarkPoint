const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: String,
  email: String,
  image: String,
<<<<<<< HEAD
>>>>>>> (fix) format in model files
=======
>>>>>>> (fix) merge conflict
});

const User = model('User', userSchema);

const createUser = (body) => {
  User.create({
    name: body.name,
    email: body.email,
  });
};

module.exports = createUser;
<<<<<<< HEAD
=======
module.exports = User;
>>>>>>> (fix) format in model files
=======
>>>>>>> (fix) merge conflict
