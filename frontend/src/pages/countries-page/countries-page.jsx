import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Search, ButtonsBlock } from '../../components';
import { BlockWrapper } from '../../containers';
import { ALL_COUNTRIES_URL } from '../../configs';
import { CardCountry } from './components';

import { transformCountry } from '../../transforms';
import styled from 'styled-components';
import { DEVICE } from '../../constants';

const CardListWrapper = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2.2rem;

  @media (${DEVICE.SMALL}) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 330px));
  }
`;

export const CountriesPage = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  const filteredCountries = countries.filter(({ name }) =>
    name.toLocaleLowerCase().startsWith(search.toLocaleLowerCase()),
  );

  useEffect(() => {
    axios
      .get(ALL_COUNTRIES_URL)
      .then(({ data }) => {
        setCountries(data);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  }, []);

  return (
    <>
      <BlockWrapper>
        <ButtonsBlock />
      </BlockWrapper>
      <BlockWrapper>
        <Search setSearch={setSearch} />
      </BlockWrapper>
      <CardListWrapper>
        {filteredCountries.map((country) => (
          <CardCountry key={country.name} country={transformCountry(country)} />
        ))}
      </CardListWrapper>
    </>
  );
};
