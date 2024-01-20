import { ACTION_TYPE } from '../constants';

export const setHotelAction = (hotels) => ({
  type: ACTION_TYPE.SET_HOTELS,
  payload: hotels,
});
