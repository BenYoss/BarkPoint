const { Schema, model } = require('mongoose');

/**
 * address is written as a street address
 * ex: "420 Vape St, New Orleans, LA 70119"
 */
const parkSchema = new Schema({
  name: String,
  lat: Number,
  long: Number,
  comment: String,
});

const Park = model('Park', parkSchema);

const addPark = (name, lat, long, comment) => Park.create({
  name,
  lat,
  long,
  comment,
})
  .then((data) => data);

/**
 * //updatePark//
 * @param {string} name -- equal to the name field of the park whose comment you wish to update
 * @param {string} comment -- this new comment will replace the old comment
 */
const updatePark = (name, comment) => Park.update({ name }, { comment });

const deletePark = (name) => Park.deleteOne({ name });

module.exports = {
  addPark,
  updatePark,
  deletePark,
};
