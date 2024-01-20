const mongoose = require('mongoose');

const OrderedHotelSchema = mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const OrderedHotel = mongoose.model('OrderedHotel', OrderedHotelSchema);

module.exports = OrderedHotel;
