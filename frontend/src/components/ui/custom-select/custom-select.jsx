import Select from 'react-select';
import styled from 'styled-components';

import { STYLES } from '../../../constants';

export const CustomSelect = styled(Select).attrs(({ theme }) => ({
  styles: {
    control: (provided) => ({
      ...provided,
      backgroundColor: theme.color.base,
      color: theme.color.text,
      borderRadius: '0.5rem',
      padding: '0.25rem',
      border: 'none',
      boxShadow: theme.shadow.base,
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: 'pointer',
      color: theme.color.text,
      backgroundColor: state.isSelected ? theme.color.bg : theme.color.base,
    }),
  },
}))`
  width: ${({ width }) => width || '100%'};
  border-radius: ${STYLES.RADII};
  font-family: ${STYLES.FF};
  border: none;
  margin: ${({ margin }) => margin || 0};

  & * {
    font-style: italic;
    color: ${({ theme }) => theme.color.text} !important;
  }

  & input {
    padding: 1rem 3rem;
  }
`;
