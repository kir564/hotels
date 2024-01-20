import PropTypes from 'prop-types';
import React from 'react';
import { Container } from '../container/container';
import styled from 'styled-components';

const MainWrapper = styled.main``;

export const Main = ({ children }) => {
  return (
    <MainWrapper>
      <Container>{children}</Container>
    </MainWrapper>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};
