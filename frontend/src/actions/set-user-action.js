import { ACTION_TYPE } from '../constants';

export const setUserAction = (user) => ({
  type: ACTION_TYPE.SET_USER,
  payload: user,
});
