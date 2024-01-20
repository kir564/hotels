const OrderedHotel = require('../models/OrderedHotel');
const User = require('../models/User');

const orderHotel = async (hotelId, userId) => {
  const orderedHotel = await OrderedHotel.create({
    client: userId,
    hotel: hotelId,
  });

  await User.findByIdAndUpdate(userId, {
    $push: { orderedHotels: orderedHotel },
  });

  await orderedHotel.populate('client');
  await orderedHotel.populate('hotel');

  return orderedHotel;
};

const cancelOrderedHotel = async (userId, orderedHotelId) => {
  await OrderedHotel.deleteOne({ _id: orderedHotelId });

  await User.findByIdAndUpdate(userId, {
    $pull: { orderedHotels: orderedHotelId },
  });
};

const getOrderedHotels = async () =>
  OrderedHotel.find().populate(['hotel', 'client']);

module.exports = {
  orderHotel,
  cancelOrderedHotel,
  getOrderedHotels,
};
