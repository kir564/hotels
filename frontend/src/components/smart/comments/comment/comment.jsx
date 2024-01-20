import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiUser, FiCalendar, FiTrash, FiPenTool } from 'react-icons/fi';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { removeCommentAction } from '../../../../actions';
import { CommentForm } from '../../comment-form/comment-form';
import { OPERATION } from '../../../../constants';
import { selectUserLogin } from '../../../../selectors';
import { request } from '../../../../utils';

const Wrapper = styled.div`
  border: 1px solid black;
  padding: 1rem;
  margin: 0 0 1rem 0;
`;

const Panel = styled.div``;

const Info = styled.div`
  margin: 1rem 0 0 0;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
`;

const InnerItem = styled.div`
  margin: 0 0 0 0.5rem;
`;

const Control = styled.div`
  margin: 0 0 0 1rem;
  display: flex;
  gap: 0.5rem;
`;

export const Comment = ({ comment, isHotel, hotelId }) => {
  const { content, author, publishedAt, id } = comment;

  const [isEdit, setIsEdit] = useState(false);

  const login = useSelector(selectUserLogin);
  const dispatch = useDispatch();

  const isUserComment = author === login;

  const deleteComment = () => {
    if (isHotel) {
      request({
        url: `/hotels/${hotelId}/comments/${id}`,
        method: 'DELETE',
      }).then(() => {
        dispatch(removeCommentAction(id));
      });
    }
  };

  const editComment = () => {
    setIsEdit(true);
  };

  return (
    <Wrapper>
      {isEdit ? (
        <CommentForm
          defaultValue={content}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          operation={OPERATION.UPDATE_HOTEL_COMMENT}
          id={id}
          hotelId={hotelId}
        />
      ) : (
        <div>{content}</div>
      )}
      <Panel>
        <Info>
          <InfoItem>
            <FiUser />
            <InnerItem>{author}</InnerItem>
            {isUserComment && !isEdit && (
              <Control>
                <FiTrash cursor="pointer" onClick={deleteComment} />
                <FiPenTool cursor="pointer" onClick={editComment} />
              </Control>
            )}
          </InfoItem>
          <InfoItem>
            <FiCalendar />
            <InnerItem>{publishedAt.split(' ')[0]}</InnerItem>
          </InfoItem>
        </Info>
      </Panel>
    </Wrapper>
  );
};

Comment.propTypes = {
  hotelId: PropTypes.string.isRequired,
  isHotel: PropTypes.bool.isRequired,
  comment: PropTypes.shape({
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};
