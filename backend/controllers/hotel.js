const Hotel = require('../models/Hotel');

const getHotels = async ({
  limit = 8,
  page = 1,
  quantity = '',
  category = '',
  city = '',
}) => {
  const [hotels, count] = await Promise.all([
    Hotel.find({
      quantity: { $regex: quantity },
      category: { $regex: category },
      city: { $regex: city },
    })
      .limit(limit)
      .skip((page - 1) * limit),
    Hotel.countDocuments(),
  ]);

  return { hotels, lastPage: Math.ceil(count / limit), count };
};

const getHotel = async (id) =>
  Hotel.findById(id).populate({
    path: 'comments',
    populate: 'author',
  });

module.exports = {
  getHotels,
  getHotel,
};
