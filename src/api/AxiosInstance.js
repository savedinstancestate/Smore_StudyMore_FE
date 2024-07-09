import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({
  // baseURL: '',
  baseURL: `${process.env.REACT_APP_AUTH_URL}`,
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use(function(config) {
  const token = Cookies.get('accessToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
}, function(error) {
  return Promise.reject(error);
});

export default API;
