const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  id_google: String,
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
    id_google: body.id,
    parks: [],
  });
  return User.findOne({ id_google: body.id }).then((result) => {
    if (!result) {
      return User.create(user);
    }
    return '';
  });
};
const findUser = (id) => User.findOne({ id_google: id }).exec();
/**
 * @param {ObjectId} userId -- the mongo-provided ObjectId
 * @param {string} park -- the name value of the park a user wishes to favorite
 *
 * $addToSet and $pull are built in mongo methods for fields that have an array as the value.
 *
 * $addToSet will add the value provided into an array if it doesn't already exist there.
 * $pull will remove the value provided from an array if it exists there.
 */
const favPark = (id, park) => User.findOneAndUpdate(
  { id_google: id },
  { $addToSet: { parks: park } },
);
const unFavPark = (id, park) => User.findOneAndUpdate(
  { id_google: id },
  { $pull: { parks: park } },
);
const getFavParks = (id) => User.findOne({ id_google: id })
  .then((userData) => (userData.parks ? userData.parks : []))
  .catch((err) => console.error(err));

module.exports = {
  createUser,
  findUser,
  favPark,
  unFavPark,
  getFavParks,
};
