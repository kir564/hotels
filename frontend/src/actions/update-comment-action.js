import { ACTION_TYPE } from '../constants';

export const updateCommentAction = (updatedComment) => ({
  type: ACTION_TYPE.UPDATE_COMMENT,
  payload: updatedComment,
});
