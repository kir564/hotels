const { ACTION_TYPE } = require('../constants');

export const cancelOrderedHotelAction = (orderedHotelId) => ({
  type: ACTION_TYPE.CANCEL_ORDERED_HOTEL,
  payload: orderedHotelId,
});
