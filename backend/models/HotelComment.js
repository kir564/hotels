const mongoose = require('mongoose');

const HotelCommentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const HotelComment = mongoose.model('HotelComment', HotelCommentSchema);

module.exports = HotelComment;
