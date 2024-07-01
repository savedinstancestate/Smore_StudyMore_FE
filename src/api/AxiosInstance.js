import axios from 'axios';

const API = axios.create({
  baseURL: '', // 모든 요청에 대한 기본 URL 설정
  headers: {
    'Content-Type': 'application/json'
  }
});

export default API;
