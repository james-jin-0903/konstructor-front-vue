import axios from 'axios';
import { API_URL, AUTH_API_URL } from '@/config';

import { getCookie } from '@/utils/cookies';

export const createRequest = async (method, url, data?, params?) => {
  let response = await newRequest(method, `${API_URL}${url}`, data, params);
  return await response.data;
};

export const createAuthRequest = async (method, url, data?, params?) => {
  let response = await newRequest(method, `${AUTH_API_URL}${url}`, data, params);
  return await response.data;
};

const newRequest = async (method, url, data?, params?) => {
  const token = (params || {}).jwtToken || getCookie('jwt_token');

  //  TODO: auth refresh

  return await axios({
    method,
    url,
    data,
    params,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

};
