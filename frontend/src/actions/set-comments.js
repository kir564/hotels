import { ACTION_TYPE } from '../constants';

export const setCommentsAction = (comments) => ({
  type: ACTION_TYPE.SET_COMMENTS,
  payload: comments,
});
