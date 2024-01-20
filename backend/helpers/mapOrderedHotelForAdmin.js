module.exports = (orderedHotel) => ({
  id: orderedHotel._id,
  orderedAt: orderedHotel.createdAt,
  hotel: {
    id: orderedHotel?.hotel._id,
    name: orderedHotel?.hotel.name,
  },
  client: {
    id: orderedHotel?.client._id,
    login: orderedHotel?.client.login,
  },
});
