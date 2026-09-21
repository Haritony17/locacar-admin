import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retried) {
      originalRequest._retried = true;
      localStorage.removeItem('token');
      delete originalRequest.headers.Authorization;
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;