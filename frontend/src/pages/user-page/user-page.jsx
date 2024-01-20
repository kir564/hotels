import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';

import { cancelOrderedHotelAction } from '../../actions';
import { Button, ButtonsBlock } from '../../components';
import { BlockWrapper } from '../../containers';
import { selectUserLogin, selectUserId } from '../../selectors';
import { request } from '../../utils';

const Wrapper = styled.div``;

export const UserPage = () => {
  const login = useSelector(selectUserLogin);
  const userId = useSelector(selectUserId);
  const orderedHotels = useSelector((state) => state.user.orderedHotels);

  const dispatch = useDispatch();

  if (!login) {
    return <Navigate to={'/'} />;
  }

  const cancelOrder = (id) => {
    request({
      url: `/users/${userId}/cancelOrder/${id}`,
      method: 'DELETE',
    }).then(() => {
      dispatch(cancelOrderedHotelAction(id));
    });
  };

  return (
    <Wrapper>
      <BlockWrapper>
        <ButtonsBlock />
      </BlockWrapper>
      <h2>Информация о пользователе:</h2>
      <p>
        <b>Пользователь:</b>
        <span style={{ margin: ' 0 0 0 0.5rem' }}>{login}</span>
      </p>
      <h2>Информация о отелях:</h2>
      {orderedHotels.length === 0 ? (
        <p>Забронированных отелей нет</p>
      ) : (
        orderedHotels.map(({ id, orderedAt, name, hotelId }) => (
          <p key={id}>
            <span>
              <b>Название:</b>
              <span style={{ margin: ' 0 0 0 0.5rem' }}>
                <Link to={`/hotels/${hotelId}`}>{name}</Link>
              </span>
            </span>
            <span style={{ margin: ' 0 0 0 0.5rem' }}>
              <b>Время заказа:</b>
              <span style={{ margin: ' 0 0 0 0.5rem' }}>{orderedAt}</span>
            </span>
            <Button margin="1rem 0 0 0" onClick={() => cancelOrder(id)}>
              Отменить
            </Button>
          </p>
        ))
      )}
    </Wrapper>
  );
};
