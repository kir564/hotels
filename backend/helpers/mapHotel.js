const mapHotelComment = require('../helpers/mapHotelComment');
const mongoose = require('mongoose');

module.exports = (hotel) => ({
  id: hotel._id,
  city: hotel.city,
  name: hotel.name,
  description: hotel.description,
  quantity: hotel.quantity,
  category: hotel.category,
  order: hotel.order,
  img: hotel.img,
  price: hotel.price,
  comments: hotel.comments.map((comment) =>
    mongoose.isObjectIdOrHexString(comment) ? comment : mapHotelComment(comment)
  ),
});
