// import { DetailCardImage } from '../../../components/detail-card-image/detail-card-image';
import styled from 'styled-components';
import { transformHotelDetail } from '../../../transforms';
import PropTypes from 'prop-types';
import { DEVICE } from '../../../constants';
import { useState } from 'react';
import { Loader } from '../../../components';

const Wrapper = styled.div``;

const WrapperDetailCard = styled.div`
  margin: 2rem 0;
  align-items: center;
`;

const CardImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  max-width: 600px;
  margin: 4rem auto;

  @media (${DEVICE.MEDIUM}) {
    margin: 0 0 2rem 0;
    max-width: 100%;
    height: 150px;
  }
`;

const DetailCardImage = styled.img`
  display: block;
  max-width: 600px;
  height: 300px;
  object-fit: contain;

  @media (${DEVICE.MEDIUM}) {
    margin: 0 0 2rem 0;
    max-width: 100%;
    height: 150px;
  }
`;

export const DetailCardHotel = ({ hotel }) => {
  const hotelInfo = transformHotelDetail(hotel);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Wrapper>
      <WrapperDetailCard>
        <CardImageWrapper>
          {!isImageLoaded && <Loader />}
          <DetailCardImage
            src={hotel.img}
            alt={hotel.name}
            onLoad={() => {
              setIsImageLoaded(true);
            }}
          />
        </CardImageWrapper>
        <h2>{hotel.name}</h2>
        {hotelInfo.map(({ title, description }) => (
          <p key={title}>
            <b>{title}:</b> {description}
          </p>
        ))}
      </WrapperDetailCard>
    </Wrapper>
  );
};

DetailCardHotel.propTypes = {
  hotel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    order: PropTypes.bool.isRequired,
  }),
};
