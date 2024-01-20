import { ACTION_TYPE } from '../constants';

export const setOrderedHotels = (hotels) => ({
  type: ACTION_TYPE.SET_ORDERED_HOTELS,
  payload: hotels,
});
