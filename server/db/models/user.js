const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: String,
  email: String,
  thumbnail: String,
  parks: [],
});

const User = model('User', userSchema);

const createUser = (body) => {
  const user = new User({
    name: body.name,
    email: body.email,
    thumbnail: body.picture,
    parks: [],
  });
  const { _id } = user;
  return User.findOne({ _id }).then((result) => {
    if (!result) {
      return User.create(user);
    }
    return '';
  });
};

const findUser = (username) => User.findOne({ name: username }).exec();

const favPark = (userId, park) => User.findByIdAndUpdate(
  { _id: userId },
  { $addToSet: { parks: park } },
);

const unFavPark = (userId, park) => User.findByIdAndUpdate(
  { _id: userId },
  { $pull: { parks: park } },
);

module.exports = {
  createUser,
  findUser,
  favPark,
  unFavPark,
};
