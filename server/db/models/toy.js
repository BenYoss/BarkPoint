const { Schema, model } = require('mongoose');

const toySchema = new Schema({
  name: String,
  price: String,
  image: String,
  url: String,
  description: String,
  category: String,
  dogs: [{ type: Schema.Types.ObjectId, ref: 'Dog' }],
});

const Toy = model('Toy', toySchema);

module.exports = Toy;
