import { setUserAction } from './actions';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Header } from './components';
import { AppTheme, Main } from './containers';
import { STORAGE_KEY, PATH } from './constants';
import {
  AuthPage,
  CountriesPage,
  DetailCountryPage,
  HomePage,
  RegisterPage,
  HotelPage,
  UserPage,
} from './pages';

export const App = () => {
  const dispatch = useDispatch();
  const currentUser = sessionStorage.getItem(STORAGE_KEY.USER);

  if (currentUser) {
    dispatch(setUserAction(JSON.parse(currentUser)));
  }

  return (
    <AppTheme>
      <Header />
      <Main>
        <Routes>
          <Route path={PATH.HOME} element={<HomePage />} />
          <Route path={PATH.HOTEL} element={<HotelPage />} />
          <Route path={PATH.AUTH} element={<AuthPage />} />
          <Route path={PATH.REGISTER} element={<RegisterPage />} />
          <Route path={PATH.USER} element={<UserPage />} />
          <Route path={PATH.COUNTRIES} element={<CountriesPage />} />
          <Route path={PATH.COUNTRY} element={<DetailCountryPage />} />
        </Routes>
      </Main>
    </AppTheme>
  );
};
