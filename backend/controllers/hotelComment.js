const Hotel = require('../models/Hotel');
const HotelComment = require('../models/HotelComment');

const addHotelComment = async (hotelId, comment) => {
  const newComment = await HotelComment.create(comment);

  await Hotel.findByIdAndUpdate(hotelId, {
    $push: { comments: newComment },
  });

  await newComment.populate('author');

  return newComment;
};

const deleteHotelComment = async (hotelId, commentId) => {
  await HotelComment.deleteOne({ _id: commentId });

  await Hotel.findByIdAndUpdate(hotelId, {
    $pull: { comments: commentId },
  });
};

const updateHotelComment = async (id, commentData) => {
  const newComment = await HotelComment.findByIdAndUpdate(id, commentData, {
    returnDocument: 'after',
  });

  await newComment.populate('author');

  return newComment;
};

const getHotelComment = (id) => HotelComment.findById(id).populate('author');

module.exports = {
  addHotelComment,
  deleteHotelComment,
  getHotelComment,
  updateHotelComment,
};
