const { Schema, model } = require('mongoose');

const parkSchema = new Schema({
  name: String,
  address: String,
  comment: String,
});

const Park = model('Park', parkSchema);

const addPark = (name, address, comment) => Park.create({
  name,
  address,
  comment,
})
  .then((data) => data);

const updatePark = (name, comment) => Park.update({ name }, { comment });

const deletePark = (name) => Park.deleteOne({ name });

module.exports = {
  addPark,
  updatePark,
  deletePark,
};
