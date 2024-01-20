import { ACTION_TYPE, ROLE } from '../constants';

const initialUserState = {
  id: null,
  login: null,
  registeredAt: null,
  roleId: ROLE.GUEST,
  orderedHotels: [],
  posts: [],
};

export const userReducer = (state = initialUserState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPE.SET_USER:
      return {
        ...payload,
      };

    case ACTION_TYPE.SET_ORDERED_HOTELS:
      return {
        ...state,
        hotels: payload,
      };

    case ACTION_TYPE.RESET_USER:
      return initialUserState;

    case ACTION_TYPE.SET_ORDERED_HOTEL:
      return {
        ...state,
        orderedHotels: [...state.orderedHotels, payload],
      };

    case ACTION_TYPE.CANCEL_ORDERED_HOTEL:
      return {
        ...state,
        orderedHotels: state.orderedHotels.filter(({ id }) => id !== payload),
      };

    default:
      return state;
  }
};
