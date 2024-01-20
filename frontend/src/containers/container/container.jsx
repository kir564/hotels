import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DEVICE } from '../../constants';

const ContainerComponent = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export const Container = styled(ContainerComponent)`
  width: ${({ width }) => width || '100%'};
  max-width: ${({ maxWidth }) => maxWidth || '992px'};
  margin: ${({ margin }) => margin || '0 auto'};

  @media ${DEVICE.LARGE} {
    padding: 0 2rem;
  }

  @media ${DEVICE.SMALL} {
    max-width: 330px;
  }
`;

ContainerComponent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
