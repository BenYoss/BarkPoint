const { Schema, model } = require('mongoose');

const parkSchema = new Schema({
  name: String,
  lat: Number,
  long: Number,
  comments: String,
});

const Park = model('Park', parkSchema);

const getParks = () => Park.find();

const addPark = (name, lat, long, comments) => Park.create({
  name,
  lat,
  long,
  comments,
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
  getParks,
  addPark,
  updatePark,
  deletePark,
};
