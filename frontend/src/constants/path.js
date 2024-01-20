export const PATH_PARAMS = {
  NAME: 'name',
  ID: 'id',
  LOGIN: 'login',
};

export const PATH = {
  AUTH: '/login',
  HOME: '/',
  COUNTRY: `/country/:${PATH_PARAMS.NAME}`,
  COUNTRIES: '/countries',
  REGISTER: '/register',
  HOTEL: `/hotels/:${PATH_PARAMS.ID}`,
  USER: `/users/person`,
  USERS: 'users',
};
