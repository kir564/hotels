import { ACTION_TYPE } from '../constants';

const initialHotelsState = {
  hotels: [],
  total: 0,
};

export const hotelsReducer = (
  state = initialHotelsState,
  { type, payload },
) => {
  switch (type) {
    case ACTION_TYPE.SET_HOTELS:
      return {
        ...state,
        hotels: payload.hotels,
        total: payload.total,
      };

    case ACTION_TYPE.RESET_HOTELS:
      return initialHotelsState;

    default:
      return state;
  }
};
