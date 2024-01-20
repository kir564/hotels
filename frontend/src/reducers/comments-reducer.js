import { ACTION_TYPE } from '../constants';

const initialComments = [];

export const commentsReducer = (state = initialComments, { type, payload }) => {
  switch (type) {
    case ACTION_TYPE.SET_COMMENTS:
      return payload;

    case ACTION_TYPE.ADD_COMMENT:
      return [...state, payload];

    case ACTION_TYPE.REMOVE_COMMENT:
      return state.filter(({ id }) => id !== payload);

    case ACTION_TYPE.UPDATE_COMMENT:
      return state.map((comment) => {
        if (comment.id === payload.id) {
          return {
            ...comment,
            content: payload.content,
          };
        }
        return comment;
      });

    default:
      return state;
  }
};
