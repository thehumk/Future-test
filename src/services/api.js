import axios from 'axios';

const BASE_URL = `http://www.filltext.com/`;
const REQUEST_TIMEOUT = 20000;

export const createAPI = () => {
  return axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: false,
  });
}
