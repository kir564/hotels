import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Comment } from './comment/comment';
import { selectComments } from '../../../selectors';

const Wrapper = styled.div`
  margin: 1rem 0 0 0;
`;

export const Comments = ({ isHotel, hotelId }) => {
  const comments = useSelector(selectComments);

  return (
    <Wrapper>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          isHotel={isHotel}
          hotelId={hotelId}
        />
      ))}
    </Wrapper>
  );
};

Comments.propTypes = {
  hotelId: PropTypes.string.isRequired,
  isHotel: PropTypes.bool.isRequired,
};
