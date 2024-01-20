import PropTypes from 'prop-types';
import styled from 'styled-components';

import { STYLES } from '../../../constants';

const ButtonContainer = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

export const Button = styled(ButtonContainer)`
  margin: ${({ margin }) => margin || 0};
  display: flex;
  align-items: center;
  padding: ${({ padding }) => padding || '0 1rem'};
  line-height: 2.5;
  border: none;
  border-radius: ${STYLES.RADII.MEDIUM};
  background-color: ${({ theme }) => theme.color.base};
  color: ${({ theme }) => theme.color.text};
  box-shadow: ${({ theme }) => theme.shadow.base};
  font-size: ${STYLES.FS.SMALL};
  justify-content: ${({ content }) => content};
  width: ${({ width }) => width};
  cursor: pointer;
`;

Button.propTypes = {
  children: PropTypes.node,
  props: PropTypes.shape({
    margin: PropTypes.string,
    padding: PropTypes.string,
    width: PropTypes.string,
    onClick: PropTypes.func,
    content: PropTypes.string,
  }),
};
