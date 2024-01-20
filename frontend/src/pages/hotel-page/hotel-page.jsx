import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { setCommentsAction, setOrderedHotelAction } from '../../actions';
import {
  Button,
  ButtonsBlock,
  Comments,
  CommentForm,
  Loader,
} from '../../components';
import { DetailCardHotel } from './components/detail-card-hotel';
import { OPERATION } from '../../constants';
import { BlockWrapper } from '../../containers';
import { selectUserLogin } from '../../selectors';
import { request } from '../../utils';

const Wrapper = styled.div``;

const ErrorMessage = styled.p`
  color: red;
  font-style: italic;
  margin-top: 0;
`;

export const HotelPage = () => {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [requestError, setRequestError] = useState(null);

  const dispatch = useDispatch();
  const login = useSelector(selectUserLogin);

  useEffect(() => {
    setIsLoad(true);
    request({ url: `/hotels/${id}` })
      .then(({ data, error }) => {
        if (error) {
          setRequestError(error);
        } else {
          setHotel(data);
          dispatch(setCommentsAction(data.comments));
        }
      })
      .finally(() => {
        setIsLoad(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const orderHotel = async () => {
    setIsLoad(true);
    request({ url: `/hotels/${id}/order`, method: 'POST' })
      .then(({ data }) => {
        dispatch(setOrderedHotelAction(data));
      })
      .finally(() => {
        setIsLoad(false);
      });
  };

  return (
    <Wrapper>
      <BlockWrapper>
        <ButtonsBlock />
      </BlockWrapper>
      {isLoad && <Loader />}
      <BlockWrapper>
        {requestError && <ErrorMessage>{requestError}</ErrorMessage>}
        {hotel && <DetailCardHotel hotel={hotel} />}
      </BlockWrapper>
      {hotel && login && (
        <>
          <BlockWrapper>
            <Button onClick={orderHotel}>Забронировать</Button>
          </BlockWrapper>
          <CommentForm
            title="отзыв"
            placeholder="Написать отзыв"
            operation={OPERATION.WRITE_FEEDBACK}
            user={login}
            hotelId={id}
          />
        </>
      )}
      {hotel && <Comments isHotel hotelId={id} />}
    </Wrapper>
  );
};
