const mongoose = require('mongoose');
const validator = require('validator');

const HotelSchema = mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  order: {
    type: Boolean,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  quantity: {
    type: String,
  },
  img: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: 'Image should be a valid url',
    },
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HotelComment',
    },
  ],
});

const Hotel = mongoose.model('Hotel', HotelSchema);

module.exports = Hotel;
