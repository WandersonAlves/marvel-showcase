import axios from 'axios';

const API = axios.create({
  baseURL: 'https://gateway.marvel.com:443/v1/public',
});

API.interceptors.request.use(request => {
  request.params = request.params ? request.params : {};
  request.params.apikey = process.env.REACT_APP_MARVEL_KEY;
  return request;
});

export default API;
