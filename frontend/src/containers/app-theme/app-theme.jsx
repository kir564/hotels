import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import { STYLES } from '../../constants';
import { selectTheme } from '../../selectors';
import { getTheme } from './utils';

const GlobalStyled = createGlobalStyle`
  * {
    box-sizing: border-box ;
  }

  body {
    margin: 0;
    background-color: ${({ theme }) => theme.color.bg};
    color: ${({ theme }) => theme.color.text};
    font-family: ${STYLES.FF.NUNITO};
    font-weight: ${STYLES.FW.LIGHT};
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const AppTheme = ({ children }) => {
  const theme = useSelector(selectTheme);

  return (
    <ThemeProvider theme={getTheme(theme)}>
      <GlobalStyled />
      {children}
    </ThemeProvider>
  );
};
