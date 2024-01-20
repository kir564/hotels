import axios from 'axios';

export const request = ({ url, method, data, params }) => {
  return axios({
    url: url,
    method: method || 'GET',
    data: data || null,
    params: params || null,
  }).then(({ data }) => data);
};
