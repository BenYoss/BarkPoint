const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: String,
  email: String,
<<<<<<< HEAD
=======
  image: String,
>>>>>>> 8efb8a937b9af03df9793198d7fe642f8b4d7389
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
>>>>>>> 8efb8a937b9af03df9793198d7fe642f8b4d7389
