import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Base URL of the backend
  timeout: 10000,
});

export default instance;
