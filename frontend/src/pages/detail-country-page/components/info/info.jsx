import { Borders } from '../borders/borders';
import { InfoList } from '../info-list/info-list';
import { DEVICE } from '../../../../constants';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div``;

const Title = styled.h3`
  margin: 0 0 1rem 0;
`;

const InfoGroup = styled.div`
  display: flex;

  @media (${DEVICE.SMALL}) {
    flex-direction: column;
  }
`;

export const Info = ({ country }) => {
  const { name, info, info2, borders } = country;
  return (
    <Wrapper>
      <Title>{name}</Title>
      <InfoGroup>
        <InfoList data={info} margin="0 4rem 0 0" />
        <InfoList data={info2} />
      </InfoGroup>
      <Borders borders={borders} />
    </Wrapper>
  );
};

Info.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.string.isRequired,
    info: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
      }).isRequired,
    ),
    info2: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
      }).isRequired,
    ),
    borders: PropTypes.arrayOf(PropTypes.string),
  }),
};
