import { ACTION_TYPE } from '../constants';

export const setThemeAction = (theme) => ({
  type: ACTION_TYPE.SET_THEME,
  payload: theme,
});
