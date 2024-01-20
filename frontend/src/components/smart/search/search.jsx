import { useState } from 'react';
import PropTypes from 'prop-types';
import { IoSearchSharp } from 'react-icons/io5';
import styled from 'styled-components';

import { Input } from '../../ui/input/input';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const Search = ({ setSearch }) => {
  const [value, setValue] = useState('');

  const onChange = ({ target }) => {
    setValue(target.value);
    setSearch(target.value);
  };

  return (
    <Wrapper>
      <Input
        margin="0 0 0 2rem"
        title={<IoSearchSharp />}
        placeholder="Search for a country..."
        value={value}
        onChange={onChange}
      />
    </Wrapper>
  );
};

Search.propTypes = {
  setSearch: PropTypes.func.isRequired,
};
