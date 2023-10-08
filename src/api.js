import axios from 'axios';

const BASE_URL = 'http://localhost:5005/api/v1';

const axiosUserInstance = axios.create({
  BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'access-token': localStorage.getItem('token'),
  },
});

export const signUp = (user) => {
  return axios.post(`${BASE_URL}`, user);
};

export const getFeeds = ({ from, to }) => {
  return axios.get(`${BASE_URL}?from=${from}&to=${to}`);
};

export const signIn = async (data) => {
  const response = await axios.post(`${BASE_URL}/login`, data);
  const token = response.data?.token;

  if (token) {
    localStorage.setItem('token', token);
    axiosUserInstance.defaults.headers.common['access-token'] = token;
  }

  return response;
};

export const getUsers = () => {
  // eslint-disable-next-line no-console
  console.log('here token', localStorage.getItem('token'));

  return axios.get(`${BASE_URL}/users`, {
    headers: {
      'access-token': localStorage.getItem('token'),
    },
  });
};
