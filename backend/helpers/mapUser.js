const mongoose = require('mongoose');
const mapOrderedHotel = require('./mapOrderedHotel');

module.exports = (user) => ({
  id: user.id,
  login: user.login,
  roleId: user.role,
  registeredAt: user.createdAt,
  orderedHotels: user.orderedHotels.map((orderedHotel) =>
    mongoose.isObjectIdOrHexString(orderedHotel)
      ? orderedHotel
      : mapOrderedHotel(orderedHotel)
  ),
});
