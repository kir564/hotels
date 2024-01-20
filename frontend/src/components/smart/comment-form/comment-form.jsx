import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { addCommentAction, updateCommentAction } from '../../../actions';
import { OPERATION } from '../../../constants';
import { Button, TextAreaComment } from '../../ui';
import { request } from '../../../utils';

const Buttons = styled.div`
  display: flex;
  margin: 1rem 0 0 0;
`;

export const CommentForm = ({
  title,
  placeholder,
  operation,
  hotelId,
  defaultValue,
  isEdit,
  setIsEdit,
  id,
}) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      text: defaultValue || '',
    },
  });

  const dispatch = useDispatch();

  const onSubmit = (formData) => {
    if (operation === OPERATION.WRITE_FEEDBACK) {
      request({
        url: `/hotels/${hotelId}/comments`,
        method: 'POST',
        data: {
          content: formData.text,
        },
      }).then(({ data }) => {
        dispatch(addCommentAction(data));
      });

      reset();
    }

    if (operation === OPERATION.UPDATE_HOTEL_COMMENT) {
      request({
        url: `/hotels/${hotelId}/comments/${id}`,
        method: 'PATCH',
        data: {
          content: formData.text,
        },
      }).then(({ data }) => {
        dispatch(updateCommentAction(data));
      });

      setIsEdit(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextAreaComment placeholder={placeholder} {...register('text')} />
      {isEdit ? (
        <Buttons>
          <Button type="submit">Изменить</Button>
          <Button
            type="button"
            margin=" 0 0 0 1rem"
            onClick={() => setIsEdit(false)}
          >
            Отмена
          </Button>
        </Buttons>
      ) : (
        <Button margin="1rem 0 0 0">Оставить {title}</Button>
      )}
    </form>
  );
};

CommentForm.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  hotelId: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  isEdit: PropTypes.bool,
  setIsEdit: PropTypes.func,
};
