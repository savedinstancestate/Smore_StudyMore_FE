import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({
  baseURL: 'http://ec2-43-202-82-233.ap-northeast-2.compute.amazonaws.com:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

// 각 요청에 Authorization 헤더 추가
API.interceptors.request.use(function(config) {
  const token = Cookies.get('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function(error) {
  return Promise.reject(error);
});

export default API;
