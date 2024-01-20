import { THEME_NAME, ACTION_TYPE } from '../constants';

const initialAppState = { theme: THEME_NAME.DARK };

export const appReducer = (state = initialAppState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPE.SET_THEME:
      return {
        ...state,
        theme: payload,
      };
    default:
      return state;
  }
};
