import { Info } from '../info/info';
// import { DetailCardImage } from '../detail-card-image/detail-card-image';
// import { DetailCardImage } from '../../../../components';
// import { DEVICE } from '../../constants';
import PropTypes from 'prop-types';
import { transformCountryDetail } from '../../../../transforms';

import styled from 'styled-components';
import { DEVICE } from '../../../../constants';

const Wrapper = styled.div``;

const WrapperDetailCard = styled.div`
  margin: 2rem 0;
  align-items: center;
`;

const DetailCardImage = styled.img`
  display: block;
  max-width: 600px;
  height: 100%;
  object-fit: contain;
  margin: 4rem auto;

  @media (${DEVICE.MEDIUM}) {
    margin: 0 0 2rem 0;
    max-width: 100%;
  }
`;

// const DetailCardImage = styled.img`
//   display: block;
//   max-width: 600px;
//   height: 100%;
//   object-fit: contain;
//   margin: 4rem auto;

//   @media (${DEVICE.MEDIUM}) {
//     margin: 0 0 2rem 0;
//     max-width: 100%;
//   }
// `;

export const DetailCardCountry = ({ country }) => {
  const countryInfo = transformCountryDetail(country);

  return (
    <Wrapper>
      <WrapperDetailCard>
        <DetailCardImage src={countryInfo.img} alt={country.name} />
        <Info country={countryInfo} />
      </WrapperDetailCard>
    </Wrapper>
  );
};

DetailCardCountry.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.string.isRequired,
    flag: PropTypes.string.isRequired,
    population: PropTypes.number.isRequired,
    capital: PropTypes.string,
    region: PropTypes.string.isRequired,
    nativeName: PropTypes.string.isRequired,
    subregion: PropTypes.string,
    topLevelDomain: PropTypes.arrayOf(PropTypes.string),
    currencies: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
    languages: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
    borders: PropTypes.arrayOf(PropTypes.string),
  }),
};
