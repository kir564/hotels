import { ACTION_TYPE } from '../constants';

export const removeCommentAction = (commentId) => ({
  type: ACTION_TYPE.REMOVE_COMMENT,
  payload: commentId,
});
