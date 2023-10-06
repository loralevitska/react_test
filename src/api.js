import axios from 'axios';
/* eslint-disable */
const BASE_URL = 'http://localhost:5005/api/v1';

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
};

export const signUp = (user) => {
  return axios.post(`${BASE_URL}/users`, user);
};

export const signIn = (data) => {
  return axios.post(`${BASE_URL}/users/login`, data);
};
