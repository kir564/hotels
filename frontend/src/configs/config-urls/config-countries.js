const BASE_URL = 'https://restcountries.com/v2/';

export const ALL_COUNTRIES_URL = new URL('all', BASE_URL);

const params = ['capital', 'name', 'flag', 'population', 'region'];

ALL_COUNTRIES_URL.searchParams.set('fields', params.join(','));

export const searchByCountryURL = (name) => BASE_URL + 'name/' + name;

export const filterByCodeURL = (codes) =>
  BASE_URL + 'alpha?codes=' + codes?.join(',');
