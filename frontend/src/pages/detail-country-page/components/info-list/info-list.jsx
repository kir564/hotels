import PropTypes from 'prop-types';
import styled from 'styled-components';

const InfoItem = styled.li`
  line-height: 1.7;

  & > span {
    margin-left: 0.5rem;
  }
`;

const Wrapper = ({ data, className }) => {
  return (
    <ul className={className}>
      {data.map(({ title, description }) => (
        <InfoItem key={title}>
          <b>{title}</b>:<span>{description}</span>
        </InfoItem>
      ))}
    </ul>
  );
};

export const InfoList = styled(Wrapper)`
  margin: ${({ margin }) => margin || 0};
  padding: 0;
  list-style: none;
`;

Wrapper.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  ),
  className: PropTypes.string,
};
