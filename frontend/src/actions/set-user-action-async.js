import { STORAGE_KEY } from '../constants';
import { request } from '../utils';
import { setUserAction } from './set-user-action';

export const setUserActionAsync = ({
  url,
  login,
  password,
  reset,
  navigate,
}) => {
  return (dispatch) =>
    request({
      url,
      method: 'POST',
      data: { login, password },
    }).then(({ error, user }) => {
      if (error) {
        throw new Error(error);
      } else {
        dispatch(setUserAction(user));
        sessionStorage.setItem(STORAGE_KEY.USER, JSON.stringify(user));
        reset();
        navigate(-1);
        return user;
      }
    });
};
