import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3500/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});
