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
  toys: [{ type: Schema.Types.ObjectId, ref: 'Toy' }],
});

const Dog = model('Dog', dogSchema);

module.exports = Dog;
