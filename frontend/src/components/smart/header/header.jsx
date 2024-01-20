import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import { CgSun } from 'react-icons/cg';
import { IoMoon } from 'react-icons/io5';
import styled from 'styled-components';

import { setThemeAction, resetUserAction } from '../../../actions';
import { Container } from '../../../containers';
import {
  THEME_NAME,
  STYLES,
  DEVICE,
  STORAGE_KEY,
  PATH,
} from '../../../constants';
import { selectTheme, selectUserLogin } from '../../../selectors';
import { request } from '../../../utils';

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.color.base};
  box-shadow: ${({ theme }) => theme.shadow.base};
`;

const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;

  @media ${DEVICE.SMALL} {
    flex-direction: column;
    padding: 1rem 0;
  }
`;

const Title = styled(Link)`
  font-size: ${STYLES.FS.SMALL};
  font-weight: ${STYLES.FW.BOLD};
  font-style: italic;

  @media ${DEVICE.SMALL} {
    margin-bottom: 0.5rem;
  }
`;

const ControlPanel = styled.div`
  display: flex;
  align-items: center;

  & > span {
    display: flex;
    align-items: center;
    margin-left: 1rem;
  }
`;

const Login = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid ${({ theme }) => theme.color.text};
  box-shadow: ${({ theme }) => theme.shadow.base};
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-weight: ${STYLES.FW.BOLD};
  cursor: pointer;
`;

export const Header = () => {
  const theme = useSelector(selectTheme);
  const login = useSelector(selectUserLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleTheme = () => {
    const toolForToggle = {
      [THEME_NAME.DARK]: THEME_NAME.LIGHT,
      [THEME_NAME.LIGHT]: THEME_NAME.DARK,
    };

    const newTheme = toolForToggle[theme];

    dispatch(setThemeAction(newTheme));
  };

  const onGoOut = () => {
    request({ url: '/logout', method: 'POST' }).then(() => {
      dispatch(resetUserAction);
      sessionStorage.removeItem(STORAGE_KEY.USER);
    });
  };

  const goUserPage = () => {
    navigate(PATH.USER);
  };

  return (
    <HeaderWrapper>
      <Container>
        <HeaderInner>
          <Title to="/">Home</Title>
          <ControlPanel>
            {theme === THEME_NAME.LIGHT ? (
              <IoMoon size="18" onClick={toggleTheme} cursor="pointer" />
            ) : (
              <CgSun size="18" onClick={toggleTheme} cursor="pointer" />
            )}
            <span>
              {!login ? (
                <BiLogInCircle
                  size="22"
                  cursor="pointer"
                  onClick={() => navigate(PATH.AUTH)}
                />
              ) : (
                <>
                  <Login onClick={goUserPage}>{login[0]}</Login>
                  <BiLogOutCircle
                    size="22"
                    cursor="pointer"
                    onClick={onGoOut}
                  />
                </>
              )}
            </span>
          </ControlPanel>
        </HeaderInner>
      </Container>
    </HeaderWrapper>
  );
};
