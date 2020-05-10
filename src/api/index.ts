import axios from 'axios';

const API = axios.create({
  baseURL: 'https://gateway.marvel.com:443/v1/public',
});

API.interceptors.request.use(request => {
  request.params = request.params ? request.params : {};
  request.params.apikey = '8fdee667c960c83cbe427ba898d269f5';
  return request;
});

export default API;
