module.exports = (orderedHotel) => ({
  id: orderedHotel._id,
  name: orderedHotel.hotel.name,
  orderedAt: orderedHotel.createdAt,
  hotelId: orderedHotel.hotel._id,
});
