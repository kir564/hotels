import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { STYLES } from '../../../../constants';

const CardWrapper = styled(Link)`
  background-color: ${({ theme }) => theme.color.base};
  box-shadow: ${({ theme }) => theme.shadow.base};
  border-radius: ${STYLES.RADII.MEDIUM};
  cursor: pointer;
  overflow: hidden;
  object-fit: cover;
  object-position: center;
`;

const CardImage = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
`;

const CardBody = styled.div`
  padding: 1rem 1.5rem 2rem;
  font-size: ${STYLES.FS.SMALL};
`;

const CardTitle = styled.h3`
  margin: 0;
`;

const CardList = styled.ul`
  margin: 0;
  padding: 1rem 0 0;
  list-style: none;
`;

const CardItem = styled.li`
  line-height: 1.5;
`;

export const CardCountry = ({ country }) => {
  return (
    <CardWrapper to={`/country/${country.name}`}>
      <CardImage src={country.img} />
      <CardBody>
        <CardTitle>{country.name}</CardTitle>
        <CardList>
          {country.info.map(({ title, description }) => (
            <CardItem key={title}>
              <b>{title}:</b> {description}
            </CardItem>
          ))}
        </CardList>
      </CardBody>
    </CardWrapper>
  );
};

CardCountry.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    info: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
      }),
    ),
  }),
};
