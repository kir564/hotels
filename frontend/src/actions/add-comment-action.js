import { ACTION_TYPE } from '../constants';

export const addCommentAction = (comment) => ({
  type: ACTION_TYPE.ADD_COMMENT,
  payload: comment,
});
