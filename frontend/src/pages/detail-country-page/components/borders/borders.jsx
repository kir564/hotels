import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { filterByCodeURL } from '../../../../configs';
import { STYLES, DEVICE } from '../../../../constants';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  margin: 2rem 0 0 0;

  & > span {
    margin-left: 1rem;
  }

  @media (${DEVICE.SMALL}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const BorderList = styled.ul`
  margin: 0 0 0 1rem;
  padding: 0;
  list-style: none;
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  @media (${DEVICE.SMALL}) {
    margin: 0;
  }
`;

const BorderItem = styled.li`
  padding: 0 1rem;
  box-shadow: ${({ theme }) => theme.shadow.base};
  border-radius: ${STYLES.RADII.MEDIUM};
  background-color: ${({ theme }) => theme.color.base};
  cursor: pointer;
`;

export const Borders = ({ borders = [] }) => {
  const [borderCountries, setBorderCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (borders.length) {
      axios
        .get(filterByCodeURL(borders))
        .then(({ data }) => {
          setBorderCountries(data.map((c) => c.name));
        })
        .catch((error) => {
          console.log(error.toJSON());
        });
    }
  }, [borders]);

  return (
    <Wrapper>
      <b>Border Countries:</b>
      {borderCountries.length === 0 ? (
        <span>There is no border countries</span>
      ) : (
        <BorderList>
          {borderCountries.map((b) => (
            <BorderItem key={b} onClick={() => navigate(`/country/${b}`)}>
              {b}
            </BorderItem>
          ))}
        </BorderList>
      )}
    </Wrapper>
  );
};

Borders.propTypes = {
  borders: PropTypes.arrayOf(PropTypes.string),
};
