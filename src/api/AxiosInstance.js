import axios from 'axios';

const API = axios.create({
  baseURL: 'localhost:8080',
  // baseURL: `${process.env.REACT_APP_AUTH_URL}`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default API;
