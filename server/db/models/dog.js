const { Schema, model } = require('mongoose');

const dogSchema = new Schema({
  name: String,
  breed: String,
  size: String,
  image: String,
  id_user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  toys: [],
});

const Dog = model('Dog', dogSchema);

const addDog = (body) => {
  Dog.create({
    name: body.name,
    breed: body.breed,
    size: body.size,
    image: body.image,
    toys: [],
  });
};

const deleteDog = (dogName) => {
  Dog.deleteOne({ name: dogName });
};

const addToy = ({ dogId, body }) => {
  const newToy = {
    name: body.title,
    price: body.prices.raw,
    image: body.image,
    url: body.link,
    rating: body.rating,
  };
  Dog.findByIdAndUpdate(
    { dogId },
    { $addToSet: { toys: newToy } },
  );
};

const removeToy = ({ dogId, body }) => {
  Dog.findByIdAndUpdate(
    { dogId },
    { $pull: { toys: { name: body.title } } },
  );
};

module.exports = {
  addDog,
  deleteDog,
  addToy,
  removeToy,
};
