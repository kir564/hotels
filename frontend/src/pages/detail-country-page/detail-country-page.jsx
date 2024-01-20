import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchByCountryURL } from '../../configs';
import { ButtonsBlock } from '../../components';
import { DetailCardCountry } from './components';
import styled from 'styled-components';

const DetailWrapper = styled.div`
  padding: 3rem 0;
`;

export const DetailCountryPage = () => {
  const [country, setCountry] = useState(null);

  const { name } = useParams();

  useEffect(() => {
    axios
      .get(searchByCountryURL(name))
      .then(({ data }) => {
        setCountry(data[0]);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  }, [name]);

  return (
    <DetailWrapper>
      <ButtonsBlock />
      {country && <DetailCardCountry country={country} />}
    </DetailWrapper>
  );
};
