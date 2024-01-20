const { ACTION_TYPE } = require('../constants');

export const setOrderedHotelAction = (data) => ({
  type: ACTION_TYPE.SET_ORDERED_HOTEL,
  payload: data,
});
