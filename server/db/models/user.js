const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: String,
  parks: [],
});

const User = model('User', userSchema);

/**
 * The parks [] is an array of names of parks that this user has liked
 *
 * Lines 20-22 check to see if that user already exists.
 */
const createUser = (body) => {
  const user = new User({
    email: body.email,
    parks: [],
  });
  const { email } = user;
  return User.findOne({ email }).then((result) => {
    if (!result) {
      return User.create(user);
    }
    return '';
  });
};

const findUser = (email) => User.findOne({ email }).exec();

/**
 * @param {ObjectId} userId -- the mongo-provided ObjectId
 * @param {string} park -- the name value of the park a user wishes to favorite
 *
 * $addToSet and $pull are built in mongo methods for fields that have an array as the value.
 *
 * $addToSet will add the value provided into an array if it doesn't already exist there.
 * $pull will remove the value provided from an array if it exists there.
 */
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
