import axios from 'axios';
import config from '../config';

const http = axios.create({
  baseURL: config.apiUrl,
});

export default http;
