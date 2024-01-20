import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BiLock } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';
import styled from 'styled-components';

import { setUserAction } from '../../actions';
import { Input, Button } from '../../components';
import { PATH, STORAGE_KEY } from '../../constants';
import { registerFormSchema } from './schema/register-form-schema';
import { selectUserLogin } from '../../selectors';
import { request } from '../../utils';

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 6rem 0;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;

  & > button:disabled {
    box-shadow: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-style: italic;
  margin-top: 0;
`;

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
      passCheck: '',
    },
    resolver: yupResolver(registerFormSchema),
  });

  const [serverError, setServerError] = useState();
  const navigate = useNavigate();
  const userName = useSelector(selectUserLogin);
  const dispatch = useDispatch();

  const onSubmit = ({ login, password }) => {
    request({
      url: '/register',
      method: 'POST',
      data: { login, password },
    }).then(({ error, user }) => {
      if (error) {
        setServerError(error);
      } else {
        dispatch(setUserAction(user));
        sessionStorage.setItem(STORAGE_KEY.USER, JSON.stringify(user));
        reset();
        navigate(-1);
      }
    });
  };

  if (userName) {
    return <Navigate to={PATH.HOME} replace />;
  }

  const errorForm =
    errors.login?.message ||
    errors.password?.message ||
    errors.passCheck?.message ||
    serverError;

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        title={<FiUser />}
        placeholder="login..."
        margin="0 0 0 2rem"
        {...register('login', {
          onChange: () => setServerError(null),
        })}
      />
      <Input
        type="password"
        title={<BiLock />}
        placeholder="password..."
        margin="0 0 0 2rem"
        {...register('password', {
          onChange: () => setServerError(null),
        })}
      />
      <Input
        type="password"
        title={<BiLock />}
        placeholder="repeat password..."
        margin="0 0 0 2rem"
        {...register('passCheck', {
          onChange: () => setServerError(null),
        })}
      />
      <Button
        padding="0.24rem"
        content="center"
        width="100%"
        disabled={errorForm}
      >
        Зарегистрироваться
      </Button>
      <ErrorMessage>{errorForm}</ErrorMessage>
    </Wrapper>
  );
};
