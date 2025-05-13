import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5900/api';

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
