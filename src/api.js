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
  return axios.post(`${BASE_URL}`, user);
};

export const getFeeds = ({ from, to }) => {
  return axios.get(`${BASE_URL}?from=${from}&to=${to}`);
};

export const signIn = (data) => {
  return axios.post(`${BASE_URL}/login`, data);
};
